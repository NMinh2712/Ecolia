import { NextRequest, NextResponse } from "next/server";
import { generateEmbedding, generateText } from "@/lib/gemini-client";
import {
  getQdrantClient,
  ensureCollectionExists,
  addVectorToCollection,
  searchVectors,
} from "@/lib/qdrant-client";

const COLLECTION_NAME = "documents";
const REQUEST_TIMEOUT = 30000; // 30 seconds
const MAX_RETRIES = 2;
const INITIAL_RETRY_DELAY = 1000; // 1 second

// Helper function to add request timeout
async function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(
        () => reject(new Error(`Request timeout after ${timeoutMs}ms`)),
        timeoutMs
      )
    ),
  ]);
}

// Retry wrapper with exponential backoff
async function withRetry<T>(
  fn: () => Promise<T>,
  retries = MAX_RETRIES
): Promise<T> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error: any) {
      const isQuotaError = error?.message?.includes("429") || error?.message?.includes("quota");
      const isLastAttempt = attempt === retries;

      if (isQuotaError && !isLastAttempt) {
        const delay = INITIAL_RETRY_DELAY * Math.pow(2, attempt);
        logInfo("retry", `Quota exceeded, retrying in ${delay}ms (attempt ${attempt + 1}/${retries})`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }

      throw error;
    }
  }

  throw new Error("Max retries exceeded");
}

// Logger helper for debugging
function logInfo(action: string, message: string, data?: any) {
  console.log(`[${new Date().toISOString()}] [CHATBOT] ${action}: ${message}`, data || "");
}

function logError(action: string, message: string, error?: any) {
  console.error(
    `[${new Date().toISOString()}] [CHATBOT] ${action}: ${message}`,
    error || ""
  );
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  let action = "unknown";

  try {
    const { action: requestAction, text, query, limit = 5 } = await request.json();
    action = requestAction || "unknown";

    logInfo(action, "Request received", { hasQuery: !!query, hasText: !!text, limit });

    if (action === "embed-and-store") {
      if (!text) {
        return NextResponse.json(
          { success: false, error: "Missing required field: text" },
          { status: 400 }
        );
      }

      try {
        logInfo(action, "Generating embedding for text", { textLength: text.length });
        const embedding = await withTimeout(generateEmbedding(text), REQUEST_TIMEOUT);

        logInfo(action, "Ensuring collection exists", { embeddingLength: embedding.length });
        await ensureCollectionExists(COLLECTION_NAME, embedding.length);

        const id = Date.now();
        logInfo(action, "Storing document in Qdrant", { id, embeddingLength: embedding.length });
        await addVectorToCollection(COLLECTION_NAME, id, embedding, {
          text,
          timestamp: new Date().toISOString(),
        });

        logInfo(action, "Document stored successfully", { id, duration: Date.now() - startTime });
        return NextResponse.json({
          success: true,
          id,
          message: "Document embedded and stored successfully",
        });
      } catch (error) {
        logError(action, "Failed to embed and store", error);
        throw error;
      }
    }

    if (action === "search") {
      if (!query) {
        return NextResponse.json(
          { success: false, error: "Missing required field: query" },
          { status: 400 }
        );
      }

      try {
        logInfo(action, "Generating embedding for query", { queryLength: query.length });
        const queryEmbedding = await withTimeout(
          generateEmbedding(query),
          REQUEST_TIMEOUT
        );

        logInfo(action, "Searching vectors in Qdrant", { limit, embeddingLength: queryEmbedding.length });
        const results = await searchVectors(COLLECTION_NAME, queryEmbedding, limit);

        logInfo(action, "Search completed", { resultCount: results.length, duration: Date.now() - startTime });
        return NextResponse.json({
          success: true,
          results,
        });
      } catch (error) {
        logError(action, "Search failed", error);
        throw error;
      }
    }

    if (action === "search-and-generate") {
      if (!query) {
        return NextResponse.json(
          { success: false, error: "Missing required field: query" },
          { status: 400 }
        );
      }

      try {
        logInfo(action, "Generating embedding for query", { queryLength: query.length });
        const queryEmbedding = await withRetry(
          () => withTimeout(generateEmbedding(query), REQUEST_TIMEOUT)
        );

        logInfo(action, "Searching vectors in Qdrant", { limit, embeddingLength: queryEmbedding.length });
        const searchResults = await searchVectors(COLLECTION_NAME, queryEmbedding, limit);

        if (searchResults.length === 0) {
          logInfo(action, "No search results found");
          return NextResponse.json({
            success: true,
            answer: "Tôi không tìm thấy thông tin liên quan đến câu hỏi của bạn. Vui lòng thử hỏi khác hoặc liên hệ trực tiếp với chúng tôi.",
            sources: [],
          });
        }

        logInfo(action, "Building context from search results", { resultCount: searchResults.length });
        const context = searchResults
          .map((r: any) => r.payload?.text || "")
          .filter((text: string) => text.length > 0)
          .join("\n\n");

        if (!context.trim()) {
          logInfo(action, "Context is empty after filtering");
          return NextResponse.json({
            success: true,
            answer: "Xin lỗi, tôi không thể tìm thấy thông tin đủ để trả lời câu hỏi của bạn.",
            sources: [],
          });
        }

        const prompt = `Bạn là trợ lý AI của Ecolia, một công ty sản xuất chậu cây phân hủy sinh học từ lõi bắp.

Dựa trên thông tin sau, vui lòng trả lời câu hỏi một cách chính xác, thân thiện và chi tiết bằng Tiếng Việt:

Thông tin:
${context}

Câu hỏi: ${query}

Lưu ý: 
- Trả lời bằng Tiếng Việt
- Nếu không có thông tin đủ, hãy nói rõ và đề xuất liên hệ trực tiếp
- Hãy thân thiện và hữu ích`;

        logInfo(action, "Generating response with Gemini");
        const answer = await withTimeout(generateText(prompt), REQUEST_TIMEOUT);

        logInfo(action, "Response generated successfully", { answerLength: answer.length, duration: Date.now() - startTime });
        return NextResponse.json({
          success: true,
          answer,
          sources: searchResults,
        });
      } catch (error) {
        logError(action, "Search and generate failed", error);
        throw error;
      }
    }

    logInfo(action, "Invalid action received");
    return NextResponse.json(
      { success: false, error: "Invalid action" },
      { status: 400 }
    );
  } catch (error) {
    const duration = Date.now() - startTime;
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    logError(action, `Request failed after ${duration}ms`, errorMessage);

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        action,
      },
      { status: 500 }
    );
  }
}

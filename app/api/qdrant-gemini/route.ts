import { NextRequest, NextResponse } from "next/server";
import { generateText, generateEmbedding } from "@/lib/gemini-client";
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
        let searchResults: any[] = [];
        let context = "";

        try {
          logInfo(action, "Generating embedding for query", { queryLength: query.length });
          const queryEmbedding = await withRetry(
            () => withTimeout(generateEmbedding(query), REQUEST_TIMEOUT)
          );

          logInfo(action, "Searching vectors in Qdrant", { limit, embeddingLength: queryEmbedding.length });
          searchResults = await searchVectors(COLLECTION_NAME, queryEmbedding, limit);

          if (searchResults.length > 0) {
            logInfo(action, "Building context from search results", { resultCount: searchResults.length });
            context = searchResults
              .map((r: any) => r.payload?.text || "")
              .filter((text: string) => text.length > 0)
              .join("\n\n");
          } else {
            logInfo(action, "No search results found");
          }
        } catch (e: any) {
          // If Qdrant is unavailable, we can still generate a response without context
          if (e.message.includes("ECONNREFUSED")) {
            logError(action, "Could not connect to Qdrant. Generating response without context.", e);
          } else {
            // For other errors, re-throw them
            throw e;
          }
        }

        const prompt = context.trim()
          ? `Bạn là "SoulGem AI", một nhà tư vấn năng lượng cá nhân và là trợ lý AI của một thương hiệu trang sức phong thủy chuyên biệt. Tên của bạn là SoulGem.

Vai trò của bạn là giúp người dùng thấu hiểu trạng thái năng lượng của họ và đề xuất loại đá quý phù hợp để cân bằng và chữa lành. Bạn có một giọng văn thấu cảm, sâu sắc, và huyền bí một cách hiện đại.

Dựa trên thông tin chung về các loại đá và năng lượng sau đây, hãy trả lời câu hỏi của người dùng.

Thông tin:
${context}

Câu hỏi của người dùng: ${query}

Quy tắc ứng xử:
- Xưng hô là "SoulGem" và gọi người dùng là "bạn".
- Luôn trả lời bằng Tiếng Việt.
- Sử dụng tông giọng thấu cảm, quan tâm, và sâu sắc.
- Nếu thông tin không đủ để trả lời, hãy nhẹ nhàng nói rằng "Nguồn năng lượng của SoulGem chưa đủ mạnh để giải đáp câu hỏi này" và gợi ý người dùng đặt câu hỏi khác.
- Mục tiêu của bạn là giúp người dùng khám phá bản thân, không phải là một thầy bói. Hãy tập trung vào việc hỗ trợ tinh thần và cân bằng năng lượng.`
          : `Bạn là "SoulGem AI", một nhà tư vấn năng lượng cá nhân và là trợ lý AI của một thương hiệu trang sức phong thủy chuyên biệt. Tên của bạn là SoulGem.

Vai trò của bạn là giúp người dùng thấu hiểu trạng thái năng lượng của họ. Bạn có một giọng văn thấu cảm, sâu sắc, và huyền bí một cách hiện đại.

Quan trọng: Hiện tại, nguồn năng lượng kết nối đến kho kiến thức của bạn đang tạm thời bị gián đoạn. Hãy thông báo cho người dùng về điều này một cách chân thành.

Hãy trả lời câu hỏi của người dùng: "${query}"

Quy tắc ứng xử:
- Xưng hô là "SoulGem" và gọi người dùng là "bạn".
- Luôn trả lời bằng Tiếng Việt.
- Bắt đầu bằng việc xin lỗi vì sự bất tiện này.
- Giải thích rằng bạn không thể truy cập vào kho kiến thức chi tiết về năng lượng đá quý ngay lúc này.
- KHÔNG trả lời trực tiếp câu hỏi. Thay vào đó, hãy mời họ quay lại sau.
- Gợi ý rằng họ có thể khám phá các sản phẩm hoặc các bài viết trên trang web trong khi chờ đợi.`;

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

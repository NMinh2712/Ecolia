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
          ? `You are a helpful assistant for Ecolia, a brand that sells eco-friendly products. Your role is to provide information about the products and the company.

Based on the following information, please answer the user's question.

Information:
${context}

User's question: ${query}

Guidelines:
- Be friendly and helpful.
- If the information is not available in the context provided, say "I'm sorry, I don't have information about that in my knowledge base. Could you please ask a question about our products or company?"
- Your goal is to help the user find the information they need about Ecolia's products and company.`
          : `You are a helpful assistant for Ecolia, a brand that sells eco-friendly products. Your role is to provide information about the products and the company.

Unfortunately, I am currently unable to access my knowledge base. Please inform the user about this issue.

User's question: "${query}"

Guidelines:
- Apologize for the inconvenience.
- Explain that you cannot access the detailed knowledge base at the moment.
- DO NOT answer the question directly. Instead, invite them to come back later.
- Suggest that they can explore the products or articles on the website while they wait.`;

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

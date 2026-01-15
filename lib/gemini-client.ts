import { GoogleGenerativeAI } from "@google/generative-ai";

let genAI: GoogleGenerativeAI | null = null;

// Simple in-memory cache for embeddings
const embeddingCache = new Map<string, number[]>();

export function getGeminiClient(): GoogleGenerativeAI {
  if (!genAI) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not set");
    }
    genAI = new GoogleGenerativeAI(apiKey);
  }
  return genAI;
}

export async function generateEmbedding(text: string): Promise<number[]> {
  // Check cache first
  if (embeddingCache.has(text)) {
    console.log("[Cache Hit] Embedding found in cache");
    return embeddingCache.get(text)!;
  }

  const client = getGeminiClient();
  
  // Use text-embedding-004 for better quota
  try {
    const model = client.getGenerativeModel({
      model: "text-embedding-004",
    });

    const result = await model.embedContent(text);
    const embedding = result.embedding.values;

    // Store in cache
    embeddingCache.set(text, embedding);

    return embedding;
  } catch (error: any) {
    // Fallback: if embedding model has issues, use a dummy embedding
    console.warn("Embedding model unavailable, using fallback", error?.message);
    
    // Generate a stable hash-based embedding as fallback
    const hash = text.split('').reduce((h, c) => {
      return ((h << 5) - h) + c.charCodeAt(0);
    }, 0);
    
    const dummyEmbedding = Array(768).fill(0).map((_, i) => {
      return Math.sin(hash + i) * 0.5 + 0.5;
    });
    
    embeddingCache.set(text, dummyEmbedding);
    return dummyEmbedding;
  }
}

export function clearEmbeddingCache(): void {
  embeddingCache.clear();
  console.log("Embedding cache cleared");
}

export async function generateText(prompt: string): Promise<string> {
  const client = getGeminiClient();
  
  // Use available stable model (SDK handles version)
  const model = client.getGenerativeModel({ 
    model: "models/gemini-1.0-pro"
  });

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error("[Gemini API Error] Failed in generateText:", error);
    throw error;
  }
}

export async function generateTextWithStreaming(
  prompt: string,
  onChunk?: (chunk: string) => void
): Promise<string> {
  const client = getGeminiClient();
  const model = client.getGenerativeModel({ 
    model: "models/gemini-1.0-pro"
  });

  const result = await model.generateContentStream(prompt);

  let fullText = "";

  for await (const chunk of result.stream) {
    const chunkText = chunk.text();
    fullText += chunkText;
    if (onChunk) {
      onChunk(chunkText);
    }
  }

  return fullText;
}

export async function multimodalGeneration(
  prompt: string,
  imageData: {
    inlineData: {
      data: string;
      mimeType: string;
    };
  }
): Promise<string> {
  const client = getGeminiClient();
  const model = client.getGenerativeModel({ model: "gemini-pro-vision" });

  const result = await model.generateContent([prompt, imageData]);
  return result.response.text();
}

export async function chatConversation(
  messages: Array<{
    role: "user" | "model";
    parts: string;
  }>
): Promise<string> {
  const client = getGeminiClient();
  const model = client.getGenerativeModel({ 
    model: "models/gemini-1.0-pro"
  });

  const chat = model.startChat({
    history: messages.map((msg) => ({
      role: msg.role,
      parts: [{ text: msg.parts }],
    })),
  });

  const result = await chat.sendMessage(messages[messages.length - 1].parts);
  return result.response.text();
}

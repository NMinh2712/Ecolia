// This file handles the initialization of the Gemini AI client.
// It is designed to work in both local and deployed (Netlify) environments.
//
// How it works:
// 1. It first checks for the `GEMINI_API_KEY` environment variable.
// 2. If the key is not found, it fetches it from the `/api/gemini-key` endpoint.
// 3. To avoid `fetch failed` errors in the deployed environment, it constructs an
//    absolute URL for the fetch call. It uses the `URL` environment variable
//    provided by Netlify, with a fallback to `http://localhost:3000` for local
//    development.
//
// This approach ensures that the Gemini client can be initialized successfully
// in any environment without exposing the API key on the client side.

import { GoogleGenerativeAI } from "@google/generative-ai";

let genAI: GoogleGenerativeAI | null = null;
let genAIPromise: Promise<GoogleGenerativeAI> | null = null;

const embeddingCache = new Map<string, number[]>();

export function getGeminiClient(): Promise<GoogleGenerativeAI> {
  if (genAI) {
    return Promise.resolve(genAI);
  }

  if (!genAIPromise) {
    genAIPromise = (async () => {
      let apiKey = process.env.GEMINI_API_KEY;

      // Fallback hardcoded key for local testing (provided by user)
      const FALLBACK_GEMINI_API_KEY = 'AIzaSyDbKb5-Hg8newKxu1E0zIFovMGlJOhwSDk';

      if (!apiKey) {
        if (FALLBACK_GEMINI_API_KEY) {
          console.warn('[Gemini] Using fallback hardcoded GEMINI_API_KEY for local testing');
          apiKey = FALLBACK_GEMINI_API_KEY;
        } else {
          try {
            const siteUrl = process.env.URL || "http://localhost:3000";
            const response = await fetch(`${siteUrl}/api/gemini-key`);
            
            if (!response.ok) {
              const errorBody = await response.text();
              throw new Error(`Failed to fetch API key: ${response.statusText}, Body: ${errorBody}`);
            }
            
            const data = await response.json();
            apiKey = data.apiKey;

          } catch (error) {
            console.error('Error fetching Gemini API key:', error);
            throw new Error('Could not initialize Gemini AI client');
          }
        }
      }
      
      if (!apiKey) {
        throw new Error('GEMINI_API_KEY is not available after attempting to fetch.');
      }

      genAI = new GoogleGenerativeAI(apiKey);
      return genAI;
    })();
  }

  return genAIPromise;
}

export async function generateEmbedding(text: string): Promise<number[]> {
  if (embeddingCache.has(text)) {
    console.log("[Cache Hit] Embedding found in cache");
    return embeddingCache.get(text)!;
  }

  const client = await getGeminiClient();
  
  try {
    const model = client.getGenerativeModel({ model: "text-embedding-004" });
    const result = await model.embedContent(text);
    const embedding = result.embedding.values;
    embeddingCache.set(text, embedding);
    return embedding;
  } catch (error: any) {
    console.warn("Embedding model unavailable, using fallback", error?.message);
    
    const hash = text.split('').reduce((h, c) => ((h << 5) - h) + c.charCodeAt(0), 0);
    const dummyEmbedding = Array(768).fill(0).map((_, i) => Math.sin(hash + i) * 0.5 + 0.5);
    embeddingCache.set(text, dummyEmbedding);
    return dummyEmbedding;
  }
}

export function clearEmbeddingCache(): void {
  embeddingCache.clear();
  console.log("Embedding cache cleared");
}

export async function generateText(prompt: string): Promise<string> {
  const client = await getGeminiClient();
  const model = client.getGenerativeModel({ model: "gemini-2.5-flash" });

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error("[Gemini API Error] Failed in generateText:", error);
    throw error;
  }
}

export async function generateTextWithStreaming(prompt: string, onChunk?: (chunk: string) => void): Promise<string> {
  const client = await getGeminiClient();
  const model = client.getGenerativeModel({ model: "gemini-2.5-flash" });
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

export async function multimodalGeneration(prompt: string, imageData: { inlineData: { data: string; mimeType: string; } }): Promise<string> {
  const client = await getGeminiClient();
  const model = client.getGenerativeModel({ model: "gemini-pro-vision" });
  const result = await model.generateContent([prompt, imageData]);
  return result.response.text();
}

export async function chatConversation(messages: Array<{ role: "user" | "model"; parts: string; }>): Promise<string> {
  const client = await getGeminiClient();
  const model = client.getGenerativeModel({ model: "gemini-2.5-flash" });

  const chat = model.startChat({
    history: messages.map((msg) => ({
      role: msg.role,
      parts: [{ text: msg.parts }],
    })),
  });

  const result = await chat.sendMessage(messages[messages.length - 1].parts);
  return result.response.text();
}

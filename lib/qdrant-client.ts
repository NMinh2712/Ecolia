import { QdrantClient } from "@qdrant/js-client-rest";

let qdrantClient: QdrantClient | null = null;

export function getQdrantClient(): QdrantClient {
  if (!qdrantClient) {
    // Fallback values provided by user for immediate testing
    const FALLBACK_QDRANT_URL = 'https://e07af5b5-0c1b-48a2-9120-fe2e4cdd8c61.us-east4-0.gcp.cloud.qdrant.io:6333';
    const FALLBACK_QDRANT_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJtIn0.gS0X_tGQsvTaK-83KzahwcnvVLEABiRvJcP1CvaxDZc';

    const url = process.env.QDRANT_URL || FALLBACK_QDRANT_URL || "http://localhost:6333";
    const apiKey = process.env.QDRANT_API_KEY || FALLBACK_QDRANT_API_KEY;

    console.warn(`[Qdrant] Using QDRANT_URL=${url} and apiKey present:${!!apiKey}`);

    qdrantClient = new QdrantClient({
      url,
      apiKey: apiKey || undefined,
    });
  }
  return qdrantClient;
}

export async function ensureCollectionExists(
  collectionName: string,
  vectorSize: number = 768
): Promise<void> {
  const client = getQdrantClient();

  try {
    // Check if collection exists
    await client.getCollection(collectionName);
  } catch (error: any) {
    if (error.status === 404) {
      // Collection doesn't exist, create it
      await client.createCollection(collectionName, {
        vectors: {
          size: vectorSize,
          distance: "Cosine",
        },
      });
      console.log(`Collection "${collectionName}" created successfully`);
    } else {
      throw error;
    }
  }
}

export async function addVectorToCollection(
  collectionName: string,
  id: number | string,
  vector: number[],
  payload: Record<string, any> = {}
): Promise<void> {
  const client = getQdrantClient();

  await client.upsert(collectionName, {
    points: [
      {
        id: typeof id === "string" ? parseInt(id, 10) : (id as number),
        vector,
        payload,
      },
    ],
  });
}

export async function searchVectors(
  collectionName: string,
  queryVector: number[],
  limit: number = 5
): Promise<any[]> {
  const client = getQdrantClient();

  const searchResults = await client.search(collectionName, {
    vector: queryVector,
    limit,
    with_payload: true,
  });

  return searchResults;
}

export async function deleteCollection(collectionName: string): Promise<void> {
  const client = getQdrantClient();
  await client.deleteCollection(collectionName);
}

export async function getQdrantStatus(): Promise<{ ok: boolean; collections?: any[]; error?: string }> {
  try {
    const client = getQdrantClient();
    // Some Qdrant clients expose getCollections; fall back to getCollection for our collection
    if (typeof (client as any).getCollections === 'function') {
      const cols = await (client as any).getCollections();
      return { ok: true, collections: cols.collections || cols };
    }

    // Try a lightweight call using a harmless collection check
    try {
      await client.getCollection('does_not_matter_manhgems_probe').catch(() => null);
    } catch (e) {
      // ignore
    }

    return { ok: true };
  } catch (error: any) {
    return { ok: false, error: error?.message || String(error) };
  }
}

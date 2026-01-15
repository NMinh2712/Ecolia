import { QdrantClient } from "@qdrant/js-client-rest";

let qdrantClient: QdrantClient | null = null;

export function getQdrantClient(): QdrantClient {
  if (!qdrantClient) {
    const url = process.env.QDRANT_URL || "http://localhost:6333";
    const apiKey = process.env.QDRANT_API_KEY;

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

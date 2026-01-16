import { NextRequest, NextResponse } from "next/server";
import { generateEmbedding } from "@/lib/gemini-client";
import {
  getQdrantClient,
  ensureCollectionExists,
  addVectorToCollection,
} from "@/lib/qdrant-client";

const COLLECTION_NAME = "documents";

function logInfo(action: string, message: string, data?: any) {
  console.log(`[${new Date().toISOString()}] [SEED] ${action}: ${message}`, data || "");
}

function logError(action: string, message: string, error?: any) {
  console.error(
    `[${new Date().toISOString()}] [SEED] ${action}: ${message}`,
    error || ""
  );
}

// Sample documents about Ecolia products and processes
const SEED_DOCUMENTS = [
  {
    id: 1,
    text: "The EcoGreen Mini is a 3x2.8 inch plant pot made from corn cobs. It biodegrades in 2-4 weeks. Perfect for seeds and herbs. It is environmentally friendly and can be planted directly in the ground.",
    category: "products",
  },
  {
    id: 2,
    text: "The EcoGreen Standard is a medium-sized plant pot made from agricultural by-products. It biodegrades in 4-6 weeks. Suitable for larger seedlings. Designed to enrich the soil with nutrients as it decomposes.",
    category: "products",
  },
  {
    id: 3,
    text: "Ecolia's production process begins with collecting corn cobs and agricultural by-products. The materials are thoroughly cleaned and prepared. They are then processed using proprietary biotechnology to form the plant pots.",
    category: "process",
  },
  {
    id: 4,
    text: "Ecolia is committed to sustainability. Our plant pots are made from 100% recycled agricultural materials. Each product is designed to biodegrade completely in the soil without leaving any harmful substances.",
    category: "sustainability",
  },
  {
    id: 5,
    text: "Contact Ecolia: Website: www.ecolia.vn, Email: info@ecolia.vn, Phone: 0123-456-789. We are ready to answer your questions about our products and services.",
    category: "contact",
  },
];

export async function POST(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const force = searchParams.get("force") === "true";

    // Ensure collection exists
    await ensureCollectionExists(COLLECTION_NAME, 768);

    // Check if documents already exist
    const client = getQdrantClient();
    let docCount = 0;

    try {
      const collection = await client.getCollection(COLLECTION_NAME);
      docCount = collection.points_count || 0;
    } catch (error) {
      docCount = 0;
    }

    if (docCount > 0 && !force) {
      return NextResponse.json({
        success: true,
        message: `Collection already has ${docCount} documents. Use ?force=true to reinitialize.`,
        count: docCount,
      });
    }

    if (force && docCount > 0) {
      // Delete existing collection and recreate
      const client = getQdrantClient();
      try {
        // Note: deleteCollection is imported from qdrant-client
        await client.deleteCollection(COLLECTION_NAME);
        console.log(`Collection "${COLLECTION_NAME}" deleted`);
      } catch (error) {
        console.error("Error deleting collection:", error);
      }

      // Recreate empty collection
      await ensureCollectionExists(COLLECTION_NAME, 768);
    }

    // Embed and store all documents
    let successCount = 0;
    const errors: string[] = [];

    for (const doc of SEED_DOCUMENTS) {
      try {
        logInfo("seed", `Processing document ${doc.id}/${SEED_DOCUMENTS.length}`, { category: doc.category });
        const embedding = await generateEmbedding(doc.text);
        await addVectorToCollection(COLLECTION_NAME, doc.id, embedding, {
          text: doc.text,
          category: doc.category,
          timestamp: new Date().toISOString(),
        });
        successCount++;
        logInfo("seed", `Document ${doc.id} stored successfully`);
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : "Unknown error";
        errors.push(`Document ${doc.id}: ${errorMsg}`);
        logError("seed", `Failed to process document ${doc.id}`, errorMsg);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Initialized ${successCount} documents successfully`,
      count: successCount,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error("Seed API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get statistics about the collection
    const client = getQdrantClient();
    const collection = await client.getCollection(COLLECTION_NAME);

    return NextResponse.json({
      success: true,
      collection: {
        name: COLLECTION_NAME,
        points_count: collection.points_count,
        vectors_count: collection.vectors_count,
        status: collection.status,
      },
    });
  } catch (error: any) {
    if (error.status === 404) {
      return NextResponse.json({
        success: true,
        message: "Collection does not exist. Call POST to initialize.",
        exists: false,
      });
    }

    console.error("Seed GET Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

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
    text: "EcoGreen Mini là chậu cây có kích thước 8×7 cm, được làm từ lõi bắp. Chậu phân hủy sinh học trong 2-4 tuần. Hoàn hảo để trồng hạt giống và cây thảo mộc. Sản phẩm thân thiện với môi trường và có thể trồng trực tiếp vào đất.",
    category: "products",
  },
  {
    id: 2,
    text: "EcoGreen Standard là chậu cây kích thước trung bình được làm từ phụ phẩm nông nghiệp. Chậu phân hủy sinh học trong 4-6 tuần. Thích hợp cho cây con lớn. Được thiết kế để bổ sung dinh dưỡng cho đất khi phân hủy.",
    category: "products",
  },
  {
    id: 3,
    text: "Quy trình sản xuất Ecolia bắt đầu bằng việc thu thập lõi bắp và phụ phẩm nông nghiệp. Các nguyên liệu được làm sạch và chuẩn bị kỹ lưỡng. Sau đó được xử lý bằng công nghệ sinh học độc quyền để tạo thành chậu cây.",
    category: "process",
  },
  {
    id: 4,
    text: "Ecolia cam kết bền vững. Các chậu cây của chúng tôi được làm từ 100% nguyên liệu tái chế từ nông nghiệp. Mỗi sản phẩm được thiết kế để phân hủy sinh học hoàn toàn trong đất mà không để lại các chất độc hại.",
    category: "sustainability",
  },
  {
    id: 5,
    text: "Liên hệ Ecolia: Trang web: www.ecolia.vn, Email: info@ecolia.vn, Điện thoại: 0123-456-789. Chúng tôi sẵn sàng trả lời các câu hỏi của bạn về sản phẩm và dịch vụ của chúng tôi.",
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

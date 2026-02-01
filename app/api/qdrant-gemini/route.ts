import { generateEmbedding, generateText } from '@/lib/gemini-client';
import { ensureCollectionExists, addVectorToCollection, searchVectors, getQdrantStatus } from '@/lib/qdrant-client';

const COLLECTION_NAME = process.env.QDRANT_COLLECTION_NAME || 'manhgems_documents';
const VECTOR_SIZE = 768;

async function chooseCollection(): Promise<string> {
  try {
    const status = await getQdrantStatus();
    const available = (status && status.collections) ? status.collections.map((c: any) => c.name) : [];
    if (available.includes(COLLECTION_NAME)) {
      return COLLECTION_NAME;
    }
    if (available.includes('documents')) {
      console.warn(`[qdrant-gemini] Collection "${COLLECTION_NAME}" not found; falling back to "documents"`);
      return 'documents';
    }
    console.warn(`[qdrant-gemini] Collection "${COLLECTION_NAME}" not found and no fallback available; using "${COLLECTION_NAME}"`);
    return COLLECTION_NAME;
  } catch (err: any) {
    console.warn('[qdrant-gemini] chooseCollection failed to inspect Qdrant collections, using default:', COLLECTION_NAME, err?.message ?? err);
    return COLLECTION_NAME;
  }
}

async function handleEmbedAndStore(body: any) {
  const { text, id, metadata } = body;
  if (!text) {
    return { status: 400, body: { success: false, error: 'Missing `text` in request body' } };
  }

  let embedding;
  try {
    embedding = await generateEmbedding(text);
  } catch (err: any) {
    console.error('[qdrant-gemini] Embedding failed (embed-and-store):', err);
    return { status: 500, body: { success: false, error: 'Embedding failed', details: err?.message } };
  }

  try {
    await ensureCollectionExists(COLLECTION_NAME, VECTOR_SIZE);
    await addVectorToCollection(COLLECTION_NAME, id ?? Date.now(), embedding, { text, ...metadata });
  } catch (err: any) {
    console.error('[qdrant-gemini] Qdrant insert failed (embed-and-store):', err);
    return { status: 500, body: { success: false, error: 'Qdrant insert failed', details: err?.message } };
  }

  return { status: 200, body: { success: true } };
}

async function handleSearch(body: any) {
  const { query, limit = 5 } = body;
  if (!query) {
    return { status: 400, body: { success: false, error: 'Missing `query` in request body' } };
  }

  let queryVec;
  try {
    queryVec = await generateEmbedding(query);
  } catch (err: any) {
    console.error('[qdrant-gemini] Embedding failed (search):', err);
    return { status: 500, body: { success: false, error: 'Embedding failed', details: err?.message } };
  }

  // Choose which collection to query (fallback to 'documents' if default not present)
  const collectionToUse = await chooseCollection();

  let results;
  try {
    results = await searchVectors(collectionToUse, queryVec, limit);
  } catch (err: any) {
    console.error(`[qdrant-gemini] Qdrant search failed on collection ${collectionToUse}:`, err);
    return { status: 500, body: { success: false, error: 'Qdrant search failed', details: err?.message } };
  }

  return { status: 200, body: { success: true, results } };
}

async function handleSearchAndGenerate(body: any) {
  const { query, limit = 3 } = body;
  if (!query) {
    return { status: 400, body: { success: false, error: 'Missing `query` in request body' } };
  }

  let queryVec;
  try {
    queryVec = await generateEmbedding(query);
  } catch (err: any) {
    console.error('[qdrant-gemini] Embedding failed (search-and-generate):', err);
    return { status: 500, body: { success: false, error: 'Embedding failed', details: err?.message } };
  }

  // Choose which collection to query (fallback to 'documents' if default not present)
  const collectionToUse = await chooseCollection();

  let results;
  try {
    results = await searchVectors(collectionToUse, queryVec, limit);
  } catch (err: any) {
    console.error(`[qdrant-gemini] Qdrant search failed on collection ${collectionToUse}:`, err);
    return { status: 500, body: { success: false, error: 'Qdrant search failed', details: err?.message } };
  }

  // Build context from results
  const sources = (results || []).map((r: any, idx: number) => ({
    id: r.id,
    score: r.score,
    payload: r.payload,
  }));

  const contextText = (results || [])
    .map((r: any, idx: number) => `Source ${idx + 1} (score: ${r.score?.toFixed ? r.score.toFixed(4) : r.score}):\n${(r.payload && r.payload.text) || ''}`)
    .join('\n\n');

  // Attach the collection used to sources for debugging
  sources.forEach((s: any) => (s.collection = collectionToUse));

  const prompt = `Bạn là trợ lý giúp trả lời câu hỏi dựa trên các nguồn dữ liệu. Hãy trả lời ngắn gọn, súc tích bằng tiếng Việt và liệt kê nguồn (nếu cần).\n\nNguồn:\n${contextText}\n\nCâu hỏi: ${query}\n\nTrả lời:`;

  let answer = 'Không tìm thấy câu trả lời phù hợp.';
  try {
    answer = await generateText(prompt);
  } catch (err: any) {
    console.error('[qdrant-gemini] Gemini generateText failed:', err?.message ?? err);
    return { status: 500, body: { success: false, error: 'Gemini generateText failed', details: err?.message } };
  }

  return { status: 200, body: { success: true, answer, sources } };
}

export async function GET(req: Request) {
  try {
    const geminiPresent = !!process.env.GEMINI_API_KEY;
    const qdrantStatus = await getQdrantStatus().catch((e) => ({ ok: false, error: e?.message }));
    return new Response(JSON.stringify({ ok: true, geminiPresent, qdrantStatus, collection: COLLECTION_NAME }), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ ok: false, error: err?.message || 'health check failed' }), { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log(`[qdrant-gemini] Env presence - GEMINI_API_KEY:${!!process.env.GEMINI_API_KEY}, QDRANT_URL:${!!process.env.QDRANT_URL}, COLLECTION:${COLLECTION_NAME}`);
    const action = body?.action;
    console.log(`[qdrant-gemini] action=${action}, query=${body?.query ?? body?.text ?? ''}`);

    if (!action) {
      return new Response(JSON.stringify({ success: false, error: 'Missing `action` in request body' }), { status: 400 });
    }

    if (action === 'embed-and-store') {
      const res = await handleEmbedAndStore(body);
      return new Response(JSON.stringify(res.body), { status: res.status });
    }

    if (action === 'search') {
      const res = await handleSearch(body);
      return new Response(JSON.stringify(res.body), { status: res.status });
    }

    if (action === 'search-and-generate') {
      const res = await handleSearchAndGenerate(body);
      return new Response(JSON.stringify(res.body), { status: res.status });
    }

    return new Response(JSON.stringify({ success: false, error: `Unknown action: ${action}` }), { status: 400 });
  } catch (error: any) {
    console.error('[qdrant-gemini] Handler error:', error);
    return new Response(JSON.stringify({ success: false, error: error?.message || 'Internal error' }), { status: 500 });
  }
}

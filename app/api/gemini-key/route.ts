export async function GET() {
  const key = process.env.GEMINI_API_KEY;

  if (!key) {
    console.warn('[gemini-key] GEMINI_API_KEY not set');
    return new Response(JSON.stringify({ apiKey: null }), { status: 404 });
  }

  // NOTE: returning the full key is only for debugging. Remove this in production.
  console.log('[gemini-key] Serving GEMINI_API_KEY (present)');
  return new Response(JSON.stringify({ apiKey: key }), { status: 200 });
}

#!/usr/bin/env node

/**
 * Chatbot Testing Script
 * 
 * Usage:
 * node lib/test-chatbot.js "Your question here"
 * node lib/test-chatbot.js init    # Initialize seed data
 * node lib/test-chatbot.js status  # Check seed data status
 */

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

async function makeRequest(endpoint, method = "POST", body = null) {
  try {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${baseUrl}${endpoint}`, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${data.error || "Unknown error"}`);
    }

    return data;
  } catch (error) {
    console.error(`Request failed: ${error.message}`);
    process.exit(1);
  }
}

async function initializeData() {
  console.log("📥 Initializing seed data...");
  try {
    const result = await makeRequest("/api/seed-data", "POST");
    console.log("✅ Data initialized:", result.message);
    console.log(`   Count: ${result.count} documents`);
  } catch (error) {
    console.error("❌ Failed to initialize:", error.message);
  }
}

async function checkStatus() {
  console.log("📊 Checking seed data status...");
  try {
    const result = await makeRequest("/api/seed-data", "GET");
    if (result.exists === false) {
      console.log("⚠️  Collection does not exist. Run 'node lib/test-chatbot.js init' first");
    } else {
      console.log("✅ Collection exists:");
      console.log(`   Name: ${result.collection.name}`);
      console.log(`   Points: ${result.collection.points_count}`);
      console.log(`   Status: ${result.collection.status}`);
    }
  } catch (error) {
    console.error("❌ Status check failed:", error.message);
  }
}

async function askQuestion(question) {
  console.log(`🔍 Asking: "${question}"\n`);

  try {
    const result = await makeRequest("/api/qdrant-gemini", "POST", {
      action: "search-and-generate",
      query: question,
      limit: 3,
    });

    if (result.success) {
      console.log("💬 Response:");
      console.log("-".repeat(60));
      console.log(result.answer);
      console.log("-".repeat(60));

      if (result.sources && result.sources.length > 0) {
        console.log(`\n📚 Sources (${result.sources.length}):`);
        result.sources.forEach((source, idx) => {
          console.log(`\n${idx + 1}. [${source.payload?.category || "General"}]`);
          console.log(`   ${source.payload?.text?.substring(0, 100)}...`);
          if (source.score) {
            console.log(`   Match: ${(source.score * 100).toFixed(1)}%`);
          }
        });
      }
    } else {
      console.error("❌ Error:", result.error);
    }
  } catch (error) {
    console.error("❌ Request failed:", error.message);
  }
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log("Chatbot Testing Script\n");
    console.log("Usage:");
    console.log("  node lib/test-chatbot.js \"Your question\"  - Ask a question");
    console.log("  node lib/test-chatbot.js init              - Initialize seed data");
    console.log("  node lib/test-chatbot.js status            - Check data status\n");
    console.log("Example:");
    console.log("  node lib/test-chatbot.js \"Chậu cây Ecolia là gì?\"\n");
    return;
  }

  const command = args[0].toLowerCase();

  if (command === "init") {
    await initializeData();
  } else if (command === "status") {
    await checkStatus();
  } else {
    const question = args.join(" ");
    await askQuestion(question);
  }
}

main().catch(console.error);

import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get token from environment or use the one provided
const HF_TOKEN = process.env.HF_TOKEN || "YOUR_HF_TOKEN";

async function generateVideo(prompt) {
  console.log("🎬 Starting video generation with HunyuanVideo...");
  console.log("📝 Prompt:", prompt);
  
  if (HF_TOKEN === "YOUR_HF_TOKEN") {
    console.error("❌ Please set your Hugging Face token!");
    console.log("   Get your token from: https://huggingface.co/settings/tokens");
    console.log("   Then run: set HF_TOKEN=your_token_here (Windows)");
    console.log("   Or add HF_TOKEN=your_token to .env file");
    return;
  }

  try {
    console.log("⏳ Sending request to Hugging Face API...");
    console.log("   (This may take 1-5 minutes depending on queue)");
    
    const response = await fetch(
      "https://router.huggingface.co/hf-inference/models/tencent/HunyuanVideo",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${HF_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ inputs: prompt })
      }
    );

    console.log("📡 Response status:", response.status);
    console.log("📡 Response headers:", Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ API Error:", errorText);
      
      // Check if model is loading
      if (response.status === 503) {
        const errorJson = JSON.parse(errorText);
        if (errorJson.estimated_time) {
          console.log(`⏳ Model is loading. Estimated time: ${errorJson.estimated_time} seconds`);
          console.log("   Please try again in a few minutes.");
        }
      }
      return;
    }

    const contentType = response.headers.get("content-type");
    console.log("📦 Content-Type:", contentType);

    if (contentType && contentType.includes("video")) {
      const buffer = await response.arrayBuffer();
      const video = Buffer.from(buffer);
      
      const outputPath = path.join(__dirname, "../uploads/generated_videos");
      if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath, { recursive: true });
      }
      
      const filename = `hunyuan_${Date.now()}.mp4`;
      const fullPath = path.join(outputPath, filename);
      
      fs.writeFileSync(fullPath, video);
      console.log("✅ Video saved to:", fullPath);
      console.log("📁 File size:", (video.length / 1024 / 1024).toFixed(2), "MB");
    } else {
      // Might be JSON response
      const text = await response.text();
      console.log("📄 Response:", text);
    }

  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

// Test with a simple prompt
const testPrompt = "a plant showing photosynthesis inside a green leaf, educational animation, colorful";

generateVideo(testPrompt);

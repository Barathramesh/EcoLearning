import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Hugging Face Video Generation Service
 * Uses free/open models available on HF Inference API
 */

const HF_TOKEN = process.env.HF_TOKEN;

// Available free video models on HF
const VIDEO_MODELS = {
  // Text-to-Video models
  zeroscope: "cerspense/zeroscope_v2_576w",  // Free, good quality
  modelscope: "ali-vilab/text-to-video-ms-1.7b", // Free
  animatediff: "ByteDance/AnimateDiff-Lightning", // Fast animation
};

/**
 * Generate video using Zeroscope (free model)
 */
async function generateVideoZeroscope(prompt) {
  console.log("🎬 Starting video generation with Zeroscope...");
  console.log("📝 Prompt:", prompt);
  
  if (!HF_TOKEN || HF_TOKEN === "your_huggingface_token_here") {
    console.error("❌ Please set your Hugging Face token in .env!");
    console.log("   Get your token from: https://huggingface.co/settings/tokens");
    return null;
  }

  try {
    console.log("⏳ Sending request to Hugging Face...");
    console.log("   Model: Zeroscope v2 (free tier)");
    console.log("   This may take 2-5 minutes...\n");
    
    const response = await fetch(
      `https://router.huggingface.co/hf-inference/models/${VIDEO_MODELS.zeroscope}`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${HF_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
          inputs: prompt,
          parameters: {
            num_frames: 24,
            num_inference_steps: 25,
            guidance_scale: 7.5
          }
        })
      }
    );

    console.log("📡 Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ API Error:", errorText);
      
      try {
        const errorJson = JSON.parse(errorText);
        if (errorJson.estimated_time) {
          console.log(`⏳ Model is loading. Estimated time: ${Math.ceil(errorJson.estimated_time)} seconds`);
          console.log("   Please try again in a few minutes.");
        }
        if (errorJson.error?.includes("rate limit")) {
          console.log("⚠️ Rate limited. Try again later or upgrade HF plan.");
        }
      } catch (e) {}
      
      return null;
    }

    const contentType = response.headers.get("content-type");
    console.log("📦 Content-Type:", contentType);

    const buffer = await response.arrayBuffer();
    const video = Buffer.from(buffer);
    
    // Create output directory
    const outputPath = path.join(__dirname, "../uploads/generated_videos");
    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath, { recursive: true });
    }
    
    const filename = `zeroscope_${Date.now()}.mp4`;
    const fullPath = path.join(outputPath, filename);
    
    fs.writeFileSync(fullPath, video);
    console.log("\n✅ Video generated successfully!");
    console.log("📁 Saved to:", fullPath);
    console.log("📊 File size:", (video.length / 1024).toFixed(2), "KB");
    
    return fullPath;

  } catch (error) {
    console.error("❌ Error:", error.message);
    return null;
  }
}

/**
 * Alternative: Generate video using ModelScope
 */
async function generateVideoModelScope(prompt) {
  console.log("🎬 Starting video generation with ModelScope...");
  
  if (!HF_TOKEN || HF_TOKEN === "your_huggingface_token_here") {
    console.error("❌ Please set your Hugging Face token!");
    return null;
  }

  try {
    const response = await fetch(
      `https://router.huggingface.co/hf-inference/models/${VIDEO_MODELS.modelscope}`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${HF_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ inputs: prompt })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ ModelScope Error:", errorText);
      return null;
    }

    const buffer = await response.arrayBuffer();
    const video = Buffer.from(buffer);
    
    const outputPath = path.join(__dirname, "../uploads/generated_videos");
    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath, { recursive: true });
    }
    
    const filename = `modelscope_${Date.now()}.mp4`;
    const fullPath = path.join(outputPath, filename);
    
    fs.writeFileSync(fullPath, video);
    console.log("✅ Video saved to:", fullPath);
    
    return fullPath;
  } catch (error) {
    console.error("❌ Error:", error.message);
    return null;
  }
}

// Test
const testPrompt = "a green plant leaf showing photosynthesis process, sunlight rays, educational animation style, colorful, nature";

console.log("========================================");
console.log("  Hugging Face Video Generation Test");
console.log("========================================\n");

generateVideoZeroscope(testPrompt);

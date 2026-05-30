const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || process.env.google_api_key);

async function listAvailableModels() {
  try {
    // We use the standard fetch to hit the list endpoint directly
    const apiKey = process.env.GEMINI_API_KEY || process.env.google_api_key;
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const data = await response.json();

    if (data.error) {
      console.log("API Error:", data.error.message);
      return;
    }

    console.log("--- YOUR AVAILABLE MODELS ---");
    data.models.forEach(m => {
      // Only show models that support text generation
      if (m.supportedGenerationMethods.includes("generateContent")) {
        console.log(`> ${m.name.split('/')[1]}`);
      }
    });
    console.log("-----------------------------");
  } catch (err) {
    console.error("Technical Error:", err.message);
  }
}

listAvailableModels();
const { GoogleGenAI } =  require("@google/genai");
const ai = new GoogleGenAI({apiKey:process.env.google_api_key});
module.exports = ai;
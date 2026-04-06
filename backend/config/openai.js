const openai = require("openai");
const client = new openai.OpenAI({apiKey:process.env.OPENAI_API_KEY});
module.exports = client;
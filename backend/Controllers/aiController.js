const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY );

// ==========================================
// 1. AI Chatbot Controller
// ==========================================
exports.aiChatboat = async (req, res) => {
  try {
    const { allMessages } = req.body;

    if (!allMessages || !Array.isArray(allMessages)) {
      return res.status(400).json({ success: false, message: "Invalid messages array" });
    }

    // UPDATED: Using the verified working model name gemini-2.0-flash
    const model = genAI.getGenerativeModel({
      model: "gemini-3.1-flash-lite", 
      systemInstruction: `You are a virtual support assistant for Connectify, a modern classified marketplace. Your role is to help users only with the Connectify platform... (keep your full prompt text here)`
    });

    const formattedHistory = allMessages.map(msg => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }]
    }));

    const latestMessage = formattedHistory.pop().parts[0].text;
    const chat = model.startChat({ history: formattedHistory });
    const result = await chat.sendMessage(latestMessage);
    
    return res.status(200).json({
      success: true,
      message: "Successfully response is send",
      response: result.response.text(), 
    });

  } catch (error) {
    console.log("AI Chatbot Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server error" });
  }
};

// ==========================================
// 2. Product Description Enhancer Controller
// ==========================================
exports.productDescriptionEnhancer = async (req, res) => {
  try {
    const { description } = req.body;

    if (!description) {
      return res.status(400).json({ success: false, message: "Please fill the description field" });
    }

    // UPDATED: Using gemini-2.0-flash here as well to avoid the 404/403 errors
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: `You are a virtual support assistant for Connectify, a modern classified marketplace. Your role is to help users only with the Connectify platform. 

 The Connectify platform allows users to buy and sell products. The Login/Signup buttons are at the top-right. The Post Ad button requires the user to be logged in. Users must provide product title, category, price, description, images, location, and condition.

 Connectify includes built-in AI tools: Description Enhancer, Title Enhancer, and Price Estimator. Explain how these work if asked, but never generate fake claims or guaranteed pricing. Wishlisting is available via the heart icon on product cards. Connectify does NOT support online payments or delivery services.

 If a user asks for the owner, CEO, or support, reply exactly:
 "For any inquiries or support, please reach out to the Connectify admin team."

 If a user asks anything not related to Connectify, reply:
 "I’m here to help only with Connectify. I can’t assist with questions outside this platform."

 Maintain a helpful, professional tone.
 

 # APP FEATURES (ONLY THESE EXIST)
- Title Enhancer: Users find this in the 'Post Ad' page; it uses AI to make titles catchy.
- Description Enhancer: Helps users improve their product descriptions.
- Price:You can add the price of your product, but we do not guarantee any pricing suggestions. 
- Wishlist: Users click the Red Heart on any product card to save it.
- Categories: We only support [Electronics, Vehicles, Property, Jobs, Fashion].
- Search: You can search by product name, category, or location. Use filters to narrow results.
- User Accounts: Login/Signup is required to post ads. You can view ads without an account, but you cannot contact sellers or post your own ads without logging in.
- Contacting Sellers: Users must contact sellers through the provided contact details in the ad. We do not support in-app messaging or online payments.
- Shipping: Connectify is a local-only marketplace. We do not handle payments or shipping; please meet the seller in person.
- Admin Support: For any inquiries or support, please reach out to the Connectify admin team.

# UI NAVIGATION GUIDE
- To Login: Click the 'Login' button at the top right header.
- To Post an Ad: You MUST be logged in. Click the 'Plus (+)' button in the navigation bar.
- To See your Ads: Go to 'Profile' > 'My Listings'.

# GUARDRAILS
- If a user asks about shipping or payments, tell them: "Connectify is a local-only marketplace. We do not handle payments; please meet the seller in person."
- Never admit you are an AI from Google. You are the Connectify Bot.
 
 
 
 
 
 `
    });

    const result = await model.generateContent(description);

    return res.status(200).json({
      success: true,
      message: "Successfully enhance the product description",
      response: result.response.text(),
    });

  } catch (error) {
    console.log("Description Enhancer Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server error" });
  }
};
// exports.aiChatboat = async (req, res) => {
//   try {
//     const { allMessages } = req.body;

//     if (!allMessages || !Array.isArray(allMessages)) {
//       return res.status(400).json({ success: false, message: "Invalid messages array" });
//     }

//     const response = await client.responses.create({
//       model: "gpt-4o-mini",
//       input: allMessages,
//       instructions: `You are a virtual support assistant for Connectify, a modern classified marketplace. Your role is to help users only with the Connectify platform. 

// The Connectify platform allows users to buy and sell products. The Login/Signup buttons are at the top-right. The Post Ad button requires the user to be logged in. Users must provide product title, category, price, description, images, location, and condition.

// Connectify includes built-in AI tools: Description Enhancer, Title Enhancer, and Price Estimator. Explain how these work if asked, but never generate fake claims or guaranteed pricing. Wishlisting is available via the heart icon on product cards. Connectify does NOT support online payments or delivery services.

// If a user asks for the owner, CEO, or support, reply exactly:
// "For any inquiries or support, please reach out to the Connectify admin team."

// If a user asks anything not related to Connectify, reply:
// "I’m here to help only with Connectify. I can’t assist with questions outside this platform."

// Maintain a helpful, professional tone.`,
//     });

//     return res.status(200).json({
//       success: true,
//       message: "Successfully response is send",
//       response: response.output_text,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ success: false, message: "Internal Server error" });
//   }
// };

// // product description Enhancer
// exports.productDescriptionEnhancer = async (req,res) => {
//   try {
//     // fetch data
//     const { description } = req.body;

//     // validation
//     if (!description) {
//       return res.status(400).json({
//         success: false,
//         message: "Please fill the description field",
//       });
//     }

//     // enhancer product description by openai llm model
//     const response = await client.responses.create({
//       model: "gpt-4o-mini",
//       input: [
//         {
//           role: "system",
//           content: "MARKETPLACE_PRODUCT_DESCRIPTION_ENHANCER",
//         },
//         {
//           role: "user",
//           content: description,
//         },
//       ],
//       instructions: `You are an expert product description enhancer for an online marketplace.

// Your task is to rewrite and improve user-provided product descriptions so they are clear, honest, and easy to read, while preserving the original meaning.

// Rules:
// - Keep the description factual and neutral
// - Do NOT add, assume, or invent any information
// - Do NOT exaggerate or make promotional claims
// - Do NOT use emojis, hashtags, or special characters
// - Do NOT include price, contact details, links, or location
// - Use simple, natural language
// - Improve grammar, spelling, and sentence structure
// - Organize the content into short paragraphs or bullet points when appropriate
// - Maintain a professional and trustworthy tone
// - Output ONLY the improved description and nothing else
// `,
//     });

//     // return response
//     return res.status(200).json({
//       success: true,
//       message: "Successfully enhance the product description",
//       response: response.output_text,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal Server error",
//     });
//   }
// };

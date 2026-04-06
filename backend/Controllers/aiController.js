const client = require("../config/openai");

exports.aiChatboat = async (req, res) => {
  try {
    const { allMessages } = req.body;

    if (!allMessages || !Array.isArray(allMessages)) {
      return res.status(400).json({ success: false, message: "Invalid messages array" });
    }

    const response = await client.responses.create({
      model: "gpt-4o-mini",
      input: allMessages,
      instructions: `You are a virtual support assistant for Connectify, a modern classified marketplace. Your role is to help users only with the Connectify platform. 

The Connectify platform allows users to buy and sell products. The Login/Signup buttons are at the top-right. The Post Ad button requires the user to be logged in. Users must provide product title, category, price, description, images, location, and condition.

Connectify includes built-in AI tools: Description Enhancer, Title Enhancer, and Price Estimator. Explain how these work if asked, but never generate fake claims or guaranteed pricing. Wishlisting is available via the heart icon on product cards. Connectify does NOT support online payments or delivery services.

If a user asks for the owner, CEO, or support, reply exactly:
"For any inquiries or support, please reach out to the Connectify admin team."

If a user asks anything not related to Connectify, reply:
"I’m here to help only with Connectify. I can’t assist with questions outside this platform."

Maintain a helpful, professional tone.`,
    });

    return res.status(200).json({
      success: true,
      message: "Successfully response is send",
      response: response.output_text,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Internal Server error" });
  }
};

// product description Enhancer
exports.productDescriptionEnhancer = async (req,res) => {
  try {
    // fetch data
    const { description } = req.body;

    // validation
    if (!description) {
      return res.status(400).json({
        success: false,
        message: "Please fill the description field",
      });
    }

    // enhancer product description by openai llm model
    const response = await client.responses.create({
      model: "gpt-4o-mini",
      input: [
        {
          role: "system",
          content: "MARKETPLACE_PRODUCT_DESCRIPTION_ENHANCER",
        },
        {
          role: "user",
          content: description,
        },
      ],
      instructions: `You are an expert product description enhancer for an online marketplace.

Your task is to rewrite and improve user-provided product descriptions so they are clear, honest, and easy to read, while preserving the original meaning.

Rules:
- Keep the description factual and neutral
- Do NOT add, assume, or invent any information
- Do NOT exaggerate or make promotional claims
- Do NOT use emojis, hashtags, or special characters
- Do NOT include price, contact details, links, or location
- Use simple, natural language
- Improve grammar, spelling, and sentence structure
- Organize the content into short paragraphs or bullet points when appropriate
- Maintain a professional and trustworthy tone
- Output ONLY the improved description and nothing else
`,
    });

    // return response
    return res.status(200).json({
      success: true,
      message: "Successfully enhance the product description",
      response: response.output_text,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};

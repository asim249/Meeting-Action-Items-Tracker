const { GoogleGenerativeAI } = require("@google/generative-ai");

console.log("API Key Loaded:", process.env.GEMINI_API_KEY ? "YES" : "NO");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateActionItems = async (text) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash", 
      
    }, { apiVersion: 'v1' } );

    const prompt = `
Extract action items from the following meeting transcript.
Return ONLY a valid JSON array in this format:

[
  {
    "task": "",
    "owner": "",
    "dueDate": "",
    "status": "open"
  }
]

Transcript:
${text}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const content = response.text();

    const cleaned = content
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);
  } catch (error) {
    console.error(error);
    throw new Error("Gemini API Error: " + error.message);
  }
};

module.exports = { generateActionItems };

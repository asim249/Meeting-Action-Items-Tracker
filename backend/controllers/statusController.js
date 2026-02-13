const mongoose = require("mongoose");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const getStatus = async (req, res) => {
  try {
    const dbStatus =
      mongoose.connection.readyState === 1 ? "Connected" : "Disconnected";

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    await model.generateContent("Say OK");

    res.json({
      backend: "OK",
      database: dbStatus,
      llm: "Active",
    });
  } catch (error) {
    res.json({
      backend: "OK",
      database:
        mongoose.connection.readyState === 1
          ? "Connected"
          : "Disconnected",
      llm: "Error",
    });
  }
};

module.exports = { getStatus };

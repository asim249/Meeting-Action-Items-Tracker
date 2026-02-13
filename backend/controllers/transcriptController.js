const Transcript = require("../models/Transcript");
const ActionItem = require("../models/ActionItem");
const { generateActionItems } = require("../services/llmService");

const createTranscript = async (req, res) => {
  try {
    const { transcript, userId } = req.body;

    if (!transcript || !userId) {
      return res.status(400).json({ message: "Transcript and userId required" });
    }

    const transcriptDoc = await Transcript.create({
      transcriptText: transcript,
      userId,
    });

    const actionItems = await generateActionItems(transcript);

    const savedItems = await Promise.all(
      actionItems.map((item) =>
        ActionItem.create({
          ...item,
          transcriptId: transcriptDoc._id,
          userId, // 🔥 REQUIRED
        })
      )
    );

    res.status(201).json({
      actionItems: savedItems,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};



const getLastFiveTranscripts = async (req, res) => {
  try {
    const {userId} = req.query
    const transcripts = await Transcript.find({userId})
      .sort({ createdAt: -1 })
      .limit(5);

    res.json(transcripts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSingleTranscript = async (req, res) => {
  try {
    const { userId } = req.query;

    const transcript = await Transcript.findOne({
      _id: req.params.id,
      userId, // 🔥 IMPORTANT
    });

    if (!transcript) {
      return res.status(404).json({ message: "Transcript not found" });
    }

    const actionItems = await ActionItem.find({
      transcriptId: transcript._id,
      userId, // 🔥 IMPORTANT
    });

    res.json({ transcript, actionItems });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  createTranscript,
  getLastFiveTranscripts,
  getSingleTranscript,
};

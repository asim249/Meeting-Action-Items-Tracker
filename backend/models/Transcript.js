const mongoose = require("mongoose");

const transcriptSchema = new mongoose.Schema(
  {
    transcriptText: {
      type: String,
      required: true,
    },
    userId: {
  type: String,
  required: true,
}
  },
  { timestamps: true }
);

const Transcript = mongoose.model("Transcript", transcriptSchema);

module.exports = Transcript;

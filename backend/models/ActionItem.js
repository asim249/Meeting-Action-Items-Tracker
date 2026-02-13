const mongoose = require("mongoose");

const actionItemSchema = new mongoose.Schema(
  {
    task: { type: String, required: true },
    owner: { type: String },
    dueDate: { type: String },
    status: {
      type: String,
      enum: ["open", "done"],
      default: "open",
    },
    transcriptId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transcript",
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const ActionItem = mongoose.model("ActionItem", actionItemSchema);

module.exports = ActionItem;

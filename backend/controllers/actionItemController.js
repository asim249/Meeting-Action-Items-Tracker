const ActionItem = require("../models/ActionItem");

// add a task
const addActionItem = async (req, res) => {
  try {
   const { task, owner, dueDate, transcriptId, userId } = req.body;
    if (!task || !userId || !transcriptId) {
      return res.status(400).json({ message: "Task, userId, and transcriptId are required" });
    }
    const newItem = await ActionItem.create({
      task,
      owner: owner || userId, // default owner = userId
      dueDate: dueDate || null,
      transcriptId,
      userId,
      status: "open", // default status
    });

    res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Update single action item
const updateActionItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await ActionItem.findByIdAndUpdate(id, req.body, { new: true });

    if (!updated) return res.status(404).json({ message: "Action item not found" });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete single action item
const deleteActionItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await ActionItem.findByIdAndDelete(id);

    if (!deleted) return res.status(404).json({ message: "Action item not found" });

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { updateActionItem, deleteActionItem, addActionItem };

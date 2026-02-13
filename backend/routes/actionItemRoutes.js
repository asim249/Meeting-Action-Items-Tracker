const express = require("express");
const {
  updateActionItem,
  deleteActionItem,
  addActionItem
} = require("../controllers/actionItemController");

const router = express.Router();

router.post("/", addActionItem);
router.put("/:id", updateActionItem);
router.delete("/:id", deleteActionItem);

module.exports = router;

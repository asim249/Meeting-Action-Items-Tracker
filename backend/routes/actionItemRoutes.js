const express = require("express");
const {
  updateActionItem,
  deleteActionItem,
} = require("../controllers/actionItemController");

const router = express.Router();

router.put("/:id", updateActionItem);
router.delete("/:id", deleteActionItem);

module.exports = router;

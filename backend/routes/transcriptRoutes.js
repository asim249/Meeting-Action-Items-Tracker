const express = require("express");
const {
  createTranscript,
  getLastFiveTranscripts,
  getSingleTranscript,
} = require("../controllers/transcriptController");

const router = express.Router();

router.post("/", createTranscript);
router.get("/", getLastFiveTranscripts);
router.get("/:id", getSingleTranscript);

module.exports = router;

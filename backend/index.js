require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const transcriptRoutes = require("./routes/transcriptRoutes");
const actionItemRoutes = require("./routes/actionItemRoutes");
const statusRoutes = require("./routes/statusRoutes");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/transcripts", transcriptRoutes);
app.use("/api/action-items", actionItemRoutes);
app.use("/api/status", statusRoutes);

app.get("/", (req, res) => {
  res.send("Meeting Action Items API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

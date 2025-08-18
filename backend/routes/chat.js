// server/routes/chat.js
import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/", async (req, res) => {
  const { message } = req.body;
  const { data } = await axios.post(`${process.env.NLP_SERVICE_URL}/analyze`, { message });
  // Optionally log to IPFS
  res.json({ reply: "Thanks for reaching out.", sentiment: data.sentiment });
});

export default router;

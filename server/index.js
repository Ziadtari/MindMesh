const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  const userMessage = req.body.text;

  try {
    // Forward to Python NLP service
    const response = await axios.post("http://localhost:5000/analyze", {
      text: userMessage,
    });

    const sentiment = response.data.sentiment;
    
    // Optional: Log to DB or IPFS here
    // Encrypt and store securely

    res.json({
      text: userMessage,
      sentiment,
      response: "Thanks for sharing. I'm here to support you.",
    });
  } catch (err) {
    console.error("NLP Error:", err.message);
    res.status(500).send("Sentiment analysis failed.");
  }
});

app.listen(3001, () => console.log("Node server running on http://localhost:3001"));

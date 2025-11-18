// index.js
const express = require('express');
const dotenv = require('dotenv');
const { getTinaResponse } = require('./services/tinaService');
const { buildTinaPrompt } = require('./prompts/tinaPrompt');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// -----------------------------
// Test route
// -----------------------------
app.get('/', (req, res) => {
  res.send('Tina backend is running!');
});

// -----------------------------
// Chat route
// -----------------------------
app.post('/api/tina/chat', async (req, res) => {
  try {
    const { history } = req.body;

    if (!history || !Array.isArray(history)) {
      return res.status(400).json({ error: "Invalid request: 'history' array required" });
    }

    // Build Tina persona prompt with conversation history
    const tinaPrompt = buildTinaPrompt(history);

    // Send the persona prompt as the user's input to Gemini
    const modelHistory = [
      { role: "user", text: tinaPrompt }
    ];

    const reply = await getTinaResponse(modelHistory);

    res.json({ reply });

  } catch (err) {
    console.error("Error in /api/tina/chat:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// -----------------------------
// Global error handler
// -----------------------------
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// -----------------------------
// Start server
// -----------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Tina backend running on http://localhost:${PORT}`);
});

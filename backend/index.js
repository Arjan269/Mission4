// index.js
const express = require('express');
const dotenv = require('dotenv');
const { getTinaResponse } = require('./services/tinaService');

// Load environment variables from .env
dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // Parse JSON body

// -----------------------------
// Test route to check server
// -----------------------------
app.get('/', (req, res) => {
  res.send('Tina backend is running!');
});

// -----------------------------
// Tina chat route
// -----------------------------
app.post('/api/tina/chat', async (req, res) => {
  try {
    const { history } = req.body;

    if (!history || !Array.isArray(history)) {
      return res.status(400).json({ error: "Invalid request: 'history' array is required" });
    }

    const reply = await getTinaResponse(history);
    res.json({ reply });

  } catch (err) {
    console.error("Error in /api/tina/chat:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// -----------------------------
// Global error handling
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

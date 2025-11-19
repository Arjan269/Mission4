// controllers/tinaController.js
const { getTinaResponse } = require('../services/tinaService');
const { buildTinaPrompt } = require('../prompts/tinaPrompt');

const chatWithTina = async (req, res) => {
  try {
    const { history } = req.body;

    console.log("Request body:", req.body); // <-- debug log

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
};

module.exports = { chatWithTina };

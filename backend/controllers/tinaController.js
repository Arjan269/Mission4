// controllers/tinaController.js
const { getTinaResponse } = require('../services/tinaService');

const chatWithTina = async (req, res, next) => {
  try {
    const { history, sessionId } = req.body; 
    // history is sent from frontend or session storage
    const reply = await getTinaResponse(history, process.env.GEMINI_API_KEY);
    res.json({ reply });
  } catch (error) {
    next(error);
  }
};

module.exports = { chatWithTina };

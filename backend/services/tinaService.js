// services/tinaService.js
const axios = require('axios');

/**
 * Gemini 2.5 Flash API endpoint
 */
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

/**
 * Get AI response from Tina using Gemini 2.5 Flash
 * @param {Array} history - Array of chat messages [{ role: 'user'|'model', text: '...' }]
 * @returns {String} - Tina's reply
 */
const getTinaResponse = async (history) => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing in .env");
  }

  console.log("Using Gemini API Key:", apiKey.slice(0, 8) + "..."); // partial log for safety

  // Format messages for Gemini API
  const contents = history.map(msg => ({
    role: msg.role,
    parts: [{ text: msg.text }]
  }));

  const body = { contents };

  try {
    const response = await axios.post(GEMINI_API_URL, body, {
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey
      }
    });

    // Gemini returns candidates array
    const candidates = response.data.candidates;
    if (!candidates || candidates.length === 0) {
      throw new Error("No response from Gemini");
    }

    // Join all parts of the first candidate
    const replyText = candidates[0].content.parts.map(p => p.text).join('');
    return replyText;

  } catch (error) {
    console.error("Error from Gemini API:", error.response?.data || error.message);
    throw new Error("Failed to get response from Gemini API");
  }
};

module.exports = { getTinaResponse };

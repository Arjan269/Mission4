// services/tinaService.js
const axios = require('axios');

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

const getTinaResponse = async (history) => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) throw new Error("GEMINI_API_KEY missing in .env");

  const contents = history.map(msg => ({
    role: msg.role,
    parts: [{ text: msg.text }]
  }));

  const body = { contents };

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await axios.post(GEMINI_API_URL, body, {
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey
        }
      });

      const candidates = response.data.candidates;
      if (!candidates || candidates.length === 0) throw new Error("No response from Gemini");

      return candidates[0].content.parts.map(p => p.text).join('');

    } catch (err) {
      if (err.response?.status === 503 && attempt < 3) {
        console.warn(`Gemini overloaded, retrying attempt ${attempt}...`);
        await new Promise(res => setTimeout(res, 2000));
        continue;
      }
      console.error("Gemini API error:", err.response?.data || err.message);
      throw new Error("Failed to get response from Gemini API");
    }
  }
};

module.exports = { getTinaResponse };

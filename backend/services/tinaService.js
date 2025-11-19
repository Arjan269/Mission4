// services/tinaService.js
const axios = require('axios');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const getTinaResponse = async (history) => {
  try {
    const response = await axios.post(
      'https://api.generativelanguage.googleapis.com/v1beta2/models/chat-bison-001:generateMessage',
      {
        prompt: {
          messages: history.map(h => ({
            author: h.role === 'user' ? 'user' : 'system',
            content: [{ type: 'text', text: h.text }]
          }))
        },
        temperature: 0.7,
        candidate_count: 1
      },
      {
        headers: {
          'Authorization': `Bearer ${GEMINI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.candidates[0].content[0].text;

  } catch (err) {
    console.error("Error from Gemini API:", err.response?.data || err.message);
    throw new Error('Failed to get response from Gemini API');
  }
};

module.exports = { getTinaResponse };

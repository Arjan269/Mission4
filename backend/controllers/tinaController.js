import { getTinaResponse } from "../services/tinaService.js";

export const chatWithTina = async (req, res) => {
  try {
    const { history } = req.body;

    const reply = await getTinaResponse(history);

    res.json({ reply });
  } catch (err) {
    console.error("Error in /api/tina/chat:", err.message);
    res.status(500).json({ error: "Failed to get response from Tina" });
  }
};

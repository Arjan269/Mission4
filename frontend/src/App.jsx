import { useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const updatedMessages = [...messages, { role: "user", text: input }];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(API_URL, { history: updatedMessages });
      const reply = response.data.reply;
      setMessages(prev => [...prev, { role: "model", text: reply }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: "model", text: "Error: Could not reach Tina." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="app-container">
      <h1>Tina Insurance Chat</h1>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={msg.role === "user" ? "message user" : "message tina"}>
            <strong>{msg.role === "user" ? "You" : "Tina"}:</strong> {msg.text}
          </div>
        ))}
        {loading && <div className="message tina">Tina is typing...</div>}
      </div>

      <textarea
        className="input-box"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type your message..."
      />
      <button onClick={handleSend} disabled={loading}>Send</button>
    </div>
  );
}

export default App;

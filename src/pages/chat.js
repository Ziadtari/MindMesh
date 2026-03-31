// client/src/pages/Chat.jsx
import { useState } from "react";
import axios from "axios";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [log, setLog] = useState([]);

  const send = async () => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/chat`, { message });
    setLog([...log, { user: message, ai: res.data.reply, sentiment: res.data.sentiment }]);
    setMessage("");
  };

  return (
    <div>
      <h2>AI Mental Health Chat</h2>
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={send}>Send</button>
      <ul>
        {log.map((entry, i) => (
          <li key={i}><strong>You:</strong> {entry.user}<br/><strong>AI:</strong> {entry.ai} <em>[{entry.sentiment.label}]</em></li>
        ))}
      </ul>
    </div>
  );
}

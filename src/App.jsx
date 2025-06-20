import { useState, useRef, useEffect } from "react";
import './App.css';
import {
  FiMessageSquare,
  FiX,
  FiSend,
  FiLock,
  FiUsers,
  FiActivity,
  FiLogIn,
  FiUserPlus,
  FiMoon,
  FiSun,
} from "react-icons/fi";

function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Welcome to MindMesh! I'm your AI mental health assistant. How can I help you today?",
      sender: "bot",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const messagesEndRef = useRef(null);

  const features = [
    {
      icon: <FiActivity />,
      title: "AI-Powered Therapy",
      description:
        "24/7 access to confidential mental health support powered by advanced AI.",
    },
    {
      icon: <FiLock />,
      title: "Secure & Private",
      description: "End-to-end encrypted conversations to protect your privacy.",
    },
    {
      icon: <FiUsers />,
      title: "Community Support",
      description: "Connect with others in moderated, safe support groups.",
    },
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "" || loading) return;

    setMessages((prev) => [...prev, { text: inputValue.trim(), sender: "user" }]);
    setInputValue("");
    setLoading(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text:
            "I'm here to listen and provide support. For emergencies, please contact professional help immediately.",
          sender: "bot",
        },
      ]);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className={`app-container ${darkMode ? "dark" : ""}`}>
      <header className="header">
        <nav className="nav">
          <div className="nav-left">
            <span className="logo">MindMesh</span>
            <button
              onClick={() => setDarkMode((prev) => !prev)}
              className="toggle-mode-btn"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <FiSun /> : <FiMoon />}
            </button>
          </div>
          <div className="nav-right">
            <button className="nav-btn">
              <FiLogIn /> Sign In
            </button>
            <button className="register-btn">
              <FiUserPlus /> Register
            </button>
          </div>
        </nav>
      </header>

      <main className="main-content">
        <section className="hero-section">
          <div className="hero-inner">
            <div className="hero-text">
              <h1>
                Your Mental Health <span className="highlight">Companion</span>
              </h1>
              <p>
                MindMesh combines AI-powered therapy with community support to
                help you navigate your mental health journey with confidence and
                privacy.
              </p>
              <div className="hero-buttons">
                <button onClick={() => setChatOpen(true)} className="start-chat">
                  <FiMessageSquare /> Start Chatting
                </button>
                <button className="learn-more">Learn More</button>
              </div>
            </div>
            <div className="hero-graphic">
              <div className="graphic-box">
                <FiMessageSquare />
                <p>AI Mental Health Chat Interface</p>
              </div>
              <div className="bg-deco purple"></div>
              <div className="bg-deco indigo"></div>
            </div>
          </div>
        </section>

        <section className="features-section">
          <h2>How MindMesh Helps You</h2>
          <p>
            Our platform combines cutting-edge technology with compassionate care to
            support your mental wellbeing.
          </p>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-box">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <aside className={`chat-container ${chatOpen ? "open" : ""}`} role="dialog" aria-modal="true" aria-labelledby="chat-title">
        <header className="chat-header">
          <h3 id="chat-title">MindMesh Assistant</h3>
          <button onClick={() => setChatOpen(false)} className="chat-close" aria-label="Close chat">
            <FiX />
          </button>
        </header>
        <section className="chat-messages" aria-live="polite" aria-relevant="additions">
          {messages.map((msg, i) => (
            <p key={i} className={`chat-bubble ${msg.sender}`}>
              {msg.text}
            </p>
          ))}
          <div ref={messagesEndRef} />
        </section>
        <form onSubmit={handleSendMessage} className="chat-input-form">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="chat-input"
            disabled={loading}
          />
          <button type="submit" disabled={inputValue.trim() === "" || loading} className="chat-send-btn">
            {loading ? (
              <div className="spinner" />
            ) : (
              <FiSend />
            )}
          </button>
        </form>
      </aside>

      {!chatOpen && (
        <button onClick={() => setChatOpen(true)} className="floating-btn" aria-label="Open chat">
          <FiMessageSquare />
        </button>
      )}

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-left">
            <h4>MindMesh</h4>
            <p>Compassionate AI-driven mental health support and community.</p>
          </div>
          <nav className="footer-links">
            <a href="#">About Us</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Contact</a>
          </nav>
        </div>
        <p className="footer-copy">&copy; {new Date().getFullYear()} MindMesh. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;

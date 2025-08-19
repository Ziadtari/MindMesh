import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";   // ✅ for navigation
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
  FiMenu,
} from "react-icons/fi";

function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Welcome to MindMesh! I'm your AI mental health assistant. Please remember: I am not a substitute for professional medical help. 🚨 If you are in crisis or experiencing an emergency, contact your doctor or local emergency services immediately.",
      sender: "bot",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const features = [
    {
      icon: <FiActivity />,
      title: "AI-Powered Therapy",
      description: "24/7 access to confidential mental health support powered by advanced AI.",
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

    const newUserMessage = { text: inputValue.trim(), sender: "user" };
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setInputValue("");
    setLoading(true);

    setTimeout(() => {
      const botResponse = {
        text: "I'm here to listen and provide support. Please remember that I'm not a medical professional. 🚑 If you ever feel unsafe or at risk, seek immediate help from a doctor, therapist, or emergency service.",
        sender: "bot",
      };
      const finalMessages = [...updatedMessages, botResponse];
      setMessages(finalMessages);

      if (currentChatId) {
        setChatHistory(prev => prev.map(chat =>
          chat.id === currentChatId
            ? { ...chat, messages: finalMessages, updatedAt: new Date() }
            : chat
        ));
      } else {
        const newChat = {
          id: Date.now(),
          title: inputValue.trim().slice(0, 30) || "New Conversation",
          messages: finalMessages,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        setChatHistory(prev => [newChat, ...prev]);
        setCurrentChatId(newChat.id);
      }

      setLoading(false);
    }, 1200);
  };

  const startNewChat = () => {
    setMessages([{
      text: "Welcome to MindMesh! I'm your AI mental health assistant. Remember: I cannot replace professional care. 🚨 If you are in crisis, please reach out to emergency services or a licensed therapist immediately.",
      sender: "bot",
    }]);
    setCurrentChatId(null);
    setChatOpen(true);
  };

  const loadChat = (chatId) => {
    const chat = chatHistory.find(c => c.id === chatId);
    if (chat) {
      setMessages(chat.messages);
      setCurrentChatId(chatId);
      setChatOpen(true);
    }
  };

  const ChatHistorySidebar = () => (
    <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <button onClick={() => setSidebarOpen(false)} className="sidebar-close">
          <FiX />
        </button>
        <h3>Chat History</h3>
        <button onClick={startNewChat} className="new-chat-btn">
          <FiMessageSquare /> New Chat
        </button>
      </div>
      <div className="chat-list">
        {chatHistory.map(chat => (
          <div
            key={chat.id}
            className={`chat-item ${currentChatId === chat.id ? 'active' : ''}`}
            onClick={() => loadChat(chat.id)}
          >
            <FiMessageSquare className="chat-icon" />
            <div className="chat-info">
              <h4>{chat.title}</h4>
              <p>{new Date(chat.updatedAt).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className={`app-container ${darkMode ? "dark" : ""}`}>
      <ChatHistorySidebar />

      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="sidebar-toggle-btn"
          aria-label="Open chat history"
        >
          <FiMenu />
        </button>
      )}

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
            <Link to="/login" className="nav-btn">
              <FiLogIn /> Login
            </Link>
            <Link to="/signup" className="register-btn">
              <FiUserPlus /> Signup
            </Link>
          </div>
        </nav>
      </header>

      {/* ✅ Disclaimer Banner */}
<div className="disclaimer-banner">
  ⚠️ Disclaimer: MindMesh is an AI assistant, not a licensed professional.  
  If you are in crisis or experiencing an emergency, please seek immediate help from a doctor or call local emergency services.
</div>

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
                <button onClick={startNewChat} className="start-chat">
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
        <button onClick={startNewChat} className="floating-btn" aria-label="Open chat">
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

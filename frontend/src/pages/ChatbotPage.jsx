import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageTransition from '../components/shared/PageTransition'

export default function ChatbotPage() {
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'Hi there! I am sumiX ai. How can I help you today?' }
  ])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim()) {
      setMessages([...messages, { id: Date.now(), sender: 'user', text: message }])
      setMessage('')
      
      // Simulate bot response
      setTimeout(() => {
        setMessages(prev => [...prev, { id: Date.now(), sender: 'bot', text: 'I am a simulated assistant. I cannot process your request yet!' }])
      }, 1000)
    }
  }

  return (
    <PageTransition>
      <div className="chatbot-page">
        <div className="chat-container">
          <div className="chat-header">
            <div className="chat-avatar">
              <div className="mini-eye left" />
              <div className="mini-eye right" />
            </div>
            <div className="header-info">
              <h2>sumiX ai</h2>
              <span className="status">Online</span>
            </div>
            <button className="close-btn" onClick={() => navigate('/insights')} aria-label="Close">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          <div className="chat-body">
            {messages.map(msg => (
              <div key={msg.id} className={`chat-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <form className="chat-input-area" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit" className="send-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syncopate:wght@400;700&display=swap');

        .chatbot-page {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: calc(100vh - 120px);
          padding: 2rem;
        }

        .chat-container {
          width: 100%;
          max-width: 800px;
          height: 70vh;
          background: rgba(18, 22, 33, 0.6);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(0, 238, 255, 0.2);
          border-radius: 24px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(0, 238, 255, 0.05);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .chat-header {
          display: flex;
          align-items: center;
          padding: 1.5rem 2rem;
          background: linear-gradient(to right, rgba(0, 238, 255, 0.1), transparent);
          border-bottom: 1px solid rgba(0, 238, 255, 0.1);
          gap: 1.2rem;
        }

        .chat-avatar {
          width: 48px;
          height: 48px;
          background: #fff;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          box-shadow: 0 0 15px rgba(0, 238, 255, 0.5);
        }

        .mini-eye {
          width: 8px;
          height: 8px;
          background: #111;
          border-radius: 50%;
        }

        .header-info h2 {
          margin: 0;
          font-family: 'Syncopate', sans-serif;
          font-size: 1.4rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: white;
          text-shadow: 0 0 8px rgba(0, 238, 255, 0.6), 0 0 16px rgba(0, 238, 255, 0.3);
        }

        .header-info .status {
          font-size: 0.85rem;
          color: #4AC9A0;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .header-info .status::before {
          content: '';
          display: block;
          width: 8px;
          height: 8px;
          background: #4AC9A0;
          border-radius: 50%;
          box-shadow: 0 0 8px #4AC9A0;
        }

        .close-btn {
          margin-left: auto;
          background: transparent;
          border: none;
          color: rgba(255,255,255,0.5);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem;
          transition: color 0.2s, transform 0.2s;
        }

        .close-btn:hover {
          color: white;
          transform: scale(1.1);
        }

        .chat-body {
          flex: 1;
          padding: 2rem;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .chat-message {
          padding: 1rem 1.4rem;
          border-radius: 16px;
          font-size: 1.05rem;
          max-width: 75%;
          line-height: 1.5;
          animation: slideUp 0.3s ease-out forwards;
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .chat-message.bot {
          align-self: flex-start;
          background: rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.9);
          border-bottom-left-radius: 4px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .chat-message.user {
          align-self: flex-end;
          background: linear-gradient(135deg, rgba(0, 238, 255, 0.2), rgba(138, 43, 226, 0.2));
          color: white;
          border-bottom-right-radius: 4px;
          border: 1px solid rgba(0, 238, 255, 0.3);
        }

        .chat-input-area {
          padding: 1.5rem 2rem;
          display: flex;
          gap: 1rem;
          border-top: 1px solid rgba(255,255,255,0.05);
          background: rgba(0,0,0,0.3);
        }

        .chat-input-area input {
          flex: 1;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          padding: 1rem 1.5rem;
          color: white;
          font-size: 1.05rem;
          outline: none;
          font-family: inherit;
          transition: all 0.3s;
        }

        .chat-input-area input:focus {
          border-color: rgba(0, 238, 255, 0.5);
          background: rgba(255, 255, 255, 0.08);
          box-shadow: 0 0 15px rgba(0, 238, 255, 0.1);
        }

        .send-btn {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background: linear-gradient(135deg, #00eeff, #8a2be2);
          border: none;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .send-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 0 20px rgba(0, 238, 255, 0.5);
        }
      `}</style>
    </PageTransition>
  )
}

// Simple implementation that sends ALL queries to EZilSQL API
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ChatBox.css';
import { sendMessage } from '../config/ezilsqlConfig';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [chatboxHeight] = useState(500); // Fixed: removed unused setter
  const messagesContainerRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  const handlePortalNavigation = (url, title) => {
    try {
      console.log('🧭 Navigating to portal URL:', url);
      
      if (url.startsWith('/?action=')) {
        const action = url.replace('/?action=', '');
        console.log('🎯 Extracted action:', action);
        navigate(`/?action=${action}`);
        
        const successMessage = {
          id: Date.now(),
          text: `🏠 Successfully navigated to **${title}**!`,
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, successMessage]);
      }
      
    } catch (error) {
      console.error('Navigation error:', error);
      const errorMessage = {
        id: Date.now(),
        text: `❌ Sorry, I couldn't navigate to the ${title} page. Error: ${error.message}`,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    if (!isExpanded) setIsExpanded(true);

    const currentInput = inputText.trim();
    const newMessage = {
      id: Date.now(),
      text: currentInput,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      console.log('🚀 ========== SENDING TO EZILSQL API ==========');
      console.log('📝 User Input:', currentInput);
      console.log('🔗 API Endpoint:', process.env.REACT_APP_EZILSQL_API_URL);
      
      const conversationHistory = messages.slice(-8).map(msg => ({
        role: msg.sender === 'bot' ? 'assistant' : 'user',
        content: msg.text
      }));

      console.log('📡 Making API call to EZilSQL...');
      const apiResponse = await sendMessage(currentInput, conversationHistory);
      console.log('✅ EZilSQL API Response:', apiResponse);

      const botResponse = {
        id: Date.now() + 1,
        text: apiResponse.response,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);

      if (apiResponse.isPortalNavigation && apiResponse.portalUrl) {
        console.log('🎯 Portal navigation detected, URL:', apiResponse.portalUrl);
        
        setTimeout(() => {
          console.log('🚀 Auto-navigating to:', apiResponse.portalUrl);
          handlePortalNavigation(apiResponse.portalUrl, 'Portal Page');
          
          const navMessage = {
            id: Date.now() + 2,
            text: `🚀 Opening the page for you...`,
            sender: 'bot',
            timestamp: new Date()
          };
          setMessages(prev => [...prev, navMessage]);
        }, 1000);
      }

      setIsConnected(true);
      console.log('✅ ========== PROCESSING COMPLETE ==========');

    } catch (error) {
      console.error('❌ Error processing message:', error);
      
      const errorMessage = {
        id: Date.now() + 1,
        text: `❌ Sorry, I'm experiencing technical difficulties. Please try again later.\n\nError: ${error.message}`,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsConnected(false);
    } finally {
      setIsTyping(false);
    }
  };

  const toggleChat = () => {
    setIsExpanded(!isExpanded);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <div className={`chatbox-container ${isExpanded ? 'expanded' : ''}`}>
      {isExpanded && (
        <div 
          className="chat-window"
          style={{
            height: `${chatboxHeight}px`,
            maxHeight: `calc(100vh - 2rem)`
          }}
        >
          <div className="chat-header">
            <div className="header-content">
              <h3>EZil Agent</h3>
              <div className="connection-status">
                <span className={`status-indicator ${isConnected ? 'connected' : 'disconnected'}`}></span>
                <span className="status-text">{isConnected ? 'Connected' : 'Disconnected'}</span>
              </div>
            </div>
            <div className="header-buttons">
              <button 
                onClick={() => setMessages([])}
                className="new-chat-button"
                title="New Chat (Clear Messages)"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
              <button onClick={toggleChat} className="close-button" aria-label="Close chat">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          </div>

          <div 
            className="messages-container" 
            ref={messagesContainerRef}
            style={{ 
              maxHeight: `${chatboxHeight - 150}px`,
              height: 'auto'
            }}
          >
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.sender}`}>
                <div className="message-avatar">
                  {message.sender === 'bot' ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="3" fill="currentColor"/>
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  )}
                </div>
                <div className="message-content">
                  <div className="message-text">
                    {message.text.split('\n').map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < message.text.split('\n').length - 1 && <br />}
                      </span>
                    ))}
                  </div>
                  <div className="message-time">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="message bot">
                <div className="message-avatar">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="3" fill="currentColor"/>
                  </svg>
                </div>
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSendMessage} className="input-form">
            <div className="input-wrapper">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={isConnected ? "Ask me anything..." : "Connection issues - please try again..."}
                className="chat-input"
                disabled={isTyping}
              />
              <button 
                type="button" 
                onClick={toggleChat} 
                className="expand-button"
                aria-label="Collapse chat"
              >
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none"
                  className="expand-arrow expanded"
                >
                  <path 
                    d="M7 14l5-5 5 5" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button 
                type="submit" 
                className="send-button"
                disabled={isTyping || !inputText.trim()}
                aria-label="Send message"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}

      {!isExpanded && (
        <div className="chat-toggle" onClick={toggleChat}>
          <div className="chat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="notification-badge">💬</div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
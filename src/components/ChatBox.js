// Simple implementation that sends ALL queries to EZilSQL API
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ChatBox.css';
import { sendMessage } from '../config/ezilsqlConfig';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [showFullChat, setShowFullChat] = useState(false); // New state for full chat window
  const [isTyping, setIsTyping] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [chatboxHeight] = useState(500); // Fixed: removed unused setter
  const messagesContainerRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Helper function to balance braces in mathematical expressions
  const balanceBraces = (text) => {
    let depth = 0;
    let result = '';
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (char === '{') depth++;
      if (char === '}') depth--;
      result += char;
    }
    // Add missing closing braces
    while (depth > 0) {
      result += '}';
      depth--;
    }
    return result;
  };

  // Helper function to clean up nested mathematical expressions
  const cleanMathExpression = (text) => {
    return text
      // Remove excessive whitespace in math
      .replace(/\s+/g, ' ')
      // Clean up double braces
      .replace(/\{\{/g, '{').replace(/\}\}/g, '}')
      // Fix common LaTeX formatting issues
      .replace(/\s*\^\s*/g, '^').replace(/\s*_\s*/g, '_')
      // Ensure proper spacing around operators
      .replace(/([+\-=<>≤≥≠≈])(?!\s)/g, '$1 ')
      .replace(/(?<!\s)([+\-=<>≤≥≠≈])/g, ' $1');
  };

  // Comprehensive function to render mathematical expressions and formatting
  const renderMessageText = (text) => {
    // Pre-process the text to handle edge cases
    let processedText = balanceBraces(text);
    
    processedText = processedText
      // Handle display math blocks \[...\] (multiline equations)
      .replace(/\\?\\\[(.*?)\\?\\\]/gs, (match, content) => {
        const cleanContent = cleanMathExpression(content);
        return `<div class="math-display">${cleanContent}</div>`;
      })
      // Handle inline math expressions \(...\)
      .replace(/\\?\\\((.*?)\\?\\\)/g, (match, content) => {
        const cleanContent = cleanMathExpression(content);
        return `<span class="math-inline">${cleanContent}</span>`;
      })
      
      // Advanced Mathematical Expressions
      // Handle fractions with nested expressions (improved regex)
      .replace(/\\frac\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}/g, 
        (match, num, den) => {
          const cleanNum = cleanMathExpression(num);
          const cleanDen = cleanMathExpression(den);
          return `<span class="fraction"><span class="numerator">${cleanNum}</span><span class="fraction-line"></span><span class="denominator">${cleanDen}</span></span>`;
        })
      
      // Handle square roots
      .replace(/\\sqrt\{([^}]+)\}/g, '<span class="sqrt">√<span class="sqrt-content">$1</span></span>')
      .replace(/\\sqrt\[([^\]]+)\]\{([^}]+)\}/g, '<span class="nth-root"><sup class="root-index">$1</sup>√<span class="sqrt-content">$2</span></span>')
      
      // Handle summations and integrals
      .replace(/\\sum_\{([^}]+)\}\^\{([^}]+)\}/g, '<span class="summation">∑<sub class="sum-lower">$1</sub><sup class="sum-upper">$2</sup></span>')
      .replace(/\\sum_\{([^}]+)\}/g, '<span class="summation">∑<sub class="sum-lower">$1</sub></span>')
      .replace(/\\sum\^\{([^}]+)\}/g, '<span class="summation">∑<sup class="sum-upper">$1</sup></span>')
      .replace(/\\prod_\{([^}]+)\}\^\{([^}]+)\}/g, '<span class="summation">∏<sub class="sum-lower">$1</sub><sup class="sum-upper">$2</sup></span>')
      .replace(/\\int_\{([^}]+)\}\^\{([^}]+)\}/g, '<span class="integral">∫<sub class="int-lower">$1</sub><sup class="int-upper">$2</sup></span>')
      .replace(/\\int/g, '<span class="integral">∫</span>')
      
      // Handle limits
      .replace(/\\lim_\{([^}]+)\\to([^}]+)\}/g, '<span class="limit">lim<sub class="limit-sub">$1→$2</sub></span>')
      .replace(/\\lim_\{([^}]+)\}/g, '<span class="limit">lim<sub class="limit-sub">$1</sub></span>')
      
      // Handle common functions
      .replace(/\\sin/g, 'sin').replace(/\\cos/g, 'cos').replace(/\\tan/g, 'tan')
      .replace(/\\sec/g, 'sec').replace(/\\csc/g, 'csc').replace(/\\cot/g, 'cot')
      .replace(/\\log/g, 'log').replace(/\\ln/g, 'ln').replace(/\\exp/g, 'exp')
      .replace(/\\arcsin/g, 'arcsin').replace(/\\arccos/g, 'arccos').replace(/\\arctan/g, 'arctan')
      
      // Handle superscripts and subscripts (enhanced for nested expressions)
      .replace(/([a-zA-Z0-9()])\^(\{[^}]+\}|\{[^}]*\{[^}]*\}[^}]*\}|[^{\s]+)/g, '$1<sup>$2</sup>')
      .replace(/([a-zA-Z0-9()])_(\{[^}]+\}|\{[^}]*\{[^}]*\}[^}]*\}|[^{\s]+)/g, '$1<sub>$2</sub>')
      .replace(/\^(\{[^}]+\}|\{[^}]*\{[^}]*\}[^}]*\}|[^{\s]+)/g, '<sup>$1</sup>')
      .replace(/_(\{[^}]+\}|\{[^}]*\{[^}]*\}[^}]*\}|[^{\s]+)/g, '<sub>$1</sub>')
      
      // Clean up braces in super/subscripts
      .replace(/<(sup|sub)>\{([^}]+)\}<\/(sup|sub)>/g, '<$1>$2</$3>')
      
      // Handle text within math environments
      .replace(/\\text\{([^}]+)\}/g, '<span class="math-text">$1</span>')
      .replace(/\\mathrm\{([^}]+)\}/g, '<span class="math-text">$1</span>')
      
      // Mathematical symbols (comprehensive)
      .replace(/\\times/g, '×').replace(/\\cdot/g, '⋅').replace(/\\div/g, '÷')
      .replace(/\\pm/g, '±').replace(/\\mp/g, '∓')
      .replace(/\\leq/g, '≤').replace(/\\geq/g, '≥').replace(/\\neq/g, '≠')
      .replace(/\\approx/g, '≈').replace(/\\equiv/g, '≡').replace(/\\cong/g, '≅')
      .replace(/\\propto/g, '∝').replace(/\\infty/g, '∞')
      .replace(/\\partial/g, '∂').replace(/\\nabla/g, '∇')
      .replace(/\\angle/g, '∠').replace(/\\perp/g, '⊥')
      .replace(/\\parallel/g, '∥').replace(/\\subset/g, '⊂').replace(/\\supset/g, '⊃')
      .replace(/\\in/g, '∈').replace(/\\notin/g, '∉').replace(/\\cup/g, '∪').replace(/\\cap/g, '∩')
      
      // Greek letters (comprehensive)
      .replace(/\\alpha/g, 'α').replace(/\\beta/g, 'β').replace(/\\gamma/g, 'γ')
      .replace(/\\delta/g, 'δ').replace(/\\epsilon/g, 'ε').replace(/\\varepsilon/g, 'ɛ')
      .replace(/\\zeta/g, 'ζ').replace(/\\eta/g, 'η').replace(/\\theta/g, 'θ')
      .replace(/\\vartheta/g, 'ϑ').replace(/\\iota/g, 'ι').replace(/\\kappa/g, 'κ')
      .replace(/\\lambda/g, 'λ').replace(/\\mu/g, 'μ').replace(/\\nu/g, 'ν')
      .replace(/\\xi/g, 'ξ').replace(/\\pi/g, 'π').replace(/\\varpi/g, 'ϖ')
      .replace(/\\rho/g, 'ρ').replace(/\\varrho/g, 'ϱ').replace(/\\sigma/g, 'σ')
      .replace(/\\varsigma/g, 'ς').replace(/\\tau/g, 'τ').replace(/\\upsilon/g, 'υ')
      .replace(/\\phi/g, 'φ').replace(/\\varphi/g, 'ϕ').replace(/\\chi/g, 'χ')
      .replace(/\\psi/g, 'ψ').replace(/\\omega/g, 'ω')
      .replace(/\\Delta/g, 'Δ').replace(/\\Gamma/g, 'Γ').replace(/\\Lambda/g, 'Λ')
      .replace(/\\Sigma/g, 'Σ').replace(/\\Phi/g, 'Φ').replace(/\\Psi/g, 'Ψ')
      .replace(/\\Omega/g, 'Ω').replace(/\\Theta/g, 'Θ').replace(/\\Xi/g, 'Ξ')
      .replace(/\\Pi/g, 'Π').replace(/\\Upsilon/g, 'Υ')
      
      // Handle common formatting
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/__(.*?)__/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      .replace(/_([^_]+)_/g, '<em>$1</em>')
      
      // Handle code formatting
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      
      // Handle arrows and logical symbols
      .replace(/\\rightarrow/g, '→').replace(/\\leftarrow/g, '←')
      .replace(/\\uparrow/g, '↑').replace(/\\downarrow/g, '↓')
      .replace(/\\leftrightarrow/g, '↔').replace(/\\updownarrow/g, '↕')
      .replace(/\\Rightarrow/g, '⇒').replace(/\\Leftarrow/g, '⇐')
      .replace(/\\Leftrightarrow/g, '⇔').replace(/\\Updownarrow/g, '⇕')
      .replace(/\\iff/g, '⟺').replace(/\\implies/g, '⟹')
      
      // Handle special spacing and alignment
      .replace(/\\\\/g, '<br/>')  // Line breaks in math
      .replace(/\\quad/g, '&nbsp;&nbsp;&nbsp;&nbsp;')  // Quad space
      .replace(/\\qquad/g, '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;')  // Double quad
      .replace(/\\,/g, '&thinsp;')  // Thin space
      .replace(/\\;/g, '&nbsp;')   // Medium space
      
      // Clean up remaining LaTeX delimiters
      .replace(/\\\[/g, '').replace(/\\\]/g, '')
      .replace(/\\\(/g, '').replace(/\\\)/g, '');

    return processedText;
  };

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
      
      // Clean the URL by removing extra spaces and normalizing
      const cleanUrl = url.trim().replace(/\s+/g, '');
      console.log('🧹 Cleaned URL:', cleanUrl);
      
      if (cleanUrl.startsWith('/?action=') || cleanUrl.includes('?action=')) {
        // Extract action from the cleaned URL
        const actionMatch = cleanUrl.match(/\?action=([^&]+)/);
        if (actionMatch) {
          const action = actionMatch[1];
          console.log('🎯 Extracted action:', action);
          
          // Navigate to the URL
          const navigationUrl = `/?action=${action}`;
          console.log('🚀 Navigating to URL:', navigationUrl);
          navigate(navigationUrl);
          
          // Add a small delay to check if navigation worked
          setTimeout(() => {
            console.log('🔍 Current window location after navigation:', window.location.href);
            console.log('🔍 Current window search params:', window.location.search);
          }, 500);
          
          const successMessage = {
            id: Date.now(),
            text: `🏠 Successfully navigated to **${title || action}**!`,
            sender: 'bot',
            timestamp: new Date()
          };
          setMessages(prev => [...prev, successMessage]);
        } else {
          console.warn('⚠️ Could not extract action from URL:', cleanUrl);
        }
      } else {
        console.warn('⚠️ URL does not match expected format:', cleanUrl);
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

    // After first message, show full chat window
    if (!showFullChat) {
      setShowFullChat(true);
    }

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
    if (!isExpanded) {
      // First click: expand to show input only
      setIsExpanded(true);
    } else if (!showFullChat) {
      // If input is shown but no messages yet, collapse back to button
      setIsExpanded(false);
    } else {
      // If full chat is shown, toggle the full chat visibility
      setShowFullChat(!showFullChat);
    }
  };

  const toggleFullChat = () => {
    // Specifically for arrow button - toggle full chat window
    if (messages.length > 0) {
      setShowFullChat(!showFullChat);
    } else {
      // If no messages, just collapse to button
      setIsExpanded(false);
    }
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
        <>
          {/* Input Bar - Always shown when expanded */}
          <div className="chat-input-bar">
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
                  onClick={toggleFullChat} 
                  className="expand-button"
                  aria-label={showFullChat ? "Collapse chat" : (messages.length > 0 ? "Expand chat" : "Close input")}
                >
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none"
                    className={`expand-arrow ${showFullChat ? 'expanded' : ''}`}
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

          {/* Full Chat Window - Only shown after first message */}
          {showFullChat && (
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
                  <button onClick={toggleChat} className="close-button" aria-label="Toggle chat">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M7 14l5-5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
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
                            <span dangerouslySetInnerHTML={{ __html: renderMessageText(line) }} />
                            {i < message.text.split('\n').length - 1 && <br />}
                          </span>
                        ))}
                      </div>
                      <div className="message-time">
                        {message.timestamp.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: false })}
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
            </div>
          )}
        </>
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
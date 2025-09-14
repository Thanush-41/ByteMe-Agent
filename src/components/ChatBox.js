import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ChatBox.css';
import { sendMessage, testConnection, EZilSQLService } from '../config/ezilsqlConfig';
import { useAuth } from '../contexts/AuthContext';

const ChatBox = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [showDebug, setShowDebug] = useState(false);
  const [portalData, setPortalData] = useState(null);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const { currentUser } = useAuth();
  const navigate = useNavigate(); // React Router hook for navigation

  // Mapping function to convert portal URLs/names to action parameters
  const getActionFromUrl = (url) => {
    // Common mappings for portal pages
    const urlMappings = {
      // Attendance related
      'attendance': 'attendance',
      'attendence': 'attendance', // common typo
      'attandance': 'attendance', // common typo
      'pat-attendance': 'pat-attendance',
      
      // Timetable related
      'timetable': 'timetable',
      'time-table': 'timetable',
      'timetabel': 'timetable', // common typo
      
      // Exam related
      'cia-marks': 'cia-marks',
      'marks': 'cia-marks',
      'result': 'exam-result',
      'results': 'exam-result',
      'exam-registration': 'exam-registration',
      'admit-card': 'admit-card',
      
      // Course related
      'course-content': 'course-content',
      'course-registration': 'course-registration',
      'regular-courses': 'regular-courses',
      
      // Projects
      'project-selection': 'project-selection',
      'project-team': 'project-team',
      'project-work': 'project-work',
      
      // Other common pages
      'dashboard': 'dashboard',
      'academics': 'academics',
      'examinations': 'examinations',
      'upload-cvc': 'upload-cvc',
      'feedback': 'feedback',
      'payments': 'online-fees-payment',
      'fee': 'online-fees-payment',
      'fees': 'online-fees-payment'
    };

    // Normalize the URL/name
    const normalized = url.toLowerCase()
      .replace(/^\/+|\/+$/g, '') // Remove leading/trailing slashes
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/[^a-z0-9-]/g, ''); // Remove special characters

    return urlMappings[normalized] || normalized;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Initialize chat on component mount
  useEffect(() => {
    checkExistingSession();
    loadPortalData();
  }, [currentUser]);

  // Initialize chat for authenticated user
  const checkExistingSession = () => {
    if (currentUser) {
      const welcomeMessage = {
        id: Date.now(),
        text: `Welcome back, **${currentUser.name}**! 👋\n\nI'm your AI assistant for the student portal. I can help you with:\n• Course information and registration\n• Attendance queries\n• Exam schedules and results\n• Academic procedures\n• General student support\n\nWhat would you like to know today?`,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  };

  // Load portal data on component mount
  const loadPortalData = async () => {
    try {
      console.log('🔄 Loading portal data from /iare-portal-vector-search.json...');
      const response = await fetch('/iare-portal-vector-search.json');
      console.log('📡 Fetch response status:', response.status, response.statusText);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('📄 Raw data received:', data);
      setPortalData(data);
      console.log('✅ Portal search data loaded:', data.documents?.length || 0, 'documents');
    } catch (error) {
      console.error('❌ Failed to load portal data:', error);
      console.error('❌ Error details:', error.message);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  // Portal search function
  const searchPortalData = (query) => {
    console.log('🔍 searchPortalData called with query:', query);
    console.log('🔍 Portal data state:', portalData);
    
    if (!portalData || !portalData.documents) {
      console.log('❌ No portal data available');
      return [];
    }

    console.log('📊 Portal data has', portalData.documents.length, 'documents');

    const searchTerm = query.toLowerCase().trim();
    if (searchTerm.length < 2) {
      console.log('❌ Search term too short:', searchTerm);
      return [];
    }

    console.log('🔍 Searching for term:', searchTerm);

    // Helper function for fuzzy matching
    const fuzzyMatch = (text, term) => {
      const textLower = text.toLowerCase();
      const termLower = term.toLowerCase();
      
      // Exact match
      if (textLower.includes(termLower)) return true;
      
      // Common typos and variations
      const typoCorrections = {
        'attendence': 'attendance',
        'attandance': 'attendance',
        'atendance': 'attendance',
        'timetabel': 'timetable',
        'time table': 'timetable',
        'marksheet': 'marks',
        'mark sheet': 'marks',
        'results': 'result',
        'exams': 'exam',
        'examination': 'exam',
        'fees': 'fee',
        'payment': 'fee'
      };
      
      // Check if the search term is a common typo
      const correctedTerm = typoCorrections[termLower];
      if (correctedTerm && textLower.includes(correctedTerm)) {
        console.log('📝 Typo correction:', termLower, '→', correctedTerm);
        return true;
      }
      
      // Check if any word in the text matches the term (partial matching)
      const words = textLower.split(/\s+/);
      return words.some(word => word.includes(termLower) || termLower.includes(word));
    };

    const results = portalData.documents.filter(doc => {
      // Search in keywords with fuzzy matching
      const keywordMatch = doc.keywords.some(keyword => 
        fuzzyMatch(keyword, searchTerm) || fuzzyMatch(searchTerm, keyword)
      );

      // Search in title with fuzzy matching
      const titleMatch = fuzzyMatch(doc.title, searchTerm);

      // Search in description with fuzzy matching
      const descriptionMatch = fuzzyMatch(doc.description, searchTerm);

      // Search in searchable text with fuzzy matching
      const searchableTextMatch = fuzzyMatch(doc.searchable_text, searchTerm);

      const matches = keywordMatch || titleMatch || descriptionMatch || searchableTextMatch;
      
      if (matches) {
        console.log('✅ Found match:', doc.title, '- Keywords:', doc.keywords);
      }

      return matches;
    });

    console.log('🎯 Search results:', results.length, 'matches found');
    if (results.length > 0) {
      console.log('📋 Top result:', results[0].title);
    }

    // Sort by relevance (title matches first, then keyword matches, then others)
    return results.sort((a, b) => {
      const aTitle = a.title.toLowerCase().includes(searchTerm);
      const bTitle = b.title.toLowerCase().includes(searchTerm);
      const aKeyword = a.keywords.some(k => k.toLowerCase().includes(searchTerm));
      const bKeyword = b.keywords.some(k => k.toLowerCase().includes(searchTerm));

      if (aTitle && !bTitle) return -1;
      if (!aTitle && bTitle) return 1;
      if (aKeyword && !bKeyword) return -1;
      if (!aKeyword && bKeyword) return 1;
      return 0;
    });
  };

  // Format portal search results for display with interactive navigation
  const formatPortalResults = (results, includeNavigation = true) => {
    if (results.length === 0) {
      return null;
    }

    const maxResults = 3; // Limit to top 3 results for cleaner display
    const topResults = results.slice(0, maxResults);
    
    let response = `🔍 **I found ${results.length} relevant portal page${results.length > 1 ? 's' : ''}:**\n\n`;
    
    topResults.forEach((result, index) => {
      response += `${index + 1}. **${result.title}**\n`;
      response += `   📝 ${result.description}\n`;
      if (includeNavigation) {
        response += `   🌐 Would you like me to open this page?\n`;
      } else {
        response += `   🔗 URL: ${result.url}\n`;
      }
      response += `\n`;
    });

    if (results.length > maxResults) {
      response += `... and ${results.length - maxResults} more result${results.length - maxResults > 1 ? 's' : ''}\n\n`;
    }

    return response;
  };

  // Handle navigation button clicks
  const handleNavigationButtonClick = (action, navData) => {
    if (action === 'continue') {
      handlePortalNavigation(navData.url, navData.title);
      
      // Add confirmation message
      const confirmMessage = {
        id: Date.now(),
        text: `🚀 Opening **${navData.title}** page...`,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, confirmMessage]);
      
    } else if (action === 'cancel') {
      const cancelMessage = {
        id: Date.now(),
        text: "👍 No problem! Is there anything else I can help you with?",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, cancelMessage]);
    }
  };

  // Handle navigation to portal pages using React Router
  const handlePortalNavigation = (url, title) => {
    try {
      console.log(`🚀 Internal navigation to: ${url} (${title})`);
      
      // Extract the action parameter from the URL
      let actionParam = null;
      
      // Handle different URL formats
      if (url.includes('?action=')) {
        // URL like "/?action=attendance" or "/dashboard?action=attendance"
        const urlParams = new URLSearchParams(url.split('?')[1]);
        actionParam = urlParams.get('action');
      } else if (url.includes('action=')) {
        // URL like "action=attendance"
        actionParam = url.split('action=')[1].split('&')[0];
      } else {
        // Use the mapping function for other formats
        actionParam = getActionFromUrl(url);
      }
      
      if (actionParam && actionParam !== 'dashboard') {
        // Use React Router's navigate to change the URL and trigger internal navigation
        navigate(`/?action=${actionParam}`);
        console.log(`✅ Navigated to: /?action=${actionParam}`);
        
        // Add success message
        const successMessage = {
          id: Date.now(),
          text: `🎯 Successfully navigated to **${title}** page!`,
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, successMessage]);
        
      } else {
        // Navigate to dashboard
        navigate('/');
        console.log('✅ Navigated to dashboard');
        
        const successMessage = {
          id: Date.now(),
          text: `🏠 Successfully navigated to **Dashboard**!`,
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

  // Create interactive navigation buttons component
  const createNavigationButtons = (results) => {
    if (!results || results.length === 0) return null;
    
    const maxButtons = 3;
    const topResults = results.slice(0, maxButtons);
    
    return topResults.map((result, index) => (
      `[🌐 Open ${result.title}](javascript:void(0))`
    )).join(' | ');
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

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
      // Call EZilSQL service directly
      console.log('� Sending message to EZilSQL:', currentInput);
      
      // Get conversation history for context (last 8 messages)
      const conversationHistory = messages.slice(-8).map(msg => ({
        role: msg.sender === 'bot' ? 'assistant' : 'user',
        content: msg.text
      }));
      
      // Call EZilSQL service
      const apiResponse = await sendMessage(currentInput, conversationHistory);
      
      console.log('� EZilSQL response:', apiResponse);
      
      // Check if this is a portal navigation response
      if (apiResponse.isPortalNavigation && apiResponse.portalUrl) {
        console.log('🎯 Portal navigation detected, URL:', apiResponse.portalUrl);
        
        // Add the AI response first
        const botResponse = {
          id: Date.now() + 1,
          text: apiResponse.response,
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botResponse]);
        
        // Automatically navigate after a short delay to let the user see the response
        setTimeout(() => {
          console.log('🚀 Auto-navigating to:', apiResponse.portalUrl);
          handlePortalNavigation(apiResponse.portalUrl, 'Portal Page');
          
          // Add navigation confirmation message
          const navMessage = {
            id: Date.now() + 2,
            text: `🚀 Automatically opening the page for you...`,
            sender: 'bot',
            timestamp: new Date()
          };
          setMessages(prev => [...prev, navMessage]);
        }, 1500); // 1.5 second delay
        
      } else {
        // Regular response - no navigation
        const botResponse = {
          id: Date.now() + 1,
          text: apiResponse.response || 'Sorry, I could not process your request at the moment.',
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botResponse]);
      }
      
      setIsConnected(true); // Mark as connected if successful
      
    } catch (error) {
      console.error('Error getting AI response:', error);
      setIsConnected(false); // Mark as disconnected
      
      // Fallback response if API fails
      const fallbackResponse = {
        id: Date.now() + 1,
        text: "I apologize, but I'm experiencing technical difficulties connecting to the AI service. Please try again later, or contact support if the issue persists.",
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, fallbackResponse]);
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

  const testEZilSQLConnection = async () => {
    setIsTyping(true);
    console.log('🚀 Testing EZilSQL API connection...');
    
    try {
      const result = await testConnection();
      
      const message = {
        id: Date.now(),
        text: result.success 
          ? `🎉 EZilSQL API Connection SUCCESS!\n✅ Endpoint: ${process.env.REACT_APP_EZILSQL_API_URL}\n✅ Response: ${result.response.substring(0, 100)}${result.response.length > 100 ? '...' : ''}\n✅ Conversation ID: ${result.conversationId || 'New conversation'}`
          : `❌ EZilSQL API connection failed.\nError: ${result.error}\nEndpoint: ${process.env.REACT_APP_EZILSQL_API_URL}`,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, message]);
      setIsConnected(result.success);
    } catch (error) {
      const errorMessage = {
        id: Date.now(),
        text: `❌ EZilSQL API Test Error: ${error.message}`,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsConnected(false);
    }
    
    setIsTyping(false);
  };


  const resetConversation = async () => {
    setIsTyping(true);
    console.log('� Resetting EZilSQL conversation...');
    
    try {
      EZilSQLService.resetConversation();
      
      const message = {
        id: Date.now(),
        text: "🔄 Conversation reset successfully! Starting fresh conversation with EZilSQL API.",
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, message]);
    } catch (error) {
      const errorMessage = {
        id: Date.now(),
        text: `❌ Reset Error: ${error.message}`,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }
    
    setIsTyping(false);
  };

  const testNavigationResponse = async () => {
    setIsTyping(true);
    console.log('🧪 Testing navigation response...');
    
    try {
      const testMessage = "open my timetable";
      const result = await sendMessage(testMessage);
      
      const message = {
        id: Date.now(),
        text: `🧪 Navigation Test Result:\n📤 Test message: "${testMessage}"\n📥 Response: ${result.response.substring(0, 200)}${result.response.length > 200 ? '...' : ''}\n🔗 Portal URL: ${result.portalUrl || 'None'}\n🎯 Is Navigation: ${result.isPortalNavigation ? 'Yes' : 'No'}`,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, message]);
    } catch (error) {
      const errorMessage = {
        id: Date.now(),
        text: `❌ Navigation Test Error: ${error.message}`,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }
    
    setIsTyping(false);
  };

  const showAPIStatus = async () => {
    const message = {
      id: Date.now(),
      text: `🔧 **EZilSQL API Status:**\n\n🌐 Endpoint: ${process.env.REACT_APP_EZILSQL_API_URL}\n🔑 API Key: ${process.env.REACT_APP_EZILSQL_API_KEY ? '✅ Configured' : '❌ Missing'}\n📡 Connection: ${isConnected ? '✅ Connected' : '❌ Disconnected'}\n\n🔬 Use the test buttons below to verify functionality.`,
      sender: 'bot',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, message]);
  };

  const testInternalNavigation = async () => {
    setIsTyping(true);
    console.log('🧪 Testing internal navigation...');
    
    try {
      // Test navigation to attendance page
      const testUrl = "/?action=attendance";
      const testTitle = "Attendance";
      
      const message = {
        id: Date.now(),
        text: `🧪 **Navigation Test:**\n📍 Testing navigation to: ${testTitle}\n🔗 URL: ${testUrl}\n\n⏳ Navigating in 2 seconds...`,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, message]);
      
      // Navigate after a short delay
      setTimeout(() => {
        handlePortalNavigation(testUrl, testTitle);
      }, 2000);
      
    } catch (error) {
      const errorMessage = {
        id: Date.now(),
        text: `❌ Navigation Test Error: ${error.message}`,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }
    
    setIsTyping(false);
  };

  return (
    <div className="chatbox-container">
      {/* Expanded Chat Messages - only show when expanded */}
      {isExpanded && (
        <div className="chat-messages-container">
          {/* Debug Section - only show when expanded */}
          {isExpanded && (
            <div className="debug-section">
              <button onClick={testEZilSQLConnection} className="debug-button" disabled={isTyping}>
                🔧 Test EZilSQL Connection
              </button>
              <button onClick={resetConversation} className="debug-button" disabled={isTyping}>
                🔄 Reset Conversation
              </button>
              <button onClick={testNavigationResponse} className="debug-button" disabled={isTyping}>
                🧪 Test Navigation
              </button>
              <button onClick={testInternalNavigation} className="debug-button" disabled={isTyping}>
                🎯 Test Internal Navigation
              </button>
              <button onClick={showAPIStatus} className="debug-button" disabled={isTyping}>
                📊 API Status
              </button>
            </div>
          )}

          <div className="chatbox-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
              >
                {message.sender === 'bot' && (
                  <div className="message-avatar">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" fill="currentColor"/>
                    </svg>
                  </div>
                )}
                <div className="message-content">
                  <div className="message-text">{message.text}</div>
                  
                  {/* Navigation Buttons */}
                  {message.showNavigationButtons && message.pendingNavigation && (
                    <div className="navigation-buttons">
                      <button 
                        className="nav-button continue-btn"
                        onClick={() => handleNavigationButtonClick('continue', message.pendingNavigation)}
                      >
                        🚀 Continue
                      </button>
                      <button 
                        className="nav-button cancel-btn"
                        onClick={() => handleNavigationButtonClick('cancel', message.pendingNavigation)}
                      >
                        ❌ Cancel
                      </button>
                    </div>
                  )}
                  
                  <div className="message-time">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="message bot-message">
                <div className="message-avatar">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" fill="currentColor"/>
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
            <div ref={messagesEndRef} />
          </div>
        </div>
      )}

      {/* Main Input Bar - Always Visible */}
      <div className="chat-input-bar">
        <form onSubmit={handleSendMessage} className="input-form">
          <div className="input-wrapper">
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={isConnected ? "Ask me anything about your studies..." : "Connection issues - please try again..."}
              className="chat-input"
              disabled={isTyping}
            />
            <button 
              type="button" 
              onClick={toggleChat} 
              className="expand-button"
              aria-label={isExpanded ? "Collapse chat" : "Expand chat"}
            >
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none"
                className={`expand-arrow ${isExpanded ? 'expanded' : ''}`}
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
              className={`send-button ${!isConnected ? 'disconnected' : ''}`}
              disabled={!inputText.trim() || isTyping}
              aria-label="Send message"
            >
              {isTyping ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="spinning">
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path 
                    d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;
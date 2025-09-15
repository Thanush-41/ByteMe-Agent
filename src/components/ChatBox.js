import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ChatBox.css';
import { sendMessage, testConnection, EZilSQLService } from '../config/ezilsqlConfig';
import { useAuth } from '../contexts/AuthContext';
import ChatbotIntelligence from '../services/ChatbotIntelligence';
import NavigationService from '../services/NavigationService';
import PageDataService from '../services/PageDataService';

const ChatBox = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [showDebug, setShowDebug] = useState(false);
  const [portalData, setPortalData] = useState(null);
  const [chatboxHeight, setChatboxHeight] = useState(300); // Dynamic height state
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const messagesContainerRef = useRef(null);

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

  // Dynamic height calculation based on messages and screen size
  useEffect(() => {
    const calculateOptimalHeight = () => {
      if (!isExpanded || messages.length === 0) return;

      // Get viewport height
      const viewportHeight = window.innerHeight;
      
      // Calculate maximum allowed height (viewport height - 2rem from top - bottom margins)
      const remInPixels = parseFloat(getComputedStyle(document.documentElement).fontSize);
      const maxAllowedHeight = viewportHeight - (2 * remInPixels) - 120; // 120px for bottom margin and chatbox toggle button
      
      // Calculate minimum height
      const minHeight = 350;
      
      // Calculate content-based height
      let contentHeight = minHeight;
      
      if (messagesContainerRef.current) {
        // Get actual content height from the messages container
        const actualContentHeight = messagesContainerRef.current.scrollHeight;
        const headerHeight = 60; // Chat header
        const inputAreaHeight = 60; // Input area
        const debugPanelHeight = showDebug ? 80 : 0;
        const padding = 32; // Additional padding
        
        contentHeight = actualContentHeight + headerHeight + inputAreaHeight + debugPanelHeight + padding;
      } else {
        // Fallback calculation based on message count
        const estimatedMessageHeight = 80; // Average height per message in pixels
        const headerHeight = 60; 
        const inputAreaHeight = 60; 
        const debugPanelHeight = showDebug ? 80 : 0;
        
        contentHeight = (messages.length * estimatedMessageHeight) + headerHeight + inputAreaHeight + debugPanelHeight + 50;
      }
      
      // Use the smaller of content height or max allowed height, with minimum height
      const optimalHeight = Math.max(minHeight, Math.min(contentHeight, maxAllowedHeight));
      
      setChatboxHeight(optimalHeight);
    };

    // Use setTimeout to ensure DOM is updated before calculating
    const timer = setTimeout(calculateOptimalHeight, 100);
    
    // Recalculate on window resize
    const handleResize = () => {
      setTimeout(calculateOptimalHeight, 100);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [messages, isExpanded, showDebug]);

  // Handle navigation confirmation response
  const handleNavigationConfirm = (action, navigationAction, navigationLabel) => {
    if (action === 'confirm' || action === 'navigate') {
      const result = NavigationService.handleNavigationResponse('navigate', navigationAction, navigate);
      
      const confirmMessage = {
        id: Date.now(),
        text: result.message,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, confirmMessage]);
      
      // Log the navigation
      NavigationService.logNavigation(navigationAction, 'chat_confirmed', {
        userConfirmed: true
      });
      
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

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Auto-expand chatbox on first message
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
      // First, try to understand the query using ChatbotIntelligence
      console.log('🧠 Analyzing user query:', currentInput);
      const queryAnalysis = ChatbotIntelligence.analyzeQuery(currentInput);
      console.log('📊 Query analysis result:', queryAnalysis);
      
      // Generate intelligent response based on analysis
      const intelligentResponse = await ChatbotIntelligence.generateResponse(queryAnalysis);
      console.log('🤖 Generated intelligent response:', intelligentResponse);
      
      if (intelligentResponse.hasData || intelligentResponse.navigation || intelligentResponse.isGreeting) {
        // We have a good response from our intelligent system
        const botResponse = {
          id: Date.now() + 1,
          text: intelligentResponse.text,
          sender: 'bot',
          timestamp: new Date(),
          hasData: intelligentResponse.hasData,
          data: intelligentResponse.data,
          navigation: intelligentResponse.navigation
        };
        
        setMessages(prev => [...prev, botResponse]);
        
        // Handle navigation if suggested
        if (intelligentResponse.navigation) {
          if (intelligentResponse.navigation.immediate) {
            // Navigate immediately
            setTimeout(() => {
              const url = NavigationService.createNavigationUrl(intelligentResponse.navigation.action);
              navigate(url);
              NavigationService.logNavigation(intelligentResponse.navigation.action, 'chat_immediate', {
                query: currentInput,
                analysis: queryAnalysis
              });
              
              const navMessage = {
                id: Date.now() + 2,
                text: `🚀 Navigated to ${intelligentResponse.navigation.label}`,
                sender: 'bot',
                timestamp: new Date()
              };
              setMessages(prev => [...prev, navMessage]);
            }, 1000);
          } else if (intelligentResponse.navigation.suggested) {
            // Add navigation button directly without asking confirmation
            setTimeout(() => {
              const navButtonMessage = {
                id: Date.now() + 2,
                text: `✨ Here's your ${intelligentResponse.navigation.label.toLowerCase()} for more details:`,
                sender: 'bot',
                timestamp: new Date(),
                isNavigationConfirm: true,
                navigationAction: intelligentResponse.navigation.action,
                navigationLabel: intelligentResponse.navigation.label,
                showDirectButton: true
              };
              setMessages(prev => [...prev, navButtonMessage]);
            }, 500);
          }
        }
        
        setIsConnected(true);
        
      } else {
        // Fallback to external AI service if no intelligent response
        console.log('🔄 Falling back to EZilSQL service...');
        
        // Get conversation history for context (last 8 messages)
        const conversationHistory = messages.slice(-8).map(msg => ({
          role: msg.sender === 'bot' ? 'assistant' : 'user',
          content: msg.text
        }));
        
        // Call EZilSQL service
        const apiResponse = await sendMessage(currentInput, conversationHistory);
        console.log('🔗 EZilSQL response:', apiResponse);
        
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
          
          // Automatically navigate after a short delay
          setTimeout(() => {
            console.log('🚀 Auto-navigating to:', apiResponse.portalUrl);
            handlePortalNavigation(apiResponse.portalUrl, 'Portal Page');
            
            const navMessage = {
              id: Date.now() + 2,
              text: `🚀 Automatically opening the page for you...`,
              sender: 'bot',
              timestamp: new Date()
            };
            setMessages(prev => [...prev, navMessage]);
          }, 1500);
          
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
        
        setIsConnected(true);
      }
      
    } catch (error) {
      console.error('Error getting AI response:', error);
      setIsConnected(false);
      
      // Fallback response if everything fails
      const fallbackResponse = {
        id: Date.now() + 1,
        text: "I apologize, but I'm experiencing technical difficulties. However, I can still help you navigate to different pages. Try asking 'show my attendance' or 'open timetable'.",
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
    console.log('🔄 Resetting EZilSQL conversation...');
    
    try {
      const result = await EZilSQLService.resetConversation();
      
      const message = {
        id: Date.now(),
        text: result.success 
          ? `🔄 Conversation reset successfully!\n✅ New conversation ID: ${result.conversationId}`
          : `❌ Failed to reset conversation.\nError: ${result.error}`,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, message]);
      
      if (result.success) {
        setIsConnected(true);
      }
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

  return (
    <div className={`chatbox-container ${isExpanded ? 'expanded' : ''}`}>
      {/* Expanded Chat Window */}
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
                onClick={() => setShowDebug(!showDebug)}
                className="debug-button"
                title="Toggle Debug Options"
              >
                ⚙️
              </button>
              <button onClick={toggleChat} className="close-button" aria-label="Close chat">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Debug Panel */}
          {showDebug && (
            <div className="debug-panel">
              <h4>Debug Options</h4>
              <div className="debug-buttons">
                <button onClick={testEZilSQLConnection} className="debug-btn">
                  Test Connection
                </button>
                <button onClick={resetConversation} className="debug-btn">
                  Reset Conversation
                </button>
                <button onClick={() => setMessages([])} className="debug-btn">
                  Clear Chat
                </button>
              </div>
            </div>
          )}

          <div 
            className="messages-container" 
            ref={messagesContainerRef}
            style={{ 
              maxHeight: `${chatboxHeight - 120}px`, // Subtract header and input area heights
              height: 'auto'
            }}
          >
            {messages.map((message, index) => (
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
                  <div 
                    className="message-text"
                    dangerouslySetInnerHTML={{
                      __html: message.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>')
                    }}
                  />
                  {message.isNavigationConfirm && (
                    <div className="navigation-buttons" style={{ marginTop: '8px' }}>
                      {message.showDirectButton ? (
                        // Show single "Open" button without asking confirmation
                        <button 
                          className="nav-button primary"
                          onClick={() => handleNavigationConfirm('confirm', message.navigationAction, message.navigationLabel)}
                          style={{ 
                            padding: '8px 16px', 
                            border: 'none', 
                            borderRadius: '6px', 
                            backgroundColor: '#000', 
                            color: 'white', 
                            fontSize: '13px',
                            cursor: 'pointer',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                          }}
                        >
                          {message.navigationLabel}
                        </button>
                      ) : (
                        // Show confirmation buttons (Yes/No)
                        <>
                          <button 
                            className="nav-button primary"
                            onClick={() => handleNavigationConfirm('confirm', message.navigationAction, message.navigationLabel)}
                            style={{ 
                              padding: '6px 12px', 
                              marginRight: '8px', 
                              border: 'none', 
                              borderRadius: '4px', 
                              backgroundColor: '#3b82f6', 
                              color: 'white', 
                              fontSize: '12px',
                              cursor: 'pointer'
                            }}
                          >
                            Yes, open {message.navigationLabel}
                          </button>
                          <button 
                            className="nav-button secondary"
                            onClick={() => handleNavigationConfirm('cancel', message.navigationAction, message.navigationLabel)}
                            style={{ 
                              padding: '6px 12px', 
                              border: 'none', 
                              borderRadius: '4px', 
                              backgroundColor: '#e5e7eb', 
                              color: '#374151', 
                              fontSize: '12px',
                              cursor: 'pointer'
                            }}
                          >
                            No, thanks
                          </button>
                        </>
                      )}
                    </div>
                  )}
                  <div className="message-timestamp">
                    {new Date(message.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
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
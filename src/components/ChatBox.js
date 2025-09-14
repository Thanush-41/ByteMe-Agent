import React, { useState, useRef, useEffect } from 'react';
import './ChatBox.css';
import { sendMessage, testConnection } from '../config/azureConfigNew';
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

  // Handle navigation to portal pages
  const handlePortalNavigation = (url, title) => {
    try {
      // Convert relative URL to full URL with the correct portal base URL
      const baseUrl = 'http://localhost:3000'; // Your portal base URL
      const fullUrl = url.startsWith('/') ? `${baseUrl}${url}` : url;
      
      console.log(`🚀 Navigating to: ${fullUrl}`);
      
      // Open in the same tab (similar to Copilot behavior)
      window.location.href = fullUrl;
      
    } catch (error) {
      console.error('Navigation error:', error);
      const errorMessage = {
        id: Date.now(),
        text: `❌ Sorry, I couldn't open the ${title} page. You can manually navigate to: ${url}`,
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
      // Step 1: Search portal data first
      console.log('🔍 Searching portal data for:', currentInput);
      const portalResults = searchPortalData(currentInput);
      
      // Step 2: Check if this looks like a navigation request
      const navigationKeywords = ['go to', 'open', 'navigate to', 'show me', 'take me to', 'visit'];
      const directPageKeywords = [
        'timetable', 'time table', 'timetabel',
        'attendance', 'attendence', 'attandance', 'atendance', 
        'marks', 'marksheet', 'mark sheet', 'result', 'results',
        'exam', 'exams', 'examination', 'fee', 'fees', 'payment',
        'course', 'registration', 'project', 'upload', 'feedback'
      ];
      
      const hasNavigationKeyword = navigationKeywords.some(keyword => 
        currentInput.toLowerCase().includes(keyword)
      );
      
      const isDirectPageRequest = directPageKeywords.some(keyword => 
        currentInput.toLowerCase().includes(keyword)
      );
      
      const isNavigationRequest = hasNavigationKeyword || (isDirectPageRequest && portalResults.length > 0);
      
      console.log('🔍 Portal results found:', portalResults.length);
      console.log('🔍 Has navigation keyword:', hasNavigationKeyword);
      console.log('🔍 Is direct page request:', isDirectPageRequest);
      console.log('🔍 Final navigation decision:', isNavigationRequest);
      console.log('🔍 Input:', currentInput);
      
      if (portalResults.length > 0 && isNavigationRequest) {
        // This is a direct navigation request - offer Copilot-style continue/cancel
        const topResult = portalResults[0];
        
        console.log('🎯 Creating navigation prompt for:', topResult.title);
        
        const navigationPrompt = {
          id: Date.now() + 1,
          text: `🎯 I found the **${topResult.title}** page!\n\n📝 ${topResult.description}\n\n🤔 Would you like me to open this page for you?`,
          sender: 'bot',
          timestamp: new Date(),
          showNavigationButtons: true,
          pendingNavigation: {
            url: topResult.url,
            title: topResult.title
          }
        };
        
        console.log('📨 Adding navigation message:', navigationPrompt);
        setMessages(prev => [...prev, navigationPrompt]);
        setIsTyping(false);
        return;
      }
      
      // Step 3: For regular queries, provide AI response with portal context
      const portalResultsText = formatPortalResults(portalResults, false);
      let contextualPrompt = currentInput;
      let portalContext = '';
      
      if (portalResults.length > 0) {
        portalContext = `\n\nRelevant portal information:\n${portalResults.slice(0, 3).map(r => 
          `- ${r.title}: ${r.description} (URL: ${r.url})`
        ).join('\n')}`;
        
        contextualPrompt = `User query: ${currentInput}${portalContext}\n\nPlease provide a helpful response that references the relevant portal pages above when appropriate.`;
      }

      // Get conversation history for context (last 8 messages to leave room for portal context)
      const conversationHistory = messages.slice(-8).map(msg => ({
        role: msg.sender === 'bot' ? 'assistant' : 'user',
        content: msg.text
      }));
      
      // Call Azure OpenAI service with enhanced context
      const aiResponse = await sendMessage(contextualPrompt, conversationHistory);
      
      // Step 3: Combine portal results with AI response
      let finalResponse = '';
      
      if (portalResultsText) {
        finalResponse = portalResultsText + '\n---\n\n🤖 **AI Assistant Response:**\n' + aiResponse;
      } else {
        finalResponse = aiResponse;
      }
      
      const botResponse = {
        id: Date.now() + 1,
        text: finalResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsConnected(true); // Mark as connected if successful
    } catch (error) {
      console.error('Error getting AI response:', error);
      setIsConnected(false); // Mark as disconnected
      
      // Fallback response if Azure AI fails
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

  const testAzureConnection = async () => {
    setIsTyping(true);
    console.log('🚀 Testing Azure OpenAI gpt-4.1 deployment...');
    
    try {
      const result = await testConnection();
      
      const message = {
        id: Date.now(),
        text: result.success 
          ? `🎉 Azure OpenAI gpt-4.1 SUCCESS!\n✅ Deployment: gpt-4.1\n✅ Endpoint: ${process.env.REACT_APP_AZURE_ENDPOINT}\n✅ Response: ${result.response.substring(0, 100)}${result.response.length > 100 ? '...' : ''}`
          : `❌ Azure OpenAI gpt-4.1 test failed.\nError: ${result.error}\nEndpoint: ${process.env.REACT_APP_AZURE_ENDPOINT}\nDeployment: gpt-4.1`,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, message]);
      setIsConnected(result.success);
    } catch (error) {
      const errorMessage = {
        id: Date.now(),
        text: `❌ Azure OpenAI Test Error: ${error.message}`,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsConnected(false);
    }
    
    setIsTyping(false);
  };

  const runDiscovery = async () => {
    // Placeholder function - Azure discovery temporarily disabled
    const message = {
      id: Date.now(),
      text: "🔍 Azure discovery is temporarily disabled. Use the 'Test Azure Connection' button to test the gpt-4.1 deployment.",
      sender: 'bot',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, message]);
  };

  const testAzureFoundryAgent = async () => {
    setIsTyping(true);
    console.log('🚀 Testing Azure OpenAI gpt-4.1 deployment...');
    
    try {
      const result = await testConnection();
      
      const message = {
        id: Date.now(),
        text: result.success 
          ? `🎉 Azure OpenAI gpt-4.1 SUCCESS!\n✅ Deployment: gpt-4.1\n✅ Endpoint: ${process.env.REACT_APP_AZURE_ENDPOINT}\n✅ Response: ${result.response.substring(0, 100)}${result.response.length > 100 ? '...' : ''}`
          : `❌ Azure OpenAI gpt-4.1 test failed.\nError: ${result.error}\nEndpoint: ${process.env.REACT_APP_AZURE_ENDPOINT}\nDeployment: gpt-4.1`,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, message]);
      setIsConnected(result.success);
    } catch (error) {
      const errorMessage = {
        id: Date.now(),
        text: `❌ Foundry Agent Test Error: ${error.message}`,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsConnected(false);
    }
    
    setIsTyping(false);
  };

  const testAIProjects = async () => {
    // Placeholder function - AI Projects testing temporarily disabled
    const message = {
      id: Date.now(),
      text: "🤖 AI Projects testing is temporarily disabled. The working gpt-4.1 deployment is already configured and ready to use!",
      sender: 'bot',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, message]);
  };

  return (
    <div className="chatbox-container">
      {/* Expanded Chat Messages - only show when expanded */}
      {isExpanded && (
        <div className="chat-messages-container">
          {/* Debug Section - only show when expanded */}
          {isExpanded && (
            <div className="debug-section">
              <button onClick={testAzureConnection} className="debug-button" disabled={isTyping}>
                🔧 Test Azure Connection
              </button>
              <button onClick={testAzureFoundryAgent} className="debug-button" disabled={isTyping}>
                🤖 Test Foundry Agent
              </button>
              <button onClick={runDiscovery} className="debug-button" disabled={isTyping}>
                🔍 Discover Azure Resources
              </button>
              <button onClick={testAIProjects} className="debug-button" disabled={isTyping}>
                🤖 Test AI Projects
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
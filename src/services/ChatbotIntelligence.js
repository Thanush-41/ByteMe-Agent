/**
 * ChatbotIntelligence - Service to understand user queries and provide intelligent responses
 * This service analyzes user input, determines intent, and provides appropriate responses
 * with data access and navigation capabilities.
 */

import PageDataService from './PageDataService';

class ChatbotIntelligence {
  
  /**
   * Intent patterns to understand user queries
   */
  static intentPatterns = {
    attendance: {
      keywords: ['attendance', 'present', 'absent', 'classes', 'attendence', 'attandance'],
      queries: ['my attendance', 'attendance percentage', 'how many classes', 'attendance status'],
      responses: {
        general: 'Let me check your attendance information.',
        specific: 'Here are your attendance details.'
      },
      actions: ['attendance', 'pat-attendance']
    },
    
    examResults: {
      keywords: ['marks', 'result', 'results', 'exam', 'grade', 'scores', 'cgpa', 'sgpa'],
      queries: ['my marks', 'exam results', 'my grades', 'semester results'],
      responses: {
        general: 'I\'ll get your exam results for you.',
        specific: 'Here are your latest exam results.'
      },
      actions: ['exam-result', 'cia-marks']
    },
    
    timetable: {
      keywords: ['timetable', 'schedule', 'time table', 'class schedule', 'today schedule', 'next class'],
      queries: ['my timetable', 'class schedule', 'what is my next class', 'today schedule'],
      responses: {
        general: 'Let me show you your class schedule.',
        specific: 'Here\'s your timetable information.'
      },
      actions: ['timetable']
    },
    
    ciaMarks: {
      keywords: ['cia', 'internal', 'assessment', 'cia marks', 'internal marks'],
      queries: ['cia marks', 'internal assessment', 'my cia', 'internal marks'],
      responses: {
        general: 'I\'ll check your CIA marks.',
        specific: 'Here are your CIA assessment details.'
      },
      actions: ['cia-marks']
    },
    
    courseRegistration: {
      keywords: ['course', 'registration', 'subjects', 'credits', 'enroll', 'register'],
      queries: ['course registration', 'my courses', 'registered subjects', 'course credits'],
      responses: {
        general: 'Let me check your course registration details.',
        specific: 'Here\'s your course registration information.'
      },
      actions: ['course-registration', 'regular-courses']
    },
    
    project: {
      keywords: ['project', 'team', 'guide', 'submission', 'project work'],
      queries: ['my project', 'project details', 'project team', 'project guide'],
      responses: {
        general: 'I\'ll get your project information.',
        specific: 'Here are your project details.'
      },
      actions: ['project-selection', 'project-team', 'project-work']
    },
    
    admitCard: {
      keywords: ['admit', 'card', 'hall ticket', 'admit card', 'exam admit'],
      queries: ['admit card', 'hall ticket', 'download admit card'],
      responses: {
        general: 'Let me check your admit card status.',
        specific: 'Here\'s your admit card information.'
      },
      actions: ['admit-card']
    },
    
    fees: {
      keywords: ['fees', 'payment', 'fee', 'pay', 'due', 'amount'],
      queries: ['fee payment', 'my fees', 'fee due', 'payment status'],
      responses: {
        general: 'I\'ll check your fee details.',
        specific: 'Here\'s your fee information.'
      },
      actions: ['online-fees-payment']
    },
    
    navigation: {
      keywords: ['open', 'go to', 'show', 'navigate', 'take me to'],
      queries: ['open attendance', 'go to results', 'show timetable'],
      responses: {
        general: 'I\'ll navigate you to the requested page.',
        specific: 'Opening the page for you.'
      },
      actions: []
    }
  };

  /**
   * Time-based greetings and responses
   */
  static timeBasedResponses = {
    morning: ['Good morning!', 'Morning!', 'Hope you have a great day ahead!'],
    afternoon: ['Good afternoon!', 'Hope your day is going well!'],
    evening: ['Good evening!', 'Hope you had a productive day!'],
    night: ['Good night!', 'Hope you get some good rest!']
  };

  /**
   * Common query variations and their standard forms
   */
  static queryNormalization = {
    'whats my attendance': 'my attendance',
    'what is my attendance': 'my attendance', 
    'show attendance': 'my attendance',
    'check attendance': 'my attendance',
    'attendance report': 'my attendance',
    
    'whats my result': 'my results',
    'what are my marks': 'my results',
    'show results': 'my results',
    'check results': 'my results',
    'my exam results': 'my results',
    
    'whats my schedule': 'my timetable',
    'what is my timetable': 'my timetable',
    'show timetable': 'my timetable',
    'class timings': 'my timetable',
    'todays schedule': 'my timetable',
    
    'show cia marks': 'my cia marks',
    'internal marks': 'my cia marks',
    'cia assessment': 'my cia marks'
  };

  /**
   * Analyze user query and determine intent
   * @param {string} query - User input query
   * @returns {Object} Analysis result with intent, confidence, and suggestions
   */
  static analyzeQuery(query) {
    const normalizedQuery = this.normalizeQuery(query);
    const queryLower = normalizedQuery.toLowerCase();
    
    // Check for direct matches first
    const directMatch = this.findDirectMatch(queryLower);
    if (directMatch) {
      return {
        intent: directMatch.intent,
        confidence: 0.9,
        matchType: 'direct',
        originalQuery: query,
        normalizedQuery: normalizedQuery,
        suggestedActions: directMatch.actions
      };
    }
    
    // Check for keyword matches
    const keywordMatches = this.findKeywordMatches(queryLower);
    if (keywordMatches.length > 0) {
      const bestMatch = keywordMatches[0];
      return {
        intent: bestMatch.intent,
        confidence: bestMatch.confidence,
        matchType: 'keyword',
        originalQuery: query,
        normalizedQuery: normalizedQuery,
        suggestedActions: bestMatch.actions,
        alternativeIntents: keywordMatches.slice(1, 3)
      };
    }
    
    // Check for greeting or general conversation
    if (this.isGreeting(queryLower)) {
      return {
        intent: 'greeting',
        confidence: 0.8,
        matchType: 'greeting',
        originalQuery: query,
        normalizedQuery: normalizedQuery,
        timeOfDay: this.getTimeOfDay()
      };
    }
    
    // If no clear intent found
    return {
      intent: 'unknown',
      confidence: 0.1,
      matchType: 'none',
      originalQuery: query,
      normalizedQuery: normalizedQuery,
      suggestions: this.getSuggestions()
    };
  }

  /**
   * Generate response based on analysis
   * @param {Object} analysis - Query analysis result
   * @returns {Object} Response with text, data, and navigation info
   */
  static async generateResponse(analysis) {
    try {
      switch (analysis.intent) {
        case 'greeting':
          return this.generateGreetingResponse(analysis);
        
        case 'attendance':
          return await this.generateAttendanceResponse(analysis);
        
        case 'examResults':
          return await this.generateExamResultsResponse(analysis);
        
        case 'timetable':
          return await this.generateTimetableResponse(analysis);
        
        case 'ciaMarks':
          return await this.generateCIAMarksResponse(analysis);
        
        case 'courseRegistration':
          return await this.generateCourseRegistrationResponse(analysis);
        
        case 'project':
          return await this.generateProjectResponse(analysis);
        
        case 'admitCard':
          return await this.generateAdmitCardResponse(analysis);
        
        case 'fees':
          return await this.generateFeesResponse(analysis);
        
        case 'navigation':
          return this.generateNavigationResponse(analysis);
        
        case 'unknown':
        default:
          return this.generateUnknownResponse(analysis);
      }
    } catch (error) {
      console.error('Error generating response:', error);
      return {
        text: 'I apologize, but I encountered an error while processing your request. Please try again.',
        hasData: false,
        navigation: null
      };
    }
  }

  /**
   * Normalize user query
   */
  static normalizeQuery(query) {
    const normalized = query.toLowerCase().trim();
    return this.queryNormalization[normalized] || normalized;
  }

  /**
   * Find direct matches in query patterns
   */
  static findDirectMatch(queryLower) {
    for (const [intent, pattern] of Object.entries(this.intentPatterns)) {
      if (pattern.queries.some(q => queryLower.includes(q))) {
        return { intent, actions: pattern.actions };
      }
    }
    return null;
  }

  /**
   * Find keyword matches with confidence scoring
   */
  static findKeywordMatches(queryLower) {
    const matches = [];
    
    for (const [intent, pattern] of Object.entries(this.intentPatterns)) {
      let matchCount = 0;
      let totalScore = 0;
      
      pattern.keywords.forEach(keyword => {
        if (queryLower.includes(keyword)) {
          matchCount++;
          totalScore += keyword.length;
        }
      });
      
      if (matchCount > 0) {
        const confidence = Math.min(0.8, (matchCount * totalScore) / (pattern.keywords.length * 10));
        matches.push({
          intent,
          confidence,
          matchCount,
          actions: pattern.actions
        });
      }
    }
    
    return matches.sort((a, b) => b.confidence - a.confidence);
  }

  /**
   * Check if query is a greeting
   */
  static isGreeting(queryLower) {
    const greetings = ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'];
    return greetings.some(greeting => queryLower.includes(greeting));
  }

  /**
   * Get time of day for appropriate responses
   */
  static getTimeOfDay() {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 17) return 'afternoon';
    if (hour < 21) return 'evening';
    return 'night';
  }

  /**
   * Response generators for different intents
   */
  
  static generateGreetingResponse(analysis) {
    const timeOfDay = analysis.timeOfDay || this.getTimeOfDay();
    const greetingMessage = this.timeBasedResponses[timeOfDay][
      Math.floor(Math.random() * this.timeBasedResponses[timeOfDay].length)
    ];
    
    return {
      text: `${greetingMessage} 👋\n\nI'm your AI assistant for the student portal. I can help you with:\n\n• 📊 Attendance information\n• 📚 Exam results and CIA marks\n• ⏰ Class timetables and schedules\n• 📝 Course registration details\n• 🚀 Project information\n• 🎫 Admit card status\n• 💰 Fee payment details\n\nWhat would you like to know about today?`,
      hasData: false,
      navigation: null,
      isGreeting: true
    };
  }

  static async generateAttendanceResponse(analysis) {
    const attendanceData = PageDataService.getAttendanceData('detailed');
    const responseText = PageDataService.formatChatbotResponse('attendance', attendanceData, analysis.originalQuery);
    
    return {
      text: responseText,
      hasData: true,
      data: attendanceData,
      navigation: {
        suggested: true,
        action: 'attendance',
        label: 'Open Attendance Page'
      }
    };
  }

  static async generateExamResultsResponse(analysis) {
    const resultsData = PageDataService.getExamResultsData('current');
    const responseText = PageDataService.formatChatbotResponse('examResults', resultsData, analysis.originalQuery);
    
    return {
      text: responseText,
      hasData: true,
      data: resultsData,
      navigation: {
        suggested: true,
        action: 'exam-result',
        label: 'Open Results Page'
      }
    };
  }

  static async generateTimetableResponse(analysis) {
    const timetableData = PageDataService.getTimetableData('today');
    const responseText = PageDataService.formatChatbotResponse('timetable', timetableData, analysis.originalQuery);
    
    return {
      text: responseText,
      hasData: true,
      data: timetableData,
      navigation: {
        suggested: true,
        action: 'timetable',
        label: 'Open Timetable Page'
      }
    };
  }

  static async generateCIAMarksResponse(analysis) {
    const ciaData = PageDataService.getCIAMarksData('detailed');
    const responseText = PageDataService.formatChatbotResponse('ciaMarks', ciaData, analysis.originalQuery);
    
    return {
      text: responseText,
      hasData: true,
      data: ciaData,
      navigation: {
        suggested: true,
        action: 'cia-marks',
        label: 'Open CIA Marks Page'
      }
    };
  }

  static async generateCourseRegistrationResponse(analysis) {
    const courseData = PageDataService.getCourseRegistrationData('registered');
    const responseText = PageDataService.formatChatbotResponse('courseRegistration', courseData, analysis.originalQuery);
    
    return {
      text: responseText,
      hasData: true,
      data: courseData,
      navigation: {
        suggested: true,
        action: 'course-registration',
        label: 'Open Course Registration'
      }
    };
  }

  static async generateProjectResponse(analysis) {
    const projectData = PageDataService.getProjectData('current');
    const responseText = PageDataService.formatChatbotResponse('project', projectData, analysis.originalQuery);
    
    return {
      text: responseText,
      hasData: true,
      data: projectData,
      navigation: {
        suggested: true,
        action: 'project-selection',
        label: 'Open Project Page'
      }
    };
  }

  static async generateAdmitCardResponse(analysis) {
    const admitCardData = PageDataService.getAdmitCardData();
    const responseText = PageDataService.formatChatbotResponse('admitCard', admitCardData, analysis.originalQuery);
    
    return {
      text: responseText,
      hasData: true,
      data: admitCardData,
      navigation: {
        suggested: true,
        action: 'admit-card',
        label: 'Open Admit Card Page'
      }
    };
  }

  static async generateFeesResponse(analysis) {
    return {
      text: '💰 **Fee Payment Information:**\n\nI can help you navigate to the fee payment page where you can view your fee details and make payments.',
      hasData: false,
      navigation: {
        suggested: true,
        action: 'online-fees-payment',
        label: 'Open Fee Payment Page'
      }
    };
  }

  static generateNavigationResponse(analysis) {
    const query = analysis.normalizedQuery;
    let targetAction = null;
    
    // Extract target page from navigation query
    for (const [intent, pattern] of Object.entries(this.intentPatterns)) {
      if (pattern.keywords.some(keyword => query.includes(keyword))) {
        targetAction = pattern.actions[0];
        break;
      }
    }
    
    if (targetAction) {
      return {
        text: `🚀 Opening the ${targetAction.replace('-', ' ')} page for you...`,
        hasData: false,
        navigation: {
          immediate: true,
          action: targetAction,
          label: `Open ${targetAction.replace('-', ' ')} Page`
        }
      };
    }
    
    return this.generateUnknownResponse(analysis);
  }

  static generateUnknownResponse(analysis) {
    return {
      text: `I'm not sure I understand your request: "${analysis.originalQuery}"\n\n🤔 Here are some things I can help you with:\n\n• Check your attendance\n• View exam results\n• Show class timetable\n• Display CIA marks\n• Course registration info\n• Project details\n• Admit card status\n• Fee payment\n\nTry asking something like "show my attendance" or "what are my exam results"?`,
      hasData: false,
      navigation: null,
      suggestions: this.getSuggestions()
    };
  }

  /**
   * Get helpful suggestions for users
   */
  static getSuggestions() {
    return [
      'Show my attendance',
      'What are my exam results?',
      'Display my timetable',
      'Check CIA marks',
      'Course registration details',
      'Project information'
    ];
  }

  /**
   * Check if query requires immediate navigation (no confirmation)
   */
  static requiresImmediateNavigation(analysis) {
    return analysis.intent === 'navigation' && 
           analysis.originalQuery.toLowerCase().includes('open') ||
           analysis.originalQuery.toLowerCase().includes('go to');
  }
}

export default ChatbotIntelligence;
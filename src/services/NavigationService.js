/**
 * NavigationService - Enhanced navigation service for chatbot interactions
 * Handles page navigation, user confirmations, and interactive elements
 */

class NavigationService {
  
  /**
   * Page mapping for navigation actions
   */
  static pageMapping = {
    'attendance': {
      action: 'attendance',
      title: 'Attendance',
      description: 'View your attendance summary and subject-wise details'
    },
    'pat-attendance': {
      action: 'pat-attendance',
      title: 'PAT Attendance',
      description: 'View PAT (Practical Assessment Test) attendance'
    },
    'exam-result': {
      action: 'exam-result',
      title: 'Exam Results',
      description: 'View your semester exam results and grades'
    },
    'cia-marks': {
      action: 'cia-marks',
      title: 'CIA Marks',
      description: 'View Continuous Internal Assessment marks'
    },
    'timetable': {
      action: 'timetable',
      title: 'Timetable',
      description: 'View your class schedule and weekly timetable'
    },
    'course-registration': {
      action: 'course-registration',
      title: 'Course Registration',
      description: 'Manage your course registrations and view credits'
    },
    'regular-courses': {
      action: 'regular-courses',
      title: 'Regular Courses',
      description: 'View and register for regular semester courses'
    },
    'project-selection': {
      action: 'project-selection',
      title: 'Project Selection',
      description: 'Select and manage your academic projects'
    },
    'project-team': {
      action: 'project-team',
      title: 'Project Team',
      description: 'View and manage your project team members'
    },
    'project-work': {
      action: 'project-work',
      title: 'Project Work',
      description: 'Access project submissions and deadlines'
    },
    'admit-card': {
      action: 'admit-card',
      title: 'Admit Card',
      description: 'Download admit card for examinations'
    },
    'online-fees-payment': {
      action: 'online-fees-payment',
      title: 'Fee Payment',
      description: 'Pay fees online and view payment history'
    },
    'dashboard': {
      action: 'dashboard',
      title: 'Dashboard',
      description: 'Main dashboard with overview of all activities'
    }
  };

  /**
   * Create navigation URL based on action
   * @param {string} action - Navigation action
   * @returns {string} Navigation URL
   */
  static createNavigationUrl(action) {
    if (!action || action === 'dashboard') {
      return '/';
    }
    return `/?action=${action}`;
  }

  /**
   * Get page information by action
   * @param {string} action - Navigation action
   * @returns {Object} Page information
   */
  static getPageInfo(action) {
    return this.pageMapping[action] || {
      action: action,
      title: action.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      description: `Navigate to ${action.replace('-', ' ')} page`
    };
  }

  /**
   * Create navigation buttons for chat interface
   * @param {Array} actions - Array of action objects
   * @returns {Array} Navigation button configurations
   */
  static createNavigationButtons(actions) {
    if (!Array.isArray(actions)) {
      actions = [actions];
    }

    return actions.map(action => {
      const pageInfo = this.getPageInfo(action);
      return {
        id: `nav-${action}`,
        type: 'navigation',
        action: action,
        label: `Open ${pageInfo.title}`,
        title: pageInfo.title,
        description: pageInfo.description,
        url: this.createNavigationUrl(action)
      };
    });
  }

  /**
   * Create confirmation message for navigation
   * @param {Object} navigationInfo - Navigation information
   * @returns {Object} Confirmation message structure
   */
  static createNavigationConfirmation(navigationInfo) {
    const pageInfo = this.getPageInfo(navigationInfo.action);
    
    return {
      type: 'confirmation',
      message: `Would you like me to open the **${pageInfo.title}** page?`,
      description: pageInfo.description,
      buttons: [
        {
          id: 'confirm-nav',
          label: `Yes, open ${pageInfo.title}`,
          action: 'navigate',
          navigationAction: navigationInfo.action,
          style: 'primary'
        },
        {
          id: 'cancel-nav',
          label: 'No, thanks',
          action: 'cancel',
          style: 'secondary'
        }
      ]
    };
  }

  /**
   * Handle navigation based on user response
   * @param {string} userAction - User's chosen action
   * @param {string} navigationAction - Target navigation action
   * @param {Function} navigateCallback - Callback function for navigation
   * @returns {Object} Navigation result
   */
  static handleNavigationResponse(userAction, navigationAction, navigateCallback) {
    if (userAction === 'navigate' || userAction === 'confirm') {
      const pageInfo = this.getPageInfo(navigationAction);
      const url = this.createNavigationUrl(navigationAction);
      
      // Execute navigation
      if (typeof navigateCallback === 'function') {
        navigateCallback(url);
      }
      
      return {
        success: true,
        message: `🚀 Opening **${pageInfo.title}** page...`,
        action: navigationAction,
        url: url
      };
    } else if (userAction === 'cancel') {
      return {
        success: false,
        message: "👍 No problem! Is there anything else I can help you with?",
        action: 'cancelled'
      };
    }
    
    return {
      success: false,
      message: "I didn't understand your response. Please try again.",
      action: 'error'
    };
  }

  /**
   * Create breadcrumb navigation information
   * @param {string} currentAction - Current page action
   * @returns {Object} Breadcrumb information
   */
  static createBreadcrumb(currentAction) {
    const pageInfo = this.getPageInfo(currentAction);
    
    return {
      current: pageInfo.title,
      path: [
        { label: 'Dashboard', action: 'dashboard' },
        { label: pageInfo.title, action: currentAction }
      ]
    };
  }

  /**
   * Get related pages for current page
   * @param {string} currentAction - Current page action
   * @returns {Array} Related page suggestions
   */
  static getRelatedPages(currentAction) {
    const relatedMapping = {
      'attendance': ['timetable', 'cia-marks'],
      'exam-result': ['cia-marks', 'admit-card'],
      'cia-marks': ['attendance', 'exam-result'],
      'timetable': ['attendance', 'course-registration'],
      'course-registration': ['timetable', 'regular-courses'],
      'project-selection': ['project-team', 'project-work'],
      'project-team': ['project-selection', 'project-work'],
      'project-work': ['project-selection', 'project-team'],
      'admit-card': ['exam-result', 'timetable'],
      'online-fees-payment': ['dashboard']
    };

    const related = relatedMapping[currentAction] || [];
    return related.map(action => this.getPageInfo(action));
  }

  /**
   * Create quick navigation suggestions
   * @returns {Array} Quick navigation options
   */
  static getQuickNavigationSuggestions() {
    const popular = [
      'attendance',
      'exam-result',
      'timetable',
      'cia-marks',
      'course-registration'
    ];

    return popular.map(action => ({
      ...this.getPageInfo(action),
      isPopular: true
    }));
  }

  /**
   * Validate navigation action
   * @param {string} action - Navigation action to validate
   * @returns {Object} Validation result
   */
  static validateNavigationAction(action) {
    if (!action) {
      return {
        valid: false,
        error: 'No navigation action provided'
      };
    }

    if (this.pageMapping[action]) {
      return {
        valid: true,
        pageInfo: this.pageMapping[action]
      };
    }

    // Check if it's a valid action even if not in mapping
    const validPattern = /^[a-z0-9-]+$/;
    if (validPattern.test(action)) {
      return {
        valid: true,
        pageInfo: {
          action: action,
          title: action.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
          description: `Navigate to ${action.replace('-', ' ')} page`
        }
      };
    }

    return {
      valid: false,
      error: 'Invalid navigation action format'
    };
  }

  /**
   * Create interactive navigation message for chat
   * @param {Object} navigationInfo - Navigation information
   * @param {boolean} immediate - Whether to navigate immediately
   * @returns {Object} Interactive message structure
   */
  static createInteractiveNavigationMessage(navigationInfo, immediate = false) {
    const pageInfo = this.getPageInfo(navigationInfo.action);
    
    if (immediate) {
      return {
        type: 'navigation',
        immediate: true,
        message: `🚀 Opening **${pageInfo.title}** page...`,
        action: navigationInfo.action,
        url: this.createNavigationUrl(navigationInfo.action)
      };
    }

    return {
      type: 'navigation',
      immediate: false,
      message: `I found information about **${pageInfo.title}**. Would you like me to open the page for more details?`,
      description: pageInfo.description,
      action: navigationInfo.action,
      url: this.createNavigationUrl(navigationInfo.action),
      buttons: [
        {
          id: 'open-page',
          label: `Open ${pageInfo.title}`,
          action: 'navigate',
          style: 'primary'
        },
        {
          id: 'stay-chat',
          label: 'Stay in chat',
          action: 'cancel',
          style: 'secondary'
        }
      ]
    };
  }

  /**
   * Log navigation for analytics
   * @param {string} action - Navigation action
   * @param {string} source - Source of navigation (chat, direct, etc.)
   * @param {Object} context - Additional context
   */
  static logNavigation(action, source = 'chat', context = {}) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      action: action,
      source: source,
      context: context,
      pageInfo: this.getPageInfo(action)
    };

    // In a real application, this would send to analytics service
    console.log('Navigation logged:', logEntry);
    
    // Store in localStorage for debugging
    try {
      const logs = JSON.parse(localStorage.getItem('navigation_logs') || '[]');
      logs.push(logEntry);
      // Keep only last 100 logs
      const recentLogs = logs.slice(-100);
      localStorage.setItem('navigation_logs', JSON.stringify(recentLogs));
    } catch (error) {
      console.warn('Could not store navigation log:', error);
    }
  }

  /**
   * Get navigation history from localStorage
   * @returns {Array} Navigation history
   */
  static getNavigationHistory() {
    try {
      return JSON.parse(localStorage.getItem('navigation_logs') || '[]');
    } catch (error) {
      console.warn('Could not retrieve navigation history:', error);
      return [];
    }
  }

  /**
   * Get most visited pages
   * @param {number} limit - Number of top pages to return
   * @returns {Array} Most visited pages
   */
  static getMostVisitedPages(limit = 5) {
    const history = this.getNavigationHistory();
    const pageCounts = {};
    
    history.forEach(log => {
      const action = log.action;
      pageCounts[action] = (pageCounts[action] || 0) + 1;
    });

    return Object.entries(pageCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, limit)
      .map(([action, count]) => ({
        ...this.getPageInfo(action),
        visitCount: count
      }));
  }
}

export default NavigationService;
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [sessionExpiry, setSessionExpiry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const sessionTimeoutRef = useRef(null);
  const activityTimeoutRef = useRef(null);

  // Session constants
  const SESSION_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds
  const STORAGE_KEY = 'studentPortalSession';
  const ACTIVITY_CHECK_INTERVAL = 30 * 1000; // Check every 30 seconds

  // Initialize authentication state on mount
  useEffect(() => {
    checkExistingSession();
  }, []);

  // Set up activity monitoring for authenticated users
  useEffect(() => {
    if (isAuthenticated) {
      startActivityMonitoring();
      return () => {
        stopActivityMonitoring();
      };
    } else {
      stopActivityMonitoring();
    }
  }, [isAuthenticated]);

  // Check for existing valid session
  const checkExistingSession = () => {
    try {
      const savedSession = localStorage.getItem(STORAGE_KEY);
      if (savedSession) {
        const sessionData = JSON.parse(savedSession);
        const now = new Date().getTime();
        
        if (sessionData.expiry && sessionData.expiry > now) {
          // Valid session exists
          setCurrentUser(sessionData.user);
          setIsAuthenticated(true);
          setSessionExpiry(sessionData.expiry);
          startSessionTimer(sessionData.expiry - now);
        } else {
          // Session expired
          clearSession();
        }
      }
    } catch (error) {
      console.error('Error checking session:', error);
      clearSession();
    } finally {
      setIsLoading(false);
    }
  };

  // Start session timer
  const startSessionTimer = (duration) => {
    if (sessionTimeoutRef.current) {
      clearTimeout(sessionTimeoutRef.current);
    }
    
    sessionTimeoutRef.current = setTimeout(() => {
      handleSessionExpiry();
    }, duration);
  };

  // Handle session expiry
  const handleSessionExpiry = () => {
    console.log('Session expired');
    logout(true); // true indicates automatic logout due to expiry
  };

  // Reset session activity (extend session)
  const resetSessionActivity = () => {
    if (isAuthenticated && currentUser) {
      const newExpiry = new Date().getTime() + SESSION_DURATION;
      setSessionExpiry(newExpiry);
      
      // Update localStorage
      const sessionData = {
        user: currentUser,
        expiry: newExpiry,
        lastActivity: new Date().getTime()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionData));
      
      // Reset timer
      startSessionTimer(SESSION_DURATION);
    }
  };

  // Start activity monitoring
  const startActivityMonitoring = () => {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    const handleActivity = () => {
      resetSessionActivity();
    };

    // Add event listeners
    events.forEach(event => {
      document.addEventListener(event, handleActivity, true);
    });

    // Store cleanup function
    const cleanup = () => {
      events.forEach(event => {
        document.removeEventListener(event, handleActivity, true);
      });
    };

    // Set up periodic activity check
    activityTimeoutRef.current = setInterval(() => {
      const savedSession = localStorage.getItem(STORAGE_KEY);
      if (savedSession) {
        try {
          const sessionData = JSON.parse(savedSession);
          const now = new Date().getTime();
          
          if (sessionData.expiry && sessionData.expiry <= now) {
            handleSessionExpiry();
          }
        } catch (error) {
          console.error('Error checking activity:', error);
        }
      }
    }, ACTIVITY_CHECK_INTERVAL);

    return cleanup;
  };

  // Stop activity monitoring
  const stopActivityMonitoring = () => {
    if (sessionTimeoutRef.current) {
      clearTimeout(sessionTimeoutRef.current);
    }
    if (activityTimeoutRef.current) {
      clearInterval(activityTimeoutRef.current);
    }
  };

  // Login function
  const login = async (username, password) => {
    try {
      // Simulate authentication API call
      // In a real app, this would make an API request to your backend
      if (!username.trim() || !password.trim()) {
        throw new Error('Username and password are required');
      }

      // For demo purposes, accept any non-empty credentials
      // In production, this would validate against your authentication service
      const user = {
        id: `user_${Date.now()}`,
        username: username.trim(),
        name: username.charAt(0).toUpperCase() + username.slice(1),
        email: `${username.trim()}@example.com`,
        role: 'student',
        loginTime: new Date().toISOString()
      };

      const expiry = new Date().getTime() + SESSION_DURATION;
      
      // Save session
      const sessionData = {
        user,
        expiry,
        lastActivity: new Date().getTime()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionData));
      
      // Update state
      setCurrentUser(user);
      setIsAuthenticated(true);
      setSessionExpiry(expiry);
      
      // Start session timer
      startSessionTimer(SESSION_DURATION);
      
      return { success: true, user };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  };

  // Logout function
  const logout = (isAutomatic = false) => {
    // Clear session data
    setIsAuthenticated(false);
    setCurrentUser(null);
    setSessionExpiry(null);
    localStorage.removeItem(STORAGE_KEY);
    
    // Stop timers
    stopActivityMonitoring();
    
    if (isAutomatic) {
      // Could show a toast notification here about session expiry
      console.log('Session expired - user logged out automatically');
    }
  };

  // Clear session (for error cases)
  const clearSession = () => {
    logout();
  };

  // Get session time remaining
  const getTimeRemaining = () => {
    if (!sessionExpiry) return 0;
    const remaining = sessionExpiry - new Date().getTime();
    return Math.max(0, remaining);
  };

  // Check if session is about to expire (less than 1 minute)
  const isSessionExpiringSoon = () => {
    const remaining = getTimeRemaining();
    return remaining > 0 && remaining < 60000; // Less than 1 minute
  };

  const value = {
    // State
    isAuthenticated,
    currentUser,
    sessionExpiry,
    isLoading,
    
    // Actions
    login,
    logout,
    resetSessionActivity,
    
    // Utilities
    getTimeRemaining,
    isSessionExpiringSoon
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
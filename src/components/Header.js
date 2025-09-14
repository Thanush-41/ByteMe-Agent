import React, { useState } from 'react';
import './Header.css';
import { useAuth } from '../contexts/AuthContext';

const Header = ({ currentSection }) => {
  const { currentUser, logout, getTimeRemaining, isSessionExpiringSoon } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  const formatTimeRemaining = () => {
    const remaining = getTimeRemaining();
    if (remaining <= 0) return '00:00';
    
    const minutes = Math.floor(remaining / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="header">
      <div className="header-left">
        <div className="breadcrumb">
          <span className="breadcrumb-link">Home</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Dashboard</span>
        </div>
      </div>
      
      <div className="header-right">
        {/* Session Timer */}
        <div className={`session-timer ${isSessionExpiringSoon() ? 'expiring' : ''}`}>
          <span className="timer-icon">⏱️</span>
          <span className="timer-text">{formatTimeRemaining()}</span>
        </div>

        <div className="notification-icon">
          🔔
          <span className="notification-badge">1</span>
        </div>
        
        <div className="user-profile" onClick={() => setShowUserMenu(!showUserMenu)}>
          <div className="user-avatar">👤</div>
          <div className="user-info">
            <span className="user-name">{currentUser?.name || 'Student'}</span>
            <span className="user-role">{currentUser?.username || 'student'}</span>
          </div>
          <span className="dropdown-arrow">▼</span>
          
          {showUserMenu && (
            <div className="user-dropdown">
              <div className="dropdown-header">
                <span className="dropdown-user-name">{currentUser?.name}</span>
                <span className="dropdown-user-email">{currentUser?.email}</span>
              </div>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                <span className="dropdown-icon">👤</span>
                Profile Settings
              </button>
              <button className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                <span className="dropdown-icon">🔔</span>
                Notifications
              </button>
              <button className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                <span className="dropdown-icon">❓</span>
                Help & Support
              </button>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item logout-item" onClick={handleLogout}>
                <span className="dropdown-icon">🚪</span>
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
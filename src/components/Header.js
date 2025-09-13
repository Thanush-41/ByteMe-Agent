import React from 'react';
import './Header.css';

const Header = ({ currentSection, onLogout }) => {
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
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
        <div className="notification-icon">
          🔔
          <span className="notification-badge">1</span>
        </div>
        
        <div className="user-profile">
          <div className="user-avatar">👤</div>
          <div className="user-info">
            <span className="user-name">Student</span>
          </div>
        </div>
        
        <div className="header-actions">
          <button className="sign-out-btn" onClick={handleLogout}>Sign out</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="breadcrumb">
          <span className="breadcrumb-home">Home</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Dashboard</span>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="main-content">
          <div className="action-buttons">
            <button className="action-btn library-btn">ACCESS LIBRARY PORTAL</button>
            <button className="action-btn download-btn">DOWNLOAD & FORMS</button>
            <button className="action-btn phone-btn">PHONE DIRECTORY</button>
          </div>
          
          <div className="todo-section">
            <div className="section-header">
              <i className="fas fa-clipboard-list"></i>
              <span>To Do List</span>
            </div>
            <div className="todo-items">
              <div className="todo-item">
                <span>Lab File Upload</span>
              </div>
              <div className="todo-item">
                <span>AAT EVALUATION</span>
              </div>
            </div>
          </div>

          <div className="exam-notifications-section">
            <div className="section-header">
              <span>Examination Notifications (Autonomous)</span>
            </div>
            <div className="notification-content">
              {/* This section appears empty in the screenshot */}
            </div>
          </div>
        </div>

        <div className="sidebar-content">
          <div className="placement-notifications-section">
            <div className="section-header">
              <span>PLACEMENT NOTIFICATIONS</span>
            </div>
            <div className="notifications-list">
              <div className="notification-item">
                <span className="notification-title">
                  Information to the Students on Placement |Broadridge | 21 Jun...
                </span>
                <span className="notification-date-badge wed">Wed, 19 Jun 2019</span>
              </div>
              <div className="notification-item">
                <span className="notification-title">
                  Information to the Students on Placement |MPHASIS | 14 & 15 A...
                </span>
                <span className="notification-date-badge thu">Thu, 13 Jun 2019</span>
              </div>
              <div className="notification-item">
                <span className="notification-title">
                  A Pre-Placement Summer Training Programme for III B. Tech | D...
                </span>
                <span className="notification-date-badge sun">Sun, 28 Apr 2019</span>
              </div>
              <div className="notification-item">
                <span className="notification-title">
                  Information to the Students on Placement | Infor | 27 April, 2019
                </span>
                <span className="notification-date-badge thu">Thu, 25 Apr 2019</span>
              </div>
              <div className="notification-item">
                <span className="notification-title">
                  Information to the Students on Placement | Multiplier Solutions |...
                </span>
                <span className="notification-date-badge sat">Sat, 13 Apr 2019</span>
              </div>
            </div>
          </div>

          <div className="jntuh-section">
            <div className="section-header">
              <span>JNTUH Examination Circulars</span>
            </div>
            <div className="jntuh-content">
              {/* This section appears empty in the screenshot */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

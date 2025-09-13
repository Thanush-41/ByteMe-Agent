import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const placementNotifications = [
    {
      id: 1,
      title: "Information to the Students on Placement | Broadridge | 21 Jun...",
      date: "Wed, 19 Jun 2019",
      type: "placement"
    },
    {
      id: 2,
      title: "Information to the Students on Placement | MPHASIS | 14 & 15 A...",
      date: "Thu, 13 Jun 2019",
      type: "placement"
    },
    {
      id: 3,
      title: "A Pre-Placement Summer Training Programme for III B. Tech | D...",
      date: "Sun, 28 Apr 2019",
      type: "training"
    },
    {
      id: 4,
      title: "Information to the Students on Placement | Infor | 27 April, 2019",
      date: "Thu, 25 Apr 2019",
      type: "placement"
    },
    {
      id: 5,
      title: "Information to the Students on Placement | Multiplier Solutions |...",
      date: "Sat, 13 Apr 2019",
      type: "placement"
    }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="action-buttons">
          <button className="action-btn portal-btn">ACCESS LIBRARY PORTAL</button>
          <button className="action-btn download-btn">DOWNLOAD & FORMS</button>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="main-content">
          <div className="content-area">
            <div className="todo-section">
              <h3>📋 To Do List</h3>
              <div className="todo-items">
                <div className="todo-item">
                  <span className="todo-text">Lab File Upload</span>
                </div>
                <div className="todo-item">
                  <span className="todo-text">AAT EVALUATION</span>
                </div>
              </div>
            </div>
            
            <div className="regulations-section">
              <h3>Examination Notifications (Autonomous)</h3>
              <div className="regulations-content">
                <p>Academic regulations and examination guidelines will be displayed here.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="sidebar-content">
          <div className="notifications-section">
            <h3>PLACEMENT NOTIFICATIONS</h3>
            <div className="notifications-list">
              {placementNotifications.map((notification) => (
                <div key={notification.id} className="notification-item">
                  <div className="notification-content">
                    <p className="notification-title">{notification.title}</p>
                    <span className="notification-date">{notification.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="examination-section">
            <h3>JNTUH Examination Circulars</h3>
            <div className="examination-content">
              <p>Examination circulars and updates will be displayed here.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
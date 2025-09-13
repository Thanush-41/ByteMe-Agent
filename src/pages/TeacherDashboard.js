import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { findRouteByKey } from '../constants/teacherRoutes';
import './TeacherDashboard.css';

const TeacherDashboard = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (routeKey) => {
    const route = findRouteByKey(routeKey);
    if (route) {
      navigate(route.path);
    }
  };

  return (
    <div className="teacher-dashboard">
      <div 
        className={`teacher-sidebar ${isSidebarExpanded ? 'expanded' : 'collapsed'}`}
        onMouseEnter={() => setIsSidebarExpanded(true)}
        onMouseLeave={() => setIsSidebarExpanded(false)}
      >
        <div className="sidebar-content">
          <div className="sidebar-header">
            <div className="logo-container">
              <div className="logo-img">📚</div>
              <span className="logo-text">School Portal</span>
            </div>
          </div>
          
          <nav className="sidebar-nav">
            <div className="nav-item" onClick={() => handleNavigation('dashboard')}>
              <span className="nav-icon">🏠</span>
              <span className="nav-label">Dashboard</span>
            </div>
            
            <div className="nav-item" onClick={() => handleNavigation('academics')}>
              <span className="nav-icon">📚</span>
              <span className="nav-label">Academics</span>
            </div>
            
            <div className="nav-item" onClick={() => handleNavigation('nominal-rolls')}>
              <span className="nav-icon">�</span>
              <span className="nav-label">Nominal Rolls</span>
            </div>
            
            <div className="nav-item" onClick={() => handleNavigation('time-table')}>
              <span className="nav-icon">⏰</span>
              <span className="nav-label">Time Table</span>
            </div>
            
            <div className="nav-item" onClick={() => handleNavigation('staff-timetable')}>
              <span className="nav-icon">👥</span>
              <span className="nav-label">Staff Timetable</span>
            </div>
            
            <div className="nav-item" onClick={() => handleNavigation('ict-studio')}>
              <span className="nav-icon">�</span>
              <span className="nav-label">ICT Studio</span>
            </div>
            
            <div className="nav-item" onClick={() => handleNavigation('aat-registration')}>
              <span className="nav-icon">📝</span>
              <span className="nav-label">AAT Registration</span>
            </div>
            
            <div className="nav-item" onClick={() => handleNavigation('attendance-register')}>
              <span className="nav-icon">✅</span>
              <span className="nav-label">Attendance Register</span>
            </div>
            
            <div className="nav-item" onClick={() => handleNavigation('project-approval')}>
              <span className="nav-icon">👍</span>
              <span className="nav-label">Project Approval</span>
            </div>
            
            <div className="nav-item" onClick={() => handleNavigation('project-titles')}>
              <span className="nav-icon">📑</span>
              <span className="nav-label">Project Titles</span>
            </div>
            
            <div className="nav-item" onClick={() => handleNavigation('schedule-instructions')}>
              <span className="nav-icon">📅</span>
              <span className="nav-label">Schedule Instructions</span>
            </div>
            
            <div className="nav-item" onClick={() => handleNavigation('lor-request')}>
              <span className="nav-icon">📄</span>
              <span className="nav-label">LOR Request</span>
            </div>
            
            <div className="nav-item" onClick={() => handleNavigation('attending-activity')}>
              <span className="nav-icon">🎯</span>
              <span className="nav-label">Attending Activity</span>
            </div>
            
            <div className="nav-item" onClick={() => handleNavigation('accession-register')}>
              <span className="nav-icon">�</span>
              <span className="nav-label">Accession Register</span>
            </div>
            
            <div className="nav-item" onClick={() => handleNavigation('library-books')}>
              <span className="nav-icon">📖</span>
              <span className="nav-label">Library Books</span>
            </div>
            
            <div className="nav-item" onClick={() => handleNavigation('evaluations')}>
              <span className="nav-icon">�</span>
              <span className="nav-label">Evaluations</span>
            </div>
            
            <div className="nav-item" onClick={() => handleNavigation('labs')}>
              <span className="nav-icon">🔬</span>
              <span className="nav-label">Labs</span>
            </div>
            
            <div className="nav-item" onClick={() => handleNavigation('tds')}>
              <span className="nav-icon">💰</span>
              <span className="nav-label">TDS</span>
            </div>
            
            <div className="nav-item" onClick={() => handleNavigation('pay-slip')}>
              <span className="nav-icon">�</span>
              <span className="nav-label">Pay Slip</span>
            </div>
            
            <div className="nav-item" onClick={() => handleNavigation('incentives')}>
              <span className="nav-icon">🎁</span>
              <span className="nav-label">Incentives</span>
            </div>
            
            <div className="nav-item" onClick={() => handleNavigation('funded-incentives')}>
              <span className="nav-icon">�</span>
              <span className="nav-label">Funded Incentives</span>
            </div>
            
            <div className="nav-item" onClick={() => handleNavigation('arrear')}>
              <span className="nav-icon">⏳</span>
              <span className="nav-label">Arrear</span>
            </div>
            
            <div className="nav-item" onClick={() => handleNavigation('partly-payment')}>
              <span className="nav-icon">�</span>
              <span className="nav-label">Partly Payment</span>
            </div>
            
            <div className="nav-item" onClick={() => handleNavigation('remuneration')}>
              <span className="nav-icon">�</span>
              <span className="nav-label">Remuneration</span>
            </div>
            
            <div className="nav-item" onClick={() => handleNavigation('reports')}>
              <span className="nav-icon">📈</span>
              <span className="nav-label">Reports</span>
            </div>
            
            <div className="nav-item" onClick={() => handleNavigation('question-paper')}>
              <span className="nav-icon">❓</span>
              <span className="nav-label">Question Paper</span>
            </div>
            
            <div className="nav-item" onClick={() => handleNavigation('leave')}>
              <span className="nav-icon">🏖️</span>
              <span className="nav-label">Leave</span>
            </div>
            
            <div className="nav-item" onClick={() => handleNavigation('faculty-uploads')}>
              <span className="nav-icon">⬆️</span>
              <span className="nav-label">Faculty Uploads</span>
            </div>
            
            <div className="nav-item" onClick={() => handleNavigation('biometric')}>
              <span className="nav-icon">�</span>
              <span className="nav-label">Biometric</span>
            </div>
            
            <div className="nav-item" onClick={() => handleNavigation('service-register')}>
              <span className="nav-icon">📋</span>
              <span className="nav-label">Service Register</span>
            </div>
            
            <div className="nav-item" onClick={() => handleNavigation('logout')}>
              <span className="nav-icon">🚪</span>
              <span className="nav-label">Logout</span>
            </div>
          </nav>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="page-title">
          <h1>Dashboard</h1>
          <div className="breadcrumb">
            <span>Welcome, Teacher</span>
          </div>
        </div>

        <div className="stats-row">
          <div className="stat-card green">
            <div className="stat-number">164</div>
            <div className="stat-label">TODAY VISITORS</div>
          </div>
          
          <div className="stat-card yellow">
            <div className="stat-number">6105</div>
            <div className="stat-label">STUDENTS</div>
          </div>
          
          <div className="stat-card red">
            <div className="stat-number">23910410</div>
            <div className="stat-label">TOTAL VISITORS</div>
          </div>
        </div>

        <div className="content-row">
          <div className="notifications-panel">
            <h3>Establishment Section</h3>
            <div className="notifications-list">
              <div className="notification-item">
                <span className="notification-icon">📄</span>
                <span>New academic session setup required</span>
              </div>
              <div className="notification-item">
                <span className="notification-icon">📄</span>
                <span>Staff allocation pending</span>
              </div>
              <div className="notification-item">
                <span className="notification-icon">📄</span>
                <span>Student enrollment update needed</span>
              </div>
            </div>
          </div>
          
          <div className="right-panel">
            <div className="mybox-section">
              <h3>MyBox</h3>
              <div className="mybox-content">
                <div className="mybox-item">
                  <span className="mybox-icon">📊</span>
                  <span>Performance Reports</span>
                </div>
                <div className="mybox-item">
                  <span className="mybox-icon">📝</span>
                  <span>Pending Reviews</span>
                </div>
                <div className="mybox-item">
                  <span className="mybox-icon">💼</span>
                  <span>Administrative Tasks</span>
                </div>
              </div>
            </div>
            
            <div className="todo-section">
              <h3>ToDo List</h3>
              <div className="todo-list">
                <div className="todo-item">
                  <input type="checkbox" />
                  <span>Review student attendance reports</span>
                </div>
                <div className="todo-item">
                  <input type="checkbox" />
                  <span>Update exam schedules</span>
                </div>
                <div className="todo-item">
                  <input type="checkbox" />
                  <span>Approve leave applications</span>
                </div>
                <div className="todo-item">
                  <input type="checkbox" />
                  <span>Conduct staff meeting</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;

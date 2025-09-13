import React, { useState } from 'react';
import { findRouteByKey } from '../constants/teacherRoutes';
import './TeacherDashboard.css';

const TeacherDashboard = ({ onLogout }) => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({});

  // Navigation handler
  const handleNavigation = (key) => {
    setActiveSection(key);
  };

  // Toggle submenu
  const toggleMenu = (key) => {
    setExpandedMenus(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Sidebar menu items
  const sidebarItems = [
    { 
      key: 'dashboard', 
      icon: '🏠', 
      label: 'Dashboard',
      hasSubmenu: false
    },
    {
      key: 'academics',
      icon: '📚',
      label: 'Academics',
      hasSubmenu: true,
      submenu: [
        { key: 'nominal-rolls', label: 'Nominal Rolls' },
        { key: 'time-table', label: 'Time Table' },
        { key: 'staff-timetable', label: 'Staff Timetable' },
        { key: 'ict-studio', label: 'ICT Studio Slot Booking' },
        { key: 'aat-registration', label: 'AAT Registration' },
        { key: 'attendance-register', label: 'Attendance Register' },
        { key: 'project-approval', label: 'Project Approval' },
        { key: 'project-titles', label: 'Project Titles' },
        { key: 'schedule-instructions', label: 'Schedule of Instructions' },
        { key: 'lor-request', label: 'LOR Request' },
        { key: 'attending-activity', label: 'Attending Activity / Events' },
        { key: 'accession-register', label: 'Accession Register' },
        { key: 'library-books', label: 'Library Books Issued' }
      ]
    },
    {
      key: 'evaluations',
      icon: '📝',
      label: 'Evaluations',
      hasSubmenu: true,
      submenu: [
        { key: 'aat', label: 'AAT' },
        { key: 'aat-ii', label: 'AAT-II' },
        { key: 'evaluation-marks', label: 'Evaluation Marks' }
      ]
    },
    {
      key: 'labs',
      icon: '⚗️',
      label: 'Labs',
      hasSubmenu: true,
      submenu: [
        { key: 'see-lab', label: 'SEE Lab' },
        { key: 'lab-marks', label: 'Lab Marks' },
        { key: 'lab-evaluation', label: 'Lab Evaluation' },
        { key: 'lab-experiments', label: 'Lab Experiments' }
      ]
    },
    {
      key: 'payroll',
      icon: '💰',
      label: 'Payroll',
      hasSubmenu: true,
      submenu: [
        { key: 'tds', label: 'TDS' },
        { key: 'pay-slip', label: 'Pay Slip' },
        { key: 'incentives', label: 'Incentives' },
        { key: 'funded-incentives', label: 'Funded Incentives' },
        { key: 'arrear', label: 'Arrear' },
        { key: 'partly-payment', label: 'Partly Payment Details' },
        { key: 'remuneration', label: 'Remuneration' }
      ]
    },
    {
      key: 'reports',
      icon: '📊',
      label: 'Reports',
      hasSubmenu: false
    },
    {
      key: 'question-paper',
      icon: '📄',
      label: 'Question Paper & Scheme of Evaluation',
      hasSubmenu: false
    },
    {
      key: 'leave',
      icon: '🏖️',
      label: 'Leave',
      hasSubmenu: false
    },
    {
      key: 'faculty-uploads',
      icon: '📤',
      label: 'Faculty Uploads',
      hasSubmenu: false
    },
    {
      key: 'biometric',
      icon: '👆',
      label: 'Biometric',
      hasSubmenu: false
    },
    {
      key: 'service-register',
      icon: '📋',
      label: 'Service Register',
      hasSubmenu: false
    },
    {
      key: 'personal-info',
      icon: '👤',
      label: 'Personal Information',
      hasSubmenu: true,
      submenu: [
        { key: 'edit-personal-details', label: 'Edit Personal Details' },
        { key: 'academic-identity', label: 'Academic Identity' },
        { key: 'professional-membership', label: 'Professional Membership' },
        { key: 'competency-building-visits', label: 'Competency Building Visits' },
        { key: 'professional-experience', label: 'Professional Experience' },
        { key: 'academic-qualifications', label: 'Academic Qualifications' },
        { key: 'honours-awards', label: 'Honours / Awards' }
      ]
    },
    {
      key: 'research-publications',
      icon: '🔬',
      label: 'Research & Publications',
      hasSubmenu: true,
      submenu: [
        { key: 'textbooks', label: 'Textbooks' },
        { key: 'journal-articles', label: 'Journal Articles' },
        { key: 'professional-training', label: 'Professional Training Attended' },
        { key: 'ipr-patents', label: 'IPR (Patents / Copyrights)' },
        { key: 'fdp-sttp', label: 'FDP / STTP Attended' },
        { key: 'conference-papers', label: 'Conference Papers' },
        { key: 'research-guidance', label: 'Research Guidance' },
        { key: 'moocs-training', label: 'MOOCs / QIP / Industry Training' }
      ]
    }
  ];

  // Render main content based on active section
  const renderMainContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <>
            <div className="dashboard-stats">
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-number">125</div>
                  <div className="stat-label">Total Students</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">8</div>
                  <div className="stat-label">Active Courses</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">45</div>
                  <div className="stat-label">Assignments</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">92%</div>
                  <div className="stat-label">Attendance Rate</div>
                </div>
              </div>
            </div>
            
            <div className="dashboard-grid">
              <div className="dashboard-section">
                <h3>Recent Activities</h3>
                <div className="activity-list">
                  <div className="activity-item">
                    <div className="activity-icon">📚</div>
                    <div className="activity-content">
                      <div className="activity-title">New assignment posted</div>
                      <div className="activity-time">2 hours ago</div>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-icon">✅</div>
                    <div className="activity-content">
                      <div className="activity-title">Attendance marked for CS101</div>
                      <div className="activity-time">4 hours ago</div>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-icon">📊</div>
                    <div className="activity-content">
                      <div className="activity-title">Grades updated for midterm</div>
                      <div className="activity-time">1 day ago</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="dashboard-section">
                <h3>Upcoming Events</h3>
                <div className="events-list">
                  <div className="event-item">
                    <div className="event-date">
                      <div className="event-day">15</div>
                      <div className="event-month">NOV</div>
                    </div>
                    <div className="event-details">
                      <div className="event-title">Faculty Meeting</div>
                      <div className="event-time">10:00 AM - 11:30 AM</div>
                    </div>
                  </div>
                  <div className="event-item">
                    <div className="event-date">
                      <div className="event-day">18</div>
                      <div className="event-month">NOV</div>
                    </div>
                    <div className="event-details">
                      <div className="event-title">Project Presentations</div>
                      <div className="event-time">2:00 PM - 5:00 PM</div>
                    </div>
                  </div>
                  <div className="event-item">
                    <div className="event-date">
                      <div className="event-day">22</div>
                      <div className="event-month">NOV</div>
                    </div>
                    <div className="event-details">
                      <div className="event-title">End Semester Exams Begin</div>
                      <div className="event-time">9:00 AM onwards</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="dashboard-section">
                <h3>Quick Links</h3>
                <div className="quick-links">
                  <div className="quick-link-item" onClick={() => handleNavigation('attendance-register')}>
                    <div className="quick-link-icon">📊</div>
                    <div className="quick-link-label">Attendance</div>
                  </div>
                  <div className="quick-link-item" onClick={() => handleNavigation('aat')}>
                    <div className="quick-link-icon">📝</div>
                    <div className="quick-link-label">Evaluations</div>
                  </div>
                  <div className="quick-link-item" onClick={() => handleNavigation('time-table')}>
                    <div className="quick-link-icon">📅</div>
                    <div className="quick-link-label">Timetable</div>
                  </div>
                  <div className="quick-link-item" onClick={() => handleNavigation('reports')}>
                    <div className="quick-link-icon">📈</div>
                    <div className="quick-link-label">Reports</div>
                  </div>
                </div>
              </div>
              
              <div className="dashboard-section announcements">
                <h3>Announcements</h3>
                <div className="announcements-list">
                  <div className="announcement-item">
                    <div className="announcement-title">Holiday Notice</div>
                    <div className="announcement-content">
                      Campus will be closed on November 20th for maintenance work.
                    </div>
                    <div className="announcement-time">3 days ago</div>
                  </div>
                  <div className="announcement-item">
                    <div className="announcement-title">New Portal Update</div>
                    <div className="announcement-content">
                      Faculty portal has been updated with new features for better user experience.
                    </div>
                    <div className="announcement-time">1 week ago</div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      
      default:
        // Find the route info from TEACHER_ROUTES
        const routeInfo = findRouteByKey(activeSection);
        if (routeInfo) {
          return (
            <div className="page-content">
              <h2>{routeInfo.title}</h2>
              <p>{routeInfo.description}</p>
            </div>
          );
        }
        
        return (
          <div className="page-content">
            <h2>Page Not Found</h2>
            <p>The requested page could not be found.</p>
          </div>
        );
    }
  };

  return (
    <div className="teacher-dashboard">
      {/* Sidebar */}
      <div 
        className="teacher-sidebar"
        onMouseEnter={() => setSidebarHovered(true)}
        onMouseLeave={() => {
          setSidebarHovered(false);
          setExpandedMenus({});
        }}
      >
        <div className="sidebar-header">
          <div className="logo-container">
            <img src="/api/placeholder/40/40" alt="IARE" className="logo-img" />
            <span className="logo-text">IARE</span>
          </div>
        </div>
        
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search for menu.." 
            className="sidebar-search"
          />
        </div>

        <nav className="sidebar-nav">
          {sidebarItems.map(item => (
            <div key={item.key} className="nav-group">
              <div 
                className={`nav-item ${activeSection === item.key ? 'active' : ''}`}
                onClick={() => {
                  handleNavigation(item.key);
                  if (item.hasSubmenu && sidebarHovered) {
                    toggleMenu(item.key);
                  }
                }}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
                {item.hasSubmenu && (
                  <span className={`nav-arrow ${expandedMenus[item.key] ? 'expanded' : ''}`}>
                    ▼
                  </span>
                )}
              </div>
              
              {item.hasSubmenu && expandedMenus[item.key] && (
                <div className="submenu">
                  {item.submenu.map((subItem, index) => (
                    <div 
                      key={index} 
                      className={`submenu-item ${activeSection === subItem.key ? 'active' : ''}`}
                      onClick={() => handleNavigation(subItem.key)}
                    >
                      <span className="submenu-dot">●</span>
                      <span className="submenu-label">{subItem.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="teacher-main">
        {/* Header */}
        <header className="teacher-header">
          <div className="header-left">
            <button className="menu-btn">☰</button>
            <span className="breadcrumb-text">&lt;Faculty&gt;</span>
            <nav className="header-nav">
              <span className="nav-link">Home</span>
              <span className="nav-link">Contact</span>
              <span className="nav-link sign-out" onClick={onLogout}>Sign out</span>
            </nav>
          </div>
          <div className="header-right">
            <div className="notification-icon">🔔</div>
            <div className="user-profile">
              <img src="/api/placeholder/32/32" alt="Profile" className="profile-img" />
              <span className="user-name">Ms. GANGARANI</span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="dashboard-content">
          <div className="page-title">
            <h1>{activeSection === 'dashboard' ? 'Dashboard' : sidebarItems.find(item => item.key === activeSection)?.label || 'Page'}</h1>
            <div className="breadcrumb">
              <span className="breadcrumb-link">Home</span> / <span>{activeSection === 'dashboard' ? 'Dashboard' : sidebarItems.find(item => item.key === activeSection)?.label || 'Page'}</span>
            </div>
          </div>

          {renderMainContent()}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
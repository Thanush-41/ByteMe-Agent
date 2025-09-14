import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCurrentTeacherRoute } from '../constants/teacherRoutes';
import './TeacherDashboard.css';

// Import teacher pages
import NominalRolls from './academics/NominalRolls';
import ActivityDiaryUG from './academics/ActivityDiaryUG';
import DateWiseActivity from './academics/DateWiseActivity';
import SectionTimetable from './academics/SectionTimetable';
import Subjects from './academics/Subjects';
import StaffTimetable from './academics/StaffTimetable';
import ActivityDiaryAccelerated from './academics/ActivityDiaryAccelerated';
import PastPendingActivityDiary from './academics/PastPendingActivityDiary';
import ActivityDiaryPAT from './academics/ActivityDiaryPAT';
import ActivityDiaryRemedial from './academics/ActivityDiaryRemedial';
import ActivityReport from './academics/ActivityReport';
import ICTStudioSlotBooking from './academics/ICTStudioSlotBooking';
import AATRegistration from './academics/AATRegistration';
import AttendanceRegister from './academics/AttendanceRegister';
import ProjectApproval from './academics/ProjectApproval';
import ProjectTitles from './academics/ProjectTitles';
import ScheduleOfInstructions from './academics/ScheduleOfInstructions';
import LORRequest from './academics/LORRequest';
import AttendingActivityEvents from './academics/AttendingActivityEvents';
import LibraryBooksIssued from './academics/LibraryBooksIssued';

import AAT from './evaluations/AAT';
import AATII from './evaluations/AATII';
import Labs from './evaluations/Labs';

import Payroll from './administrative/Payroll';
import TDS from './administrative/TDS';
import Reports from './administrative/Reports';
import Leave from './administrative/Leave';

import FacultyUploads from './uploads/FacultyUploads';
import ServiceRegister from './service/ServiceRegister';

const TeacherDashboard = ({ onLogout }) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [expandedDropdowns, setExpandedDropdowns] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get current route from URL - this will make URLs work like /?section=nominal-rolls
  const currentPage = getCurrentTeacherRoute(location);
  
  const handleNavigation = (routeKey) => {
    if (routeKey === 'dashboard') {
      navigate('/?teacher=true');
    } else {
      navigate(`/?teacher=true&section=${routeKey}`);
    }
  };

  const toggleDropdown = (dropdownKey) => {
    setExpandedDropdowns(prev => ({
      ...prev,
      [dropdownKey]: !prev[dropdownKey]
    }));
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <div className="dashboard-content">
            {/* Stats Cards Row */}
            <div className="stats-container">
              <div className="metric-card green">
                <div className="metric-number">255</div>
                <div className="metric-label">TODAY VISITORS</div>
                <div className="metric-footer">More info →</div>
              </div>
              
              <div className="metric-card yellow">
                <div className="metric-number">6105</div>
                <div className="metric-label">STUDENTS</div>
                <div className="metric-footer">More info →</div>
              </div>
              
              <div className="metric-card red">
                <div className="metric-number">23910501</div>
                <div className="metric-label">TOTAL VISITORS</div>
                <div className="metric-footer">More info →</div>
              </div>
            </div>

            {/* Notifications and MyBox Section */}
            <div className="content-sections">
              <div className="notifications-section">
                <h3>🔔 Notifications</h3>
                <div className="notification-item">
                  <p>New course content uploaded for Advanced Algorithms</p>
                  <small>2 hours ago</small>
                </div>
                <div className="notification-item">
                  <p>Assignment submissions due tomorrow</p>
                  <small>1 day ago</small>
                </div>
                <div className="notification-item">
                  <p>Faculty meeting scheduled for Friday</p>
                  <small>3 days ago</small>
                </div>
              </div>
              
              <div className="mybox-section">
                <h3>📦 My Box</h3>
                <div className="mybox-item">
                  <p>Grade submissions for Semester 1</p>
                  <small>Pending review</small>
                </div>
                <div className="mybox-item">
                  <p>Research paper submission</p>
                  <small>Draft saved</small>
                </div>
                <div className="mybox-item">
                  <p>Conference registration</p>
                  <small>Completed</small>
                </div>
              </div>
            </div>
          </div>
        );

      // Academic pages
      case 'nominal-rolls':
        return <NominalRolls />;
      case 'activity-diary-ug':
        return <ActivityDiaryUG />;
      case 'date-wise-activity':
        return <DateWiseActivity />;
      case 'section-timetable':
        return <SectionTimetable />;
      case 'subjects':
        return <Subjects />;
      case 'staff-timetable':
        return <StaffTimetable />;
      case 'activity-diary-accelerated':
        return <ActivityDiaryAccelerated />;
      case 'past-pending-activity-diary':
        return <PastPendingActivityDiary />;
      case 'activity-diary-pat':
        return <ActivityDiaryPAT />;
      case 'activity-diary-remedial':
        return <ActivityDiaryRemedial />;
      case 'activity-report':
        return <ActivityReport />;
      case 'ict-studio-slot-booking':
        return <ICTStudioSlotBooking />;
      case 'aat-registration':
        return <AATRegistration />;
      case 'attendance-register':
        return <AttendanceRegister />;
      case 'project-approval':
        return <ProjectApproval />;
      case 'project-titles':
        return <ProjectTitles />;
      case 'schedule-of-instructions':
        return <ScheduleOfInstructions />;
      case 'lor-request':
        return <LORRequest />;
      case 'attending-activity-events':
        return <AttendingActivityEvents />;
      case 'library-books-issued':
        return <LibraryBooksIssued />;

      // Evaluation pages
      case 'aat':
        return <AAT />;
      case 'aat-ii':
        return <AATII />;
      case 'labs':
        return <Labs />;

      // Administrative pages
      case 'payroll':
        return <Payroll />;
      case 'tds':
        return <TDS />;
      case 'reports':
        return <Reports />;
      case 'leave':
        return <Leave />;

      // Upload and Service pages
      case 'faculty-uploads':
        return <FacultyUploads />;
      case 'service-register':
        return <ServiceRegister />;

      default:
        return <div className="page-content">Page not found: {currentPage}</div>;
    }
  };

  return (
    <div className="teacher-dashboard">
      {/* Top Navigation Bar - Fixed at top */}
      <div className="dashboard-navbar">
        <div className="navbar-left">
          <div className="navbar-title">
            <h1>Dashboard</h1>
            <div className="breadcrumb">
              <span className="breadcrumb-link">Home</span> 
              <span className="breadcrumb-separator">/</span> 
              <span className="breadcrumb-current">Dashboard</span>
            </div>
          </div>
        </div>
        
        <div className="navbar-right">
          <div className="notification-icon">
            🔔
            <span className="notification-badge">3</span>
          </div>
          
          <div className="user-profile">
            <div className="user-avatar">👨‍🏫</div>
            <div className="user-info">
              <span className="user-name">Teacher</span>
              <span className="user-role">Faculty</span>
            </div>
          </div>
          
          <div className="navbar-actions">
            <button className="sign-out-btn" onClick={onLogout}>Sign out</button>
          </div>
        </div>
      </div>

      {/* Main Container with Sidebar and Content */}
      <div className="dashboard-main-container">
        <div 
          className={`teacher-sidebar ${isSidebarExpanded ? 'expanded' : 'collapsed'}`}
          onMouseEnter={() => setIsSidebarExpanded(true)}
          onMouseLeave={() => setIsSidebarExpanded(false)}
        >
          <div className="sidebar-content">
            <div className="sidebar-header">
              <div className="logo-container">
                <div className="logo-img">🎯</div>
                <span className="logo-text">IARE</span>
              </div>
            </div>
            
            {/* Search Bar */}
            {isSidebarExpanded && (
              <div className="sidebar-search">
                <input type="text" placeholder="Search for menu..." className="search-input" />
              </div>
            )}
            
            <nav className="sidebar-nav">
              <div className="nav-item active" onClick={() => handleNavigation('dashboard')}>
                <span className="nav-icon">📊</span>
                <span className="nav-label">Dashboard</span>
              </div>
              
              {/* Time Table with Dropdown */}
              <div className="nav-item dropdown">
                <div 
                  className="nav-item-main" 
                  onClick={() => toggleDropdown('timetable')}
                >
                  <span className="nav-icon">📅</span>
                  <span className="nav-label">Time Table</span>
                  {isSidebarExpanded && (
                    <span className={`dropdown-arrow ${expandedDropdowns.timetable ? 'expanded' : ''}`}>▼</span>
                  )}
                </div>
                {expandedDropdowns.timetable && isSidebarExpanded && (
                  <div className="dropdown-menu">
                    <div className="dropdown-item" onClick={() => handleNavigation('activity-diary-ug')}>
                      <span className="submenu-icon">✓</span>
                      <span className="submenu-label">Activity Diary UG</span>
                    </div>
                    <div className="dropdown-item" onClick={() => handleNavigation('activity-diary-pg')}>
                      <span className="submenu-icon">✓</span>
                      <span className="submenu-label">Activity Diary PG</span>
                    </div>
                    <div className="dropdown-item" onClick={() => handleNavigation('date-wise-activity')}>
                      <span className="submenu-icon">✓</span>
                      <span className="submenu-label">Date Wise Activity</span>
                    </div>
                    <div className="dropdown-item" onClick={() => handleNavigation('section-timetable')}>
                      <span className="submenu-icon">✓</span>
                      <span className="submenu-label">Section Timetable</span>
                    </div>
                    <div className="dropdown-item" onClick={() => handleNavigation('central-timetable')}>
                      <span className="submenu-icon">✓</span>
                      <span className="submenu-label">Central Timetable</span>
                    </div>
                    <div className="dropdown-item" onClick={() => handleNavigation('faculty-timetable')}>
                      <span className="submenu-icon">✓</span>
                      <span className="submenu-label">Faculty Timetable</span>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Academics with Dropdown */}
              <div className="nav-item dropdown">
                <div 
                  className="nav-item-main" 
                  onClick={() => toggleDropdown('academics')}
                >
                  <span className="nav-icon">🏛️</span>
                  <span className="nav-label">Academics</span>
                  {isSidebarExpanded && (
                    <span className={`dropdown-arrow ${expandedDropdowns.academics ? 'expanded' : ''}`}>▼</span>
                  )}
                </div>
                {expandedDropdowns.academics && isSidebarExpanded && (
                  <div className="dropdown-menu">
                    <div className="dropdown-item" onClick={() => handleNavigation('nominal-rolls')}>
                      <span className="submenu-icon">✓</span>
                      <span className="submenu-label">Nominal Rolls</span>
                    </div>
                    <div className="dropdown-item" onClick={() => handleNavigation('activity-diary-ug')}>
                      <span className="submenu-icon">✓</span>
                      <span className="submenu-label">Activity Diary UG</span>
                    </div>
                    <div className="dropdown-item" onClick={() => handleNavigation('date-wise-activity')}>
                      <span className="submenu-icon">✓</span>
                      <span className="submenu-label">Date Wise Activity</span>
                    </div>
                    <div className="dropdown-item" onClick={() => handleNavigation('section-timetable')}>
                      <span className="submenu-icon">✓</span>
                      <span className="submenu-label">Section Timetable</span>
                    </div>
                    <div className="dropdown-item" onClick={() => handleNavigation('subjects')}>
                      <span className="submenu-icon">✓</span>
                      <span className="submenu-label">Subjects</span>
                    </div>
                    <div className="dropdown-item" onClick={() => handleNavigation('staff-timetable')}>
                      <span className="submenu-icon">✓</span>
                      <span className="submenu-label">Staff Timetable</span>
                    </div>
                    <div className="dropdown-item" onClick={() => handleNavigation('activity-diary-accelerated')}>
                      <span className="submenu-icon">✓</span>
                      <span className="submenu-label">Activity Diary Accelerated</span>
                    </div>
                    <div className="dropdown-item" onClick={() => handleNavigation('past-pending-activity-diary')}>
                      <span className="submenu-icon">✓</span>
                      <span className="submenu-label">Past/Pending Activity Diary</span>
                    </div>
                    <div className="dropdown-item" onClick={() => handleNavigation('activity-diary-pat')}>
                      <span className="submenu-icon">✓</span>
                      <span className="submenu-label">Activity Diary PAT</span>
                    </div>
                    <div className="dropdown-item" onClick={() => handleNavigation('activity-diary-remedial')}>
                      <span className="submenu-icon">✓</span>
                      <span className="submenu-label">Activity Diary Remedial</span>
                    </div>
                    <div className="dropdown-item" onClick={() => handleNavigation('activity-report')}>
                      <span className="submenu-icon">✓</span>
                      <span className="submenu-label">Activity Report</span>
                    </div>
                    <div className="dropdown-item" onClick={() => handleNavigation('ict-studio-slot-booking')}>
                      <span className="submenu-icon">✓</span>
                      <span className="submenu-label">ICT Studio Slot Booking</span>
                    </div>
                    <div className="dropdown-item" onClick={() => handleNavigation('aat-registration')}>
                      <span className="submenu-icon">✓</span>
                      <span className="submenu-label">AAT Registration</span>
                    </div>
                    <div className="dropdown-item" onClick={() => handleNavigation('attendance-register')}>
                      <span className="submenu-icon">✓</span>
                      <span className="submenu-label">Attendance Register</span>
                    </div>
                    <div className="dropdown-item" onClick={() => handleNavigation('project-approval')}>
                      <span className="submenu-icon">✓</span>
                      <span className="submenu-label">Project Approval</span>
                    </div>
                    <div className="dropdown-item" onClick={() => handleNavigation('project-titles')}>
                      <span className="submenu-icon">✓</span>
                      <span className="submenu-label">Project Titles</span>
                    </div>
                    <div className="dropdown-item" onClick={() => handleNavigation('schedule-of-instructions')}>
                      <span className="submenu-icon">✓</span>
                      <span className="submenu-label">Schedule of Instructions</span>
                    </div>
                    <div className="dropdown-item" onClick={() => handleNavigation('lor-request')}>
                      <span className="submenu-icon">✓</span>
                      <span className="submenu-label">LOR Request</span>
                    </div>
                    <div className="dropdown-item" onClick={() => handleNavigation('attending-activity-events')}>
                      <span className="submenu-icon">✓</span>
                      <span className="submenu-label">Attending Activity Events</span>
                    </div>
                    <div className="dropdown-item" onClick={() => handleNavigation('library-books-issued')}>
                      <span className="submenu-icon">✓</span>
                      <span className="submenu-label">Library Books Issued</span>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Labs with Dropdown */}
              <div className="nav-item dropdown">
                <div 
                  className="nav-item-main" 
                  onClick={() => toggleDropdown('labs')}
                >
                  <span className="nav-icon">🔬</span>
                  <span className="nav-label">Labs</span>
                  {isSidebarExpanded && (
                    <span className={`dropdown-arrow ${expandedDropdowns.labs ? 'expanded' : ''}`}>▼</span>
                  )}
                </div>
                {expandedDropdowns.labs && isSidebarExpanded && (
                  <div className="dropdown-menu">
                    <div className="dropdown-item" onClick={() => handleNavigation('labs')}>
                      <span className="submenu-icon">✓</span>
                      <span className="submenu-label">Labs</span>
                    </div>
                    <div className="dropdown-item" onClick={() => handleNavigation('see-lab-marks')}>
                      <span className="submenu-icon">✓</span>
                      <span className="submenu-label">SEE Lab Marks</span>
                    </div>
                    <div className="dropdown-item" onClick={() => handleNavigation('cie-lab-marks')}>
                      <span className="submenu-icon">✓</span>
                      <span className="submenu-label">CIE Lab Marks</span>
                    </div>
                    <div className="dropdown-item" onClick={() => handleNavigation('lab-assignments')}>
                      <span className="submenu-icon">✓</span>
                      <span className="submenu-label">Lab Assignments</span>
                    </div>
                    <div className="dropdown-item" onClick={() => handleNavigation('lab-attendance')}>
                      <span className="submenu-icon">✓</span>
                      <span className="submenu-label">Lab Attendance</span>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="nav-item" onClick={() => handleNavigation('lor-request')}>
                <span className="nav-icon">✅</span>
                <span className="nav-label">LOR Request</span>
              </div>
              
              <div className="nav-item" onClick={() => handleNavigation('attending-activity')}>
                <span className="nav-icon">📋</span>
                <span className="nav-label">Attending Activity / Events</span>
              </div>
              
              <div className="nav-item" onClick={() => handleNavigation('accession-register')}>
                <span className="nav-icon">🚗</span>
                <span className="nav-label">Accession Register</span>
              </div>
              
              <div className="nav-item" onClick={() => handleNavigation('library-books')}>
                <span className="nav-icon">📚</span>
                <span className="nav-label">Library Books Issued</span>
              </div>
              
              {/* Evaluations with Dropdown */}
              <div className="nav-item dropdown">
                <div 
                  className="nav-item-main" 
                  onClick={() => toggleDropdown('evaluations')}
                >
                  <span className="nav-icon">✅</span>
                  <span className="nav-label">Evaluations</span>
                  {isSidebarExpanded && (
                    <span className={`dropdown-arrow ${expandedDropdowns.evaluations ? 'expanded' : ''}`}>▼</span>
                  )}
                </div>
                {expandedDropdowns.evaluations && isSidebarExpanded && (
                  <div className="dropdown-menu">
                    <div className="dropdown-item" onClick={() => handleNavigation('aat')}>
                      <span className="submenu-icon">✓</span>
                      <span className="submenu-label">AAT</span>
                    </div>
                    <div className="dropdown-item" onClick={() => handleNavigation('aat-ii')}>
                      <span className="submenu-icon">✓</span>
                      <span className="submenu-label">AAT-II</span>
                    </div>
                    <div className="dropdown-item" onClick={() => handleNavigation('exam-registration')}>
                      <span className="submenu-icon">✓</span>
                      <span className="submenu-label">Exam Registration</span>
                    </div>
                    <div className="dropdown-item" onClick={() => handleNavigation('admit-card')}>
                      <span className="submenu-icon">✓</span>
                      <span className="submenu-label">Admit Card</span>
                    </div>
                    <div className="dropdown-item" onClick={() => handleNavigation('exam-result')}>
                      <span className="submenu-icon">✓</span>
                      <span className="submenu-label">Exam Result</span>
                    </div>
                    <div className="dropdown-item" onClick={() => handleNavigation('cia-marks')}>
                      <span className="submenu-icon">✓</span>
                      <span className="submenu-label">CIA Marks</span>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Payroll with Dropdown */}
              <div className="nav-item dropdown">
                <div 
                  className="nav-item-main" 
                  onClick={() => toggleDropdown('payroll')}
                >
                  <span className="nav-icon">₹</span>
                  <span className="nav-label">Payroll</span>
                  {isSidebarExpanded && (
                    <span className={`dropdown-arrow ${expandedDropdowns.payroll ? 'expanded' : ''}`}>▼</span>
                  )}
                </div>
                {expandedDropdowns.payroll && isSidebarExpanded && (
                  <div className="dropdown-menu">
                    <div className="dropdown-item" onClick={() => handleNavigation('payroll')}>
                      <span className="submenu-icon">✓</span>
                      <span className="submenu-label">Payroll</span>
                    </div>
                    <div className="dropdown-item" onClick={() => handleNavigation('salary-slip')}>
                      <span className="submenu-icon">✓</span>
                      <span className="submenu-label">Salary Slip</span>
                    </div>
                    <div className="dropdown-item" onClick={() => handleNavigation('pay-statement')}>
                      <span className="submenu-icon">✓</span>
                      <span className="submenu-label">Pay Statement</span>
                    </div>
                    <div className="dropdown-item" onClick={() => handleNavigation('tax-declaration')}>
                      <span className="submenu-icon">✓</span>
                      <span className="submenu-label">Tax Declaration</span>
                    </div>
                    <div className="dropdown-item" onClick={() => handleNavigation('provident-fund')}>
                      <span className="submenu-icon">✓</span>
                      <span className="submenu-label">Provident Fund</span>
                    </div>
                  </div>
                )}
              </div>
              
              {/* TDS with Dropdown */}
              <div className="nav-item dropdown">
                <div 
                  className="nav-item-main" 
                  onClick={() => toggleDropdown('tds')}
                >
                  <span className="nav-icon">📊</span>
                  <span className="nav-label">TDS</span>
                  {isSidebarExpanded && (
                    <span className={`dropdown-arrow ${expandedDropdowns.tds ? 'expanded' : ''}`}>▼</span>
                  )}
                </div>
                {expandedDropdowns.tds && isSidebarExpanded && (
                  <div className="dropdown-menu">
                    <div className="dropdown-item" onClick={() => handleNavigation('tds')}>
                      <span className="submenu-icon">✓</span>
                      <span className="submenu-label">TDS</span>
                    </div>
                    <div className="dropdown-item" onClick={() => handleNavigation('tds-certificate')}>
                      <span className="submenu-icon">✓</span>
                      <span className="submenu-label">TDS Certificate</span>
                    </div>
                    <div className="dropdown-item" onClick={() => handleNavigation('form-16')}>
                      <span className="submenu-icon">✓</span>
                      <span className="submenu-label">Form 16</span>
                    </div>
                    <div className="dropdown-item" onClick={() => handleNavigation('tds-statement')}>
                      <span className="submenu-icon">✓</span>
                      <span className="submenu-label">TDS Statement</span>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Reports with Dropdown */}
              <div className="nav-item dropdown">
                <div 
                  className="nav-item-main" 
                  onClick={() => toggleDropdown('reports')}
                >
                  <span className="nav-icon">📊</span>
                  <span className="nav-label">Reports</span>
                  {isSidebarExpanded && (
                    <span className={`dropdown-arrow ${expandedDropdowns.reports ? 'expanded' : ''}`}>▼</span>
                  )}
                </div>
                {expandedDropdowns.reports && isSidebarExpanded && (
                  <div className="dropdown-menu">
                    <div className="dropdown-item" onClick={() => handleNavigation('reports')}>
                      <span className="submenu-icon">✓</span>
                      <span className="submenu-label">Reports</span>
                    </div>
                    <div className="dropdown-item" onClick={() => handleNavigation('student-reports')}>
                      <span className="submenu-icon">✓</span>
                      <span className="submenu-label">Student Reports</span>
                    </div>
                    <div className="dropdown-item" onClick={() => handleNavigation('faculty-reports')}>
                      <span className="submenu-icon">✓</span>
                      <span className="submenu-label">Faculty Reports</span>
                    </div>
                    <div className="dropdown-item" onClick={() => handleNavigation('attendance-reports')}>
                      <span className="submenu-icon">✓</span>
                      <span className="submenu-label">Attendance Reports</span>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Question Paper with Dropdown */}
              <div className="nav-item dropdown">
                <div 
                  className="nav-item-main" 
                  onClick={() => toggleDropdown('question-paper')}
                >
                  <span className="nav-icon">❓</span>
                  <span className="nav-label">Question Paper & Scheme of Evaluation</span>
                  {isSidebarExpanded && (
                    <span className={`dropdown-arrow ${expandedDropdowns['question-paper'] ? 'expanded' : ''}`}>▼</span>
                  )}
                </div>
                {expandedDropdowns['question-paper'] && isSidebarExpanded && (
                  <div className="dropdown-menu">
                    <div className="dropdown-item" onClick={() => handleNavigation('question-papers')}>
                      <span className="submenu-icon">✓</span>
                      <span className="submenu-label">Question Papers</span>
                    </div>
                    <div className="dropdown-item" onClick={() => handleNavigation('evaluation-scheme')}>
                      <span className="submenu-icon">✓</span>
                      <span className="submenu-label">Evaluation Scheme</span>
                    </div>
                    <div className="dropdown-item" onClick={() => handleNavigation('model-papers')}>
                      <span className="submenu-icon">✓</span>
                      <span className="submenu-label">Model Papers</span>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Leave with Dropdown */}
              <div className="nav-item dropdown">
                <div 
                  className="nav-item-main" 
                  onClick={() => toggleDropdown('leave')}
                >
                  <span className="nav-icon">ℹ️</span>
                  <span className="nav-label">Leave</span>
                  {isSidebarExpanded && (
                    <span className={`dropdown-arrow ${expandedDropdowns.leave ? 'expanded' : ''}`}>▼</span>
                  )}
                </div>
                {expandedDropdowns.leave && isSidebarExpanded && (
                  <div className="dropdown-menu">
                    <div className="dropdown-item" onClick={() => handleNavigation('leave')}>
                      <span className="submenu-icon">✓</span>
                      <span className="submenu-label">Leave</span>
                    </div>
                    <div className="dropdown-item" onClick={() => handleNavigation('apply-leave')}>
                      <span className="submenu-icon">✓</span>
                      <span className="submenu-label">Apply Leave</span>
                    </div>
                    <div className="dropdown-item" onClick={() => handleNavigation('leave-status')}>
                      <span className="submenu-icon">✓</span>
                      <span className="submenu-label">Leave Status</span>
                    </div>
                    <div className="dropdown-item" onClick={() => handleNavigation('leave-balance')}>
                      <span className="submenu-icon">✓</span>
                      <span className="submenu-label">Leave Balance</span>
                    </div>
                    <div className="dropdown-item" onClick={() => handleNavigation('leave-history')}>
                      <span className="submenu-icon">✓</span>
                      <span className="submenu-label">Leave History</span>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Faculty Uploads with Dropdown */}
              <div className="nav-item dropdown">
                <div 
                  className="nav-item-main" 
                  onClick={() => toggleDropdown('faculty-uploads')}
                >
                  <span className="nav-icon">👥</span>
                  <span className="nav-label">Faculty Uploads</span>
                  {isSidebarExpanded && (
                    <span className={`dropdown-arrow ${expandedDropdowns['faculty-uploads'] ? 'expanded' : ''}`}>▼</span>
                  )}
                </div>
                {expandedDropdowns['faculty-uploads'] && isSidebarExpanded && (
                  <div className="dropdown-menu">
                    <div className="dropdown-item" onClick={() => handleNavigation('faculty-uploads')}>
                      <span className="submenu-icon">✓</span>
                      <span className="submenu-label">Faculty Uploads</span>
                    </div>
                    <div className="dropdown-item" onClick={() => handleNavigation('assignment-uploads')}>
                      <span className="submenu-icon">✓</span>
                      <span className="submenu-label">Assignment Uploads</span>
                    </div>
                    <div className="dropdown-item" onClick={() => handleNavigation('material-uploads')}>
                      <span className="submenu-icon">✓</span>
                      <span className="submenu-label">Material Uploads</span>
                    </div>
                    <div className="dropdown-item" onClick={() => handleNavigation('document-uploads')}>
                      <span className="submenu-icon">✓</span>
                      <span className="submenu-label">Document Uploads</span>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="nav-item" onClick={() => handleNavigation('biometric')}>
                <span className="nav-icon">👆</span>
                <span className="nav-label">Biometric</span>
              </div>
              
              {/* Service Register with Dropdown */}
              <div className="nav-item dropdown">
                <div 
                  className="nav-item-main" 
                  onClick={() => toggleDropdown('service-register')}
                >
                  <span className="nav-icon">📹</span>
                  <span className="nav-label">Service Register</span>
                  {isSidebarExpanded && (
                    <span className={`dropdown-arrow ${expandedDropdowns['service-register'] ? 'expanded' : ''}`}>▼</span>
                  )}
                </div>
                {expandedDropdowns['service-register'] && isSidebarExpanded && (
                  <div className="dropdown-menu">
                    <div className="dropdown-item" onClick={() => handleNavigation('service-register')}>
                      <span className="submenu-icon">✓</span>
                      <span className="submenu-label">Service Register</span>
                    </div>
                    <div className="dropdown-item" onClick={() => handleNavigation('service-history')}>
                      <span className="submenu-icon">✓</span>
                      <span className="submenu-label">Service History</span>
                    </div>
                    <div className="dropdown-item" onClick={() => handleNavigation('service-record')}>
                      <span className="submenu-icon">✓</span>
                      <span className="submenu-label">Service Record</span>
                    </div>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>

        {renderContent()}
      </div>
    </div>
  );
};

export default TeacherDashboard;
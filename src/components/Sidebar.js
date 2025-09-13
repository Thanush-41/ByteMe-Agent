import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ activeSection, onSectionChange }) => {
  const [expandedSections, setExpandedSections] = useState({
    academics: false,
    'course-registration': false,
    requisitions: false,
    'print-forms': false,
    payments: false,
    uploads: false,
    feedback: false
  });
  const [isHovered, setIsHovered] = useState(false);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '📊',
      type: 'single'
    },
    {
      id: 'examinations',
      label: 'Examinations',
      icon: '📝',
      type: 'single'
    },
    {
      id: 'confetti-night',
      label: 'Confetti Night Registration',
      icon: '🎉',
      type: 'single'
    },
    {
      id: 'internship',
      label: 'Internship Program Registration',
      icon: '💼',
      type: 'single'
    },
    {
      id: 'academics',
      label: 'Academics',
      icon: '🎓',
      type: 'expandable',
      expanded: expandedSections.academics,
      children: [
        { id: 'course-content', label: 'Course Content Delivery' },
        { 
          id: 'course-registration', 
          label: 'Course Registration',
          type: 'expandable',
          expanded: expandedSections['course-registration'],
          children: [
            { id: 'regular-courses', label: 'Regular Courses', type: 'single' },
            { id: 're-registration', label: 'Re-Registration', type: 'single' },
            { id: 'accelerated-courses', label: 'Accelerated Courses', type: 'single' },
            { id: 'plar-courses', label: 'PLAR Courses', type: 'single' },
            { id: 'plar-foreign-courses', label: 'PLAR Foreign Courses', type: 'single' },
            { id: 'aicte-lite-program', label: 'AICTE LITE Program Reg', type: 'single' }
          ]
        },
        { id: 'attendance', label: 'Attendance' },
        { id: 'pat-attendance', label: 'PAT Attendance' },
        { id: 'project-selection', label: 'Project Selection & Allotment' },
        { id: 'aat-questions', label: 'AAT Question Selection' },
        { id: 'project-team', label: 'Project Team Member Selection' },
        { id: 'project-work', label: 'Project Work/Thesis Report' }
      ]
    },
    {
      id: 'requisitions',
      label: 'Requisitions',
      icon: '📋',
      type: 'expandable',
      expanded: expandedSections.requisitions,
      children: [
        { id: 'certificate-request', label: 'Certificate Request' },
        { id: 'transcript-duplicate', label: 'Transcript / Duplicate / Name Change' },
        { id: 'skill-program', label: 'Skill Program' }
      ]
    },
    {
      id: 'print-forms',
      label: 'Print Forms',
      icon: '🖨️',
      type: 'expandable',
      expanded: expandedSections['print-forms'],
      children: [
        { id: 'no-dues', label: 'No Dues' },
        { id: 'tc-form', label: 'TC Form' }
      ]
    },
    {
      id: 'accession-register',
      label: 'Accession Register',
      icon: '📖',
      type: 'single'
    },
    {
      id: 'payments',
      label: 'Payments',
      icon: '💳',
      type: 'expandable',
      expanded: expandedSections.payments,
      children: [
        { id: 'online-fees-payment', label: 'Online Fees Payment' },
        { id: 'online-fees-payment-ccav', label: 'Online Fees Payment CCAV' },
        { id: 'fee-status', label: 'Fee Status' }
      ]
    },
    {
      id: 'timetable',
      label: 'Timetable',
      icon: '⏰',
      type: 'single'
    },
    {
      id: 'uploads',
      label: 'Uploads',
      icon: '📤',
      type: 'expandable',
      expanded: expandedSections.uploads,
      children: [
        { id: 'upload-cvc', label: 'Upload CVC Certificate' },
        { id: 'aat-tech-talk', label: 'AAT (Tech Talk)' },
        { id: 'aat-concept-video', label: 'AAT (Concept Video)' },
        { id: 'aat-ii', label: 'AAT-II' },
        { id: 'aat-i', label: 'AAT-I' },
        { id: 'lab-record', label: 'Lab Record' }
      ]
    },
    {
      id: 'biometric',
      label: 'Biometric',
      icon: '👆',
      type: 'single'
    },
    {
      id: 'feedback',
      label: 'Feedback',
      icon: '💬',
      type: 'expandable',
      expanded: expandedSections.feedback,
      children: [
        { id: 'early-semester-feedback', label: 'Early Semester Feedback' },
        { id: 'obe-feedback', label: 'OBE Feedback' },
        { id: 'design-review-syllabus', label: 'Design and Review of Syllabus' },
        { id: 'satisfaction-survey', label: 'Satisfaction Survey' },
        { id: 'placement-experience', label: 'Placement Experience' },
        { id: 'naac-survey', label: 'NAAC SURVEY' }
      ]
    },
    {
      id: 'bonafide',
      label: 'Bonafide Certificate',
      icon: '📜',
      type: 'single'
    },
    {
      id: 'my-box',
      label: 'My Box',
      icon: '📦',
      type: 'single'
    },
    {
      id: 'upload-birth',
      label: 'Upload Birth Certificate',
      icon: '📄',
      type: 'single'
    },
    {
      id: 'update-academic-bank',
      label: 'Update Academic Bank of Credits',
      icon: '📝',
      type: 'single'
    }
  ];

  return (
    <div 
      className={`sidebar ${isHovered ? 'sidebar-expanded' : 'sidebar-collapsed'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-icon">🏛️</span>
          {isHovered && <span className="logo-text">IARE</span>}
        </div>
        {isHovered && (
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Search for menu.." 
              className="search-input"
            />
          </div>
        )}
      </div>
      
      <div className="sidebar-menu">
        {menuItems.map((item) => (
          <div key={item.id} className="menu-item">
            <div 
              className={`menu-link ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => {
                if (item.type === 'expandable') {
                  toggleSection(item.id);
                } else {
                  onSectionChange(item.id);
                }
              }}
            >
              <span className="menu-icon">{item.icon}</span>
              {isHovered && <span className="menu-label">{item.label}</span>}
              {item.type === 'expandable' && isHovered && (
                <span className={`expand-icon ${item.expanded ? 'expanded' : ''}`}>
                  ▼
                </span>
              )}
            </div>
            
            {item.type === 'expandable' && item.expanded && item.children && isHovered && (
              <div className="submenu">
                {item.children.map((child) => (
                  <div key={child.id} className="submenu-wrapper">
                    <div 
                      className={`submenu-item ${activeSection === child.id ? 'active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (child.type === 'expandable') {
                          toggleSection(child.id);
                        } else {
                          onSectionChange(child.id);
                        }
                      }}
                    >
                      <span className="submenu-icon">✓</span>
                      <span className="submenu-label">{child.label}</span>
                      {child.type === 'expandable' && (
                        <span className={`expand-icon ${child.expanded ? 'expanded' : ''}`}>
                          ▼
                        </span>
                      )}
                    </div>
                    
                    {child.type === 'expandable' && child.expanded && child.children && (
                      <div className="sub-submenu">
                        {child.children.map((subChild) => (
                          <div 
                            key={subChild.id}
                            className={`sub-submenu-item ${activeSection === subChild.id ? 'active' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              onSectionChange(subChild.id);
                            }}
                          >
                            <span className="sub-submenu-icon">•</span>
                            <span className="sub-submenu-label">{subChild.label}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
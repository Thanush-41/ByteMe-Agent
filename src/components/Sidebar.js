import React, { useState, useEffect } from 'react';
import './Sidebar.css';

const Sidebar = ({ activeSection, onSectionChange, onHoverChange }) => {
  const [expandedSections, setExpandedSections] = useState({
    academics: false,
    'course-registration': false,
    examinations: false,
    requisitions: false,
    'print-forms': false,
    payments: false,
    uploads: false,
    feedback: false
  });
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Auto-expand parent sections when a child is active
  React.useEffect(() => {
    const expandParentSections = (activeId) => {
      const newExpanded = { ...expandedSections };
      
      // Check each menu item and its children
      menuItems.forEach(item => {
        if (item.children) {
          // Check direct children
          const hasActiveChild = item.children.some(child => child.id === activeId);
          if (hasActiveChild) {
            newExpanded[item.id] = true;
          }
          
          // Check nested children
          item.children.forEach(child => {
            if (child.children) {
              const hasActiveNestedChild = child.children.some(nestedChild => nestedChild.id === activeId);
              if (hasActiveNestedChild) {
                newExpanded[item.id] = true;
                newExpanded[child.id] = true;
              }
            }
          });
        }
      });
      
      setExpandedSections(newExpanded);
    };

    if (activeSection) {
      expandParentSections(activeSection);
    }
  }, [activeSection]);

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
      type: 'expandable',
      children: [
        { id: 'cia-marks', label: 'CIA Marks' },
        { id: 'admit-card', label: 'Admit Card' },
        { id: 'exam-registration', label: 'Exam Registration' },
        { id: 'makeup-exam-registration', label: 'Makeup Exam Registration' },
        { id: 'exam-result', label: 'Exam Result' },
        { id: 'credit-register', label: 'Credit Register' },
        { id: 'booklets', label: 'Booklets' },
        { id: 'question-paper-solution', label: 'Question Paper and Solution' },
        { id: 'revaluation', label: 'Revaluation' },
        { id: 'remedial-exam-registration', label: 'Remedial Exam Registration' },
        { id: 'confetti-night-registration', label: 'Confetti Night Registration' },
        { id: 'internship-program-registration', label: 'Internship Program Registration' }
      ]
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
      children: [
        { id: 'course-content', label: 'Course Content Delivery' },
        { 
          id: 'course-registration', 
          label: 'Course Registration',
          type: 'expandable',
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
    <>
      {/* Mobile Menu Toggle Button */}
      {isMobile && (
        <button 
          className="mobile-menu-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
        >
          <span className="hamburger">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      )}

      {/* Mobile Overlay */}
      {isMobile && isMobileMenuOpen && (
        <div 
          className="mobile-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div 
        className={`sidebar ${
          isMobile 
            ? `sidebar-mobile ${isMobileMenuOpen ? 'sidebar-mobile-open' : ''}` 
            : isHovered ? 'sidebar-expanded' : 'sidebar-collapsed'
        }`}
        onMouseEnter={() => {
          if (!isMobile) {
            setIsHovered(true);
            onHoverChange?.(true);
          }
        }}
        onMouseLeave={() => {
          if (!isMobile) {
            setIsHovered(false);
            onHoverChange?.(false);
          }
        }}
      >
        <div className="sidebar-header">
          <div className="logo">
            <span className="logo-icon">🏛️</span>
            {(isHovered || isMobileMenuOpen) && <span className="logo-text">IARE Portal</span>}
          </div>
          {(isHovered || isMobileMenuOpen) && !isMobile && (
            <div className="search-container">
              <input 
                type="text" 
                placeholder="Search menu..." 
                className="search-input"
              />
            </div>
          )}
          {/* Close button for mobile */}
          {isMobile && isMobileMenuOpen && (
            <button 
              className="mobile-close-btn"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              ✕
            </button>
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
                    // Close mobile menu when item is selected
                    if (isMobile) {
                      setIsMobileMenuOpen(false);
                    }
                  }
                }}
              >
                <span className="menu-icon">{item.icon}</span>
                {(isHovered || isMobileMenuOpen) && <span className="menu-label">{item.label}</span>}
                {item.type === 'expandable' && (isHovered || isMobileMenuOpen) && (
                  <span className={`expand-icon ${expandedSections[item.id] ? 'expanded' : ''}`}>
                    ▼
                  </span>
                )}
              </div>
              
              {item.type === 'expandable' && expandedSections[item.id] && item.children && (isHovered || isMobileMenuOpen) && (
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
                            // Close mobile menu when item is selected
                            if (isMobile) {
                              setIsMobileMenuOpen(false);
                            }
                          }
                        }}
                      >
                        <span className="submenu-icon">•</span>
                        <span className="submenu-label">{child.label}</span>
                        {child.type === 'expandable' && (
                          <span className={`expand-icon ${expandedSections[child.id] ? 'expanded' : ''}`}>
                            ▼
                          </span>
                        )}
                      </div>
                      
                      {child.type === 'expandable' && expandedSections[child.id] && child.children && (
                        <div className="sub-submenu">
                          {child.children.map((subChild) => (
                            <div 
                              key={subChild.id}
                              className={`sub-submenu-item ${activeSection === subChild.id ? 'active' : ''}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                onSectionChange(subChild.id);
                                // Close mobile menu when item is selected
                                if (isMobile) {
                                  setIsMobileMenuOpen(false);
                                }
                              }}
                            >
                              <span className="sub-submenu-icon">→</span>
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
    </>
  );
};

export default Sidebar;
import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ activeSection, onSectionChange }) => {
  const [expandedSections, setExpandedSections] = useState({
    academics: false,
    requisitions: false,
    printForms: false,
    payments: false
  });

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
        { id: 'course-registration', label: 'Course Registration' },
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
      children: []
    },
    {
      id: 'print-forms',
      label: 'Print Forms',
      icon: '🖨️',
      type: 'expandable',
      expanded: expandedSections.printForms,
      children: []
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
      children: []
    },
    {
      id: 'timetable',
      label: 'Timetable',
      icon: '⏰',
      type: 'single'
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
    }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-icon">🏛️</span>
          <span className="logo-text">IARE</span>
        </div>
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
              <span className="menu-label">{item.label}</span>
              {item.type === 'expandable' && (
                <span className={`expand-icon ${item.expanded ? 'expanded' : ''}`}>
                  ▼
                </span>
              )}
            </div>
            
            {item.type === 'expandable' && item.expanded && item.children && (
              <div className="submenu">
                {item.children.map((child) => (
                  <div 
                    key={child.id}
                    className={`submenu-item ${activeSection === child.id ? 'active' : ''}`}
                    onClick={() => onSectionChange(child.id)}
                  >
                    <span className="submenu-icon">✓</span>
                    <span className="submenu-label">{child.label}</span>
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
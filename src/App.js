import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import './styles/App.css';

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'examinations':
        return <div className="page-content">Examinations page content</div>;
      case 'academics':
        return <div className="page-content">Academics page content</div>;
      case 'course-content':
        return <div className="page-content">Course Content Delivery</div>;
      case 'course-registration':
        return <div className="page-content">Course Registration</div>;
      case 'attendance':
        return <div className="page-content">Attendance</div>;
      case 'pat-attendance':
        return <div className="page-content">PAT Attendance</div>;
      case 'project-selection':
        return <div className="page-content">Project Selection & Allotment</div>;
      case 'aat-questions':
        return <div className="page-content">AAT Question Selection</div>;
      case 'project-team':
        return <div className="page-content">Project Team Member Selection</div>;
      case 'project-work':
        return <div className="page-content">Project Work/Thesis Report</div>;
      default:
        return <div className="page-content">Page not found</div>;
    }
  };

  return (
    <div className="app">
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={handleSectionChange}
      />
      <div className="main-content">
        <Header currentSection={activeSection} />
        <div className="content-area">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default App;
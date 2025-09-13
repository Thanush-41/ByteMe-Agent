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
      case 'certificate-request':
        return <div className="page-content">Certificate Request</div>;
      case 'transcript-duplicate':
        return <div className="page-content">Transcript / Duplicate / Name Change</div>;
      case 'skill-program':
        return <div className="page-content">Skill Program</div>;
      case 'no-dues':
        return <div className="page-content">No Dues</div>;
      case 'tc-form':
        return <div className="page-content">TC Form</div>;
      case 'online-fees-payment':
        return <div className="page-content">Online Fees Payment</div>;
      case 'online-fees-ccav':
        return <div className="page-content">Online Fees Payment CCAV</div>;
      case 'fee-status':
        return <div className="page-content">Fee Status</div>;
      case 'timetable':
        return <div className="page-content">Timetable</div>;
      case 'upload-cvc':
        return <div className="page-content">Upload CVC Certificate</div>;
      case 'aat-tech-talk':
        return <div className="page-content">AAT (Tech Talk)</div>;
      case 'aat-concept-video':
        return <div className="page-content">AAT (Concept Video)</div>;
      case 'aat-ii':
        return <div className="page-content">AAT-II</div>;
      case 'aat-i':
        return <div className="page-content">AAT-I</div>;
      case 'lab-record':
        return <div className="page-content">Lab Record</div>;
      case 'biometric':
        return <div className="page-content">Biometric</div>;
      case 'early-semester-feedback':
        return <div className="page-content">Early Semester Feedback</div>;
      case 'obe-feedback':
        return <div className="page-content">OBE Feedback</div>;
      case 'design-review-syllabus':
        return <div className="page-content">Design and Review of Syllabus</div>;
      case 'satisfaction-survey':
        return <div className="page-content">Satisfaction Survey</div>;
      case 'placement-experience':
        return <div className="page-content">Placement Experience</div>;
      case 'naac-survey':
        return <div className="page-content">NAAC SURVEY</div>;
      case 'bonafide':
        return <div className="page-content">Bonafide Certificate</div>;
      case 'my-box':
        return <div className="page-content">My Box</div>;
      case 'upload-birth':
        return <div className="page-content">Upload Birth Certificate</div>;
      case 'update-academic-bank':
        return <div className="page-content">Update Academic Bank of Credits</div>;
      case 'requisitions':
        return <div className="page-content">Requisitions</div>;
      case 'certificate-request':
        return <div className="page-content">Certificate Request</div>;
      case 'transcript-duplicate':
        return <div className="page-content">Transcript / Duplicate / Name Change</div>;
      case 'skill-program':
        return <div className="page-content">Skill Program</div>;
      case 'print-forms':
        return <div className="page-content">Print Forms</div>;
      case 'no-dues':
        return <div className="page-content">No Dues</div>;
      case 'tc-form':
        return <div className="page-content">TC Form</div>;
      case 'accession-register':
        return <div className="page-content">Accession Register</div>;
      case 'payments':
        return <div className="page-content">Payments</div>;
      case 'online-fees-payment':
        return <div className="page-content">Online Fees Payment</div>;
      case 'online-fees-payment-ccav':
        return <div className="page-content">Online Fees Payment CCAV</div>;
      case 'fee-status':
        return <div className="page-content">Fee Status</div>;
      case 'timetable':
        return <div className="page-content">Timetable</div>;
      case 'bonafide':
        return <div className="page-content">Bonafide Certificate</div>;
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
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import CourseContent from './pages/academics/CourseContent';
import CourseRegistration from './pages/academics/CourseRegistration';
import Attendance from './pages/academics/Attendance';
import PATAttendance from './pages/academics/PATAttendance';
import ProjectSelection from './pages/academics/ProjectSelection';
import AATQuestions from './pages/academics/AATQuestions';
import ProjectTeam from './pages/academics/ProjectTeam';
import ProjectWork from './pages/academics/ProjectWork';
import RegularCourses from './pages/academics/courseRegistration/RegularCourses';
import ReRegistration from './pages/academics/courseRegistration/ReRegistration';
import AcceleratedCourses from './pages/academics/courseRegistration/AcceleratedCourses';
import PLARCourses from './pages/academics/courseRegistration/PLARCourses';
import PLARForeignCourses from './pages/academics/courseRegistration/PLARForeignCourses';
import AICTELiteProgram from './pages/academics/courseRegistration/AICTELiteProgram';
import UploadCVC from './pages/uploads/UploadCVC';
import AATTechTalk from './pages/uploads/AATTechTalk';
import AATConceptVideo from './pages/uploads/AATConceptVideo';
import AATII from './pages/uploads/AATII';
import AATI from './pages/uploads/AATI';
import LabRecord from './pages/uploads/LabRecord';
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
        return <CourseContent />;
      case 'course-registration':
        return <CourseRegistration />;
      case 'regular-courses':
        return <RegularCourses />;
      case 're-registration':
        return <ReRegistration />;
      case 'accelerated-courses':
        return <AcceleratedCourses />;
      case 'plar-courses':
        return <PLARCourses />;
      case 'plar-foreign-courses':
        return <PLARForeignCourses />;
      case 'aicte-lite-program':
        return <AICTELiteProgram />;
      case 'attendance':
        return <Attendance />;
      case 'pat-attendance':
        return <PATAttendance />;
      case 'project-selection':
        return <ProjectSelection />;
      case 'aat-questions':
        return <AATQuestions />;
      case 'project-team':
        return <ProjectTeam />;
      case 'project-work':
        return <ProjectWork />;
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
        return <UploadCVC />;
      case 'aat-tech-talk':
        return <AATTechTalk />;
      case 'aat-concept-video':
        return <AATConceptVideo />;
      case 'aat-ii':
        return <AATII />;
      case 'aat-i':
        return <AATI />;
      case 'lab-record':
        return <LabRecord />;
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
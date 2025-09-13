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
import Timetable from './pages/Timetable';
import UploadCVC from './pages/uploads/UploadCVC';
import AATTechTalk from './pages/uploads/AATTechTalk';
import AATConceptVideo from './pages/uploads/AATConceptVideo';
import AATII from './pages/uploads/AATII';
import AATI from './pages/uploads/AATI';
import LabRecord from './pages/uploads/LabRecord';
// Examination pages
import CIAMarks from './pages/examinations/CIAMarks';
import AdmitCard from './pages/examinations/AdmitCard';
import ExamRegistration from './pages/examinations/ExamRegistration';
import MakeupExamRegistration from './pages/examinations/MakeupExamRegistration';
import ExamResult from './pages/examinations/ExamResult';
import CreditRegister from './pages/examinations/CreditRegister';
import Booklets from './pages/examinations/Booklets';
import QuestionPaperSolution from './pages/examinations/QuestionPaperSolution';
import Revaluation from './pages/examinations/Revaluation';
import RemedialExamRegistration from './pages/examinations/RemedialExamRegistration';
import ConfettiNightRegistration from './pages/examinations/ConfettiNightRegistration';
import InternshipProgramRegistration from './pages/examinations/InternshipProgramRegistration';
// Requisitions pages
import CertificateRequest from './pages/requisitions/CertificateRequest';
import TranscriptDuplicate from './pages/requisitions/TranscriptDuplicate';
import SkillProgram from './pages/requisitions/SkillProgram';
// Payments pages
import OnlineFeesPayment from './pages/payments/OnlineFeesPayment';
// Feedback pages
import EarlySemesterFeedback from './pages/feedback/EarlySemesterFeedback';
// Other pages
import AccessionRegister from './pages/AccessionRegister';
import Biometric from './pages/Biometric';
import BonafideCertificate from './pages/BonafideCertificate';
// Print Forms pages
import NoDues from './pages/print-forms/NoDues';
import TCForm from './pages/print-forms/TCForm';
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
        return <div className="page-content">Examinations</div>;
      case 'cia-marks':
        return <CIAMarks />;
      case 'admit-card':
        return <AdmitCard />;
      case 'exam-registration':
        return <ExamRegistration />;
      case 'makeup-exam-registration':
        return <MakeupExamRegistration />;
      case 'exam-result':
        return <ExamResult />;
      case 'credit-register':
        return <CreditRegister />;
      case 'booklets':
        return <Booklets />;
      case 'question-paper-solution':
        return <QuestionPaperSolution />;
      case 'revaluation':
        return <Revaluation />;
      case 'remedial-exam-registration':
        return <RemedialExamRegistration />;
      case 'confetti-night-registration':
        return <ConfettiNightRegistration />;
      case 'internship-program-registration':
        return <InternshipProgramRegistration />;
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
        return <CertificateRequest />;
      case 'transcript-duplicate':
        return <TranscriptDuplicate />;
      case 'skill-program':
        return <SkillProgram />;
      case 'no-dues':
        return <NoDues />;
      case 'tc-form':
        return <TCForm />;
      case 'online-fees-payment':
        return <OnlineFeesPayment />;
      case 'online-fees-ccav':
        return <div className="page-content">Online Fees Payment CCAV</div>;
      case 'fee-status':
        return <div className="page-content">Fee Status</div>;
      case 'timetable':
        return <Timetable />;
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
        return <Biometric />;
      case 'early-semester-feedback':
        return <EarlySemesterFeedback />;
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
        return <BonafideCertificate />;
      case 'my-box':
        return <div className="page-content">My Box</div>;
      case 'upload-birth':
        return <div className="page-content">Upload Birth Certificate</div>;
      case 'update-academic-bank':
        return <div className="page-content">Update Academic Bank of Credits</div>;
      case 'requisitions':
        return <div className="page-content">Requisitions</div>;
      case 'print-forms':
        return <div className="page-content">Print Forms</div>;
      case 'accession-register':
        return <AccessionRegister />;
      case 'payments':
        return <div className="page-content">Payments</div>;
      case 'online-fees-payment-ccav':
        return <div className="page-content">Online Fees Payment CCAV</div>;
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
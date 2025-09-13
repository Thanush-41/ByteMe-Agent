import React, { useState } from 'react';
import { BrowserRouter as Router, useLocation, useNavigate } from 'react-router-dom';
import { ROUTE_ACTIONS, getCurrentAction } from './constants/routeConstants';
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
import LoginPage from './pages/LoginPage';
import TeacherDashboard from './pages/TeacherDashboard';

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loginState, setLoginState] = useState(null); // null, 'student', 'teacher'
  
  // Get the action from URL query parameters using the helper function
  const action = getCurrentAction(location);

  const handleSectionChange = (section) => {
    if (section === ROUTE_ACTIONS.DASHBOARD) {
      navigate('/');
    } else {
      navigate(`/?action=${section}`);
    }
  };

  const handleLogout = () => {
    setLoginState(null);
    navigate('/');
  };

  if (!loginState) {
    return <LoginPage onLogin={setLoginState} />;
  }
  if (loginState === 'teacher') {
    return <TeacherDashboard onLogout={handleLogout} />;
  }

  // Student portal
  const renderContent = () => {
    switch (action) {
      case ROUTE_ACTIONS.DASHBOARD:
        return <Dashboard />;
      case ROUTE_ACTIONS.EXAMINATIONS:
        return <div className="page-content">Examinations</div>;
      case ROUTE_ACTIONS.CIA_MARKS:
        return <CIAMarks />;
      case ROUTE_ACTIONS.ADMIT_CARD:
        return <AdmitCard />;
      case ROUTE_ACTIONS.EXAM_REGISTRATION:
        return <ExamRegistration />;
      case ROUTE_ACTIONS.MAKEUP_EXAM_REGISTRATION:
        return <MakeupExamRegistration />;
      case ROUTE_ACTIONS.EXAM_RESULT:
        return <ExamResult />;
      case ROUTE_ACTIONS.CREDIT_REGISTER:
        return <CreditRegister />;
      case ROUTE_ACTIONS.BOOKLETS:
        return <Booklets />;
      case ROUTE_ACTIONS.QUESTION_PAPER_SOLUTION:
        return <QuestionPaperSolution />;
      case ROUTE_ACTIONS.REVALUATION:
        return <Revaluation />;
      case ROUTE_ACTIONS.REMEDIAL_EXAM_REGISTRATION:
        return <RemedialExamRegistration />;
      case ROUTE_ACTIONS.CONFETTI_NIGHT_REGISTRATION:
        return <ConfettiNightRegistration />;
      case ROUTE_ACTIONS.INTERNSHIP_PROGRAM_REGISTRATION:
        return <InternshipProgramRegistration />;
      case ROUTE_ACTIONS.ACADEMICS:
        return <div className="page-content">Academics page content</div>;
      case ROUTE_ACTIONS.COURSE_CONTENT:
        return <CourseContent />;
      case ROUTE_ACTIONS.COURSE_REGISTRATION:
        return <CourseRegistration />;
      case ROUTE_ACTIONS.REGULAR_COURSES:
        return <RegularCourses />;
      case ROUTE_ACTIONS.RE_REGISTRATION:
        return <ReRegistration />;
      case ROUTE_ACTIONS.ACCELERATED_COURSES:
        return <AcceleratedCourses />;
      case ROUTE_ACTIONS.PLAR_COURSES:
        return <PLARCourses />;
      case ROUTE_ACTIONS.PLAR_FOREIGN_COURSES:
        return <PLARForeignCourses />;
      case ROUTE_ACTIONS.AICTE_LITE_PROGRAM:
        return <AICTELiteProgram />;
      case ROUTE_ACTIONS.ATTENDANCE:
        return <Attendance />;
      case ROUTE_ACTIONS.PAT_ATTENDANCE:
        return <PATAttendance />;
      case ROUTE_ACTIONS.PROJECT_SELECTION:
        return <ProjectSelection />;
      case ROUTE_ACTIONS.AAT_QUESTIONS:
        return <AATQuestions />;
      case ROUTE_ACTIONS.PROJECT_TEAM:
        return <ProjectTeam />;
      case ROUTE_ACTIONS.PROJECT_WORK:
        return <ProjectWork />;
      case ROUTE_ACTIONS.CERTIFICATE_REQUEST:
        return <CertificateRequest />;
      case ROUTE_ACTIONS.TRANSCRIPT_DUPLICATE:
        return <TranscriptDuplicate />;
      case ROUTE_ACTIONS.SKILL_PROGRAM:
        return <SkillProgram />;
      case ROUTE_ACTIONS.NO_DUES:
        return <NoDues />;
      case ROUTE_ACTIONS.TC_FORM:
        return <TCForm />;
      case ROUTE_ACTIONS.ONLINE_FEES_PAYMENT:
        return <OnlineFeesPayment />;
      case ROUTE_ACTIONS.ONLINE_FEES_CCAV:
        return <div className="page-content">Online Fees Payment CCAV</div>;
      case ROUTE_ACTIONS.FEE_STATUS:
        return <div className="page-content">Fee Status</div>;
      case ROUTE_ACTIONS.TIMETABLE:
        return <Timetable />;
      case ROUTE_ACTIONS.UPLOAD_CVC:
        return <UploadCVC />;
      case ROUTE_ACTIONS.AAT_TECH_TALK:
        return <AATTechTalk />;
      case ROUTE_ACTIONS.AAT_CONCEPT_VIDEO:
        return <AATConceptVideo />;
      case ROUTE_ACTIONS.AAT_II:
        return <AATII />;
      case ROUTE_ACTIONS.AAT_I:
        return <AATI />;
      case ROUTE_ACTIONS.LAB_RECORD:
        return <LabRecord />;
      case ROUTE_ACTIONS.BIOMETRIC:
        return <Biometric />;
      case ROUTE_ACTIONS.EARLY_SEMESTER_FEEDBACK:
        return <EarlySemesterFeedback />;
      case ROUTE_ACTIONS.OBE_FEEDBACK:
        return <div className="page-content">OBE Feedback</div>;
      case ROUTE_ACTIONS.DESIGN_REVIEW_SYLLABUS:
        return <div className="page-content">Design and Review of Syllabus</div>;
      case ROUTE_ACTIONS.SATISFACTION_SURVEY:
        return <div className="page-content">Satisfaction Survey</div>;
      case ROUTE_ACTIONS.PLACEMENT_EXPERIENCE:
        return <div className="page-content">Placement Experience</div>;
      case ROUTE_ACTIONS.NAAC_SURVEY:
        return <div className="page-content">NAAC SURVEY</div>;
      case ROUTE_ACTIONS.BONAFIDE:
        return <BonafideCertificate />;
      case ROUTE_ACTIONS.MY_BOX:
        return <div className="page-content">My Box</div>;
      case ROUTE_ACTIONS.UPLOAD_BIRTH:
        return <div className="page-content">Upload Birth Certificate</div>;
      case ROUTE_ACTIONS.UPDATE_ACADEMIC_BANK:
        return <div className="page-content">Update Academic Bank of Credits</div>;
      case ROUTE_ACTIONS.REQUISITIONS:
        return <div className="page-content">Requisitions</div>;
      case ROUTE_ACTIONS.PRINT_FORMS:
        return <div className="page-content">Print Forms</div>;
      case ROUTE_ACTIONS.ACCESSION_REGISTER:
        return <AccessionRegister />;
      case ROUTE_ACTIONS.PAYMENTS:
        return <div className="page-content">Payments</div>;
      case ROUTE_ACTIONS.ONLINE_FEES_PAYMENT_CCAV:
        return <div className="page-content">Online Fees Payment CCAV</div>;
      default:
        return <div className="page-content">Page not found</div>;
    }
  };

  return (
    <div className="app">
      <Sidebar 
        activeSection={action} 
        onSectionChange={handleSectionChange}
      />
      <div className="main-content">
        <Header currentSection={action} onLogout={handleLogout} />
        <div className="content-area">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
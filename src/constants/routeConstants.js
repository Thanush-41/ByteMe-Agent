// URL Route Constants for IARE Portal
// This file contains all the action mappings for URL-based navigation

export const ROUTE_ACTIONS = {
  // Main Pages
  DASHBOARD: 'dashboard',
  
  // Academics
  ACADEMICS: 'academics',
  COURSE_CONTENT: 'course-content',
  COURSE_REGISTRATION: 'course-registration',
  ATTENDANCE: 'attendance',
  PAT_ATTENDANCE: 'pat-attendance',
  PROJECT_SELECTION: 'project-selection',
  AAT_QUESTIONS: 'aat-questions',
  PROJECT_TEAM: 'project-team',
  PROJECT_WORK: 'project-work',
  
  // Course Registration
  REGULAR_COURSES: 'regular-courses',
  RE_REGISTRATION: 're-registration',
  ACCELERATED_COURSES: 'accelerated-courses',
  PLAR_COURSES: 'plar-courses',
  PLAR_FOREIGN_COURSES: 'plar-foreign-courses',
  AICTE_LITE_PROGRAM: 'aicte-lite-program',
  
  // Examinations
  EXAMINATIONS: 'examinations',
  CIA_MARKS: 'cia-marks',
  ADMIT_CARD: 'admit-card',
  EXAM_REGISTRATION: 'exam-registration',
  MAKEUP_EXAM_REGISTRATION: 'makeup-exam-registration',
  EXAM_RESULT: 'exam-result',
  CREDIT_REGISTER: 'credit-register',
  BOOKLETS: 'booklets',
  QUESTION_PAPER_SOLUTION: 'question-paper-solution',
  REVALUATION: 'revaluation',
  REMEDIAL_EXAM_REGISTRATION: 'remedial-exam-registration',
  CONFETTI_NIGHT_REGISTRATION: 'confetti-night-registration',
  INTERNSHIP_PROGRAM_REGISTRATION: 'internship-program-registration',
  
  // Requisitions
  REQUISITIONS: 'requisitions',
  CERTIFICATE_REQUEST: 'certificate-request',
  TRANSCRIPT_DUPLICATE: 'transcript-duplicate',
  SKILL_PROGRAM: 'skill-program',
  
  // Print Forms
  PRINT_FORMS: 'print-forms',
  NO_DUES: 'no-dues',
  TC_FORM: 'tc-form',
  
  // Payments
  PAYMENTS: 'payments',
  ONLINE_FEES_PAYMENT: 'online-fees-payment',
  ONLINE_FEES_CCAV: 'online-fees-ccav',
  ONLINE_FEES_PAYMENT_CCAV: 'online-fees-payment-ccav',
  FEE_STATUS: 'fee-status',
  
  // Uploads
  UPLOADS: 'uploads',
  UPLOAD_CVC: 'upload-cvc',
  AAT_TECH_TALK: 'aat-tech-talk',
  AAT_CONCEPT_VIDEO: 'aat-concept-video',
  AAT_II: 'aat-ii',
  AAT_I: 'aat-i',
  LAB_RECORD: 'lab-record',
  
  // Feedback
  FEEDBACK: 'feedback',
  EARLY_SEMESTER_FEEDBACK: 'early-semester-feedback',
  OBE_FEEDBACK: 'obe-feedback',
  DESIGN_REVIEW_SYLLABUS: 'design-review-syllabus',
  SATISFACTION_SURVEY: 'satisfaction-survey',
  PLACEMENT_EXPERIENCE: 'placement-experience',
  NAAC_SURVEY: 'naac-survey',
  
  // Other Pages
  TIMETABLE: 'timetable',
  BIOMETRIC: 'biometric',
  BONAFIDE: 'bonafide',
  MY_BOX: 'my-box',
  UPLOAD_BIRTH: 'upload-birth',
  UPDATE_ACADEMIC_BANK: 'update-academic-bank',
  ACCESSION_REGISTER: 'accession-register'
};

// Helper function to build URLs
export const buildURL = (action) => {
  if (action === ROUTE_ACTIONS.DASHBOARD) {
    return '/';
  }
  return `/?action=${action}`;
};

// Helper function to get current action from URL
export const getCurrentAction = (location) => {
  const urlParams = new URLSearchParams(location.search);
  return urlParams.get('action') || ROUTE_ACTIONS.DASHBOARD;
};

// Page titles mapping
export const PAGE_TITLES = {
  [ROUTE_ACTIONS.DASHBOARD]: 'Dashboard',
  [ROUTE_ACTIONS.ACADEMICS]: 'Academics',
  [ROUTE_ACTIONS.COURSE_CONTENT]: 'Course Content',
  [ROUTE_ACTIONS.COURSE_REGISTRATION]: 'Course Registration',
  [ROUTE_ACTIONS.ATTENDANCE]: 'Attendance',
  [ROUTE_ACTIONS.PAT_ATTENDANCE]: 'PAT Attendance',
  [ROUTE_ACTIONS.PROJECT_SELECTION]: 'Project Selection',
  [ROUTE_ACTIONS.AAT_QUESTIONS]: 'AAT Questions',
  [ROUTE_ACTIONS.PROJECT_TEAM]: 'Project Team',
  [ROUTE_ACTIONS.PROJECT_WORK]: 'Project Work',
  [ROUTE_ACTIONS.REGULAR_COURSES]: 'Regular Courses',
  [ROUTE_ACTIONS.RE_REGISTRATION]: 'Re-Registration',
  [ROUTE_ACTIONS.ACCELERATED_COURSES]: 'Accelerated Courses',
  [ROUTE_ACTIONS.PLAR_COURSES]: 'PLAR Courses',
  [ROUTE_ACTIONS.PLAR_FOREIGN_COURSES]: 'PLAR Foreign Courses',
  [ROUTE_ACTIONS.AICTE_LITE_PROGRAM]: 'AICTE Lite Program',
  [ROUTE_ACTIONS.EXAMINATIONS]: 'Examinations',
  [ROUTE_ACTIONS.CIA_MARKS]: 'CIA Marks',
  [ROUTE_ACTIONS.ADMIT_CARD]: 'Admit Card',
  [ROUTE_ACTIONS.EXAM_REGISTRATION]: 'Exam Registration',
  [ROUTE_ACTIONS.MAKEUP_EXAM_REGISTRATION]: 'Makeup Exam Registration',
  [ROUTE_ACTIONS.EXAM_RESULT]: 'Exam Result',
  [ROUTE_ACTIONS.CREDIT_REGISTER]: 'Credit Register',
  [ROUTE_ACTIONS.BOOKLETS]: 'Booklets',
  [ROUTE_ACTIONS.QUESTION_PAPER_SOLUTION]: 'Question Paper and Solution',
  [ROUTE_ACTIONS.REVALUATION]: 'Revaluation',
  [ROUTE_ACTIONS.REMEDIAL_EXAM_REGISTRATION]: 'Remedial Exam Registration',
  [ROUTE_ACTIONS.CONFETTI_NIGHT_REGISTRATION]: 'Confetti Night Registration',
  [ROUTE_ACTIONS.INTERNSHIP_PROGRAM_REGISTRATION]: 'Internship Program Registration',
  [ROUTE_ACTIONS.REQUISITIONS]: 'Requisitions',
  [ROUTE_ACTIONS.CERTIFICATE_REQUEST]: 'Certificate Request',
  [ROUTE_ACTIONS.TRANSCRIPT_DUPLICATE]: 'Transcript Duplicate',
  [ROUTE_ACTIONS.SKILL_PROGRAM]: 'Skill Program',
  [ROUTE_ACTIONS.PRINT_FORMS]: 'Print Forms',
  [ROUTE_ACTIONS.NO_DUES]: 'No Dues',
  [ROUTE_ACTIONS.TC_FORM]: 'TC Form',
  [ROUTE_ACTIONS.PAYMENTS]: 'Payments',
  [ROUTE_ACTIONS.ONLINE_FEES_PAYMENT]: 'Online Fees Payment',
  [ROUTE_ACTIONS.ONLINE_FEES_CCAV]: 'Online Fees Payment CCAV',
  [ROUTE_ACTIONS.ONLINE_FEES_PAYMENT_CCAV]: 'Online Fees Payment CCAV',
  [ROUTE_ACTIONS.FEE_STATUS]: 'Fee Status',
  [ROUTE_ACTIONS.UPLOADS]: 'Uploads',
  [ROUTE_ACTIONS.UPLOAD_CVC]: 'Upload CVC',
  [ROUTE_ACTIONS.AAT_TECH_TALK]: 'AAT Tech Talk',
  [ROUTE_ACTIONS.AAT_CONCEPT_VIDEO]: 'AAT Concept Video',
  [ROUTE_ACTIONS.AAT_II]: 'AAT II',
  [ROUTE_ACTIONS.AAT_I]: 'AAT I',
  [ROUTE_ACTIONS.LAB_RECORD]: 'Lab Record',
  [ROUTE_ACTIONS.FEEDBACK]: 'Feedback',
  [ROUTE_ACTIONS.EARLY_SEMESTER_FEEDBACK]: 'Early Semester Feedback',
  [ROUTE_ACTIONS.OBE_FEEDBACK]: 'OBE Feedback',
  [ROUTE_ACTIONS.DESIGN_REVIEW_SYLLABUS]: 'Design and Review of Syllabus',
  [ROUTE_ACTIONS.SATISFACTION_SURVEY]: 'Satisfaction Survey',
  [ROUTE_ACTIONS.PLACEMENT_EXPERIENCE]: 'Placement Experience',
  [ROUTE_ACTIONS.NAAC_SURVEY]: 'NAAC Survey',
  [ROUTE_ACTIONS.TIMETABLE]: 'Timetable',
  [ROUTE_ACTIONS.BIOMETRIC]: 'Biometric',
  [ROUTE_ACTIONS.BONAFIDE]: 'Bonafide Certificate',
  [ROUTE_ACTIONS.MY_BOX]: 'My Box',
  [ROUTE_ACTIONS.UPLOAD_BIRTH]: 'Upload Birth Certificate',
  [ROUTE_ACTIONS.UPDATE_ACADEMIC_BANK]: 'Update Academic Bank of Credits',
  [ROUTE_ACTIONS.ACCESSION_REGISTER]: 'Accession Register'
};

// URL Examples for reference:
// localhost:3000 - Dashboard
// localhost:3000/?action=course-content - Course Content
// localhost:3000/?action=cia-marks - CIA Marks
// localhost:3000/?action=attendance - Attendance
// localhost:3000/?action=exam-registration - Exam Registration
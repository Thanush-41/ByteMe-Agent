// Teacher Portal Route Constants
export const TEACHER_ROUTES = {
  // Main sections
  DASHBOARD: 'dashboard',
  ACADEMICS: 'academics',
  NOMINAL_ROLLS: 'nominal-rolls',
  TIME_TABLE: 'time-table',
  STAFF_TIMETABLE: 'staff-timetable',
  ICT_STUDIO: 'ict-studio',
  AAT_REGISTRATION: 'aat-registration',
  ATTENDANCE_REGISTER: 'attendance-register',
  PROJECT_APPROVAL: 'project-approval',
  PROJECT_TITLES: 'project-titles',
  SCHEDULE_INSTRUCTIONS: 'schedule-instructions',
  LOR_REQUEST: 'lor-request',
  ATTENDING_ACTIVITY: 'attending-activity',
  ACCESSION_REGISTER: 'accession-register',
  LIBRARY_BOOKS: 'library-books',
  EVALUATIONS: 'evaluations',
  LABS: 'labs',
  TDS: 'tds',
  PAY_SLIP: 'pay-slip',
  INCENTIVES: 'incentives',
  FUNDED_INCENTIVES: 'funded-incentives',
  ARREAR: 'arrear',
  PARTLY_PAYMENT: 'partly-payment',
  REMUNERATION: 'remuneration',
  REPORTS: 'reports',
  QUESTION_PAPER: 'question-paper',
  LEAVE: 'leave',
  FACULTY_UPLOADS: 'faculty-uploads',
  BIOMETRIC: 'biometric',
  SERVICE_REGISTER: 'service-register',

  // Academics submenu
  COURSE_CONTENT: 'academics/course-content',
  COURSE_REGISTRATION: 'academics/course-registration',
  ATTENDANCE: 'academics/attendance',
  PAT_ATTENDANCE: 'academics/pat-attendance',
  PROJECT_SELECTION: 'academics/project-selection',
  AAT_QUESTIONS: 'academics/aat-questions',
  PROJECT_TEAM: 'academics/project-team',
  PROJECT_WORK: 'academics/project-work',

  // Time Table submenu
  ACTIVITY_DIARY_UG: 'time-table/activity-diary-ug',
  ACTIVITY_DIARY_PG: 'time-table/activity-diary-pg',
  DATE_WISE_ACTIVITY: 'time-table/date-wise-activity',
  SECTION_TIMETABLE: 'time-table/section-timetable',
  SUBJECTS: 'time-table/subjects',
  ACTIVITY_DIARY_ACCELERATED: 'time-table/activity-diary-accelerated',
  PAST_PENDING_ACTIVITY: 'time-table/past-pending-activity',
  ACTIVITY_DIARY_PAT: 'time-table/activity-diary-pat',
  ACTIVITY_DIARY_REMEDIAL: 'time-table/activity-diary-remedial',
  ACTIVITY_REPORT: 'time-table/activity-report',

  // Evaluations submenu
  AAT: 'evaluations/aat',
  AAT_II: 'evaluations/aat-ii',

  // Labs submenu
  SEE_LAB_PROJECT: 'labs/see-lab-project',
  SEE_LAB_MARKS: 'labs/see-lab-marks',
  CIE_LAB_MARKS: 'labs/cie-lab-marks',
  DAY_TO_DAY_LAB_EVAL: 'labs/day-to-day-lab-evaluation',
  DAY_TO_DAY_LAB_EXPERIMENT: 'labs/day-to-day-lab-experiment',
  LAB_MAPPING: 'labs/lab-mapping',

  // TDS submenu
  TDS_CALCULATOR: 'tds/calculator',
  TDS_REPORT: 'tds/report',

  // Funded Incentives submenu
  GOV_FUNDED_RESEARCH: 'funded-incentives/gov-funded-research',
  GOV_FUNDED_SCHEME: 'funded-incentives/gov-funded-scheme',
  PHD_REGISTRATION: 'funded-incentives/phd-registration',
  SEED_MONEY: 'funded-incentives/seed-money',

  // Reports submenu
  ACADEMIC_REPORTS: 'reports/academic',
  ADMINISTRATIVE_REPORTS: 'reports/administrative',
  FINANCIAL_REPORTS: 'reports/financial',

  // Leave submenu
  APPLY_LEAVE: 'leave/apply',
  LEAVE_STATUS: 'leave/status',
  LEAVE_HISTORY: 'leave/history',

  // Faculty Uploads submenu
  DOCUMENT_UPLOAD: 'faculty-uploads/documents',
  RESEARCH_PAPERS: 'faculty-uploads/research-papers',
  CERTIFICATES: 'faculty-uploads/certificates',

  // Service Register submenu
  SERVICE_REGISTER_MAIN: 'service-register/main',
  EDIT_PERSONAL_DETAILS: 'service-register/edit-personal-details',
  ACADEMIC_IDENTITY: 'service-register/academic-identity',
  PROFESSIONAL_MEMBERSHIP: 'service-register/professional-membership',
  COMPETENCY_BUILDING: 'service-register/competency-building',
  PROFESSIONAL_EXPERIENCE: 'service-register/professional-experience',
  ACADEMIC_QUALIFICATIONS: 'service-register/academic-qualifications',
  HONOURS_AWARDS: 'service-register/honours-awards',
  TEXTBOOKS: 'service-register/textbooks',
  JOURNAL_ARTICLES: 'service-register/journal-articles',
  PROFESSIONAL_TRAINING: 'service-register/professional-training',
  IPR_PATENTS: 'service-register/ipr-patents',
  FDP_STTP: 'service-register/fdp-sttp',
  CONFERENCE_PAPERS: 'service-register/conference-papers',
  RESEARCH_GUIDANCE: 'service-register/research-guidance',
  MOOCS_TRAINING: 'service-register/moocs-training'
};

// Helper function to get current teacher route from URL
export const getCurrentTeacherRoute = (location) => {
  const searchParams = new URLSearchParams(location.search);
  return searchParams.get('section') || TEACHER_ROUTES.DASHBOARD;
};

// Helper function to navigate to teacher route
export const navigateToTeacherRoute = (navigate, route) => {
  if (route === TEACHER_ROUTES.DASHBOARD) {
    navigate('/teacher');
  } else {
    navigate(`/teacher?section=${route}`);
  }
};

// Helper function to find route information by key
export const findRouteByKey = (key) => {
  const routeInfo = {
    'dashboard': { title: 'Dashboard', description: 'Welcome to the Teacher Dashboard' },
    'academics': { title: 'Academics', description: 'Academics management section - Course content, registration, attendance, and more.' },
    'nominal-rolls': { title: 'Nominal Rolls', description: 'Student nominal rolls and class lists management.' },
    'time-table': { title: 'Time Table', description: 'Activity diaries, timetable management, and scheduling.' },
    'staff-timetable': { title: 'Staff Timetable', description: 'Faculty and staff scheduling management.' },
    'ict-studio': { title: 'ICT Studio Slot Booking', description: 'Computer lab and ICT studio booking system.' },
    'aat-registration': { title: 'AAT Registration', description: 'AAT (Additional Assessment Test) registration and management.' },
    'attendance-register': { title: 'Attendance Register', description: 'Student attendance tracking and register management.' },
    'project-approval': { title: 'Project Approval', description: 'Student project approval and management system.' },
    'project-titles': { title: 'Project Titles', description: 'Management of approved project titles and topics.' },
    'schedule-instructions': { title: 'Schedule of Instructions', description: 'Academic instruction scheduling and planning.' },
    'lor-request': { title: 'LOR Request', description: 'Letter of Recommendation request management.' },
    'attending-activity': { title: 'Attending Activity / Events', description: 'Faculty activity and event attendance tracking.' },
    'accession-register': { title: 'Accession Register', description: 'Library accession and resource management.' },
    'library-books': { title: 'Library Books Issued', description: 'Track and manage issued library books and resources.' },
    'evaluations': { title: 'Evaluations', description: 'Student evaluation and assessment management including AAT and AAT-II.' },
    'labs': { title: 'Labs', description: 'Laboratory management including SEE Lab, marks, evaluations, and experiments.' },
    'tds': { title: 'TDS', description: 'Tax Deducted at Source management and reporting.' },
    'pay-slip': { title: 'Pay Slip', description: 'View and download monthly pay slips and salary details.' },
    'incentives': { title: 'Incentives', description: 'Faculty incentive programs and reward management.' },
    'funded-incentives': { title: 'Funded Incentives', description: 'Government funded research projects, schemes, and PhD registration programs.' },
    'arrear': { title: 'Arrear', description: 'Manage and track arrear payments and pending dues.' },
    'partly-payment': { title: 'Partly Payment Details', description: 'Track partial payments and installment details.' },
    'remuneration': { title: 'Remuneration', description: 'Additional remuneration and compensation management.' },
    'reports': { title: 'Reports', description: 'Generate and view various academic and administrative reports.' },
    'question-paper': { title: 'Question Paper & Scheme of Evaluation', description: 'Question paper creation and evaluation scheme management.' },
    'leave': { title: 'Leave', description: 'Faculty leave application and management system.' },
    'faculty-uploads': { title: 'Faculty Uploads', description: 'Upload and manage faculty documents and resources.' },
    'biometric': { title: 'Biometric', description: 'Biometric attendance and access management.' },
    'service-register': { title: 'Service Register', description: 'Faculty service record and register management.' },
    'edit-personal-details': { title: 'Edit Personal Details', description: 'Update and manage personal information and contact details.' },
    'academic-identity': { title: 'Academic Identity', description: 'Manage academic identity and institutional affiliations.' },
    'professional-membership': { title: 'Professional Membership', description: 'Track professional society memberships and certifications.' },
    'competency-building-visits': { title: 'Competency Building Visits', description: 'Record visits for skill development and competency building.' },
    'professional-experience': { title: 'Professional Experience', description: 'Document professional work experience and career history.' },
    'academic-qualifications': { title: 'Academic Qualifications', description: 'Manage educational qualifications and academic achievements.' },
    'honours-awards': { title: 'Honours / Awards', description: 'Record honors, awards, and recognitions received.' },
    'textbooks': { title: 'Textbooks', description: 'Track authored and published textbooks and academic books.' },
    'journal-articles': { title: 'Journal Articles', description: 'Manage published journal articles and research papers.' },
    'professional-training': { title: 'Professional Training Attended', description: 'Record professional training programs and workshops attended.' },
    'ipr-patents': { title: 'IPR (Patents / Copyrights)', description: 'Manage intellectual property rights, patents, and copyrights.' },
    'fdp-sttp': { title: 'FDP / STTP Attended', description: 'Track Faculty Development Programs and Short Term Training Programs.' },
    'conference-papers': { title: 'Conference Papers', description: 'Manage conference presentations and published papers.' },
    'research-guidance': { title: 'Research Guidance', description: 'Track student research guidance and supervision activities.' },
    'moocs-training': { title: 'MOOCs / QIP / Industry Training', description: 'Record online courses, QIP programs, and industry training completed.' }
  };
  
  return routeInfo[key] || { title: 'Page', description: 'Page content' };
};
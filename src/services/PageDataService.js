/**
 * PageDataService - Service to access and retrieve data from different page components
 * This service provides methods to fetch live data from various app pages/components
 * and return it in a format suitable for the chatbot to use.
 */

// Mock data for demonstration - in a real app, this would come from APIs or local storage
const mockData = {
  attendance: {
    totalClasses: 45,
    attendedClasses: 38,
    attendancePercentage: 84.4,
    subjects: [
      { name: 'Data Structures', attended: 20, total: 23, percentage: 87 },
      { name: 'Operating Systems', attended: 18, total: 22, percentage: 82 },
      { name: 'Database Management', attended: 15, total: 18, percentage: 83 },
      { name: 'Computer Networks', attended: 12, total: 15, percentage: 80 }
    ],
    recentAttendance: [
      { date: '2025-09-10', subject: 'Data Structures', status: 'Present' },
      { date: '2025-09-09', subject: 'Operating Systems', status: 'Present' },
      { date: '2025-09-08', subject: 'Database Management', status: 'Absent' },
      { date: '2025-09-07', subject: 'Computer Networks', status: 'Present' }
    ]
  },
  
  examResults: {
    semester: 'VI',
    cgpa: 8.45,
    sgpa: 8.7,
    results: [
      { subject: 'Data Structures', internal: 18, external: 76, total: 94, grade: 'A+' },
      { subject: 'Operating Systems', internal: 16, external: 72, total: 88, grade: 'A' },
      { subject: 'Database Management', internal: 19, external: 69, total: 88, grade: 'A' },
      { subject: 'Computer Networks', internal: 17, external: 71, total: 88, grade: 'A' }
    ],
    previousSemesters: [
      { semester: 'V', sgpa: 8.3, cgpa: 8.2 },
      { semester: 'IV', sgpa: 8.1, cgpa: 8.0 },
      { semester: 'III', sgpa: 7.9, cgpa: 7.8 }
    ]
  },
  
  timetable: {
    academicYear: '2024-25',
    branchSection: '432/Computer Science',
    currentDay: 'Monday',
    nextClass: {
      subject: 'Data Structures',
      time: '10:30 AM - 11:20 AM',
      room: 'CS-101',
      faculty: 'Dr. Smith'
    },
    todaySchedule: [
      { period: 'Period - I', time: '09:40 AM - 10:30 AM', subject: 'Operating Systems', room: 'CS-102', faculty: 'Prof. Johnson' },
      { period: 'Period - II', time: '10:30 AM - 11:20 AM', subject: 'Data Structures', room: 'CS-101', faculty: 'Dr. Smith' },
      { period: 'Period - III', time: '11:20 AM - 12:10 PM', subject: 'Database Management', room: 'CS-103', faculty: 'Dr. Williams' },
      { period: 'Period - IV', time: '12:10 PM - 01:00 PM', subject: 'Computer Networks', room: 'CS-104', faculty: 'Prof. Brown' }
    ],
    weekSchedule: {
      'Monday': [
        { time: '09:40 AM', subject: 'Operating Systems', faculty: 'Prof. Johnson' },
        { time: '10:30 AM', subject: 'Data Structures', faculty: 'Dr. Smith' },
        { time: '11:20 AM', subject: 'Database Management', faculty: 'Dr. Williams' }
      ],
      'Tuesday': [
        { time: '09:40 AM', subject: 'Computer Networks', faculty: 'Prof. Brown' },
        { time: '10:30 AM', subject: 'Data Structures Lab', faculty: 'Dr. Smith' },
        { time: '11:20 AM', subject: 'OS Lab', faculty: 'Prof. Johnson' }
      ]
    }
  },
  
  ciaMarks: {
    semester: 'VI',
    subjects: [
      { 
        name: 'Data Structures', 
        cia1: 18, 
        cia2: 19, 
        cia3: 17, 
        average: 18.0,
        maxMarks: 20,
        status: 'Good'
      },
      { 
        name: 'Operating Systems', 
        cia1: 16, 
        cia2: 17, 
        cia3: 18, 
        average: 17.0,
        maxMarks: 20,
        status: 'Good'
      },
      { 
        name: 'Database Management', 
        cia1: 19, 
        cia2: 18, 
        cia3: 19, 
        average: 18.7,
        maxMarks: 20,
        status: 'Excellent'
      }
    ],
    overallAverage: 17.9,
    ranking: 15,
    totalStudents: 120
  },
  
  courseRegistration: {
    currentSemester: 'VI',
    registeredCourses: [
      { code: 'CS301', name: 'Data Structures', credits: 4, type: 'Core', status: 'Registered' },
      { code: 'CS302', name: 'Operating Systems', credits: 4, type: 'Core', status: 'Registered' },
      { code: 'CS303', name: 'Database Management', credits: 3, type: 'Core', status: 'Registered' },
      { code: 'CS304', name: 'Computer Networks', credits: 3, type: 'Core', status: 'Registered' },
      { code: 'CS305', name: 'Software Engineering', credits: 3, type: 'Elective', status: 'Waitlisted' }
    ],
    totalCredits: 17,
    maxCredits: 24,
    registrationDeadline: '2025-09-20',
    availableElectives: [
      { code: 'CS401', name: 'Machine Learning', credits: 3, seats: 5 },
      { code: 'CS402', name: 'Web Development', credits: 3, seats: 12 },
      { code: 'CS403', name: 'Mobile App Development', credits: 3, seats: 8 }
    ]
  },
  
  admitCard: {
    examType: 'End Semester Examination',
    semester: 'VI',
    downloadAvailable: true,
    examDates: {
      'Data Structures': '2025-09-25 09:30 AM',
      'Operating Systems': '2025-09-27 09:30 AM',
      'Database Management': '2025-09-29 09:30 AM',
      'Computer Networks': '2025-10-01 09:30 AM'
    },
    examCenter: 'IARE Campus, Block-A',
    instructions: [
      'Bring admit card and ID proof',
      'Reach 30 minutes before exam',
      'No electronic devices allowed'
    ]
  },
  
  projectDetails: {
    currentProject: {
      title: 'Student Portal Enhancement',
      guide: 'Dr. Smith',
      team: ['John Doe', 'Jane Smith', 'Bob Johnson'],
      status: 'In Progress',
      phase: 'Development',
      deadline: '2025-12-15',
      completionPercentage: 65
    },
    submissions: [
      { phase: 'Project Proposal', submittedDate: '2025-08-15', status: 'Approved', marks: 18 },
      { phase: 'Literature Survey', submittedDate: '2025-09-01', status: 'Approved', marks: 19 },
      { phase: 'Design Document', submittedDate: '2025-09-10', status: 'Under Review', marks: null }
    ]
  }
};

class PageDataService {
  
  /**
   * Get attendance data
   * @param {string} type - Type of attendance data ('summary', 'detailed', 'recent')
   * @returns {Object} Attendance information
   */
  static getAttendanceData(type = 'summary') {
    const data = mockData.attendance;
    
    switch (type) {
      case 'summary':
        return {
          totalPercentage: data.attendancePercentage,
          totalClasses: data.totalClasses,
          attendedClasses: data.attendedClasses,
          status: data.attendancePercentage >= 75 ? 'Good' : 'Below Requirement'
        };
      
      case 'detailed':
        return {
          subjects: data.subjects,
          overall: {
            percentage: data.attendancePercentage,
            total: data.totalClasses,
            attended: data.attendedClasses
          }
        };
      
      case 'recent':
        return {
          recentAttendance: data.recentAttendance.slice(0, 5),
          totalPercentage: data.attendancePercentage
        };
      
      default:
        return data;
    }
  }
  
  /**
   * Get exam results data
   * @param {string} type - Type of result data ('current', 'previous', 'summary')
   * @returns {Object} Exam results information
   */
  static getExamResultsData(type = 'current') {
    const data = mockData.examResults;
    
    switch (type) {
      case 'current':
        return {
          semester: data.semester,
          sgpa: data.sgpa,
          cgpa: data.cgpa,
          results: data.results
        };
      
      case 'previous':
        return {
          previousSemesters: data.previousSemesters,
          currentCGPA: data.cgpa
        };
      
      case 'summary':
        return {
          currentSemester: data.semester,
          cgpa: data.cgpa,
          sgpa: data.sgpa,
          totalSubjects: data.results.length,
          averageGrade: this.calculateAverageGrade(data.results)
        };
      
      default:
        return data;
    }
  }
  
  /**
   * Get timetable data
   * @param {string} type - Type of timetable data ('today', 'week', 'next')
   * @returns {Object} Timetable information
   */
  static getTimetableData(type = 'today') {
    const data = mockData.timetable;
    
    switch (type) {
      case 'today':
        return {
          currentDay: data.currentDay,
          todaySchedule: data.todaySchedule,
          nextClass: data.nextClass
        };
      
      case 'week':
        return {
          weekSchedule: data.weekSchedule,
          academicYear: data.academicYear,
          branchSection: data.branchSection
        };
      
      case 'next':
        return {
          nextClass: data.nextClass,
          remainingToday: data.todaySchedule.filter(cls => 
            new Date(`1970-01-01 ${cls.time.split(' - ')[0]}`) > new Date()
          )
        };
      
      default:
        return data;
    }
  }
  
  /**
   * Get CIA marks data
   * @param {string} type - Type of CIA data ('summary', 'detailed', 'subject')
   * @param {string} subject - Specific subject name (for subject type)
   * @returns {Object} CIA marks information
   */
  static getCIAMarksData(type = 'summary', subject = null) {
    const data = mockData.ciaMarks;
    
    switch (type) {
      case 'summary':
        return {
          semester: data.semester,
          overallAverage: data.overallAverage,
          ranking: data.ranking,
          totalStudents: data.totalStudents,
          subjectCount: data.subjects.length
        };
      
      case 'detailed':
        return {
          subjects: data.subjects,
          overallAverage: data.overallAverage,
          ranking: data.ranking
        };
      
      case 'subject':
        if (subject) {
          const subjectData = data.subjects.find(s => 
            s.name.toLowerCase().includes(subject.toLowerCase())
          );
          return subjectData || null;
        }
        return data.subjects;
      
      default:
        return data;
    }
  }
  
  /**
   * Get course registration data
   * @param {string} type - Type of course data ('registered', 'available', 'summary')
   * @returns {Object} Course registration information
   */
  static getCourseRegistrationData(type = 'registered') {
    const data = mockData.courseRegistration;
    
    switch (type) {
      case 'registered':
        return {
          currentSemester: data.currentSemester,
          registeredCourses: data.registeredCourses,
          totalCredits: data.totalCredits,
          maxCredits: data.maxCredits
        };
      
      case 'available':
        return {
          availableElectives: data.availableElectives,
          registrationDeadline: data.registrationDeadline,
          remainingCredits: data.maxCredits - data.totalCredits
        };
      
      case 'summary':
        return {
          totalCourses: data.registeredCourses.length,
          totalCredits: data.totalCredits,
          maxCredits: data.maxCredits,
          deadline: data.registrationDeadline,
          status: data.totalCredits >= 15 ? 'Good' : 'Need More Credits'
        };
      
      default:
        return data;
    }
  }
  
  /**
   * Get project details
   * @param {string} type - Type of project data ('current', 'submissions', 'team')
   * @returns {Object} Project information
   */
  static getProjectData(type = 'current') {
    const data = mockData.projectDetails;
    
    switch (type) {
      case 'current':
        return {
          project: data.currentProject,
          nextDeadline: data.submissions.find(s => s.status === 'Under Review')
        };
      
      case 'submissions':
        return {
          submissions: data.submissions,
          currentProject: data.currentProject.title
        };
      
      case 'team':
        return {
          projectTitle: data.currentProject.title,
          team: data.currentProject.team,
          guide: data.currentProject.guide,
          status: data.currentProject.status
        };
      
      default:
        return data;
    }
  }
  
  /**
   * Get admit card information
   * @returns {Object} Admit card data
   */
  static getAdmitCardData() {
    return mockData.admitCard;
  }
  
  /**
   * Search across all data based on query
   * @param {string} query - Search query
   * @returns {Object} Search results with relevant data
   */
  static searchData(query) {
    const results = [];
    const queryLower = query.toLowerCase();
    
    // Search patterns and their corresponding data fetchers
    const searchPatterns = [
      {
        keywords: ['attendance', 'present', 'absent', 'classes'],
        dataFunction: () => this.getAttendanceData('detailed'),
        pageType: 'attendance',
        priority: 1
      },
      {
        keywords: ['marks', 'result', 'exam', 'grade', 'score'],
        dataFunction: () => this.getExamResultsData('current'),
        pageType: 'examResults',
        priority: 1
      },
      {
        keywords: ['timetable', 'schedule', 'class', 'period', 'today'],
        dataFunction: () => this.getTimetableData('today'),
        pageType: 'timetable',
        priority: 1
      },
      {
        keywords: ['cia', 'internal', 'assessment'],
        dataFunction: () => this.getCIAMarksData('detailed'),
        pageType: 'ciaMarks',
        priority: 1
      },
      {
        keywords: ['course', 'registration', 'subjects', 'credits'],
        dataFunction: () => this.getCourseRegistrationData('registered'),
        pageType: 'courseRegistration',
        priority: 2
      },
      {
        keywords: ['project', 'team', 'guide', 'submission'],
        dataFunction: () => this.getProjectData('current'),
        pageType: 'project',
        priority: 2
      },
      {
        keywords: ['admit', 'card', 'hall', 'ticket'],
        dataFunction: () => this.getAdmitCardData(),
        pageType: 'admitCard',
        priority: 2
      }
    ];
    
    // Find matching patterns
    const matches = searchPatterns.filter(pattern =>
      pattern.keywords.some(keyword => queryLower.includes(keyword))
    );
    
    // Sort by priority and return results
    matches.sort((a, b) => a.priority - b.priority);
    
    return matches.map(match => ({
      pageType: match.pageType,
      data: match.dataFunction(),
      relevance: this.calculateRelevance(queryLower, match.keywords)
    }));
  }
  
  /**
   * Calculate relevance score for search results
   * @param {string} query - Search query
   * @param {Array} keywords - Keywords to match against
   * @returns {number} Relevance score
   */
  static calculateRelevance(query, keywords) {
    let score = 0;
    keywords.forEach(keyword => {
      if (query.includes(keyword)) {
        score += keyword.length;
      }
    });
    return score;
  }
  
  /**
   * Calculate average grade from results
   * @param {Array} results - Array of result objects
   * @returns {string} Average grade
   */
  static calculateAverageGrade(results) {
    const gradePoints = { 'A+': 10, 'A': 9, 'B+': 8, 'B': 7, 'C+': 6, 'C': 5 };
    const total = results.reduce((sum, result) => sum + (gradePoints[result.grade] || 0), 0);
    const average = total / results.length;
    
    for (const [grade, points] of Object.entries(gradePoints)) {
      if (average >= points) return grade;
    }
    return 'C';
  }
  
  /**
   * Get formatted response for chatbot
   * @param {string} pageType - Type of page data
   * @param {Object} data - Data to format
   * @param {string} query - Original user query
   * @returns {string} Formatted response text
   */
  static formatChatbotResponse(pageType, data, query) {
    switch (pageType) {
      case 'attendance':
        return this.formatAttendanceResponse(data, query);
      case 'examResults':
        return this.formatExamResultsResponse(data, query);
      case 'timetable':
        return this.formatTimetableResponse(data, query);
      case 'ciaMarks':
        return this.formatCIAMarksResponse(data, query);
      case 'courseRegistration':
        return this.formatCourseRegistrationResponse(data, query);
      case 'project':
        return this.formatProjectResponse(data, query);
      case 'admitCard':
        return this.formatAdmitCardResponse(data, query);
      default:
        return 'I found some information, but I need more context to provide a specific answer.';
    }
  }
  
  static formatAttendanceResponse(data, query) {
    if (data.overall) {
      const overall = data.overall;
      let response = `📊 **Your Attendance Summary:**\n\n`;
      response += `Overall Attendance: **${overall.percentage}%** (${overall.attended}/${overall.total} classes)\n`;
      response += `Status: ${overall.percentage >= 75 ? '✅ Good' : '⚠️ Below Requirement'}\n\n`;
      
      if (data.subjects && data.subjects.length > 0) {
        response += `📚 **Subject-wise Attendance:**\n`;
        data.subjects.forEach(subject => {
          response += `• ${subject.name}: ${subject.percentage}% (${subject.attended}/${subject.total})\n`;
        });
      }
      
      return response;
    }
    return 'Attendance data is currently not available.';
  }
  
  static formatExamResultsResponse(data, query) {
    if (data.results) {
      let response = `🎓 **Your Exam Results (Semester ${data.semester}):**\n\n`;
      response += `SGPA: **${data.sgpa}** | CGPA: **${data.cgpa}**\n\n`;
      response += `📋 **Subject Results:**\n`;
      
      data.results.forEach(result => {
        response += `• ${result.subject}: ${result.total}/100 (Grade: ${result.grade})\n`;
        response += `  Internal: ${result.internal} | External: ${result.external}\n`;
      });
      
      return response;
    }
    return 'Exam results are currently not available.';
  }
  
  static formatTimetableResponse(data, query) {
    if (data.todaySchedule) {
      let response = `📅 **Today's Schedule (${data.currentDay}):**\n\n`;
      
      if (data.nextClass) {
        response += `⏰ **Next Class:** ${data.nextClass.subject}\n`;
        response += `Time: ${data.nextClass.time} | Room: ${data.nextClass.room}\n`;
        response += `Faculty: ${data.nextClass.faculty}\n\n`;
      }
      
      response += `📚 **Full Day Schedule:**\n`;
      data.todaySchedule.forEach(cls => {
        response += `• ${cls.time}: ${cls.subject} (${cls.room}) - ${cls.faculty}\n`;
      });
      
      return response;
    }
    return 'Timetable information is currently not available.';
  }
  
  static formatCIAMarksResponse(data, query) {
    if (data.subjects) {
      let response = `📊 **CIA Marks (Semester ${data.semester || 'Current'}):**\n\n`;
      response += `Overall Average: **${data.overallAverage || 'N/A'}/20**\n`;
      if (data.ranking) {
        response += `Class Rank: **${data.ranking}/${data.totalStudents || 'N/A'}**\n\n`;
      }
      
      response += `📚 **Subject-wise CIA Marks:**\n`;
      data.subjects.forEach(subject => {
        response += `• **${subject.name}**: Avg ${subject.average}/20 (${subject.status})\n`;
        response += `  CIA1: ${subject.cia1} | CIA2: ${subject.cia2} | CIA3: ${subject.cia3}\n`;
      });
      
      return response;
    }
    return 'CIA marks information is currently not available.';
  }
  
  static formatCourseRegistrationResponse(data, query) {
    if (data.registeredCourses) {
      let response = `📚 **Course Registration (Semester ${data.currentSemester}):**\n\n`;
      response += `Total Credits: **${data.totalCredits}/${data.maxCredits}**\n\n`;
      
      response += `📋 **Registered Courses:**\n`;
      data.registeredCourses.forEach(course => {
        response += `• ${course.code} - ${course.name} (${course.credits} credits)\n`;
        response += `  Type: ${course.type} | Status: ${course.status}\n`;
      });
      
      return response;
    }
    return 'Course registration information is currently not available.';
  }
  
  static formatProjectResponse(data, query) {
    if (data.project) {
      const project = data.project;
      let response = `🚀 **Project Details:**\n\n`;
      response += `**Title:** ${project.title}\n`;
      response += `**Guide:** ${project.guide}\n`;
      response += `**Status:** ${project.status} (${project.completionPercentage}% complete)\n`;
      response += `**Phase:** ${project.phase}\n`;
      response += `**Deadline:** ${project.deadline}\n\n`;
      
      response += `👥 **Team Members:**\n`;
      project.team.forEach(member => {
        response += `• ${member}\n`;
      });
      
      return response;
    }
    return 'Project information is currently not available.';
  }
  
  static formatAdmitCardResponse(data, query) {
    let response = `🎫 **Admit Card Information:**\n\n`;
    response += `**Exam:** ${data.examType} - Semester ${data.semester}\n`;
    response += `**Status:** ${data.downloadAvailable ? '✅ Available for Download' : '❌ Not Yet Available'}\n`;
    response += `**Exam Center:** ${data.examCenter}\n\n`;
    
    if (data.examDates) {
      response += `📅 **Exam Schedule:**\n`;
      Object.entries(data.examDates).forEach(([subject, datetime]) => {
        response += `• ${subject}: ${datetime}\n`;
      });
    }
    
    return response;
  }
}

export default PageDataService;
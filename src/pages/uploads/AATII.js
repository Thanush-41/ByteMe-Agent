import React, { useState } from 'react';
import './AATII.css';

const AATII = () => {
  const [formData, setFormData] = useState({
    studentId: 'CSE2021001',
    studentName: 'John Doe',
    semester: '6',
    subject: '',
    assessmentType: '',
    submissionDate: '',
    projectFile: null,
    reportFile: null,
    presentationFile: null
  });

  const [submissions, setSubmissions] = useState([
    {
      id: 1,
      subject: 'Software Engineering',
      assessmentType: 'Project Report',
      title: 'Agile Development Methodology Analysis',
      submissionDate: '2024-03-12',
      status: 'graded',
      grade: 'A',
      marks: 85,
      feedback: 'Comprehensive analysis with good practical insights',
      dueDate: '2024-03-15'
    },
    {
      id: 2,
      subject: 'Database Systems',
      assessmentType: 'Case Study',
      title: 'E-commerce Database Design',
      submissionDate: '2024-02-28',
      status: 'pending',
      grade: '-',
      marks: 0,
      feedback: 'Under evaluation',
      dueDate: '2024-03-01'
    },
    {
      id: 3,
      subject: 'Machine Learning',
      assessmentType: 'Research Paper',
      title: 'Deep Learning in Image Recognition',
      submissionDate: null,
      status: 'overdue',
      grade: '-',
      marks: 0,
      feedback: 'Submission pending',
      dueDate: '2024-02-20'
    }
  ]);

  const [currentAssignments, setCurrentAssignments] = useState([
    {
      id: 4,
      subject: 'Cybersecurity',
      assessmentType: 'Technical Report',
      title: 'Network Security Vulnerability Assessment',
      dueDate: '2024-04-15',
      description: 'Analyze common network vulnerabilities and propose security measures',
      maxMarks: 100,
      requirements: ['Minimum 15 pages', 'Include case studies', 'Cite recent research']
    },
    {
      id: 5,
      subject: 'Web Technologies',
      assessmentType: 'Project Implementation',
      title: 'Full-Stack Web Application',
      dueDate: '2024-04-20',
      description: 'Develop a complete web application using modern frameworks',
      maxMarks: 100,
      requirements: ['Frontend and Backend', 'Database integration', 'Deployment guide']
    }
  ]);

  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const subjects = [
    'Software Engineering',
    'Database Systems',
    'Machine Learning',
    'Cybersecurity',
    'Web Technologies',
    'Computer Networks',
    'Operating Systems',
    'Data Analytics',
    'Mobile Computing',
    'Cloud Computing'
  ];

  const assessmentTypes = [
    'Project Report',
    'Case Study',
    'Research Paper',
    'Technical Report',
    'Project Implementation',
    'System Design',
    'Literature Review',
    'Experimental Study'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    
    if (file) {
      // File size validation (50MB limit)
      if (file.size > 50 * 1024 * 1024) {
        alert('File size should not exceed 50MB');
        return;
      }

      setFormData(prev => ({
        ...prev,
        [name]: file
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.subject || !formData.assessmentType || !formData.submissionDate) {
      alert('Please fill all required fields');
      return;
    }

    if (!formData.projectFile && !formData.reportFile && !formData.presentationFile) {
      alert('Please upload at least one file');
      return;
    }

    const newSubmission = {
      id: submissions.length + 1,
      subject: formData.subject,
      assessmentType: formData.assessmentType,
      title: `${formData.assessmentType} - ${formData.subject}`,
      submissionDate: formData.submissionDate,
      status: 'submitted',
      grade: '-',
      marks: 0,
      feedback: 'Submitted for evaluation',
      dueDate: formData.submissionDate
    };

    setSubmissions([newSubmission, ...submissions]);
    
    // Reset form
    setFormData({
      ...formData,
      subject: '',
      assessmentType: '',
      submissionDate: '',
      projectFile: null,
      reportFile: null,
      presentationFile: null
    });
    
    setShowSubmissionForm(false);
    alert('AAT-II submission successful! You will receive feedback within 7-10 business days.');
  };

  const startAssignment = (assignment) => {
    setSelectedAssignment(assignment);
    setFormData({
      ...formData,
      subject: assignment.subject,
      assessmentType: assignment.assessmentType
    });
    setShowSubmissionForm(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'graded': return '#28a745';
      case 'submitted': return '#17a2b8';
      case 'pending': return '#ffc107';
      case 'overdue': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A+': case 'A': return '#28a745';
      case 'B+': case 'B': return '#17a2b8';
      case 'C+': case 'C': return '#ffc107';
      case 'D': return '#fd7e14';
      case 'F': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date();
  };

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="aat-ii">
      <div className="page-header">
        <h1>📝 AAT-II (Advanced Assessment Task - II)</h1>
        <p>Submit your advanced assessment tasks including projects, reports, and research papers</p>
      </div>

      <div className="aat-overview">
        <div className="overview-stats">
          <div className="stat-card">
            <span className="stat-number">{submissions.filter(s => s.status === 'graded').length}</span>
            <span className="stat-label">Completed</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{submissions.filter(s => s.status === 'pending' || s.status === 'submitted').length}</span>
            <span className="stat-label">Under Review</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{submissions.filter(s => s.status === 'overdue').length}</span>
            <span className="stat-label">Overdue</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{Math.round(submissions.filter(s => s.marks > 0).reduce((acc, s) => acc + s.marks, 0) / submissions.filter(s => s.marks > 0).length) || 0}</span>
            <span className="stat-label">Average Score</span>
          </div>
        </div>
      </div>

      <div className="current-assignments">
        <div className="section-header">
          <h2>📋 Current Assignments</h2>
        </div>
        
        <div className="assignments-grid">
          {currentAssignments.map(assignment => (
            <div key={assignment.id} className="assignment-card">
              <div className="assignment-header">
                <div className="assignment-type">{assignment.assessmentType}</div>
                <div className={`due-date ${isOverdue(assignment.dueDate) ? 'overdue' : getDaysUntilDue(assignment.dueDate) <= 3 ? 'urgent' : ''}`}>
                  {isOverdue(assignment.dueDate) ? '⚠️ Overdue' : `📅 ${getDaysUntilDue(assignment.dueDate)} days left`}
                </div>
              </div>
              
              <div className="assignment-content">
                <h3>{assignment.title}</h3>
                <p className="assignment-subject">{assignment.subject}</p>
                <p className="assignment-description">{assignment.description}</p>
                
                <div className="assignment-requirements">
                  <h4>Requirements:</h4>
                  <ul>
                    {assignment.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="assignment-meta">
                  <span className="max-marks">Max Marks: {assignment.maxMarks}</span>
                  <span className="due-date-full">Due: {assignment.dueDate}</span>
                </div>
              </div>
              
              <div className="assignment-actions">
                <button 
                  className="start-btn"
                  onClick={() => startAssignment(assignment)}
                >
                  📝 Start Submission
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="submission-section">
        <div className="section-header">
          <h2>Submit Assignment</h2>
          <button 
            className="submit-new-btn"
            onClick={() => setShowSubmissionForm(!showSubmissionForm)}
          >
            {showSubmissionForm ? '❌ Cancel' : '📝 New Submission'}
          </button>
        </div>

        {showSubmissionForm && (
          <div className="submission-form-container">
            <form onSubmit={handleSubmit} className="submission-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Student ID</label>
                  <input
                    type="text"
                    value={formData.studentId}
                    disabled
                    className="disabled-input"
                  />
                </div>
                <div className="form-group">
                  <label>Student Name</label>
                  <input
                    type="text"
                    value={formData.studentName}
                    disabled
                    className="disabled-input"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Subject *</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    disabled={selectedAssignment}
                  >
                    <option value="">Select Subject</option>
                    {subjects.map(subject => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Assessment Type *</label>
                  <select
                    name="assessmentType"
                    value={formData.assessmentType}
                    onChange={handleInputChange}
                    required
                    disabled={selectedAssignment}
                  >
                    <option value="">Select Type</option>
                    {assessmentTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Submission Date *</label>
                <input
                  type="date"
                  name="submissionDate"
                  value={formData.submissionDate}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="file-uploads">
                <h3>📁 File Uploads</h3>
                
                <div className="form-group">
                  <label>Project/Implementation File (Max 50MB)</label>
                  <div className="file-upload-area">
                    <input
                      type="file"
                      id="project-file"
                      name="projectFile"
                      onChange={handleFileChange}
                      accept=".zip,.rar,.7z,.tar"
                      style={{ display: 'none' }}
                    />
                    <label htmlFor="project-file" className="file-upload-label">
                      <div className="upload-icon">💻</div>
                      <div className="upload-text">
                        {formData.projectFile ? (
                          <span className="file-selected">
                            ✅ {formData.projectFile.name}
                          </span>
                        ) : (
                          <>
                            <span>Click to upload project files</span>
                            <small>ZIP, RAR, 7Z, TAR (Max 50MB)</small>
                          </>
                        )}
                      </div>
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label>Report/Documentation (Max 50MB)</label>
                  <div className="file-upload-area">
                    <input
                      type="file"
                      id="report-file"
                      name="reportFile"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
                      style={{ display: 'none' }}
                    />
                    <label htmlFor="report-file" className="file-upload-label">
                      <div className="upload-icon">📄</div>
                      <div className="upload-text">
                        {formData.reportFile ? (
                          <span className="file-selected">
                            ✅ {formData.reportFile.name}
                          </span>
                        ) : (
                          <>
                            <span>Click to upload report</span>
                            <small>PDF, DOC, DOCX (Max 50MB)</small>
                          </>
                        )}
                      </div>
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label>Presentation (Optional - Max 50MB)</label>
                  <div className="file-upload-area">
                    <input
                      type="file"
                      id="presentation-file"
                      name="presentationFile"
                      onChange={handleFileChange}
                      accept=".ppt,.pptx,.pdf"
                      style={{ display: 'none' }}
                    />
                    <label htmlFor="presentation-file" className="file-upload-label">
                      <div className="upload-icon">📊</div>
                      <div className="upload-text">
                        {formData.presentationFile ? (
                          <span className="file-selected">
                            ✅ {formData.presentationFile.name}
                          </span>
                        ) : (
                          <>
                            <span>Click to upload presentation</span>
                            <small>PPT, PPTX, PDF (Max 50MB)</small>
                          </>
                        )}
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  📝 Submit Assignment
                </button>
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={() => {
                    setShowSubmissionForm(false);
                    setSelectedAssignment(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      <div className="submissions-history">
        <div className="section-header">
          <h2>Submission History</h2>
        </div>
        
        <div className="submissions-table">
          <table>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Assessment Type</th>
                <th>Title</th>
                <th>Submission Date</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Grade</th>
                <th>Marks</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map(submission => (
                <tr key={submission.id} className={submission.status === 'overdue' ? 'overdue-row' : ''}>
                  <td>{submission.subject}</td>
                  <td>{submission.assessmentType}</td>
                  <td>
                    <div className="title-info">
                      <strong>{submission.title}</strong>
                    </div>
                  </td>
                  <td>{submission.submissionDate || '-'}</td>
                  <td>{submission.dueDate}</td>
                  <td>
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(submission.status), color: 'white' }}
                    >
                      {submission.status.toUpperCase()}
                    </span>
                  </td>
                  <td>
                    <span 
                      className="grade-badge"
                      style={{ color: getGradeColor(submission.grade) }}
                    >
                      {submission.grade}
                    </span>
                  </td>
                  <td>
                    <span className="marks">{submission.marks}/100</span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="view-btn" title="View Details">👁️</button>
                      <button className="download-btn" title="Download">⬇️</button>
                      {submission.feedback && submission.feedback !== 'Submitted for evaluation' && (
                        <button className="feedback-btn" title="View Feedback">💬</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="aat-guidelines">
        <h3>📋 AAT-II Guidelines</h3>
        <div className="guidelines-grid">
          <div className="guideline-card">
            <h4>Submission Requirements</h4>
            <ul>
              <li>All files must be clearly labeled</li>
              <li>Submit before the due date</li>
              <li>Include complete documentation</li>
              <li>Follow specified format guidelines</li>
              <li>Ensure all files are readable</li>
            </ul>
          </div>
          <div className="guideline-card">
            <h4>File Specifications</h4>
            <ul>
              <li>Maximum file size: 50MB</li>
              <li>Accepted formats: PDF, DOC, ZIP, RAR</li>
              <li>Use clear file naming conventions</li>
              <li>Compress large project folders</li>
              <li>Include readme files for projects</li>
            </ul>
          </div>
          <div className="guideline-card">
            <h4>Evaluation Criteria</h4>
            <ul>
              <li>Content quality and accuracy</li>
              <li>Adherence to requirements</li>
              <li>Timely submission</li>
              <li>Presentation and formatting</li>
              <li>Innovation and creativity</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AATII;
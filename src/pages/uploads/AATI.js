import React, { useState } from 'react';
import './AATI.css';

const AATI = () => {
  const [formData, setFormData] = useState({
    studentId: 'CSE2021001',
    studentName: 'John Doe',
    semester: '6',
    subject: '',
    assignmentTitle: '',
    submissionDate: '',
    description: '',
    assignmentFile: null,
    additionalFiles: []
  });

  const [submissions, setSubmissions] = useState([
    {
      id: 1,
      subject: 'Data Structures',
      title: 'Binary Search Tree Implementation',
      submissionDate: '2024-03-10',
      dueDate: '2024-03-12',
      status: 'graded',
      grade: 'A+',
      marks: 95,
      feedback: 'Excellent implementation with optimal time complexity',
      submittedOnTime: true
    },
    {
      id: 2,
      subject: 'Algorithms',
      title: 'Dynamic Programming Solutions',
      submissionDate: '2024-03-05',
      dueDate: '2024-03-05',
      status: 'graded',
      grade: 'B+',
      marks: 82,
      feedback: 'Good approach, minor optimization issues',
      submittedOnTime: true
    },
    {
      id: 3,
      subject: 'Database Management',
      title: 'SQL Query Optimization',
      submissionDate: '2024-02-28',
      dueDate: '2024-02-25',
      status: 'graded',
      grade: 'B',
      marks: 75,
      feedback: 'Late submission penalty applied. Good content otherwise.',
      submittedOnTime: false
    }
  ]);

  const [activeAssignments, setActiveAssignments] = useState([
    {
      id: 4,
      subject: 'Computer Networks',
      title: 'Network Protocol Analysis',
      dueDate: '2024-04-10',
      description: 'Analyze different network protocols and their performance characteristics',
      maxMarks: 100,
      instructions: [
        'Compare at least 3 different protocols',
        'Include performance metrics',
        'Provide real-world examples',
        'Submit code examples if applicable'
      ]
    },
    {
      id: 5,
      subject: 'Operating Systems',
      title: 'Process Scheduling Algorithms',
      dueDate: '2024-04-15',
      description: 'Implement and compare different process scheduling algorithms',
      maxMarks: 100,
      instructions: [
        'Implement FCFS, SJF, and Round Robin',
        'Compare performance metrics',
        'Include test cases',
        'Provide detailed analysis'
      ]
    }
  ]);

  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const subjects = [
    'Data Structures',
    'Algorithms',
    'Database Management',
    'Computer Networks',
    'Operating Systems',
    'Software Engineering',
    'Web Technologies',
    'Machine Learning',
    'Cybersecurity',
    'Mobile Computing'
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
      // File size validation (25MB limit)
      if (file.size > 25 * 1024 * 1024) {
        alert('File size should not exceed 25MB');
        return;
      }

      setFormData(prev => ({
        ...prev,
        [name]: file
      }));
    }
  };

  const handleAdditionalFiles = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => {
      if (file.size > 25 * 1024 * 1024) {
        alert(`File ${file.name} exceeds 25MB limit`);
        return false;
      }
      return true;
    });

    setFormData(prev => ({
      ...prev,
      additionalFiles: [...prev.additionalFiles, ...validFiles]
    }));
  };

  const removeAdditionalFile = (index) => {
    setFormData(prev => ({
      ...prev,
      additionalFiles: prev.additionalFiles.filter((_, i) => i !== index)
    }));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange({ target: { name: 'assignmentFile', files: e.dataTransfer.files } });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.subject || !formData.assignmentTitle || !formData.submissionDate || !formData.assignmentFile) {
      alert('Please fill all required fields and upload the main file');
      return;
    }

    const newSubmission = {
      id: submissions.length + 1,
      subject: formData.subject,
      title: formData.assignmentTitle,
      submissionDate: formData.submissionDate,
      dueDate: selectedAssignment?.dueDate || formData.submissionDate,
      status: 'submitted',
      grade: '-',
      marks: 0,
      feedback: 'Submitted for evaluation',
      submittedOnTime: true
    };

    setSubmissions([newSubmission, ...submissions]);
    
    // Reset form
    setFormData({
      ...formData,
      subject: '',
      assignmentTitle: '',
      submissionDate: '',
      description: '',
      assignmentFile: null,
      additionalFiles: []
    });
    
    setShowSubmissionForm(false);
    setSelectedAssignment(null);
    alert('AAT-I submission successful! You will receive feedback within 5-7 business days.');
  };

  const startAssignment = (assignment) => {
    setSelectedAssignment(assignment);
    setFormData({
      ...formData,
      subject: assignment.subject,
      assignmentTitle: assignment.title,
      description: assignment.description
    });
    setShowSubmissionForm(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'graded': return '#28a745';
      case 'submitted': return '#17a2b8';
      case 'pending': return '#ffc107';
      case 'late': return '#fd7e14';
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

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="aat-i">
      <div className="page-header">
        <h1>📚 AAT-I (Advanced Assessment Task - I)</h1>
        <p>Submit your first advanced assessment tasks and assignments</p>
      </div>

      <div className="aat-overview">
        <div className="overview-stats">
          <div className="stat-card">
            <span className="stat-number">{submissions.filter(s => s.status === 'graded').length}</span>
            <span className="stat-label">Completed</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{submissions.filter(s => s.submittedOnTime).length}</span>
            <span className="stat-label">On Time</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{activeAssignments.length}</span>
            <span className="stat-label">Pending</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{Math.round(submissions.filter(s => s.marks > 0).reduce((acc, s) => acc + s.marks, 0) / submissions.filter(s => s.marks > 0).length) || 0}</span>
            <span className="stat-label">Average Score</span>
          </div>
        </div>
      </div>

      <div className="active-assignments">
        <div className="section-header">
          <h2>📋 Active Assignments</h2>
        </div>
        
        <div className="assignments-grid">
          {activeAssignments.map(assignment => (
            <div key={assignment.id} className="assignment-card">
              <div className="assignment-header">
                <div className="assignment-subject">{assignment.subject}</div>
                <div className={`due-indicator ${isOverdue(assignment.dueDate) ? 'overdue' : getDaysUntilDue(assignment.dueDate) <= 2 ? 'urgent' : ''}`}>
                  {isOverdue(assignment.dueDate) ? '⚠️ Overdue' : `📅 ${getDaysUntilDue(assignment.dueDate)} days left`}
                </div>
              </div>
              
              <div className="assignment-content">
                <h3>{assignment.title}</h3>
                <p className="assignment-description">{assignment.description}</p>
                
                <div className="assignment-instructions">
                  <h4>Instructions:</h4>
                  <ul>
                    {assignment.instructions.map((instruction, index) => (
                      <li key={index}>{instruction}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="assignment-meta">
                  <span className="max-marks">Max Marks: {assignment.maxMarks}</span>
                  <span className="due-date">Due: {assignment.dueDate}</span>
                </div>
              </div>
              
              <div className="assignment-actions">
                <button 
                  className="start-btn"
                  onClick={() => startAssignment(assignment)}
                >
                  📝 Submit Assignment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="submission-section">
        <div className="section-header">
          <h2>Submit New Assignment</h2>
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
                  <label>Submission Date *</label>
                  <input
                    type="date"
                    name="submissionDate"
                    value={formData.submissionDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group full-width">
                <label>Assignment Title *</label>
                <input
                  type="text"
                  name="assignmentTitle"
                  value={formData.assignmentTitle}
                  onChange={handleInputChange}
                  placeholder="Enter assignment title"
                  required
                  disabled={selectedAssignment}
                />
              </div>

              <div className="form-group full-width">
                <label>Description (Optional)</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter assignment description or notes"
                  rows="3"
                  disabled={selectedAssignment}
                />
              </div>

              <div className="file-uploads">
                <h3>📁 File Uploads</h3>
                
                <div className="form-group">
                  <label>Main Assignment File * (Max 25MB)</label>
                  <div 
                    className={`file-upload-area ${dragActive ? 'drag-active' : ''}`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      id="assignment-file"
                      name="assignmentFile"
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                    />
                    <label htmlFor="assignment-file" className="file-upload-label">
                      <div className="upload-icon">📄</div>
                      <div className="upload-text">
                        {formData.assignmentFile ? (
                          <span className="file-selected">
                            ✅ {formData.assignmentFile.name}
                          </span>
                        ) : (
                          <>
                            <span>Click to upload or drag and drop</span>
                            <small>PDF, DOC, ZIP, RAR, TXT (Max 25MB)</small>
                          </>
                        )}
                      </div>
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label>Additional Files (Optional - Max 25MB each)</label>
                  <input
                    type="file"
                    id="additional-files"
                    multiple
                    onChange={handleAdditionalFiles}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="additional-files" className="file-upload-secondary">
                    📎 Add More Files
                  </label>
                  
                  {formData.additionalFiles.length > 0 && (
                    <div className="additional-files-list">
                      {formData.additionalFiles.map((file, index) => (
                        <div key={index} className="additional-file-item">
                          <span className="file-name">📎 {file.name}</span>
                          <button 
                            type="button" 
                            className="remove-file-btn"
                            onClick={() => removeAdditionalFile(index)}
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
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
                <th>Assignment Title</th>
                <th>Submission Date</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Grade</th>
                <th>Marks</th>
                <th>On Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map(submission => (
                <tr key={submission.id} className={!submission.submittedOnTime ? 'late-submission' : ''}>
                  <td>{submission.subject}</td>
                  <td>
                    <div className="title-info">
                      <strong>{submission.title}</strong>
                    </div>
                  </td>
                  <td>{submission.submissionDate}</td>
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
                    <span className={`on-time-indicator ${submission.submittedOnTime ? 'on-time' : 'late'}`}>
                      {submission.submittedOnTime ? '✅' : '⚠️'}
                    </span>
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
        <h3>📋 AAT-I Guidelines</h3>
        <div className="guidelines-grid">
          <div className="guideline-card">
            <h4>Submission Rules</h4>
            <ul>
              <li>Submit assignments before due date</li>
              <li>Late submissions may incur penalties</li>
              <li>Ensure all required files are included</li>
              <li>Use clear and descriptive file names</li>
              <li>Double-check submission before finalizing</li>
            </ul>
          </div>
          <div className="guideline-card">
            <h4>File Requirements</h4>
            <ul>
              <li>Maximum file size: 25MB per file</li>
              <li>Accepted formats: PDF, DOC, ZIP, TXT</li>
              <li>Multiple files allowed if needed</li>
              <li>Compress large files when possible</li>
              <li>Include source code in ZIP format</li>
            </ul>
          </div>
          <div className="guideline-card">
            <h4>Quality Standards</h4>
            <ul>
              <li>Original work required</li>
              <li>Proper citations and references</li>
              <li>Clear structure and formatting</li>
              <li>Complete and well-documented</li>
              <li>Follow assignment specifications</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AATI;
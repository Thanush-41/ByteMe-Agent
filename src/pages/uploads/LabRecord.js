import React, { useState } from 'react';
import './LabRecord.css';

const LabRecord = () => {
  const [formData, setFormData] = useState({
    studentId: 'CSE2021001',
    studentName: 'John Doe',
    semester: '6',
    labSubject: '',
    experimentNumber: '',
    experimentTitle: '',
    submissionDate: '',
    labRecordFile: null,
    codeFiles: [],
    outputScreenshots: []
  });

  const [submissions, setSubmissions] = useState([
    {
      id: 1,
      labSubject: 'Data Structures Lab',
      experimentNumber: 'Exp-05',
      experimentTitle: 'Implementation of Binary Search Tree',
      submissionDate: '2024-03-08',
      dueDate: '2024-03-10',
      status: 'approved',
      grade: 'A',
      marks: 18,
      feedback: 'Excellent implementation with proper documentation',
      isComplete: true
    },
    {
      id: 2,
      labSubject: 'Database Lab',
      experimentNumber: 'Exp-03',
      experimentTitle: 'SQL Joins and Subqueries',
      submissionDate: '2024-03-05',
      dueDate: '2024-03-07',
      status: 'graded',
      grade: 'B+',
      marks: 16,
      feedback: 'Good queries, minor optimization needed',
      isComplete: true
    },
    {
      id: 3,
      labSubject: 'Web Programming Lab',
      experimentNumber: 'Exp-07',
      experimentTitle: 'AJAX and API Integration',
      submissionDate: '2024-03-01',
      dueDate: '2024-03-03',
      status: 'pending',
      grade: '-',
      marks: 0,
      feedback: 'Under review',
      isComplete: false
    }
  ]);

  const [labSchedule, setLabSchedule] = useState([
    {
      id: 4,
      labSubject: 'Computer Networks Lab',
      experimentNumber: 'Exp-04',
      experimentTitle: 'Network Protocol Simulation',
      dueDate: '2024-04-12',
      maxMarks: 20,
      description: 'Simulate different network protocols using NS2/NS3',
      requirements: ['NS2/NS3 code', 'Simulation results', 'Analysis report'],
      status: 'assigned'
    },
    {
      id: 5,
      labSubject: 'Operating Systems Lab',
      experimentNumber: 'Exp-06',
      experimentTitle: 'Process Synchronization',
      dueDate: '2024-04-15',
      maxMarks: 20,
      description: 'Implement producer-consumer problem using semaphores',
      requirements: ['C/C++ code', 'Output screenshots', 'Detailed explanation'],
      status: 'assigned'
    }
  ]);

  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [selectedLab, setSelectedLab] = useState(null);

  const labSubjects = [
    'Data Structures Lab',
    'Database Lab',
    'Web Programming Lab',
    'Computer Networks Lab',
    'Operating Systems Lab',
    'Software Engineering Lab',
    'Machine Learning Lab',
    'Cybersecurity Lab',
    'Mobile Computing Lab',
    'Cloud Computing Lab'
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
      // File size validation (20MB limit)
      if (file.size > 20 * 1024 * 1024) {
        alert('File size should not exceed 20MB');
        return;
      }

      setFormData(prev => ({
        ...prev,
        [name]: file
      }));
    }
  };

  const handleMultipleFiles = (e, fileType) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => {
      if (file.size > 10 * 1024 * 1024) {
        alert(`File ${file.name} exceeds 10MB limit`);
        return false;
      }
      return true;
    });

    setFormData(prev => ({
      ...prev,
      [fileType]: [...prev[fileType], ...validFiles]
    }));
  };

  const removeFile = (fileType, index) => {
    setFormData(prev => ({
      ...prev,
      [fileType]: prev[fileType].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.labSubject || !formData.experimentNumber || !formData.experimentTitle || !formData.submissionDate) {
      alert('Please fill all required fields');
      return;
    }

    if (!formData.labRecordFile) {
      alert('Please upload the lab record file');
      return;
    }

    const newSubmission = {
      id: submissions.length + 1,
      labSubject: formData.labSubject,
      experimentNumber: formData.experimentNumber,
      experimentTitle: formData.experimentTitle,
      submissionDate: formData.submissionDate,
      dueDate: selectedLab?.dueDate || formData.submissionDate,
      status: 'submitted',
      grade: '-',
      marks: 0,
      feedback: 'Submitted for evaluation',
      isComplete: true
    };

    setSubmissions([newSubmission, ...submissions]);
    
    // Reset form
    setFormData({
      ...formData,
      labSubject: '',
      experimentNumber: '',
      experimentTitle: '',
      submissionDate: '',
      labRecordFile: null,
      codeFiles: [],
      outputScreenshots: []
    });
    
    setShowSubmissionForm(false);
    setSelectedLab(null);
    alert('Lab record submitted successfully! Evaluation will be completed within 3-5 business days.');
  };

  const startLabSubmission = (lab) => {
    setSelectedLab(lab);
    setFormData({
      ...formData,
      labSubject: lab.labSubject,
      experimentNumber: lab.experimentNumber,
      experimentTitle: lab.experimentTitle
    });
    setShowSubmissionForm(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return '#28a745';
      case 'graded': return '#17a2b8';
      case 'submitted': return '#ffc107';
      case 'pending': return '#6c757d';
      case 'rejected': return '#dc3545';
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
    <div className="lab-record">
      <div className="page-header">
        <h1>🧪 Lab Record Submission</h1>
        <p>Submit your laboratory experiment records and documentation</p>
      </div>

      <div className="lab-overview">
        <div className="overview-stats">
          <div className="stat-card">
            <span className="stat-number">{submissions.filter(s => s.status === 'approved' || s.status === 'graded').length}</span>
            <span className="stat-label">Completed Labs</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{submissions.filter(s => s.status === 'pending' || s.status === 'submitted').length}</span>
            <span className="stat-label">Under Review</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{labSchedule.length}</span>
            <span className="stat-label">Pending Labs</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{Math.round(submissions.filter(s => s.marks > 0).reduce((acc, s) => acc + s.marks, 0) / submissions.filter(s => s.marks > 0).length) || 0}</span>
            <span className="stat-label">Average Score</span>
          </div>
        </div>
      </div>

      <div className="lab-schedule">
        <div className="section-header">
          <h2>📅 Upcoming Lab Assignments</h2>
        </div>
        
        <div className="schedule-grid">
          {labSchedule.map(lab => (
            <div key={lab.id} className="lab-card">
              <div className="lab-header">
                <div className="experiment-number">{lab.experimentNumber}</div>
                <div className={`due-indicator ${isOverdue(lab.dueDate) ? 'overdue' : getDaysUntilDue(lab.dueDate) <= 2 ? 'urgent' : ''}`}>
                  {isOverdue(lab.dueDate) ? '⚠️ Overdue' : `📅 ${getDaysUntilDue(lab.dueDate)} days left`}
                </div>
              </div>
              
              <div className="lab-content">
                <h3>{lab.experimentTitle}</h3>
                <p className="lab-subject">{lab.labSubject}</p>
                <p className="lab-description">{lab.description}</p>
                
                <div className="lab-requirements">
                  <h4>Requirements:</h4>
                  <ul>
                    {lab.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="lab-meta">
                  <span className="max-marks">Max Marks: {lab.maxMarks}</span>
                  <span className="due-date">Due: {lab.dueDate}</span>
                </div>
              </div>
              
              <div className="lab-actions">
                <button 
                  className="submit-btn"
                  onClick={() => startLabSubmission(lab)}
                >
                  📝 Submit Lab Record
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="submission-section">
        <div className="section-header">
          <h2>Submit Lab Record</h2>
          <button 
            className="submit-new-btn"
            onClick={() => setShowSubmissionForm(!showSubmissionForm)}
          >
            {showSubmissionForm ? '❌ Cancel' : '🧪 New Submission'}
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
                  <label>Lab Subject *</label>
                  <select
                    name="labSubject"
                    value={formData.labSubject}
                    onChange={handleInputChange}
                    required
                    disabled={selectedLab}
                  >
                    <option value="">Select Lab Subject</option>
                    {labSubjects.map(subject => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Experiment Number *</label>
                  <input
                    type="text"
                    name="experimentNumber"
                    value={formData.experimentNumber}
                    onChange={handleInputChange}
                    placeholder="e.g., Exp-01"
                    required
                    disabled={selectedLab}
                  />
                </div>
              </div>

              <div className="form-group full-width">
                <label>Experiment Title *</label>
                <input
                  type="text"
                  name="experimentTitle"
                  value={formData.experimentTitle}
                  onChange={handleInputChange}
                  placeholder="Enter experiment title"
                  required
                  disabled={selectedLab}
                />
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
                  <label>Lab Record Document * (Max 20MB)</label>
                  <div className="file-upload-area">
                    <input
                      type="file"
                      id="lab-record-file"
                      name="labRecordFile"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                    />
                    <label htmlFor="lab-record-file" className="file-upload-label">
                      <div className="upload-icon">📄</div>
                      <div className="upload-text">
                        {formData.labRecordFile ? (
                          <span className="file-selected">
                            ✅ {formData.labRecordFile.name}
                          </span>
                        ) : (
                          <>
                            <span>Click to upload lab record</span>
                            <small>PDF, DOC, DOCX (Max 20MB)</small>
                          </>
                        )}
                      </div>
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label>Source Code Files (Optional - Max 10MB each)</label>
                  <input
                    type="file"
                    id="code-files"
                    multiple
                    accept=".c,.cpp,.java,.py,.js,.html,.css,.sql"
                    onChange={(e) => handleMultipleFiles(e, 'codeFiles')}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="code-files" className="file-upload-secondary">
                    💻 Add Code Files
                  </label>
                  
                  {formData.codeFiles.length > 0 && (
                    <div className="file-list">
                      <h4>Code Files:</h4>
                      {formData.codeFiles.map((file, index) => (
                        <div key={index} className="file-item">
                          <span className="file-name">💻 {file.name}</span>
                          <button 
                            type="button" 
                            className="remove-file-btn"
                            onClick={() => removeFile('codeFiles', index)}
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label>Output Screenshots (Optional - Max 10MB each)</label>
                  <input
                    type="file"
                    id="output-screenshots"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleMultipleFiles(e, 'outputScreenshots')}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="output-screenshots" className="file-upload-secondary">
                    📸 Add Screenshots
                  </label>
                  
                  {formData.outputScreenshots.length > 0 && (
                    <div className="file-list">
                      <h4>Screenshots:</h4>
                      {formData.outputScreenshots.map((file, index) => (
                        <div key={index} className="file-item">
                          <span className="file-name">📸 {file.name}</span>
                          <button 
                            type="button" 
                            className="remove-file-btn"
                            onClick={() => removeFile('outputScreenshots', index)}
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
                  🧪 Submit Lab Record
                </button>
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={() => {
                    setShowSubmissionForm(false);
                    setSelectedLab(null);
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
                <th>Lab Subject</th>
                <th>Experiment</th>
                <th>Title</th>
                <th>Submission Date</th>
                <th>Status</th>
                <th>Grade</th>
                <th>Marks</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map(submission => (
                <tr key={submission.id}>
                  <td>{submission.labSubject}</td>
                  <td>
                    <div className="experiment-info">
                      <strong>{submission.experimentNumber}</strong>
                    </div>
                  </td>
                  <td>
                    <div className="title-info">
                      {submission.experimentTitle}
                    </div>
                  </td>
                  <td>{submission.submissionDate}</td>
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
                    <span className="marks">{submission.marks}/20</span>
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

      <div className="lab-guidelines">
        <h3>📋 Lab Record Guidelines</h3>
        <div className="guidelines-grid">
          <div className="guideline-card">
            <h4>Record Format</h4>
            <ul>
              <li>Include experiment title and objective</li>
              <li>Document procedure and methodology</li>
              <li>Present results and observations</li>
              <li>Provide conclusions and analysis</li>
              <li>Include proper diagrams and code</li>
            </ul>
          </div>
          <div className="guideline-card">
            <h4>File Requirements</h4>
            <ul>
              <li>Lab record: PDF/DOC format (Max 20MB)</li>
              <li>Source code: Original files (Max 10MB each)</li>
              <li>Screenshots: Clear and readable images</li>
              <li>Use descriptive file names</li>
              <li>Organize files properly</li>
            </ul>
          </div>
          <div className="guideline-card">
            <h4>Evaluation Criteria</h4>
            <ul>
              <li>Completeness and accuracy</li>
              <li>Proper documentation</li>
              <li>Code functionality and quality</li>
              <li>Timely submission</li>
              <li>Presentation and formatting</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabRecord;
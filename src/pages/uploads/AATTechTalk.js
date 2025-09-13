import React, { useState } from 'react';
import './AATTechTalk.css';

const AATTechTalk = () => {
  const [formData, setFormData] = useState({
    studentId: 'CSE2021001',
    studentName: 'John Doe',
    semester: '6',
    subject: '',
    topic: '',
    duration: '15',
    presentationDate: '',
    venue: '',
    audience: '',
    videoFile: null,
    presentationFile: null
  });

  const [submissions, setSubmissions] = useState([
    {
      id: 1,
      subject: 'Machine Learning',
      topic: 'Neural Networks in Computer Vision',
      submissionDate: '2024-03-15',
      status: 'approved',
      grade: 'A',
      feedback: 'Excellent presentation with clear examples',
      duration: '18 minutes'
    },
    {
      id: 2,
      subject: 'Web Technologies',
      topic: 'React Hooks Deep Dive',
      submissionDate: '2024-02-28',
      status: 'pending',
      grade: '-',
      feedback: 'Under review',
      duration: '15 minutes'
    }
  ]);

  const [currentStep, setCurrentStep] = useState(1);
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);

  const subjects = [
    'Machine Learning',
    'Web Technologies',
    'Data Structures',
    'Database Management',
    'Software Engineering',
    'Computer Networks',
    'Operating Systems',
    'Artificial Intelligence',
    'Cybersecurity',
    'Mobile App Development'
  ];

  const venueOptions = [
    'Seminar Hall A',
    'Seminar Hall B',
    'Conference Room 1',
    'Conference Room 2',
    'Auditorium',
    'Virtual (Online)',
    'Lab - CS1',
    'Lab - CS2'
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
      // File size validation
      const maxSize = name === 'videoFile' ? 500 * 1024 * 1024 : 50 * 1024 * 1024; // 500MB for video, 50MB for presentation
      if (file.size > maxSize) {
        alert(`File size should not exceed ${name === 'videoFile' ? '500MB' : '50MB'}`);
        return;
      }

      // File type validation
      if (name === 'videoFile') {
        if (!file.type.includes('video/')) {
          alert('Please upload only video files (MP4, AVI, MOV, etc.)');
          return;
        }
      } else if (name === 'presentationFile') {
        if (!file.type.includes('pdf') && !file.type.includes('powerpoint') && !file.type.includes('presentation')) {
          alert('Please upload only PDF or PowerPoint files');
          return;
        }
      }

      setFormData(prev => ({
        ...prev,
        [name]: file
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.subject || !formData.topic || !formData.presentationDate || !formData.videoFile) {
      alert('Please fill all required fields');
      return;
    }

    const newSubmission = {
      id: submissions.length + 1,
      subject: formData.subject,
      topic: formData.topic,
      submissionDate: new Date().toISOString().split('T')[0],
      status: 'pending',
      grade: '-',
      feedback: 'Submitted for review',
      duration: `${formData.duration} minutes`
    };

    setSubmissions([newSubmission, ...submissions]);
    
    // Reset form
    setFormData({
      ...formData,
      subject: '',
      topic: '',
      presentationDate: '',
      venue: '',
      audience: '',
      videoFile: null,
      presentationFile: null
    });
    
    setShowSubmissionForm(false);
    setCurrentStep(1);
    alert('Tech Talk submission successful! You will receive feedback within 5-7 business days.');
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return '#28a745';
      case 'rejected': return '#dc3545';
      case 'pending': return '#ffc107';
      default: return '#6c757d';
    }
  };

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A': case 'A+': return '#28a745';
      case 'B': case 'B+': return '#17a2b8';
      case 'C': case 'C+': return '#ffc107';
      case 'D': return '#fd7e14';
      case 'F': return '#dc3545';
      default: return '#6c757d';
    }
  };

  return (
    <div className="aat-tech-talk">
      <div className="page-header">
        <h1>🎤 AAT (Tech Talk)</h1>
        <p>Submit your technical presentations and demonstrate your communication skills</p>
      </div>

      <div className="tech-talk-overview">
        <div className="overview-stats">
          <div className="stat-card">
            <span className="stat-number">{submissions.filter(s => s.status === 'approved').length}</span>
            <span className="stat-label">Approved Talks</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{submissions.filter(s => s.status === 'pending').length}</span>
            <span className="stat-label">Pending Review</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{submissions.filter(s => s.grade !== '-').length}</span>
            <span className="stat-label">Graded Submissions</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{submissions.length}</span>
            <span className="stat-label">Total Submissions</span>
          </div>
        </div>
      </div>

      <div className="submission-section">
        <div className="section-header">
          <h2>Submit New Tech Talk</h2>
          <button 
            className="submit-new-btn"
            onClick={() => setShowSubmissionForm(!showSubmissionForm)}
          >
            {showSubmissionForm ? '❌ Cancel' : '🎤 New Submission'}
          </button>
        </div>

        {showSubmissionForm && (
          <div className="submission-form-container">
            <div className="progress-steps">
              <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
                <span className="step-number">1</span>
                <span className="step-label">Basic Info</span>
              </div>
              <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
                <span className="step-number">2</span>
                <span className="step-label">Presentation Details</span>
              </div>
              <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
                <span className="step-number">3</span>
                <span className="step-label">File Upload</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="submission-form">
              {currentStep === 1 && (
                <div className="step-content">
                  <h3>📝 Basic Information</h3>
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
                      <label>Semester</label>
                      <input
                        type="text"
                        value={formData.semester}
                        disabled
                        className="disabled-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Subject *</label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Subject</option>
                        {subjects.map(subject => (
                          <option key={subject} value={subject}>{subject}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group full-width">
                    <label>Presentation Topic *</label>
                    <input
                      type="text"
                      name="topic"
                      value={formData.topic}
                      onChange={handleInputChange}
                      placeholder="Enter your presentation topic"
                      required
                    />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="step-content">
                  <h3>🎯 Presentation Details</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Presentation Date *</label>
                      <input
                        type="date"
                        name="presentationDate"
                        value={formData.presentationDate}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Duration (minutes) *</label>
                      <select
                        name="duration"
                        value={formData.duration}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="15">15 minutes</option>
                        <option value="20">20 minutes</option>
                        <option value="25">25 minutes</option>
                        <option value="30">30 minutes</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Venue</label>
                      <select
                        name="venue"
                        value={formData.venue}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Venue</option>
                        {venueOptions.map(venue => (
                          <option key={venue} value={venue}>{venue}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Target Audience</label>
                      <input
                        type="text"
                        name="audience"
                        value={formData.audience}
                        onChange={handleInputChange}
                        placeholder="e.g., CSE students, Faculty"
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="step-content">
                  <h3>📁 File Upload</h3>
                  <div className="file-upload-section">
                    <div className="form-group">
                      <label>Presentation Video * (Max 500MB)</label>
                      <div className="file-upload-area">
                        <input
                          type="file"
                          id="video-file"
                          name="videoFile"
                          accept="video/*"
                          onChange={handleFileChange}
                          style={{ display: 'none' }}
                        />
                        <label htmlFor="video-file" className="file-upload-label">
                          <div className="upload-icon">🎥</div>
                          <div className="upload-text">
                            {formData.videoFile ? (
                              <span className="file-selected">
                                ✅ {formData.videoFile.name}
                              </span>
                            ) : (
                              <>
                                <span>Click to upload video</span>
                                <small>MP4, AVI, MOV, WMV (Max 500MB)</small>
                              </>
                            )}
                          </div>
                        </label>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Presentation Slides (Optional - Max 50MB)</label>
                      <div className="file-upload-area">
                        <input
                          type="file"
                          id="presentation-file"
                          name="presentationFile"
                          accept=".pdf,.ppt,.pptx"
                          onChange={handleFileChange}
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
                                <span>Click to upload slides</span>
                                <small>PDF, PPT, PPTX (Max 50MB)</small>
                              </>
                            )}
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="form-actions">
                {currentStep > 1 && (
                  <button type="button" className="prev-btn" onClick={prevStep}>
                    ← Previous
                  </button>
                )}
                {currentStep < 3 ? (
                  <button type="button" className="next-btn" onClick={nextStep}>
                    Next →
                  </button>
                ) : (
                  <button type="submit" className="submit-btn">
                    🎤 Submit Tech Talk
                  </button>
                )}
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={() => setShowSubmissionForm(false)}
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
                <th>Topic</th>
                <th>Duration</th>
                <th>Submission Date</th>
                <th>Status</th>
                <th>Grade</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map(submission => (
                <tr key={submission.id}>
                  <td>{submission.subject}</td>
                  <td>
                    <div className="topic-info">
                      <strong>{submission.topic}</strong>
                    </div>
                  </td>
                  <td>{submission.duration}</td>
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
                    <div className="action-buttons">
                      <button className="view-btn" title="View Details">👁️</button>
                      <button className="download-btn" title="Download">⬇️</button>
                      {submission.feedback && (
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

      <div className="tech-talk-guidelines">
        <h3>📋 Tech Talk Guidelines</h3>
        <div className="guidelines-grid">
          <div className="guideline-card">
            <h4>Presentation Requirements</h4>
            <ul>
              <li>Duration: 15-30 minutes</li>
              <li>Clear audio and video quality</li>
              <li>Professional presentation style</li>
              <li>Technical depth appropriate for audience</li>
              <li>Interactive elements encouraged</li>
            </ul>
          </div>
          <div className="guideline-card">
            <h4>Content Guidelines</h4>
            <ul>
              <li>Original content and research</li>
              <li>Current and relevant topics</li>
              <li>Proper citations and references</li>
              <li>Practical examples and demonstrations</li>
              <li>Q&A session at the end</li>
            </ul>
          </div>
          <div className="guideline-card">
            <h4>Evaluation Criteria</h4>
            <ul>
              <li>Content knowledge and accuracy</li>
              <li>Presentation skills and clarity</li>
              <li>Technical demonstration</li>
              <li>Time management</li>
              <li>Audience engagement</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AATTechTalk;
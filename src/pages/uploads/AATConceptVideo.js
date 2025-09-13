import React, { useState } from 'react';
import './AATConceptVideo.css';

const AATConceptVideo = () => {
  const [formData, setFormData] = useState({
    studentId: 'CSE2021001',
    studentName: 'John Doe',
    semester: '6',
    subject: '',
    topic: '',
    concept: '',
    duration: '5',
    scriptFile: null,
    videoFile: null,
    thumbnailFile: null
  });

  const [submissions, setSubmissions] = useState([
    {
      id: 1,
      subject: 'Operating Systems',
      concept: 'Process Synchronization',
      topic: 'Deadlock Prevention Techniques',
      submissionDate: '2024-03-10',
      status: 'approved',
      grade: 'A+',
      views: 245,
      feedback: 'Excellent visual explanation with clear examples',
      duration: '6 minutes'
    },
    {
      id: 2,
      subject: 'Database Systems',
      concept: 'Normalization',
      topic: 'Third Normal Form (3NF)',
      submissionDate: '2024-02-25',
      status: 'pending',
      grade: '-',
      views: 0,
      feedback: 'Under review by faculty',
      duration: '4 minutes'
    }
  ]);

  const [currentStep, setCurrentStep] = useState(1);
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const subjects = [
    'Operating Systems',
    'Database Systems',
    'Computer Networks',
    'Data Structures',
    'Algorithms',
    'Software Engineering',
    'Machine Learning',
    'Web Technologies',
    'Cybersecurity',
    'Artificial Intelligence'
  ];

  const conceptCategories = {
    'Operating Systems': ['Process Management', 'Memory Management', 'File Systems', 'Synchronization'],
    'Database Systems': ['Normalization', 'Indexing', 'Transactions', 'Query Optimization'],
    'Computer Networks': ['Protocols', 'Routing', 'Security', 'Performance'],
    'Data Structures': ['Trees', 'Graphs', 'Hashing', 'Sorting'],
    'Algorithms': ['Dynamic Programming', 'Greedy Algorithms', 'Graph Algorithms', 'Complexity Analysis']
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'subject' && { concept: '', topic: '' }) // Reset concept and topic when subject changes
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    
    if (file) {
      // File size validation
      let maxSize;
      if (name === 'videoFile') maxSize = 200 * 1024 * 1024; // 200MB
      else if (name === 'scriptFile') maxSize = 10 * 1024 * 1024; // 10MB
      else if (name === 'thumbnailFile') maxSize = 5 * 1024 * 1024; // 5MB

      if (file.size > maxSize) {
        alert(`File size should not exceed ${maxSize / (1024 * 1024)}MB`);
        return;
      }

      // File type validation
      if (name === 'videoFile' && !file.type.includes('video/')) {
        alert('Please upload only video files');
        return;
      }
      if (name === 'scriptFile' && !file.type.includes('pdf') && !file.type.includes('document')) {
        alert('Please upload only PDF or document files');
        return;
      }
      if (name === 'thumbnailFile' && !file.type.includes('image/')) {
        alert('Please upload only image files');
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
    
    if (!formData.subject || !formData.concept || !formData.topic || !formData.videoFile) {
      alert('Please fill all required fields and upload video');
      return;
    }

    const newSubmission = {
      id: submissions.length + 1,
      subject: formData.subject,
      concept: formData.concept,
      topic: formData.topic,
      submissionDate: new Date().toISOString().split('T')[0],
      status: 'pending',
      grade: '-',
      views: 0,
      feedback: 'Submitted for review',
      duration: `${formData.duration} minutes`
    };

    setSubmissions([newSubmission, ...submissions]);
    
    // Reset form
    setFormData({
      ...formData,
      subject: '',
      concept: '',
      topic: '',
      scriptFile: null,
      videoFile: null,
      thumbnailFile: null
    });
    
    setShowSubmissionForm(false);
    setCurrentStep(1);
    alert('Concept video submitted successfully! Review will be completed within 3-5 business days.');
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
      case 'revision': return '#17a2b8';
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

  return (
    <div className="aat-concept-video">
      <div className="page-header">
        <h1>🎬 AAT (Concept Video)</h1>
        <p>Create and submit educational concept videos to demonstrate your understanding</p>
      </div>

      <div className="concept-video-overview">
        <div className="overview-stats">
          <div className="stat-card">
            <span className="stat-number">{submissions.filter(s => s.status === 'approved').length}</span>
            <span className="stat-label">Approved Videos</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{submissions.reduce((total, s) => total + s.views, 0)}</span>
            <span className="stat-label">Total Views</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{submissions.filter(s => s.grade !== '-').length}</span>
            <span className="stat-label">Graded Videos</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{submissions.length}</span>
            <span className="stat-label">Total Submissions</span>
          </div>
        </div>
      </div>

      <div className="submission-section">
        <div className="section-header">
          <h2>Submit New Concept Video</h2>
          <button 
            className="submit-new-btn"
            onClick={() => setShowSubmissionForm(!showSubmissionForm)}
          >
            {showSubmissionForm ? '❌ Cancel' : '🎬 New Video'}
          </button>
        </div>

        {showSubmissionForm && (
          <div className="submission-form-container">
            <div className="progress-steps">
              <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
                <span className="step-number">1</span>
                <span className="step-label">Topic Selection</span>
              </div>
              <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
                <span className="step-number">2</span>
                <span className="step-label">Content Details</span>
              </div>
              <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
                <span className="step-number">3</span>
                <span className="step-label">File Upload</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="submission-form">
              {currentStep === 1 && (
                <div className="step-content">
                  <h3>📚 Topic Selection</h3>
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

                  <div className="form-row">
                    <div className="form-group">
                      <label>Concept Category *</label>
                      <select
                        name="concept"
                        value={formData.concept}
                        onChange={handleInputChange}
                        required
                        disabled={!formData.subject}
                      >
                        <option value="">Select Concept</option>
                        {formData.subject && conceptCategories[formData.subject]?.map(concept => (
                          <option key={concept} value={concept}>{concept}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Video Duration *</label>
                      <select
                        name="duration"
                        value={formData.duration}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="3">3 minutes</option>
                        <option value="4">4 minutes</option>
                        <option value="5">5 minutes</option>
                        <option value="6">6 minutes</option>
                        <option value="7">7 minutes</option>
                        <option value="8">8 minutes</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group full-width">
                    <label>Specific Topic *</label>
                    <input
                      type="text"
                      name="topic"
                      value={formData.topic}
                      onChange={handleInputChange}
                      placeholder="Enter specific topic within the concept"
                      required
                    />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="step-content">
                  <h3>📝 Content Planning</h3>
                  <div className="content-guidelines">
                    <div className="guideline-item">
                      <h4>🎯 Video Structure</h4>
                      <ul>
                        <li>Introduction (30 seconds)</li>
                        <li>Main explanation (3-6 minutes)</li>
                        <li>Example/Demo (1-2 minutes)</li>
                        <li>Summary (30 seconds)</li>
                      </ul>
                    </div>
                    <div className="guideline-item">
                      <h4>🛠️ Technical Requirements</h4>
                      <ul>
                        <li>Clear audio (no background noise)</li>
                        <li>HD video quality (720p minimum)</li>
                        <li>Steady camera/screen recording</li>
                        <li>Visible text and diagrams</li>
                      </ul>
                    </div>
                  </div>

                  <div className="topic-summary">
                    <h4>Your Selected Topic:</h4>
                    <div className="topic-details">
                      <p><strong>Subject:</strong> {formData.subject}</p>
                      <p><strong>Concept:</strong> {formData.concept}</p>
                      <p><strong>Topic:</strong> {formData.topic}</p>
                      <p><strong>Duration:</strong> {formData.duration} minutes</p>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="step-content">
                  <h3>📁 File Upload</h3>
                  <div className="file-upload-section">
                    <div className="form-group">
                      <label>Video File * (Max 200MB)</label>
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
                                <small>MP4, MOV, AVI (Max 200MB)</small>
                              </>
                            )}
                          </div>
                        </label>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Video Script (Optional - Max 10MB)</label>
                      <div className="file-upload-area">
                        <input
                          type="file"
                          id="script-file"
                          name="scriptFile"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          style={{ display: 'none' }}
                        />
                        <label htmlFor="script-file" className="file-upload-label">
                          <div className="upload-icon">📄</div>
                          <div className="upload-text">
                            {formData.scriptFile ? (
                              <span className="file-selected">
                                ✅ {formData.scriptFile.name}
                              </span>
                            ) : (
                              <>
                                <span>Click to upload script</span>
                                <small>PDF, DOC, DOCX (Max 10MB)</small>
                              </>
                            )}
                          </div>
                        </label>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Thumbnail Image (Optional - Max 5MB)</label>
                      <div className="file-upload-area">
                        <input
                          type="file"
                          id="thumbnail-file"
                          name="thumbnailFile"
                          accept="image/*"
                          onChange={handleFileChange}
                          style={{ display: 'none' }}
                        />
                        <label htmlFor="thumbnail-file" className="file-upload-label">
                          <div className="upload-icon">🖼️</div>
                          <div className="upload-text">
                            {formData.thumbnailFile ? (
                              <span className="file-selected">
                                ✅ {formData.thumbnailFile.name}
                              </span>
                            ) : (
                              <>
                                <span>Click to upload thumbnail</span>
                                <small>JPG, PNG, GIF (Max 5MB)</small>
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
                    🎬 Submit Video
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
          <h2>Video Gallery</h2>
          <div className="view-toggle">
            <button 
              className={`toggle-btn ${!previewMode ? 'active' : ''}`}
              onClick={() => setPreviewMode(false)}
            >
              📋 List View
            </button>
            <button 
              className={`toggle-btn ${previewMode ? 'active' : ''}`}
              onClick={() => setPreviewMode(true)}
            >
              🎬 Gallery View
            </button>
          </div>
        </div>
        
        {!previewMode ? (
          <div className="submissions-table">
            <table>
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Concept</th>
                  <th>Topic</th>
                  <th>Duration</th>
                  <th>Views</th>
                  <th>Status</th>
                  <th>Grade</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map(submission => (
                  <tr key={submission.id}>
                    <td>{submission.subject}</td>
                    <td>{submission.concept}</td>
                    <td>
                      <div className="topic-info">
                        <strong>{submission.topic}</strong>
                      </div>
                    </td>
                    <td>{submission.duration}</td>
                    <td>
                      <span className="views-count">👁️ {submission.views}</span>
                    </td>
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
                        <button className="play-btn" title="Play Video">▶️</button>
                        <button className="view-btn" title="View Details">👁️</button>
                        <button className="download-btn" title="Download">⬇️</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="video-gallery">
            {submissions.map(submission => (
              <div key={submission.id} className="video-card">
                <div className="video-thumbnail">
                  <div className="play-overlay">
                    <button className="play-button">▶️</button>
                  </div>
                  <div className="video-duration">{submission.duration}</div>
                  <div className="video-status">
                    <span 
                      className="status-indicator"
                      style={{ backgroundColor: getStatusColor(submission.status) }}
                    ></span>
                  </div>
                </div>
                <div className="video-info">
                  <h4>{submission.topic}</h4>
                  <p>{submission.subject} - {submission.concept}</p>
                  <div className="video-meta">
                    <span className="views">👁️ {submission.views}</span>
                    <span className="grade" style={{ color: getGradeColor(submission.grade) }}>
                      {submission.grade}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="concept-video-guidelines">
        <h3>📋 Concept Video Guidelines</h3>
        <div className="guidelines-grid">
          <div className="guideline-card">
            <h4>Content Requirements</h4>
            <ul>
              <li>Duration: 3-8 minutes maximum</li>
              <li>Clear explanation of the concept</li>
              <li>Visual aids and examples</li>
              <li>Logical flow and structure</li>
              <li>Practical demonstrations</li>
            </ul>
          </div>
          <div className="guideline-card">
            <h4>Technical Standards</h4>
            <ul>
              <li>HD video quality (720p minimum)</li>
              <li>Clear audio without noise</li>
              <li>Readable text and diagrams</li>
              <li>Proper lighting and framing</li>
              <li>Stable camera/screen recording</li>
            </ul>
          </div>
          <div className="guideline-card">
            <h4>Evaluation Criteria</h4>
            <ul>
              <li>Conceptual accuracy and depth</li>
              <li>Clarity of explanation</li>
              <li>Visual presentation quality</li>
              <li>Examples and applications</li>
              <li>Overall production value</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AATConceptVideo;
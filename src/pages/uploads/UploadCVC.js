import React, { useState } from 'react';
import './UploadCVC.css';

const UploadCVC = () => {
  const [formData, setFormData] = useState({
    studentId: 'CSE2021001',
    studentName: 'John Doe',
    courseName: '',
    provider: '',
    completionDate: '',
    duration: '',
    certificateFile: null
  });

  const [uploadHistory, setUploadHistory] = useState([
    {
      id: 1,
      courseName: 'Python for Data Science',
      provider: 'Coursera',
      uploadDate: '2024-01-15',
      status: 'approved',
      verificationStatus: 'verified',
      credits: 3
    },
    {
      id: 2,
      courseName: 'Web Development Bootcamp',
      provider: 'Udemy',
      uploadDate: '2024-02-20',
      status: 'pending',
      verificationStatus: 'under review',
      credits: 0
    }
  ]);

  const [showUploadForm, setShowUploadForm] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const courseProviders = [
    'Coursera',
    'edX',
    'Udemy',
    'Khan Academy',
    'LinkedIn Learning',
    'Pluralsight',
    'Udacity',
    'FutureSkill',
    'NPTEL',
    'SWAYAM',
    'Other'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        alert('File size should not exceed 10MB');
        return;
      }
      if (!file.type.includes('pdf') && !file.type.includes('image')) {
        alert('Please upload only PDF or image files');
        return;
      }
      setFormData(prev => ({
        ...prev,
        certificateFile: file
      }));
    }
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
      handleFileChange({ target: { files: e.dataTransfer.files } });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.courseName || !formData.provider || !formData.completionDate || !formData.certificateFile) {
      alert('Please fill all required fields and upload certificate');
      return;
    }

    const newUpload = {
      id: uploadHistory.length + 1,
      courseName: formData.courseName,
      provider: formData.provider,
      uploadDate: new Date().toISOString().split('T')[0],
      status: 'pending',
      verificationStatus: 'under review',
      credits: 0
    };

    setUploadHistory([newUpload, ...uploadHistory]);
    setFormData({
      ...formData,
      courseName: '',
      provider: '',
      completionDate: '',
      duration: '',
      certificateFile: null
    });
    setShowUploadForm(false);
    alert('Certificate uploaded successfully! It will be reviewed within 3-5 business days.');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return '#28a745';
      case 'rejected': return '#dc3545';
      case 'pending': return '#ffc107';
      default: return '#6c757d';
    }
  };

  const getVerificationColor = (status) => {
    switch (status) {
      case 'verified': return '#28a745';
      case 'rejected': return '#dc3545';
      case 'under review': return '#17a2b8';
      default: return '#6c757d';
    }
  };

  return (
    <div className="upload-cvc">
      <div className="page-header">
        <h1>📜 Upload CVC Certificate</h1>
        <p>Upload your Continuing and Vocational Courses certificates for academic credit validation</p>
      </div>

      <div className="cvc-overview">
        <div className="overview-stats">
          <div className="stat-card">
            <span className="stat-number">{uploadHistory.filter(item => item.status === 'approved').length}</span>
            <span className="stat-label">Approved Certificates</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{uploadHistory.filter(item => item.status === 'pending').length}</span>
            <span className="stat-label">Pending Review</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{uploadHistory.reduce((total, item) => total + item.credits, 0)}</span>
            <span className="stat-label">Total Credits Earned</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{uploadHistory.length}</span>
            <span className="stat-label">Total Uploads</span>
          </div>
        </div>
      </div>

      <div className="upload-section">
        <div className="section-header">
          <h2>Upload New Certificate</h2>
          <button 
            className="upload-new-btn"
            onClick={() => setShowUploadForm(!showUploadForm)}
          >
            {showUploadForm ? '❌ Cancel' : '📤 Upload Certificate'}
          </button>
        </div>

        {showUploadForm && (
          <div className="upload-form-container">
            <form onSubmit={handleSubmit} className="upload-form">
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
                  <label>Course Name *</label>
                  <input
                    type="text"
                    name="courseName"
                    value={formData.courseName}
                    onChange={handleInputChange}
                    placeholder="Enter course name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Course Provider *</label>
                  <select
                    name="provider"
                    value={formData.provider}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Provider</option>
                    {courseProviders.map(provider => (
                      <option key={provider} value={provider}>{provider}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Completion Date *</label>
                  <input
                    type="date"
                    name="completionDate"
                    value={formData.completionDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Course Duration (Hours)</label>
                  <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    placeholder="e.g., 40"
                  />
                </div>
              </div>

              <div className="form-group full-width">
                <label>Certificate File *</label>
                <div 
                  className={`file-upload-area ${dragActive ? 'drag-active' : ''}`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    id="certificate-file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="certificate-file" className="file-upload-label">
                    <div className="upload-icon">📄</div>
                    <div className="upload-text">
                      {formData.certificateFile ? (
                        <span className="file-selected">
                          ✅ {formData.certificateFile.name}
                        </span>
                      ) : (
                        <>
                          <span>Click to upload or drag and drop</span>
                          <small>PDF, JPG, PNG files only (Max 10MB)</small>
                        </>
                      )}
                    </div>
                  </label>
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  📤 Upload Certificate
                </button>
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={() => setShowUploadForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      <div className="upload-history">
        <div className="section-header">
          <h2>Upload History</h2>
        </div>
        
        <div className="history-table">
          <table>
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Provider</th>
                <th>Upload Date</th>
                <th>Status</th>
                <th>Verification</th>
                <th>Credits</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {uploadHistory.map(item => (
                <tr key={item.id}>
                  <td>
                    <div className="course-info">
                      <strong>{item.courseName}</strong>
                    </div>
                  </td>
                  <td>{item.provider}</td>
                  <td>{item.uploadDate}</td>
                  <td>
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(item.status), color: 'white' }}
                    >
                      {item.status.toUpperCase()}
                    </span>
                  </td>
                  <td>
                    <span 
                      className="verification-badge"
                      style={{ color: getVerificationColor(item.verificationStatus) }}
                    >
                      {item.verificationStatus}
                    </span>
                  </td>
                  <td>
                    <span className="credits">{item.credits}</span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="view-btn" title="View Details">👁️</button>
                      <button className="download-btn" title="Download">⬇️</button>
                      {item.status === 'pending' && (
                        <button className="edit-btn" title="Edit">✏️</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="cvc-guidelines">
        <h3>📋 CVC Certificate Upload Guidelines</h3>
        <div className="guidelines-grid">
          <div className="guideline-card">
            <h4>Accepted Certificates</h4>
            <ul>
              <li>Online course completion certificates</li>
              <li>Professional certification courses</li>
              <li>Skill development programs</li>
              <li>Industry-recognized certifications</li>
              <li>MOOC platform certificates</li>
            </ul>
          </div>
          <div className="guideline-card">
            <h4>File Requirements</h4>
            <ul>
              <li>Format: PDF, JPG, PNG only</li>
              <li>Maximum size: 10MB</li>
              <li>Clear and readable text</li>
              <li>Original certificate (no screenshots)</li>
              <li>Complete certificate with all details</li>
            </ul>
          </div>
          <div className="guideline-card">
            <h4>Verification Process</h4>
            <ul>
              <li>Initial review: 2-3 business days</li>
              <li>Certificate authenticity check</li>
              <li>Course content relevance assessment</li>
              <li>Credit assignment based on duration</li>
              <li>Final approval notification</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadCVC;
import React, { useState } from 'react';
import './ProjectWork.css';

const ProjectWork = () => {
  const [currentProject] = useState({
    id: 'PROJ2024001',
    title: 'Smart Campus Management System',
    description: 'A comprehensive web application for managing campus activities, student information, and academic processes.',
    guide: 'Dr. Rajesh Kumar',
    team: ['John Doe', 'Jane Smith', 'Alex Johnson'],
    startDate: '2024-01-15',
    deadline: '2024-05-15',
    status: 'In Progress',
    completionPercentage: 65
  });

  const [milestones] = useState([
    {
      id: 1,
      title: 'Project Proposal',
      description: 'Submit detailed project proposal with requirements',
      dueDate: '2024-02-01',
      status: 'completed',
      submissionDate: '2024-01-30',
      marks: 85
    },
    {
      id: 2,
      title: 'System Design',
      description: 'Create system architecture and database design',
      dueDate: '2024-03-01',
      status: 'completed',
      submissionDate: '2024-02-28',
      marks: 78
    },
    {
      id: 3,
      title: 'Mid-term Review',
      description: 'Present current progress and demonstrate working modules',
      dueDate: '2024-04-01',
      status: 'submitted',
      submissionDate: '2024-03-30',
      marks: null
    },
    {
      id: 4,
      title: 'Final Submission',
      description: 'Complete project with documentation and presentation',
      dueDate: '2024-05-15',
      status: 'pending',
      submissionDate: null,
      marks: null
    }
  ]);

  const [documents] = useState([
    {
      id: 1,
      name: 'Project Proposal.pdf',
      type: 'PDF',
      size: '2.5 MB',
      uploadDate: '2024-01-30',
      category: 'Proposal'
    },
    {
      id: 2,
      name: 'System Design Document.docx',
      type: 'DOCX',
      size: '1.8 MB',
      uploadDate: '2024-02-28',
      category: 'Design'
    },
    {
      id: 3,
      name: 'Database Schema.sql',
      type: 'SQL',
      size: '156 KB',
      uploadDate: '2024-03-05',
      category: 'Implementation'
    },
    {
      id: 4,
      name: 'Mid-term Presentation.pptx',
      type: 'PPTX',
      size: '4.2 MB',
      uploadDate: '2024-03-30',
      category: 'Presentation'
    }
  ]);

  const [newDocument, setNewDocument] = useState({
    name: '',
    category: 'Implementation',
    file: null
  });

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [feedbackRequests, setFeedbackRequests] = useState([]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#28a745';
      case 'submitted': return '#ffc107';
      case 'pending': return '#6c757d';
      default: return '#6c757d';
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewDocument({ ...newDocument, file: file, name: file.name });
    }
  };

  const uploadDocument = () => {
    if (!newDocument.file) {
      alert('Please select a file to upload');
      return;
    }

    // Simulate file upload
    alert(`Document "${newDocument.name}" uploaded successfully!`);
    setShowUploadModal(false);
    setNewDocument({ name: '', category: 'Implementation', file: null });
  };

  const requestFeedback = (milestoneId) => {
    const milestone = milestones.find(m => m.id === milestoneId);
    setFeedbackRequests([...feedbackRequests, {
      id: Date.now(),
      milestoneTitle: milestone.title,
      requestDate: new Date().toISOString().split('T')[0],
      status: 'pending'
    }]);
    alert('Feedback request sent to project guide!');
  };

  const downloadDocument = (doc) => {
    alert(`Downloading ${doc.name}...`);
  };

  return (
    <div className="project-work">
      <div className="page-header">
        <h1>🚀 Project Work Management</h1>
        <p>Track your project progress, manage documents, and submit deliverables</p>
      </div>

      <div className="project-overview">
        <div className="project-card">
          <div className="project-header">
            <h2>{currentProject.title}</h2>
            <span className="project-id">ID: {currentProject.id}</span>
          </div>
          
          <div className="project-details">
            <p><strong>Description:</strong> {currentProject.description}</p>
            <div className="project-meta">
              <div className="meta-item">
                <span>👨‍🏫 Guide:</span>
                <span>{currentProject.guide}</span>
              </div>
              <div className="meta-item">
                <span>👥 Team:</span>
                <span>{currentProject.team.join(', ')}</span>
              </div>
              <div className="meta-item">
                <span>📅 Duration:</span>
                <span>{currentProject.startDate} to {currentProject.deadline}</span>
              </div>
              <div className="meta-item">
                <span>📊 Status:</span>
                <span className="status-badge">{currentProject.status}</span>
              </div>
            </div>
          </div>

          <div className="progress-section">
            <div className="progress-header">
              <span>Overall Progress</span>
              <span>{currentProject.completionPercentage}%</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${currentProject.completionPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="milestones-section">
        <div className="section-header">
          <h2>📋 Project Milestones</h2>
        </div>
        
        <div className="milestones-timeline">
          {milestones.map((milestone, index) => (
            <div key={milestone.id} className="milestone-card">
              <div className="milestone-indicator">
                <div 
                  className="milestone-dot"
                  style={{ backgroundColor: getStatusColor(milestone.status) }}
                >
                  {index + 1}
                </div>
                {index < milestones.length - 1 && <div className="milestone-line"></div>}
              </div>
              
              <div className="milestone-content">
                <div className="milestone-header">
                  <h3>{milestone.title}</h3>
                  <span 
                    className="milestone-status"
                    style={{ color: getStatusColor(milestone.status) }}
                  >
                    {milestone.status.toUpperCase()}
                  </span>
                </div>
                
                <p>{milestone.description}</p>
                
                <div className="milestone-dates">
                  <div className="date-item">
                    <span>📅 Due Date:</span>
                    <span>{milestone.dueDate}</span>
                  </div>
                  {milestone.submissionDate && (
                    <div className="date-item">
                      <span>✅ Submitted:</span>
                      <span>{milestone.submissionDate}</span>
                    </div>
                  )}
                  {milestone.marks && (
                    <div className="date-item">
                      <span>📊 Marks:</span>
                      <span className="marks">{milestone.marks}/100</span>
                    </div>
                  )}
                </div>

                <div className="milestone-actions">
                  {milestone.status === 'submitted' && !milestone.marks && (
                    <button 
                      className="feedback-btn"
                      onClick={() => requestFeedback(milestone.id)}
                    >
                      📝 Request Feedback
                    </button>
                  )}
                  {milestone.status === 'pending' && (
                    <button className="submit-btn">
                      📤 Submit Work
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="documents-section">
        <div className="section-header">
          <h2>📁 Project Documents</h2>
          <button 
            className="upload-btn"
            onClick={() => setShowUploadModal(true)}
          >
            📤 Upload Document
          </button>
        </div>

        <div className="documents-grid">
          {documents.map(doc => (
            <div key={doc.id} className="document-card">
              <div className="document-icon">
                📄
              </div>
              <div className="document-info">
                <h4>{doc.name}</h4>
                <p>Type: {doc.type} | Size: {doc.size}</p>
                <p>Category: {doc.category}</p>
                <p>Uploaded: {doc.uploadDate}</p>
              </div>
              <div className="document-actions">
                <button 
                  className="download-btn"
                  onClick={() => downloadDocument(doc)}
                >
                  ⬇️ Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {feedbackRequests.length > 0 && (
        <div className="feedback-section">
          <h2>💬 Feedback Requests</h2>
          <div className="feedback-list">
            {feedbackRequests.map(request => (
              <div key={request.id} className="feedback-request">
                <div className="request-info">
                  <h4>{request.milestoneTitle}</h4>
                  <p>Requested on: {request.requestDate}</p>
                </div>
                <div className="request-status">
                  <span className="status pending">⏳ Pending</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showUploadModal && (
        <div className="upload-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>📤 Upload Document</h3>
              <button 
                className="close-btn"
                onClick={() => setShowUploadModal(false)}
              >
                ✕
              </button>
            </div>

            <div className="upload-form">
              <div className="form-group">
                <label>Document Category:</label>
                <select
                  value={newDocument.category}
                  onChange={(e) => setNewDocument({...newDocument, category: e.target.value})}
                >
                  <option value="Proposal">Proposal</option>
                  <option value="Design">Design</option>
                  <option value="Implementation">Implementation</option>
                  <option value="Testing">Testing</option>
                  <option value="Documentation">Documentation</option>
                  <option value="Presentation">Presentation</option>
                </select>
              </div>

              <div className="form-group">
                <label>Select File:</label>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.sql,.zip"
                />
              </div>

              {newDocument.file && (
                <div className="file-preview">
                  <p>Selected: {newDocument.name}</p>
                  <p>Size: {(newDocument.file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              )}
            </div>

            <div className="modal-actions">
              <button 
                className="upload-btn"
                onClick={uploadDocument}
              >
                📤 Upload
              </button>
              <button 
                className="cancel-btn"
                onClick={() => setShowUploadModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="project-guidelines">
        <h3>📋 Project Guidelines</h3>
        <ul>
          <li>Submit all deliverables before the due date</li>
          <li>Maintain regular communication with your project guide</li>
          <li>Document all project phases and decisions</li>
          <li>Follow coding standards and best practices</li>
          <li>Test thoroughly before each submission</li>
          <li>Backup your work regularly</li>
        </ul>
      </div>
    </div>
  );
};

export default ProjectWork;
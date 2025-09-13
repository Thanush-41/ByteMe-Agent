import React, { useState } from 'react';
import './ProjectSelection.css';

const ProjectSelection = () => {
  const [availableProjects] = useState([
    {
      id: 1,
      title: 'AI-Powered Chatbot for Customer Service',
      description: 'Develop an intelligent chatbot using NLP and machine learning to handle customer queries automatically.',
      supervisor: 'Dr. Michael Brown',
      department: 'Computer Science',
      skillsRequired: ['Python', 'Machine Learning', 'NLP', 'TensorFlow'],
      duration: '6 months',
      maxStudents: 3,
      appliedStudents: 8,
      difficulty: 'Advanced',
      type: 'Research'
    },
    {
      id: 2,
      title: 'E-Commerce Web Application',
      description: 'Build a full-stack e-commerce platform with payment integration and inventory management.',
      supervisor: 'Prof. Lisa Anderson',
      department: 'Computer Science',
      skillsRequired: ['React', 'Node.js', 'MongoDB', 'Payment APIs'],
      duration: '4 months',
      maxStudents: 4,
      appliedStudents: 12,
      difficulty: 'Intermediate',
      type: 'Development'
    },
    {
      id: 3,
      title: 'IoT-Based Smart Home System',
      description: 'Create an IoT solution for home automation with mobile app control and real-time monitoring.',
      supervisor: 'Dr. James Wilson',
      department: 'Electronics',
      skillsRequired: ['Arduino', 'Raspberry Pi', 'Mobile App Dev', 'Sensors'],
      duration: '5 months',
      maxStudents: 2,
      appliedStudents: 6,
      difficulty: 'Advanced',
      type: 'Hardware'
    },
    {
      id: 4,
      title: 'Student Management System',
      description: 'Develop a comprehensive system for managing student records, attendance, and grades.',
      supervisor: 'Prof. Sarah Davis',
      department: 'Computer Science',
      skillsRequired: ['Java', 'Spring Boot', 'MySQL', 'Angular'],
      duration: '4 months',
      maxStudents: 3,
      appliedStudents: 5,
      difficulty: 'Beginner',
      type: 'Development'
    }
  ]);

  const [myApplications] = useState([
    {
      projectId: 2,
      status: 'Applied',
      appliedDate: '2024-01-15',
      priority: 1
    }
  ]);

  const [allottedProject] = useState({
    id: 2,
    title: 'E-Commerce Web Application',
    supervisor: 'Prof. Lisa Anderson',
    teamMembers: ['John Doe', 'Jane Smith', 'Alex Johnson'],
    allottedDate: '2024-01-20',
    status: 'Active'
  });

  const [selectedProject, setSelectedProject] = useState(null);
  const [applicationReason, setApplicationReason] = useState('');

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Beginner': return 'beginner';
      case 'Intermediate': return 'intermediate';
      case 'Advanced': return 'advanced';
      default: return 'intermediate';
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'Research': return '🔬';
      case 'Development': return '💻';
      case 'Hardware': return '🔧';
      default: return '📋';
    }
  };

  const handleApply = (projectId) => {
    if (applicationReason.trim()) {
      alert(`Applied for project successfully!\nReason: ${applicationReason}`);
      setSelectedProject(null);
      setApplicationReason('');
    } else {
      alert('Please provide a reason for your application.');
    }
  };

  const isProjectApplied = (projectId) => {
    return myApplications.some(app => app.projectId === projectId);
  };

  return (
    <div className="project-selection">
      <div className="page-header">
        <h1>🎯 Project Selection & Allotment</h1>
        <p>Browse and apply for final year projects</p>
      </div>

      {allottedProject && (
        <div className="allotted-project">
          <h2>🎉 Your Allotted Project</h2>
          <div className="allotted-card">
            <div className="project-header">
              <h3>{allottedProject.title}</h3>
              <span className="status active">Active</span>
            </div>
            <div className="project-details">
              <p><strong>Supervisor:</strong> {allottedProject.supervisor}</p>
              <p><strong>Allotted Date:</strong> {allottedProject.allottedDate}</p>
              <p><strong>Team Members:</strong></p>
              <ul className="team-list">
                {allottedProject.teamMembers.map((member, index) => (
                  <li key={index}>{member}</li>
                ))}
              </ul>
            </div>
            <div className="project-actions">
              <button className="action-btn">📄 View Details</button>
              <button className="action-btn">💬 Contact Supervisor</button>
            </div>
          </div>
        </div>
      )}

      <div className="available-projects">
        <h2>Available Projects</h2>
        <div className="projects-grid">
          {availableProjects.map(project => (
            <div key={project.id} className="project-card">
              <div className="project-header">
                <div className="project-title">
                  <span className="type-icon">{getTypeIcon(project.type)}</span>
                  <h3>{project.title}</h3>
                </div>
                <div className="project-badges">
                  <span className={`difficulty-badge ${getDifficultyColor(project.difficulty)}`}>
                    {project.difficulty}
                  </span>
                  <span className="type-badge">{project.type}</span>
                </div>
              </div>

              <div className="project-content">
                <p className="description">{project.description}</p>
                
                <div className="project-info">
                  <p><strong>👨‍🏫 Supervisor:</strong> {project.supervisor}</p>
                  <p><strong>🏢 Department:</strong> {project.department}</p>
                  <p><strong>⏱️ Duration:</strong> {project.duration}</p>
                  <p><strong>👥 Max Students:</strong> {project.maxStudents}</p>
                  <p><strong>📝 Applications:</strong> {project.appliedStudents}</p>
                </div>

                <div className="skills-required">
                  <strong>🛠️ Skills Required:</strong>
                  <div className="skills-list">
                    {project.skillsRequired.map((skill, index) => (
                      <span key={index} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="project-footer">
                {isProjectApplied(project.id) ? (
                  <button className="applied-btn" disabled>
                    ✅ Applied
                  </button>
                ) : allottedProject ? (
                  <button className="unavailable-btn" disabled>
                    Project Allotted
                  </button>
                ) : (
                  <button 
                    className="apply-btn"
                    onClick={() => setSelectedProject(project)}
                  >
                    🎯 Apply Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="my-applications">
        <h2>My Applications</h2>
        <div className="applications-list">
          {myApplications.map((application, index) => {
            const project = availableProjects.find(p => p.id === application.projectId);
            return (
              <div key={index} className="application-item">
                <div className="application-info">
                  <h4>{project?.title}</h4>
                  <p>Applied on: {application.appliedDate}</p>
                  <p>Priority: #{application.priority}</p>
                </div>
                <div className="application-status">
                  <span className={`status ${application.status.toLowerCase()}`}>
                    {application.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedProject && (
        <div className="application-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Apply for Project</h3>
              <button 
                className="close-btn"
                onClick={() => setSelectedProject(null)}
              >
                ✕
              </button>
            </div>

            <div className="project-summary">
              <h4>{selectedProject.title}</h4>
              <p><strong>Supervisor:</strong> {selectedProject.supervisor}</p>
              <p><strong>Duration:</strong> {selectedProject.duration}</p>
            </div>

            <div className="application-form">
              <label>Why do you want to work on this project?</label>
              <textarea
                value={applicationReason}
                onChange={(e) => setApplicationReason(e.target.value)}
                placeholder="Explain your interest in this project, relevant skills, and what you hope to learn..."
                rows="4"
              />
            </div>

            <div className="modal-actions">
              <button 
                className="submit-btn"
                onClick={() => handleApply(selectedProject.id)}
              >
                Submit Application
              </button>
              <button 
                className="cancel-btn"
                onClick={() => setSelectedProject(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectSelection;
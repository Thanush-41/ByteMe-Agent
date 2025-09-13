import React, { useState } from 'react';
import './CourseContent.css';

const CourseContent = () => {
  const [courses] = useState([
    {
      id: 1,
      code: 'CSE101',
      name: 'Data Structures and Algorithms',
      instructor: 'Dr. Smith',
      materials: [
        { id: 1, type: 'PDF', name: 'Chapter 1 - Introduction.pdf', size: '2.5 MB' },
        { id: 2, type: 'PPT', name: 'Arrays and Linked Lists.pptx', size: '5.1 MB' },
        { id: 3, type: 'VIDEO', name: 'Sorting Algorithms Demo.mp4', size: '45.2 MB' },
        { id: 4, type: 'PDF', name: 'Practice Problems.pdf', size: '1.8 MB' }
      ]
    },
    {
      id: 2,
      code: 'CSE201',
      name: 'Database Management Systems',
      instructor: 'Prof. Johnson',
      materials: [
        { id: 5, type: 'PDF', name: 'SQL Basics.pdf', size: '3.2 MB' },
        { id: 6, type: 'PPT', name: 'Normalization.pptx', size: '4.8 MB' },
        { id: 7, type: 'VIDEO', name: 'Database Design.mp4', size: '52.1 MB' }
      ]
    },
    {
      id: 3,
      code: 'CSE301',
      name: 'Software Engineering',
      instructor: 'Dr. Williams',
      materials: [
        { id: 8, type: 'PDF', name: 'SDLC Models.pdf', size: '2.1 MB' },
        { id: 9, type: 'PPT', name: 'Agile Methodology.pptx', size: '6.3 MB' }
      ]
    }
  ]);

  const [selectedCourse, setSelectedCourse] = useState(null);

  const getFileIcon = (type) => {
    switch(type) {
      case 'PDF': return '📄';
      case 'PPT': return '📊';
      case 'VIDEO': return '🎥';
      default: return '📎';
    }
  };

  const handleDownload = (material) => {
    // Simulate download
    alert(`Downloading: ${material.name}`);
  };

  const handleView = (material) => {
    // Simulate view
    alert(`Opening: ${material.name}`);
  };

  return (
    <div className="course-content">
      <div className="page-header">
        <h1>📚 Course Content Delivery</h1>
        <p>Access course materials, lecture notes, and resources</p>
      </div>

      <div className="courses-grid">
        {courses.map(course => (
          <div key={course.id} className="course-card">
            <div className="course-header">
              <h3>{course.code}</h3>
              <h4>{course.name}</h4>
              <p className="instructor">👨‍🏫 {course.instructor}</p>
            </div>
            
            <div className="course-stats">
              <span className="material-count">
                📁 {course.materials.length} Materials
              </span>
            </div>

            <button 
              className="view-materials-btn"
              onClick={() => setSelectedCourse(course)}
            >
              View Materials
            </button>
          </div>
        ))}
      </div>

      {selectedCourse && (
        <div className="materials-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{selectedCourse.code} - {selectedCourse.name}</h2>
              <button 
                className="close-btn"
                onClick={() => setSelectedCourse(null)}
              >
                ✕
              </button>
            </div>

            <div className="materials-list">
              {selectedCourse.materials.map(material => (
                <div key={material.id} className="material-item">
                  <div className="material-info">
                    <span className="file-icon">{getFileIcon(material.type)}</span>
                    <div className="file-details">
                      <span className="file-name">{material.name}</span>
                      <span className="file-size">{material.size}</span>
                    </div>
                  </div>
                  <div className="material-actions">
                    <button 
                      className="action-btn view-btn"
                      onClick={() => handleView(material)}
                    >
                      👁️ View
                    </button>
                    <button 
                      className="action-btn download-btn"
                      onClick={() => handleDownload(material)}
                    >
                      ⬇️ Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseContent;
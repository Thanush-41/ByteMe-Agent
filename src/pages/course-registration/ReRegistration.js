import React, { useState } from 'react';
import './ReRegistration.css';

const ReRegistration = () => {
  const [failedCourses] = useState([
    {
      id: 'CS201',
      name: 'Programming in C++',
      code: 'CS201',
      credits: 4,
      semester: 'Spring 2024',
      grade: 'F',
      faculty: 'Dr. Rajesh Kumar',
      attempts: 1,
      maxAttempts: 3,
      fee: 5000
    },
    {
      id: 'MATH202',
      name: 'Calculus II',
      code: 'MATH202',
      credits: 3,
      semester: 'Fall 2024',
      grade: 'F',
      faculty: 'Dr. Sunita Rao',
      attempts: 2,
      maxAttempts: 3,
      fee: 4000
    }
  ]);

  const [selectedCourses, setSelectedCourses] = useState([]);
  const [totalFee, setTotalFee] = useState(0);

  const handleCourseSelect = (course) => {
    const isSelected = selectedCourses.find(c => c.id === course.id);
    
    if (isSelected) {
      const updated = selectedCourses.filter(c => c.id !== course.id);
      setSelectedCourses(updated);
      setTotalFee(updated.reduce((sum, c) => sum + c.fee, 0));
    } else {
      const updated = [...selectedCourses, course];
      setSelectedCourses(updated);
      setTotalFee(updated.reduce((sum, c) => sum + c.fee, 0));
    }
  };

  return (
    <div className="re-registration">
      <div className="page-header">
        <h1>🔄 Course Re-Registration</h1>
        <p>Re-register for failed courses to improve your grade</p>
      </div>

      <div className="failed-courses-section">
        <h2>Failed Courses Available for Re-Registration</h2>
        
        <div className="courses-grid">
          {failedCourses.map(course => {
            const isSelected = selectedCourses.find(c => c.id === course.id);
            const canReRegister = course.attempts < course.maxAttempts;
            
            return (
              <div key={course.id} className={`course-card ${isSelected ? 'selected' : ''}`}>
                <div className="course-header">
                  <h3>{course.name}</h3>
                  <span className="course-code">{course.code}</span>
                </div>

                <div className="course-details">
                  <div className="detail-row">
                    <span>Credits:</span>
                    <span>{course.credits}</span>
                  </div>
                  <div className="detail-row">
                    <span>Previous Grade:</span>
                    <span className="grade-f">{course.grade}</span>
                  </div>
                  <div className="detail-row">
                    <span>Semester:</span>
                    <span>{course.semester}</span>
                  </div>
                  <div className="detail-row">
                    <span>Faculty:</span>
                    <span>{course.faculty}</span>
                  </div>
                  <div className="detail-row">
                    <span>Attempts:</span>
                    <span>{course.attempts}/{course.maxAttempts}</span>
                  </div>
                  <div className="detail-row">
                    <span>Re-registration Fee:</span>
                    <span className="fee">₹{course.fee}</span>
                  </div>
                </div>

                <div className="course-actions">
                  <button
                    className={`select-btn ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleCourseSelect(course)}
                    disabled={!canReRegister}
                  >
                    {!canReRegister ? 'Max Attempts Reached' : 
                     isSelected ? '✓ Selected' : 'Select for Re-Registration'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="registration-summary">
        <h3>Registration Summary</h3>
        <p>Selected Courses: {selectedCourses.length}</p>
        <p>Total Fee: ₹{totalFee}</p>
        
        <button 
          className="register-btn"
          disabled={selectedCourses.length === 0}
        >
          Register & Pay ₹{totalFee}
        </button>
      </div>

      <div className="re-registration-guidelines">
        <h3>📋 Re-Registration Guidelines</h3>
        <ul>
          <li>Students can re-register for failed courses (Grade F)</li>
          <li>Maximum 3 attempts allowed per course</li>
          <li>Re-registration fee applies for each attempt</li>
          <li>Better grade will be considered for CGPA calculation</li>
          <li>Re-registration must be completed within prescribed timeline</li>
        </ul>
      </div>
    </div>
  );
};

export default ReRegistration;
import React, { useState } from 'react';
import './CourseRegistration.css';

const CourseRegistration = () => {
  const [availableCourses] = useState([
    {
      id: 1,
      code: 'CSE401',
      name: 'Machine Learning',
      credits: 3,
      instructor: 'Dr. Anderson',
      schedule: 'Mon, Wed, Fri - 10:00 AM',
      capacity: 40,
      enrolled: 35,
      prerequisites: ['CSE301', 'MATH201']
    },
    {
      id: 2,
      code: 'CSE402',
      name: 'Computer Networks',
      credits: 4,
      instructor: 'Prof. Davis',
      schedule: 'Tue, Thu - 2:00 PM',
      capacity: 50,
      enrolled: 42,
      prerequisites: ['CSE201']
    },
    {
      id: 3,
      code: 'CSE403',
      name: 'Artificial Intelligence',
      credits: 3,
      instructor: 'Dr. Wilson',
      schedule: 'Mon, Wed - 11:00 AM',
      capacity: 30,
      enrolled: 28,
      prerequisites: ['CSE301', 'CSE401']
    }
  ]);

  const [registeredCourses, setRegisteredCourses] = useState([
    {
      id: 4,
      code: 'CSE301',
      name: 'Software Engineering',
      credits: 3,
      status: 'Confirmed'
    }
  ]);

  const [selectedCourses, setSelectedCourses] = useState([]);

  const handleCourseSelect = (courseId) => {
    setSelectedCourses(prev => 
      prev.includes(courseId) 
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  const handleRegister = () => {
    const coursesToRegister = availableCourses.filter(course => 
      selectedCourses.includes(course.id)
    );
    
    setRegisteredCourses(prev => [
      ...prev,
      ...coursesToRegister.map(course => ({
        ...course,
        status: 'Pending'
      }))
    ]);
    
    setSelectedCourses([]);
    alert(`Successfully registered for ${coursesToRegister.length} course(s)!`);
  };

  const handleDrop = (courseId) => {
    setRegisteredCourses(prev => prev.filter(course => course.id !== courseId));
    alert('Course dropped successfully!');
  };

  const totalCredits = registeredCourses.reduce((sum, course) => sum + course.credits, 0);

  return (
    <div className="course-registration">
      <div className="page-header">
        <h1>📝 Course Registration</h1>
        <p>Register for courses and manage your academic schedule</p>
      </div>

      <div className="registration-summary">
        <div className="summary-card">
          <h3>Registration Summary</h3>
          <div className="summary-stats">
            <div className="stat">
              <span className="stat-label">Total Credits:</span>
              <span className="stat-value">{totalCredits}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Registered Courses:</span>
              <span className="stat-value">{registeredCourses.length}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="registration-sections">
        <div className="available-courses">
          <h2>Available Courses</h2>
          <div className="courses-list">
            {availableCourses.map(course => (
              <div key={course.id} className="course-item">
                <div className="course-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedCourses.includes(course.id)}
                    onChange={() => handleCourseSelect(course.id)}
                  />
                </div>
                <div className="course-details">
                  <div className="course-title">
                    <h4>{course.code} - {course.name}</h4>
                    <span className="credits">{course.credits} Credits</span>
                  </div>
                  <div className="course-info">
                    <p>👨‍🏫 {course.instructor}</p>
                    <p>🕒 {course.schedule}</p>
                    <p>👥 {course.enrolled}/{course.capacity} enrolled</p>
                  </div>
                  {course.prerequisites.length > 0 && (
                    <div className="prerequisites">
                      <strong>Prerequisites:</strong> {course.prerequisites.join(', ')}
                    </div>
                  )}
                </div>
                <div className="enrollment-status">
                  {course.enrolled >= course.capacity ? (
                    <span className="status full">Full</span>
                  ) : (
                    <span className="status available">Available</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {selectedCourses.length > 0 && (
            <div className="registration-actions">
              <button className="register-btn" onClick={handleRegister}>
                Register for {selectedCourses.length} Course(s)
              </button>
            </div>
          )}
        </div>

        <div className="registered-courses">
          <h2>My Registered Courses</h2>
          <div className="registered-list">
            {registeredCourses.map(course => (
              <div key={course.id} className="registered-item">
                <div className="course-info">
                  <h4>{course.code} - {course.name}</h4>
                  <p>{course.credits} Credits</p>
                </div>
                <div className="course-status">
                  <span className={`status ${course.status.toLowerCase()}`}>
                    {course.status}
                  </span>
                </div>
                <div className="course-actions">
                  <button 
                    className="drop-btn"
                    onClick={() => handleDrop(course.id)}
                  >
                    Drop
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseRegistration;
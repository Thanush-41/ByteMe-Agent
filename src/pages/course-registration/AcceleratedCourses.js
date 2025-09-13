import React, { useState } from 'react';
import './AcceleratedCourses.css';

const AcceleratedCourses = () => {
  const [acceleratedCourses] = useState([
    {
      id: 'CS401A',
      name: 'Advanced Data Structures (Accelerated)',
      code: 'CS401A',
      credits: 4,
      duration: '6 weeks',
      intensity: 'High',
      schedule: 'Mon-Sat 9:00 AM - 12:00 PM',
      faculty: 'Dr. Priya Sharma',
      prerequisite: 'CS301',
      startDate: '2025-02-01',
      endDate: '2025-03-15',
      capacity: 25,
      enrolled: 18,
      fee: 8000,
      description: 'Intensive coverage of advanced data structures and algorithms'
    },
    {
      id: 'MATH301A',
      name: 'Linear Algebra (Accelerated)',
      code: 'MATH301A',
      credits: 3,
      duration: '4 weeks',
      intensity: 'High',
      schedule: 'Mon-Fri 2:00 PM - 5:00 PM',
      faculty: 'Dr. Anil Verma',
      prerequisite: 'MATH201',
      startDate: '2025-01-25',
      endDate: '2025-02-22',
      capacity: 30,
      enrolled: 22,
      fee: 6000,
      description: 'Fast-track linear algebra for engineering students'
    },
    {
      id: 'CS501A',
      name: 'Machine Learning (Accelerated)',
      code: 'CS501A',
      credits: 4,
      duration: '8 weeks',
      intensity: 'Very High',
      schedule: 'Daily 10:00 AM - 1:00 PM',
      faculty: 'Dr. Kavita Singh',
      prerequisite: 'CS301, MATH301',
      startDate: '2025-02-10',
      endDate: '2025-04-05',
      capacity: 20,
      enrolled: 15,
      fee: 10000,
      description: 'Comprehensive machine learning course in accelerated format'
    }
  ]);

  const [selectedCourses, setSelectedCourses] = useState([]);
  const [showEligibilityModal, setShowEligibilityModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    setShowEligibilityModal(true);
  };

  const confirmRegistration = () => {
    if (!selectedCourses.find(c => c.id === selectedCourse.id)) {
      setSelectedCourses([...selectedCourses, selectedCourse]);
    }
    setShowEligibilityModal(false);
    setSelectedCourse(null);
  };

  const getIntensityColor = (intensity) => {
    switch(intensity) {
      case 'High': return '#ffc107';
      case 'Very High': return '#dc3545';
      default: return '#28a745';
    }
  };

  const totalFee = selectedCourses.reduce((sum, course) => sum + course.fee, 0);

  return (
    <div className="accelerated-courses">
      <div className="page-header">
        <h1>⚡ Accelerated Courses</h1>
        <p>Fast-track your learning with intensive accelerated courses</p>
      </div>

      <div className="accelerated-info">
        <div className="info-banner">
          <h3>⚠️ Important Information</h3>
          <p>Accelerated courses are intensive programs designed for dedicated students who want to complete coursework in shorter timeframes. These courses require significant time commitment and strong academic performance.</p>
        </div>
      </div>

      <div className="courses-section">
        <h2>Available Accelerated Courses</h2>
        
        <div className="courses-grid">
          {acceleratedCourses.map(course => {
            const isSelected = selectedCourses.find(c => c.id === course.id);
            const availableSeats = course.capacity - course.enrolled;
            
            return (
              <div key={course.id} className={`course-card ${isSelected ? 'selected' : ''}`}>
                <div className="course-header">
                  <h3>{course.name}</h3>
                  <span className="course-code">{course.code}</span>
                  <span 
                    className="intensity-badge"
                    style={{ backgroundColor: getIntensityColor(course.intensity) }}
                  >
                    {course.intensity} Intensity
                  </span>
                </div>

                <div className="course-details">
                  <div className="detail-row">
                    <span>Credits:</span>
                    <span>{course.credits}</span>
                  </div>
                  <div className="detail-row">
                    <span>Duration:</span>
                    <span>{course.duration}</span>
                  </div>
                  <div className="detail-row">
                    <span>Schedule:</span>
                    <span>{course.schedule}</span>
                  </div>
                  <div className="detail-row">
                    <span>Faculty:</span>
                    <span>{course.faculty}</span>
                  </div>
                  <div className="detail-row">
                    <span>Prerequisites:</span>
                    <span>{course.prerequisite}</span>
                  </div>
                  <div className="detail-row">
                    <span>Start Date:</span>
                    <span>{course.startDate}</span>
                  </div>
                  <div className="detail-row">
                    <span>End Date:</span>
                    <span>{course.endDate}</span>
                  </div>
                  <div className="detail-row">
                    <span>Available Seats:</span>
                    <span className={availableSeats < 5 ? 'low-seats' : ''}>{availableSeats}</span>
                  </div>
                  <div className="detail-row">
                    <span>Course Fee:</span>
                    <span className="fee">₹{course.fee}</span>
                  </div>
                </div>

                <div className="course-description">
                  <p>{course.description}</p>
                </div>

                <div className="course-actions">
                  <button
                    className={`select-btn ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleCourseSelect(course)}
                    disabled={availableSeats === 0}
                  >
                    {availableSeats === 0 ? 'Course Full' :
                     isSelected ? '✓ Registered' : 'Register Now'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedCourses.length > 0 && (
        <div className="registration-summary">
          <h3>Registration Summary</h3>
          <div className="selected-courses">
            {selectedCourses.map(course => (
              <div key={course.id} className="selected-course">
                <span>{course.name}</span>
                <span>₹{course.fee}</span>
              </div>
            ))}
          </div>
          <div className="total-fee">
            <strong>Total Fee: ₹{totalFee}</strong>
          </div>
          <button className="pay-btn">
            Proceed to Payment
          </button>
        </div>
      )}

      {showEligibilityModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Eligibility Check</h3>
              <button 
                className="close-btn"
                onClick={() => setShowEligibilityModal(false)}
              >
                ✕
              </button>
            </div>
            
            <div className="eligibility-content">
              <h4>{selectedCourse?.name}</h4>
              <div className="eligibility-criteria">
                <h5>Eligibility Requirements:</h5>
                <ul>
                  <li>✓ Minimum CGPA: 7.0</li>
                  <li>✓ Prerequisites completed: {selectedCourse?.prerequisite}</li>
                  <li>✓ No pending backlogs</li>
                  <li>✓ Academic good standing</li>
                </ul>
              </div>
              
              <div className="commitment-warning">
                <h5>⚠️ Commitment Required:</h5>
                <p>This is an intensive {selectedCourse?.intensity.toLowerCase()} course requiring {selectedCourse?.duration} of dedicated study. Daily attendance is mandatory.</p>
              </div>
            </div>

            <div className="modal-actions">
              <button 
                className="confirm-btn"
                onClick={confirmRegistration}
              >
                I Understand - Register
              </button>
              <button 
                className="cancel-btn"
                onClick={() => setShowEligibilityModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="accelerated-guidelines">
        <h3>📋 Accelerated Course Guidelines</h3>
        <ul>
          <li>Minimum CGPA of 7.0 required for eligibility</li>
          <li>All prerequisites must be completed successfully</li>
          <li>Daily attendance is mandatory (minimum 90%)</li>
          <li>Intensive study schedule with accelerated pace</li>
          <li>Higher course fees due to concentrated instruction</li>
          <li>Limited seats available - first come, first served</li>
          <li>No refund after course commencement</li>
        </ul>
      </div>
    </div>
  );
};

export default AcceleratedCourses;
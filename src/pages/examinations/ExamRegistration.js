import React, { useState } from 'react';
import './ExamRegistration.css';

const ExamRegistration = () => {
  const [studentInfo] = useState({
    rollno: '24951A05CD',
    name: 'CHAKILAM SRINATH',
    semester: '3',
    regulation: 'R23',
    academicYear: '2025-26'
  });

  const [availableCourses] = useState([
    {
      courseCode: 'AHSD11',
      courseName: 'Probability and Statistics',
      credits: 3,
      examFee: 200,
      eligible: true
    },
    {
      courseCode: 'ACSD08',
      courseName: 'Data Structures',
      credits: 4,
      examFee: 200,
      eligible: true
    },
    {
      courseCode: 'ACSD09',
      courseName: 'Operating Systems',
      credits: 3,
      examFee: 200,
      eligible: true
    },
    {
      courseCode: 'AECD04',
      courseName: 'Computer System Architecture',
      credits: 3,
      examFee: 200,
      eligible: false
    },
    {
      courseCode: 'AITD01',
      courseName: 'Mathematics for Computing',
      credits: 4,
      examFee: 200,
      eligible: true
    }
  ]);

  const [selectedCourses, setSelectedCourses] = useState([]);
  const [registrationStatus, setRegistrationStatus] = useState('');

  const handleCourseSelection = (courseCode) => {
    if (selectedCourses.includes(courseCode)) {
      setSelectedCourses(selectedCourses.filter(code => code !== courseCode));
    } else {
      setSelectedCourses([...selectedCourses, courseCode]);
    }
  };

  const getTotalFee = () => {
    return selectedCourses.length * 200;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCourses.length === 0) {
      setRegistrationStatus('Please select at least one course for registration.');
      return;
    }
    setRegistrationStatus('Registration submitted successfully! You will receive confirmation via email.');
  };

  return (
    <div className="exam-registration-page">
      <div className="page-header">
        <h1>Exam Registration</h1>
        <div className="breadcrumb">
          <span>Home</span> / <span>Examinations</span> / <span>Exam Registration</span>
        </div>
      </div>

      <div className="student-info-section">
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">Roll No</span>
            <span className="info-value">{studentInfo.rollno}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Name</span>
            <span className="info-value">{studentInfo.name}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Semester</span>
            <span className="info-value">{studentInfo.semester}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Regulation</span>
            <span className="info-value">{studentInfo.regulation}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Academic Year</span>
            <span className="info-value">{studentInfo.academicYear}</span>
          </div>
        </div>
      </div>

      <div className="registration-section">
        <div className="section-header">
          <h3>COURSE REGISTRATION FOR END SEMESTER EXAMINATION</h3>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="courses-table-container">
            <table className="courses-table">
              <thead>
                <tr>
                  <th>Select</th>
                  <th>Course Code</th>
                  <th>Course Name</th>
                  <th>Credits</th>
                  <th>Exam Fee (₹)</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {availableCourses.map((course) => (
                  <tr key={course.courseCode} className={!course.eligible ? 'not-eligible' : ''}>
                    <td>
                      <input
                        type="checkbox"
                        id={course.courseCode}
                        checked={selectedCourses.includes(course.courseCode)}
                        onChange={() => handleCourseSelection(course.courseCode)}
                        disabled={!course.eligible}
                        className="course-checkbox"
                      />
                    </td>
                    <td>{course.courseCode}</td>
                    <td className="course-name">{course.courseName}</td>
                    <td>{course.credits}</td>
                    <td>₹{course.examFee}</td>
                    <td>
                      <span className={`status-badge ${course.eligible ? 'eligible' : 'not-eligible'}`}>
                        {course.eligible ? 'Eligible' : 'Not Eligible'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="registration-summary">
            <div className="summary-item">
              <span className="summary-label">Selected Courses:</span>
              <span className="summary-value">{selectedCourses.length}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Total Exam Fee:</span>
              <span className="summary-value">₹{getTotalFee()}</span>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="register-btn">
              Register for Examinations
            </button>
            <button type="button" className="reset-btn" onClick={() => setSelectedCourses([])}>
              Reset Selection
            </button>
          </div>

          {registrationStatus && (
            <div className={`registration-status ${registrationStatus.includes('successfully') ? 'success' : 'error'}`}>
              {registrationStatus}
            </div>
          )}
        </form>

        <div className="important-notes">
          <h4>Important Notes:</h4>
          <ul>
            <li>Registration deadline: 15 days before examination</li>
            <li>Exam fee must be paid within 24 hours of registration</li>
            <li>Students with attendance shortage are not eligible</li>
            <li>Late registration will incur additional charges</li>
            <li>Contact examination cell for any queries</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExamRegistration;
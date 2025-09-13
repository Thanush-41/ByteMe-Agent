import React, { useState } from 'react';
import './ReRegistration.css';

const ReRegistration = () => {
  const [studentInfo] = useState({
    rollNo: '22BCE7508',
    name: 'Thanush',
    semester: '3',
    regulation: 'R23',
    academicYear: '2025-26',
    totalCreditsRegistered: '6.00'
  });

  const [availableForReRegistration] = useState([
    {
      sNo: 1,
      courseCode: 'PHYS101',
      courseName: 'Engineering Physics',
      courseType: 'T',
      courseCategory: 'CORE',
      credit: '3.00',
      previousGrade: 'F',
      reason: 'Failed in Final Exam',
      status: 'Available'
    },
    {
      sNo: 2,
      courseCode: 'MATH102',
      courseName: 'Engineering Mathematics-II',
      courseType: 'T',
      courseCategory: 'CORE',
      credit: '3.00',
      previousGrade: 'F',
      reason: 'Absent in Final Exam',
      status: 'Available'
    }
  ]);

  const [selectedCourses, setSelectedCourses] = useState([]);

  const handleCourseSelection = (course, isSelected) => {
    if (isSelected) {
      setSelectedCourses([...selectedCourses, course]);
    } else {
      setSelectedCourses(selectedCourses.filter(c => c.sNo !== course.sNo));
    }
  };

  const handleReRegistration = () => {
    if (selectedCourses.length === 0) {
      alert('Please select at least one course for re-registration.');
      return;
    }
    alert(`Successfully applied for re-registration of ${selectedCourses.length} course(s)!`);
  };

  return (
    <div className="re-registration">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <span>Home</span>
        <span>/</span>
        <span>Re-Registration</span>
      </div>

      {/* Page Title */}
      <h1 className="page-title">Course Re-Registration</h1>

      {/* Student Information Section */}
      <div className="student-info-section">
        <div className="info-grid">
          <div className="info-row">
            <div className="info-item">
              <span className="label">Rollno</span>
              <span className="value">{studentInfo.rollNo}</span>
            </div>
            <div className="info-item">
              <span className="label">Name</span>
              <span className="value">{studentInfo.name}</span>
            </div>
          </div>
          <div className="info-row">
            <div className="info-item">
              <span className="label">Semester</span>
              <span className="value">{studentInfo.semester}</span>
            </div>
            <div className="info-item">
              <span className="label">Regulation</span>
              <span className="value">{studentInfo.regulation}</span>
            </div>
          </div>
          <div className="info-row">
            <div className="info-item">
              <span className="label">Academic Year</span>
              <span className="value">{studentInfo.academicYear}</span>
            </div>
            <div className="info-item">
              <span className="label">Total Credits for Re-Registration</span>
              <span className="value">{studentInfo.totalCreditsRegistered}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Info Message */}
      <div className="info-message">
        Select courses that you need to re-register due to failure or absence in previous attempts.
      </div>

      {/* Re-Registration Form */}
      <div className="course-registration-form">
        <div className="form-header">
          <span className="form-title">Course Re-Registration Form</span>
          <span className="last-date">Last Date: 15-08-2025</span>
        </div>

        <div className="course-table-container">
          <table className="course-table">
            <thead>
              <tr>
                <th>Select</th>
                <th>S.No</th>
                <th>Course Code</th>
                <th>Course Name</th>
                <th>Course Type</th>
                <th>Course Category</th>
                <th>Credit</th>
                <th>Previous Grade</th>
                <th>Reason</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {availableForReRegistration.map((course) => (
                <tr key={course.sNo}>
                  <td>
                    <input
                      type="checkbox"
                      onChange={(e) => handleCourseSelection(course, e.target.checked)}
                    />
                  </td>
                  <td>{course.sNo}</td>
                  <td>{course.courseCode}</td>
                  <td>{course.courseName}</td>
                  <td>{course.courseType}</td>
                  <td>{course.courseCategory}</td>
                  <td>{course.credit}</td>
                  <td>
                    <span className="grade-failed">{course.previousGrade}</span>
                  </td>
                  <td>{course.reason}</td>
                  <td>
                    <span className="status-available">{course.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="form-actions">
          <button 
            className="register-btn"
            onClick={handleReRegistration}
            disabled={selectedCourses.length === 0}
          >
            Submit Re-Registration
          </button>
          <button 
            className="reset-btn"
            onClick={() => setSelectedCourses([])}
          >
            Reset Selection
          </button>
        </div>
      </div>

      {/* Re-Registration Guidelines */}
      <div className="registration-guidelines">
        <h3>📋 Re-Registration Guidelines</h3>
        <ul>
          <li>Re-registration is available for failed or absent courses from previous semesters</li>
          <li>Students must pay additional fees for re-registration</li>
          <li>Maximum 2 re-registration attempts are allowed per course</li>
          <li>Contact academic office for any queries regarding re-registration</li>
          <li>Submit the application before the deadline mentioned above</li>
        </ul>
      </div>
    </div>
  );
};

export default ReRegistration;
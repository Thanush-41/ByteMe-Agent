import React, { useState } from 'react';
import './AcceleratedCourses.css';

const AcceleratedCourses = () => {
  const [studentInfo] = useState({
    rollNo: '24951A05CD',
    name: 'CHAKILAM SRINATH',
    semester: '3',
    regulation: 'R23',
    academicYear: '2025-26',
    eligibleCGPA: '8.5'
  });

  const [acceleratedCourses] = useState([
    {
      sNo: 1,
      courseCode: 'ACSD10',
      courseName: 'Advanced Data Structures',
      courseType: 'T',
      courseCategory: 'ACCELERATED',
      credit: '4.00',
      prerequisite: 'ACSD08',
      duration: '6 months',
      status: 'Available'
    },
    {
      sNo: 2,
      courseCode: 'ACSD11',
      courseName: 'Machine Learning Fundamentals',
      courseType: 'T',
      courseCategory: 'ACCELERATED',
      credit: '4.00',
      prerequisite: 'AHSD11',
      duration: '6 months',
      status: 'Available'
    }
  ]);

  const [selectedCourses, setSelectedCourses] = useState([]);

  return (
    <div className="accelerated-courses">
      <div className="breadcrumb">
        <span>Home</span>
        <span>/</span>
        <span>Accelerated Courses</span>
      </div>

      <h1 className="page-title">Accelerated Course Registration</h1>

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
              <span className="label">Current CGPA</span>
              <span className="value">{studentInfo.eligibleCGPA}</span>
            </div>
            <div className="info-item">
              <span className="label">Regulation</span>
              <span className="value">{studentInfo.regulation}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="info-message">
        Accelerated courses are available for high-performing students (CGPA ≥ 8.0) to complete additional credits faster.
      </div>

      <div className="course-registration-form">
        <div className="form-header">
          <span className="form-title">Accelerated Course Registration</span>
          <span className="last-date">Last Date: 20-08-2025</span>
        </div>

        <div className="course-table-container">
          <table className="course-table">
            <thead>
              <tr>
                <th>Select</th>
                <th>S.No</th>
                <th>Course Code</th>
                <th>Course Name</th>
                <th>Credit</th>
                <th>Prerequisite</th>
                <th>Duration</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {acceleratedCourses.map((course) => (
                <tr key={course.sNo}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{course.sNo}</td>
                  <td>{course.courseCode}</td>
                  <td>{course.courseName}</td>
                  <td>{course.credit}</td>
                  <td>{course.prerequisite}</td>
                  <td>{course.duration}</td>
                  <td>
                    <span className="status-available">{course.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="form-actions">
          <button className="register-btn">Submit Registration</button>
          <button className="reset-btn">Reset Selection</button>
        </div>
      </div>

      <div className="registration-guidelines">
        <h3>📋 Accelerated Course Guidelines</h3>
        <ul>
          <li>Minimum CGPA of 8.0 required for accelerated course registration</li>
          <li>Courses are conducted in fast-track mode (6 months duration)</li>
          <li>Additional fees applicable for accelerated courses</li>
          <li>Limited seats available - first come, first served basis</li>
        </ul>
      </div>
    </div>
  );
};

export default AcceleratedCourses;
import React, { useState } from 'react';
import './RegularCourses.css';

const RegularCourses = () => {
  const [studentInfo] = useState({
    rollNo: '22BCE7508',
    name: 'Thanush',
    semester: '3',
    regulation: 'R23',
    academicYear: '2025-26',
    totalCreditsRegistered: '20.00'
  });

  const [registeredCourses] = useState([
    {
      sNo: 1,
      courseCode: 'AHSD11',
      courseName: 'Probability and Statistics',
      courseType: 'T',
      courseCategory: 'CORE',
      credit: '4.00',
      aatType: '',
      status: 'Registered'
    },
    {
      sNo: 2,
      courseCode: 'ACSD08',
      courseName: 'Data Structures',
      courseType: 'T',
      courseCategory: 'CORE',
      credit: '3.00',
      aatType: '',
      status: 'Registered'
    },
    {
      sNo: 3,
      courseCode: 'ACSD09',
      courseName: 'Operating Systems',
      courseType: 'T',
      courseCategory: 'CORE',
      credit: '3.00',
      aatType: '',
      status: 'Registered'
    },
    {
      sNo: 4,
      courseCode: 'AECD04',
      courseName: 'Computer System Architecture',
      courseType: 'T',
      courseCategory: 'CORE',
      credit: '3.00',
      aatType: '',
      status: 'Registered'
    },
    {
      sNo: 5,
      courseCode: 'AITD01',
      courseName: 'Mathematics for Computing',
      courseType: 'T',
      courseCategory: 'CORE',
      credit: '3.00',
      aatType: '',
      status: 'Registered'
    }
  ]);

  return (
    <div className="regular-course-registration">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <span>Home</span>
        <span>/</span>
        <span>Regular Course Registration</span>
      </div>

      {/* Page Title */}
      <h1 className="page-title">Regular Course Registration</h1>

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
              <span className="label">Total Credits Registered for this semester</span>
              <span className="value">{studentInfo.totalCreditsRegistered}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Warning Message */}
      <div className="warning-message">
        Please contact controller of examination (COE), if any of the below course is to register or modify.
      </div>

      {/* Course Registration Form */}
      <div className="course-registration-form">
        <div className="form-header">
          <span className="form-title">Course Registration Form</span>
          <span className="last-date">Last Date: 10-08-2025</span>
        </div>

        <div className="course-table-container">
          <table className="course-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Course Code</th>
                <th>Course Name</th>
                <th>Course Type</th>
                <th>Course Category</th>
                <th>Credit</th>
                <th>AAT Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {registeredCourses.map((course) => (
                <tr key={course.sNo}>
                  <td>{course.sNo}</td>
                  <td>{course.courseCode}</td>
                  <td>{course.courseName}</td>
                  <td>{course.courseType}</td>
                  <td>{course.courseCategory}</td>
                  <td>{course.credit}</td>
                  <td>{course.aatType}</td>
                  <td>
                    <span className="status-registered">{course.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Registration Guidelines */}
      <div className="registration-guidelines">
        <h3>📋 Registration Guidelines</h3>
        <ul>
          <li>Contact Controller of Examination (COE) for any course registration modifications</li>
          <li>All registered courses are shown with their current status</li>
          <li>Last date for registration modifications is clearly mentioned above</li>
          <li>Total credits for the semester should not exceed the allowed limit</li>
          <li>Course modifications after the deadline will not be entertained</li>
        </ul>
      </div>
    </div>
  );
};

export default RegularCourses;
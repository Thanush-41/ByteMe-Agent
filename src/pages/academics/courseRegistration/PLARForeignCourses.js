import React, { useState } from 'react';
import './PLARForeignCourses.css';

const PLARForeignCourses = () => {
  const [studentInfo] = useState({
    rollNo: '22BCE7508',
    name: 'Thanush',
    semester: '3',
    regulation: 'R23',
    academicYear: '2025-26'
  });

  const [foreignCourses] = useState([
    {
      sNo: 1,
      courseCode: 'PLARF01',
      courseName: 'International Business Management',
      university: 'Harvard University',
      country: 'USA',
      credit: '4.00',
      duration: '12 weeks',
      fee: '$2500',
      status: 'Available'
    },
    {
      sNo: 2,
      courseCode: 'PLARF02',
      courseName: 'Global Supply Chain Management',
      university: 'Oxford University',
      country: 'UK',
      credit: '3.00',
      duration: '10 weeks',
      fee: '£1800',
      status: 'Available'
    }
  ]);

  return (
    <div className="plar-foreign-courses">
      <div className="breadcrumb">
        <span>Home</span>
        <span>/</span>
        <span>PLAR Foreign Courses</span>
      </div>

      <h1 className="page-title">PLAR Foreign Course Registration</h1>

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
        </div>
      </div>

      <div className="info-message">
        PLAR Foreign Courses allow students to earn credits from international universities through online programs.
      </div>

      <div className="course-registration-form">
        <div className="form-header">
          <span className="form-title">PLAR Foreign Course Registration</span>
          <span className="last-date">Last Date: 30-08-2025</span>
        </div>

        <div className="course-table-container">
          <table className="course-table">
            <thead>
              <tr>
                <th>Select</th>
                <th>S.No</th>
                <th>Course Code</th>
                <th>Course Name</th>
                <th>University</th>
                <th>Country</th>
                <th>Credit</th>
                <th>Duration</th>
                <th>Fee</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {foreignCourses.map((course) => (
                <tr key={course.sNo}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{course.sNo}</td>
                  <td>{course.courseCode}</td>
                  <td>{course.courseName}</td>
                  <td>{course.university}</td>
                  <td>{course.country}</td>
                  <td>{course.credit}</td>
                  <td>{course.duration}</td>
                  <td>{course.fee}</td>
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
        <h3>📋 PLAR Foreign Course Guidelines</h3>
        <ul>
          <li>Courses are conducted online by partner international universities</li>
          <li>Students must have good English proficiency (IELTS 6.0+ or equivalent)</li>
          <li>Course fees are in addition to regular semester fees</li>
          <li>Credits earned will be transferred to IARE transcript</li>
          <li>Limited seats - selection based on academic performance</li>
        </ul>
      </div>
    </div>
  );
};

export default PLARForeignCourses;
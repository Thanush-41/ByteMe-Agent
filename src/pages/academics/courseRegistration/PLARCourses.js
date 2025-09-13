import React, { useState } from 'react';
import './PLARCourses.css';

const PLARCourses = () => {
  const [studentInfo] = useState({
    rollNo: '24951A05CD',
    name: 'CHAKILAM SRINATH',
    semester: '3',
    regulation: 'R23',
    academicYear: '2025-26'
  });

  const [plarCourses] = useState([
    {
      sNo: 1,
      courseCode: 'PLAR01',
      courseName: 'Professional Communication Skills',
      courseType: 'PLAR',
      courseCategory: 'PLAR',
      credit: '2.00',
      examDate: '15-09-2025',
      examFee: '₹1500',
      status: 'Available'
    },
    {
      sNo: 2,
      courseCode: 'PLAR02',
      courseName: 'Digital Marketing Fundamentals',
      courseType: 'PLAR',
      courseCategory: 'PLAR',
      credit: '3.00',
      examDate: '20-09-2025',
      examFee: '₹2000',
      status: 'Available'
    }
  ]);

  return (
    <div className="plar-courses">
      <div className="breadcrumb">
        <span>Home</span>
        <span>/</span>
        <span>PLAR Courses</span>
      </div>

      <h1 className="page-title">PLAR Course Registration</h1>

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
        Prior Learning Assessment and Recognition (PLAR) allows students to earn credits for prior learning through examination.
      </div>

      <div className="course-registration-form">
        <div className="form-header">
          <span className="form-title">PLAR Course Registration</span>
          <span className="last-date">Last Date: 25-08-2025</span>
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
                <th>Exam Date</th>
                <th>Exam Fee</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {plarCourses.map((course) => (
                <tr key={course.sNo}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{course.sNo}</td>
                  <td>{course.courseCode}</td>
                  <td>{course.courseName}</td>
                  <td>{course.credit}</td>
                  <td>{course.examDate}</td>
                  <td>{course.examFee}</td>
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
        <h3>📋 PLAR Guidelines</h3>
        <ul>
          <li>PLAR is for students with prior learning experience in the subject area</li>
          <li>Students must pass the PLAR examination to earn credits</li>
          <li>Examination fees must be paid during registration</li>
          <li>PLAR credits will be added to transcript upon successful completion</li>
        </ul>
      </div>
    </div>
  );
};

export default PLARCourses;
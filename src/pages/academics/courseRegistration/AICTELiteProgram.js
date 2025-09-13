import React, { useState } from 'react';
import './AICTELiteProgram.css';

const AICTELiteProgram = () => {
  const [studentInfo] = useState({
    rollNo: '24951A05CD',
    name: 'CHAKILAM SRINATH',
    semester: '3',
    regulation: 'R23',
    academicYear: '2025-26'
  });

  const [aicteCourses] = useState([
    {
      sNo: 1,
      courseCode: 'AICTE01',
      courseName: 'Artificial Intelligence and Machine Learning',
      provider: 'Microsoft',
      platform: 'SWAYAM',
      credit: '4.00',
      duration: '16 weeks',
      certification: 'Industry Certificate',
      status: 'Available'
    },
    {
      sNo: 2,
      courseCode: 'AICTE02',
      courseName: 'Cyber Security Fundamentals',
      provider: 'IBM',
      platform: 'NPTEL',
      credit: '3.00',
      duration: '12 weeks',
      certification: 'Industry Certificate',
      status: 'Available'
    },
    {
      sNo: 3,
      courseCode: 'AICTE03',
      courseName: 'Cloud Computing with AWS',
      provider: 'Amazon',
      platform: 'SWAYAM',
      credit: '3.00',
      duration: '10 weeks',
      certification: 'AWS Certificate',
      status: 'Available'
    }
  ]);

  return (
    <div className="aicte-lite-program">
      <div className="breadcrumb">
        <span>Home</span>
        <span>/</span>
        <span>AICTE LITE Program</span>
      </div>

      <h1 className="page-title">AICTE LITE Program Registration</h1>

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
        AICTE LITE (Leadership in Teaching Excellence) program offers industry-relevant courses with certifications.
      </div>

      <div className="course-registration-form">
        <div className="form-header">
          <span className="form-title">AICTE LITE Program Registration</span>
          <span className="last-date">Last Date: 05-09-2025</span>
        </div>

        <div className="course-table-container">
          <table className="course-table">
            <thead>
              <tr>
                <th>Select</th>
                <th>S.No</th>
                <th>Course Code</th>
                <th>Course Name</th>
                <th>Provider</th>
                <th>Platform</th>
                <th>Credit</th>
                <th>Duration</th>
                <th>Certification</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {aicteCourses.map((course) => (
                <tr key={course.sNo}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{course.sNo}</td>
                  <td>{course.courseCode}</td>
                  <td>{course.courseName}</td>
                  <td>{course.provider}</td>
                  <td>{course.platform}</td>
                  <td>{course.credit}</td>
                  <td>{course.duration}</td>
                  <td>{course.certification}</td>
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
        <h3>📋 AICTE LITE Program Guidelines</h3>
        <ul>
          <li>Courses are offered by top industry partners through AICTE approval</li>
          <li>Successful completion provides both academic credits and industry certification</li>
          <li>Courses are delivered online through SWAYAM/NPTEL platforms</li>
          <li>Students must maintain 75% attendance and pass final assessment</li>
          <li>Certificates are jointly issued by AICTE and industry partner</li>
        </ul>
      </div>
    </div>
  );
};

export default AICTELiteProgram;
import React, { useState } from 'react';
import './Attendance.css';

const Attendance = () => {
  const [studentInfo] = useState({
    rollno: '24951A05CD',
    name: 'CHAKILAM SRINATH',
    semester: '3',
    regulation: 'R23',
    academicYear: '2025-26',
    lastDateOfSemester: '24-11-2025'
  });

  const [attendanceData] = useState([
    {
      sNo: 1,
      courseCode: 'AHSD11',
      courseName: 'Probability and Statistics',
      courseType: 'T',
      courseCategory: 'CORE',
      conducted: 24,
      attended: 16,
      attendancePercentage: 66.67,
      status: 'Condonation'
    },
    {
      sNo: 2,
      courseCode: 'ACSD08',
      courseName: 'Data Structures',
      courseType: 'T',
      courseCategory: 'CORE',
      conducted: 12,
      attended: 6,
      attendancePercentage: 50,
      status: 'Shortage'
    },
    {
      sNo: 3,
      courseCode: 'ACSD09',
      courseName: 'Operating Systems',
      courseType: 'T',
      courseCategory: 'CORE',
      conducted: 20,
      attended: 12,
      attendancePercentage: 60,
      status: 'Shortage'
    },
    {
      sNo: 4,
      courseCode: 'AECD04',
      courseName: 'Computer System Architecture',
      courseType: 'T',
      courseCategory: 'CORE',
      conducted: 26,
      attended: 18,
      attendancePercentage: 69.23,
      status: 'Condonation'
    },
    {
      sNo: 5,
      courseCode: 'AITD01',
      courseName: 'Mathematics for Computing',
      courseType: 'T',
      courseCategory: 'CORE',
      conducted: 27,
      attended: 19,
      attendancePercentage: 70.37,
      status: 'Condonation'
    }
  ]);

  const getStatusClass = (status) => {
    return status === 'Condonation' ? 'status-condonation' : 'status-shortage';
  };

  return (
    <div className="attendance-page">
      <div className="page-header">
        <h1>Attendance</h1>
        <div className="breadcrumb">
          <span>Home</span> / <span>Attendance</span>
        </div>
      </div>

      <div className="student-info-section">
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">Rollno</span>
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
          <div className="info-item">
            <span className="info-label">Last Date of Semester</span>
            <span className="info-value">{studentInfo.lastDateOfSemester}</span>
          </div>
        </div>
      </div>

      <div className="attendance-report-section">
        <div className="section-header">
          <h3>ATTENDANCE REPORT</h3>
        </div>
        
        <div className="attendance-table-container">
          <table className="attendance-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Course Code</th>
                <th>Course Name</th>
                <th>Course Type</th>
                <th>Course Category</th>
                <th>Conducted</th>
                <th>Attended</th>
                <th>Attendance %</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((course) => (
                <tr key={course.sNo}>
                  <td>{course.sNo}</td>
                  <td>{course.courseCode}</td>
                  <td>{course.courseName}</td>
                  <td>{course.courseType}</td>
                  <td>{course.courseCategory}</td>
                  <td>{course.conducted}</td>
                  <td>{course.attended}</td>
                  <td>{course.attendancePercentage}</td>
                  <td>
                    <span className={`status-badge ${getStatusClass(course.status)}`}>
                      {course.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Attendance;

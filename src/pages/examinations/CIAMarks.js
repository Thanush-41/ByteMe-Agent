import React, { useState } from 'react';
import './CIAMarks.css';

const CIAMarks = () => {
  const [studentInfo] = useState({
    rollno: '22BCE7508',
    name: 'Thanush',
    semester: '3',
    regulation: 'R23',
    academicYear: '2025-26'
  });

  const [ciaMarks] = useState([
    {
      sNo: 1,
      courseCode: 'AHSD11',
      courseName: 'Probability and Statistics',
      cia1: 18,
      cia2: 16,
      cia3: 20,
      assignment: 15,
      total: 69,
      maxMarks: 75,
      percentage: 92
    },
    {
      sNo: 2,
      courseCode: 'ACSD08',
      courseName: 'Data Structures',
      cia1: 15,
      cia2: 14,
      cia3: 17,
      assignment: 12,
      total: 58,
      maxMarks: 75,
      percentage: 77.33
    },
    {
      sNo: 3,
      courseCode: 'ACSD09',
      courseName: 'Operating Systems',
      cia1: 16,
      cia2: 18,
      cia3: 19,
      assignment: 14,
      total: 67,
      maxMarks: 75,
      percentage: 89.33
    },
    {
      sNo: 4,
      courseCode: 'AECD04',
      courseName: 'Computer System Architecture',
      cia1: 14,
      cia2: 16,
      cia3: 15,
      assignment: 13,
      total: 58,
      maxMarks: 75,
      percentage: 77.33
    }
  ]);

  const getGrade = (percentage) => {
    if (percentage >= 90) return 'O';
    if (percentage >= 80) return 'A+';
    if (percentage >= 70) return 'A';
    if (percentage >= 60) return 'B+';
    if (percentage >= 50) return 'B';
    return 'F';
  };

  return (
    <div className="cia-marks-page">
      <div className="page-header">
        <h1>CIA Marks</h1>
        <div className="breadcrumb">
          <span>Home</span> / <span>Examinations</span> / <span>CIA Marks</span>
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

      <div className="cia-marks-section">
        <div className="section-header">
          <h3>CONTINUOUS INTERNAL ASSESSMENT MARKS</h3>
        </div>
        
        <div className="marks-table-container">
          <table className="marks-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Course Code</th>
                <th>Course Name</th>
                <th>CIA-1 (20)</th>
                <th>CIA-2 (20)</th>
                <th>CIA-3 (20)</th>
                <th>Assignment (15)</th>
                <th>Total (75)</th>
                <th>Percentage</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {ciaMarks.map((course) => (
                <tr key={course.sNo}>
                  <td>{course.sNo}</td>
                  <td>{course.courseCode}</td>
                  <td className="course-name">{course.courseName}</td>
                  <td>{course.cia1}</td>
                  <td>{course.cia2}</td>
                  <td>{course.cia3}</td>
                  <td>{course.assignment}</td>
                  <td className="total-marks">{course.total}</td>
                  <td>{course.percentage.toFixed(2)}%</td>
                  <td>
                    <span className={`grade-badge grade-${getGrade(course.percentage)}`}>
                      {getGrade(course.percentage)}
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

export default CIAMarks;
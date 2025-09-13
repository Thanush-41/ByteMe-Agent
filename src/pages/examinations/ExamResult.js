import React, { useState } from 'react';
import './ExamResult.css';

const ExamResult = () => {
  const [studentInfo] = useState({
    rollno: '24951A05CD',
    name: 'CHAKILAM SRINATH',
    semester: '3',
    regulation: 'R23',
    academicYear: '2025-26'
  });

  const [examResults] = useState([
    {
      sNo: 1,
      courseCode: 'AHSD11',
      courseName: 'Probability and Statistics',
      credits: 3,
      grade: 'A+',
      gradePoints: 9,
      status: 'Pass'
    },
    {
      sNo: 2,
      courseCode: 'ACSD08',
      courseName: 'Data Structures',
      credits: 4,
      grade: 'A',
      gradePoints: 8,
      status: 'Pass'
    },
    {
      sNo: 3,
      courseCode: 'ACSD09',
      courseName: 'Operating Systems',
      credits: 3,
      grade: 'B+',
      gradePoints: 7,
      status: 'Pass'
    },
    {
      sNo: 4,
      courseCode: 'AECD04',
      courseName: 'Computer System Architecture',
      credits: 3,
      grade: 'A',
      gradePoints: 8,
      status: 'Pass'
    },
    {
      sNo: 5,
      courseCode: 'AITD01',
      courseName: 'Mathematics for Computing',
      credits: 4,
      grade: 'O',
      gradePoints: 10,
      status: 'Pass'
    }
  ]);

  const calculateSGPA = () => {
    const totalCredits = examResults.reduce((sum, result) => sum + result.credits, 0);
    const totalGradePoints = examResults.reduce((sum, result) => sum + (result.credits * result.gradePoints), 0);
    return (totalGradePoints / totalCredits).toFixed(2);
  };

  const getTotalCredits = () => {
    return examResults.reduce((sum, result) => sum + result.credits, 0);
  };

  return (
    <div className="exam-result-page">
      <div className="page-header">
        <h1>Exam Result</h1>
        <div className="breadcrumb">
          <span>Home</span> / <span>Examinations</span> / <span>Exam Result</span>
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

      <div className="result-section">
        <div className="section-header">
          <h3>SEMESTER EXAMINATION RESULTS</h3>
        </div>
        
        <div className="result-table-container">
          <table className="result-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Course Code</th>
                <th>Course Name</th>
                <th>Credits</th>
                <th>Grade</th>
                <th>Grade Points</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {examResults.map((result) => (
                <tr key={result.sNo}>
                  <td>{result.sNo}</td>
                  <td>{result.courseCode}</td>
                  <td className="course-name">{result.courseName}</td>
                  <td>{result.credits}</td>
                  <td>
                    <span className={`grade-badge grade-${result.grade}`}>
                      {result.grade}
                    </span>
                  </td>
                  <td>{result.gradePoints}</td>
                  <td>
                    <span className="status-badge pass">
                      {result.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="result-summary">
          <div className="summary-card">
            <div className="summary-item">
              <span className="summary-label">Total Credits</span>
              <span className="summary-value">{getTotalCredits()}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">SGPA</span>
              <span className="summary-value">{calculateSGPA()}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Result</span>
              <span className="summary-value pass">PASS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamResult;
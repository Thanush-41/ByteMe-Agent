import React, { useState } from 'react';
import './MakeupExamRegistration.css';

const MakeupExamRegistration = () => {
  const [studentInfo] = useState({
    rollno: '22BCE7508',
    name: 'Thanush',
    semester: '3',
    regulation: 'R23',
    academicYear: '2025-26'
  });

  const [missedExams] = useState([
    {
      courseCode: 'ACSD08',
      courseName: 'Data Structures',
      examDate: '27-11-2025',
      reason: 'Medical Emergency',
      status: 'Approved for Makeup',
      makeupFee: 500
    },
    {
      courseCode: 'AECD04',
      courseName: 'Computer System Architecture',
      examDate: '02-12-2025',
      reason: 'Family Emergency',
      status: 'Pending Approval',
      makeupFee: 500
    }
  ]);

  const [selectedExams, setSelectedExams] = useState([]);
  const [registrationStatus, setRegistrationStatus] = useState('');

  const handleExamSelection = (courseCode) => {
    if (selectedExams.includes(courseCode)) {
      setSelectedExams(selectedExams.filter(code => code !== courseCode));
    } else {
      setSelectedExams([...selectedExams, courseCode]);
    }
  };

  const getTotalFee = () => {
    return selectedExams.length * 500;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedExams.length === 0) {
      setRegistrationStatus('Please select at least one exam for makeup registration.');
      return;
    }
    setRegistrationStatus('Makeup exam registration submitted successfully!');
  };

  return (
    <div className="makeup-exam-page">
      <div className="page-header">
        <h1>Makeup Exam Registration</h1>
        <div className="breadcrumb">
          <span>Home</span> / <span>Examinations</span> / <span>Makeup Exam Registration</span>
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

      <div className="makeup-registration-section">
        <div className="section-header">
          <h3>MAKEUP EXAMINATION REGISTRATION</h3>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="exams-table-container">
            <table className="exams-table">
              <thead>
                <tr>
                  <th>Select</th>
                  <th>Course Code</th>
                  <th>Course Name</th>
                  <th>Missed Exam Date</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th>Makeup Fee (₹)</th>
                </tr>
              </thead>
              <tbody>
                {missedExams.map((exam) => (
                  <tr key={exam.courseCode}>
                    <td>
                      <input
                        type="checkbox"
                        id={exam.courseCode}
                        checked={selectedExams.includes(exam.courseCode)}
                        onChange={() => handleExamSelection(exam.courseCode)}
                        disabled={exam.status !== 'Approved for Makeup'}
                        className="exam-checkbox"
                      />
                    </td>
                    <td>{exam.courseCode}</td>
                    <td className="course-name">{exam.courseName}</td>
                    <td>{exam.examDate}</td>
                    <td>{exam.reason}</td>
                    <td>
                      <span className={`status-badge ${exam.status === 'Approved for Makeup' ? 'approved' : 'pending'}`}>
                        {exam.status}
                      </span>
                    </td>
                    <td>₹{exam.makeupFee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="registration-summary">
            <div className="summary-item">
              <span className="summary-label">Selected Exams:</span>
              <span className="summary-value">{selectedExams.length}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Total Makeup Fee:</span>
              <span className="summary-value">₹{getTotalFee()}</span>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="register-btn">
              Register for Makeup Exams
            </button>
            <button type="button" className="reset-btn" onClick={() => setSelectedExams([])}>
              Reset Selection
            </button>
          </div>

          {registrationStatus && (
            <div className={`registration-status ${registrationStatus.includes('successfully') ? 'success' : 'error'}`}>
              {registrationStatus}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default MakeupExamRegistration;
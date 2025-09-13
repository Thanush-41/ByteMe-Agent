import React, { useState } from 'react';
import './AdmitCard.css';

const AdmitCard = () => {
  const [studentInfo] = useState({
    rollno: '24951A05CD',
    name: 'CHAKILAM SRINATH',
    semester: '3',
    regulation: 'R23',
    academicYear: '2025-26',
    branch: 'Computer Science and Engineering',
    photo: '/api/placeholder/150/180'
  });

  const [examInfo] = useState({
    examType: 'End Semester Examination',
    examMonth: 'November 2025',
    examCenter: 'Institute of Aeronautical Engineering',
    reportingTime: '08:30 AM',
    examDuration: '3 Hours'
  });

  const [examSchedule] = useState([
    {
      date: '25-11-2025',
      day: 'Monday',
      time: '09:30 AM - 12:30 PM',
      courseCode: 'AHSD11',
      courseName: 'Probability and Statistics',
      hallNo: 'Block-A, Hall-101'
    },
    {
      date: '27-11-2025',
      day: 'Wednesday',
      time: '09:30 AM - 12:30 PM',
      courseCode: 'ACSD08',
      courseName: 'Data Structures',
      hallNo: 'Block-A, Hall-102'
    },
    {
      date: '29-11-2025',
      day: 'Friday',
      time: '09:30 AM - 12:30 PM',
      courseCode: 'ACSD09',
      courseName: 'Operating Systems',
      hallNo: 'Block-B, Hall-201'
    },
    {
      date: '02-12-2025',
      day: 'Monday',
      time: '09:30 AM - 12:30 PM',
      courseCode: 'AECD04',
      courseName: 'Computer System Architecture',
      hallNo: 'Block-B, Hall-202'
    }
  ]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="admit-card-page">
      <div className="page-header no-print">
        <h1>Admit Card</h1>
        <div className="breadcrumb">
          <span>Home</span> / <span>Examinations</span> / <span>Admit Card</span>
        </div>
        <button className="print-btn" onClick={handlePrint}>
          🖨️ Print Admit Card
        </button>
      </div>

      <div className="admit-card">
        <div className="card-header">
          <div className="college-info">
            <h2>INSTITUTE OF AERONAUTICAL ENGINEERING</h2>
            <p>Dundigal, Hyderabad - 500043</p>
            <h3>{examInfo.examType} - {examInfo.examMonth}</h3>
          </div>
          <div className="student-photo">
            <img src={studentInfo.photo} alt="Student Photo" />
          </div>
        </div>

        <div className="card-body">
          <div className="student-details">
            <div className="detail-row">
              <span className="label">Roll Number:</span>
              <span className="value">{studentInfo.rollno}</span>
            </div>
            <div className="detail-row">
              <span className="label">Student Name:</span>
              <span className="value">{studentInfo.name}</span>
            </div>
            <div className="detail-row">
              <span className="label">Branch:</span>
              <span className="value">{studentInfo.branch}</span>
            </div>
            <div className="detail-row">
              <span className="label">Semester:</span>
              <span className="value">{studentInfo.semester}</span>
            </div>
            <div className="detail-row">
              <span className="label">Regulation:</span>
              <span className="value">{studentInfo.regulation}</span>
            </div>
            <div className="detail-row">
              <span className="label">Academic Year:</span>
              <span className="value">{studentInfo.academicYear}</span>
            </div>
          </div>

          <div className="exam-instructions">
            <h4>Examination Instructions:</h4>
            <ul>
              <li>Report to the examination center 30 minutes before the exam</li>
              <li>Bring this admit card and valid ID proof</li>
              <li>Mobile phones and electronic devices are strictly prohibited</li>
              <li>Use only blue/black ball point pen</li>
              <li>Follow COVID-19 safety protocols</li>
            </ul>
          </div>

          <div className="exam-schedule">
            <h4>Examination Schedule:</h4>
            <table className="schedule-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Day</th>
                  <th>Time</th>
                  <th>Course Code</th>
                  <th>Course Name</th>
                  <th>Hall No</th>
                </tr>
              </thead>
              <tbody>
                {examSchedule.map((exam, index) => (
                  <tr key={index}>
                    <td>{exam.date}</td>
                    <td>{exam.day}</td>
                    <td>{exam.time}</td>
                    <td>{exam.courseCode}</td>
                    <td>{exam.courseName}</td>
                    <td>{exam.hallNo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="card-footer">
            <div className="signature-section">
              <div className="signature">
                <p>Student Signature</p>
              </div>
              <div className="signature">
                <p>Controller of Examinations</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmitCard;
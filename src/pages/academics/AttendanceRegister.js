import React, { useState } from 'react';
import './AttendanceRegister.css';

const AttendanceRegister = () => {
  const [academicYear, setAcademicYear] = useState('2025-26');
  const [branch, setBranch] = useState('CSE');
  const [section, setSection] = useState('CSE-VII-SEM-D:ARE11182:AEEC30:Artificial Neural Network');

  // Sample student data based on the screenshot
  const students = [
    { sno: 1, rollNo: '20951A05D3', name: 'REVANTH RAJ PALLEBOVINA' },
    { sno: 2, rollNo: '20951A05L5', name: 'SUMANTH RAJ PALLEBOVINA' },
    { sno: 3, rollNo: '21951A0543', name: 'FAWAZ KHAN' },
    { sno: 4, rollNo: '22951A0501', name: 'KAMBOJU AAKASH' },
    { sno: 5, rollNo: '22951A0508', name: 'PADITYA' },
    { sno: 6, rollNo: '22951A0520', name: 'TEJAVATH ANIL KUMAR' },
    { sno: 7, rollNo: '22951A0552', name: 'POOLA HARTHIK REDDY' },
    { sno: 8, rollNo: '22951A0555', name: 'JAI GANESH VARMA INDUKURI' },
    { sno: 9, rollNo: '22951A0565', name: 'GORREGATU KARTHIKEYA' },
    { sno: 10, rollNo: '22951A0568', name: 'NAWAB KATHYALNI' },
    { sno: 11, rollNo: '22951A0579', name: 'DESIREDDY KIRAN KUMAR REDDY' }
  ];

  // Sample attendance data - dates and periods from screenshot
  const attendanceDates = [
    { month: '07', date: '09', period: '3' },
    { month: '07', date: '10', period: '4' },
    { month: '07', date: '10', period: '5' },
    { month: '07', date: '11', period: '2' },
    { month: '07', date: '14', period: '2' },
    { month: '07', date: '16', period: '3' },
    { month: '07', date: '17', period: '4' },
    { month: '07', date: '17', period: '5' },
    { month: '07', date: '18', period: '2' },
    { month: '07', date: '23', period: '3' },
    { month: '07', date: '24', period: '4' },
    { month: '07', date: '24', period: '5' },
    { month: '07', date: '25', period: '2' },
    { month: '07', date: '28', period: '5' },
    { month: '07', date: '30', period: '3' },
    { month: '07', date: '31', period: '4' },
    { month: '07', date: '31', period: '5' },
    { month: '08', date: '01', period: '2' },
    { month: '08', date: '04', period: '5' },
    { month: '08', date: '06', period: '3' },
    { month: '08', date: '07', period: '4' },
    { month: '08', date: '07', period: '5' },
    { month: '08', date: '08', period: '2' },
    { month: '08', date: '11', period: '5' },
    { month: '08', date: '13', period: '3' }
  ];

  // Sample attendance data for each student (matching the pattern in screenshot)
  const attendanceData = {
    1: ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', '1', '2', '3', '4', '5', '6', 'A', 'A'],
    2: ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', '1', 'A', 'A'],
    3: ['1', '2', '3', '4', '5', '6', 'A', 'A', '7', '8', '9', '10', 'A', '11', 'A', 'A', 'A', '12', '13', '14', '15', '16', '17', 'A', 'A'],
    4: ['A', 'A', 'A', 'A', '1', '2', 'A', 'A', '3', '4', '5', '6', 'A', '7', 'A', 'A', 'A', '8', 'A', '9', '10', '11', '12', 'A', 'A'],
    5: ['1', '2', '3', '4', '5', '6', '7', '8', 'A', '9', '10', '11', 'A', 'A', '12', 'A', 'A', 'A', '13', 'A', '14', '15', '16', 'A', 'A'],
    6: ['1', '2', '3', '4', '5', '6', '7', '8', 'A', '9', '10', '11', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', '12', '13', '14', 'A', 'A'],
    7: ['A', 'A', 'A', 'A', '1', '2', '3', '4', '5', 'A', '6', '7', 'A', '8', '9', 'A', 'A', 'A', '10', '11', '12', '13', '14', 'A', 'A'],
    8: ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', '10', '11', 'A', 'A', 'A', 'A', 'A', '12', 'A', 'A', '13', '14', '15', 'A', 'A'],
    9: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'A', 'A', 'A', 'A', '11', 'A', 'A', 'A', '12', 'A', '13', '14', '15', '16', 'A'],
    10: ['A', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'A', '10', 'A', '11', 'A', 'A', '12', '13', '14', '15', '16', '17', 'A', 'A'],
    11: ['A', 'A', 'A', '1', '2', '3', '4', '5', '6', '7', 'A', 'A', 'A', '8', '9', 'A', 'A', '10', '11', '12', '13', '14', '15', 'A', 'A']
  };

  return (
    <div className="attendance-register-container">
      <div className="page-header">
        <h1>Attendance Register</h1>
        <div className="breadcrumb">
          <span>Home</span> / <span>Attendance Register</span>
        </div>
      </div>

      <div className="attendance-register-content">
        <div className="filter-section">
          <div className="filter-row">
            <div className="filter-group">
              <label>Academic Year</label>
              <select 
                value={academicYear} 
                onChange={(e) => setAcademicYear(e.target.value)}
              >
                <option value="2025-26">2025-26</option>
                <option value="2024-25">2024-25</option>
                <option value="2023-24">2023-24</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Branch</label>
              <select 
                value={branch} 
                onChange={(e) => setBranch(e.target.value)}
              >
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="EEE">EEE</option>
                <option value="MECH">MECH</option>
                <option value="CIVIL">CIVIL</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Section / Subject</label>
              <select 
                value={section} 
                onChange={(e) => setSection(e.target.value)}
              >
                <option value="CSE-VII-SEM-D:ARE11182:AEEC30:Artificial Neural Network">
                  CSE-VII-SEM-D:ARE11182:AEEC30:Artificial Neural Network
                </option>
                <option value="CSE-VII-SEM-C:ARE11182:AEEC30:Machine Learning">
                  CSE-VII-SEM-C:ARE11182:AEEC30:Machine Learning
                </option>
              </select>
            </div>

            <button className="view-btn">View</button>
          </div>
        </div>

        <div className="action-buttons">
          <button className="print-btn print-front">Print Front Page</button>
          <button className="print-btn print-regular">Print</button>
          <button className="print-btn print-last">Print Last Page</button>
        </div>

        <div className="attendance-table-container">
          <div className="table-title">
            ATTENDANCE for CSE-VII-SEM-D - Artificial Neural Network
          </div>

          <div className="table-wrapper">
            <table className="attendance-table">
              <thead>
                <tr>
                  <th rowSpan="4" className="fixed-header">S.No</th>
                  <th rowSpan="4" className="fixed-header">Roll No.</th>
                  <th rowSpan="4" className="fixed-header">Name</th>
                  <th>Month</th>
                  {attendanceDates.map((date, index) => (
                    <th key={index} className="date-header">{date.month}</th>
                  ))}
                </tr>
                <tr>
                  <th>Date</th>
                  {attendanceDates.map((date, index) => (
                    <th key={index} className="date-header">{date.date}</th>
                  ))}
                </tr>
                <tr>
                  <th>Period</th>
                  {attendanceDates.map((date, index) => (
                    <th key={index} className="period-header">{date.period}</th>
                  ))}
                </tr>
                <tr>
                  <th>No. of Periods</th>
                  {attendanceDates.map((_, index) => (
                    <th key={index} className="period-number">{index + 1}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.sno}>
                    <td className="sno-cell">{student.sno}</td>
                    <td className="roll-cell">{student.rollNo}</td>
                    <td className="name-cell">{student.name}</td>
                    {attendanceData[student.sno]?.map((attendance, index) => (
                      <td key={index} className={`attendance-cell ${attendance === 'A' ? 'absent' : 'present'}`}>
                        {attendance}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceRegister;
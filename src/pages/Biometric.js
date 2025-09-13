import React from 'react';
import './Biometric.css';

const Biometric = () => {
  const biometricData = [
    {
      sNo: 1,
      rollno: '24951A05CD',
      name: 'CHAKILAM SRINATH',
      date: '13-Sep-2025',
      iareInTime: '',
      iareOutTime: '',
      iareStatus: '',
      jntuhInTime: '09:35',
      jntuhOutTime: '-',
      jntuhStatus: '',
      classAttendance: '(out of 7 periods)'
    },
    {
      sNo: 2,
      rollno: '24951A05CD',
      name: 'CHAKILAM SRINATH',
      date: '12-Sep-2025',
      iareInTime: '',
      iareOutTime: '',
      iareStatus: '',
      jntuhInTime: '09:38',
      jntuhOutTime: '14:58',
      jntuhStatus: 'Present',
      classAttendance: ''
    },
    {
      sNo: 3,
      rollno: '24951A05CD',
      name: 'CHAKILAM SRINATH',
      date: '11-Sep-2025',
      iareInTime: '',
      iareOutTime: '',
      iareStatus: '',
      jntuhInTime: '09:38',
      jntuhOutTime: '15:47',
      jntuhStatus: 'Present',
      classAttendance: ''
    },
    {
      sNo: 4,
      rollno: '24951A05CD',
      name: 'CHAKILAM SRINATH',
      date: '10-Sep-2025',
      iareInTime: '',
      iareOutTime: '',
      iareStatus: '',
      jntuhInTime: '-',
      jntuhOutTime: '-',
      jntuhStatus: 'Absent',
      classAttendance: ''
    },
    {
      sNo: 5,
      rollno: '24951A05CD',
      name: 'CHAKILAM SRINATH',
      date: '09-Sep-2025',
      iareInTime: '',
      iareOutTime: '',
      iareStatus: '',
      jntuhInTime: '09:12',
      jntuhOutTime: '15:21',
      jntuhStatus: 'Present',
      classAttendance: ''
    },
    {
      sNo: 6,
      rollno: '24951A05CD',
      name: 'CHAKILAM SRINATH',
      date: '08-Sep-2025',
      iareInTime: '',
      iareOutTime: '',
      iareStatus: '',
      jntuhInTime: '10:06',
      jntuhOutTime: '15:15',
      jntuhStatus: 'Present',
      classAttendance: ''
    },
    {
      sNo: 7,
      rollno: '24951A05CD',
      name: 'CHAKILAM SRINATH',
      date: '04-Sep-2025',
      iareInTime: '',
      iareOutTime: '',
      iareStatus: '',
      jntuhInTime: '09:56',
      jntuhOutTime: '15:13',
      jntuhStatus: 'Present',
      classAttendance: ''
    },
    {
      sNo: 8,
      rollno: '24951A05CD',
      name: 'CHAKILAM SRINATH',
      date: '03-Sep-2025',
      iareInTime: '',
      iareOutTime: '',
      iareStatus: '',
      jntuhInTime: '09:38',
      jntuhOutTime: '15:30',
      jntuhStatus: 'Present',
      classAttendance: ''
    },
    {
      sNo: 9,
      rollno: '24951A05CD',
      name: 'CHAKILAM SRINATH',
      date: '02-Sep-2025',
      iareInTime: '',
      iareOutTime: '',
      iareStatus: '',
      jntuhInTime: '09:36',
      jntuhOutTime: '15:16',
      jntuhStatus: 'Present',
      classAttendance: ''
    },
    {
      sNo: 10,
      rollno: '24951A05CD',
      name: 'CHAKILAM SRINATH',
      date: '01-Sep-2025',
      iareInTime: '',
      iareOutTime: '',
      iareStatus: '',
      jntuhInTime: '09:11',
      jntuhOutTime: '15:55',
      jntuhStatus: 'Present',
      classAttendance: ''
    },
    {
      sNo: 11,
      rollno: '',
      name: '',
      date: '13-Sep-2025',
      iareInTime: '',
      iareOutTime: '',
      iareStatus: '',
      jntuhInTime: '-',
      jntuhOutTime: '-',
      jntuhStatus: '',
      classAttendance: ''
    }
  ];

  return (
    <div className="biometric-page">
      <div className="page-header">
        <h1>Biometric</h1>
        <div className="breadcrumb">
          <span className="breadcrumb-link">Home</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Biometric</span>
        </div>
      </div>
      <div className="biometric-content">
        <div className="report-header">
          <h2>BIO METRIC REPORT</h2>
        </div>
        <div className="table-container">
          <table className="biometric-table">
            <thead>
              <tr>
                <th rowSpan="2">S.No</th>
                <th rowSpan="2">Rollno</th>
                <th rowSpan="2">Name</th>
                <th rowSpan="2">Date</th>
                <th colSpan="3">IARE - BBBAS</th>
                <th colSpan="3">JNTUH - AEBAS</th>
                <th rowSpan="2">Class Attendance<br/>(out of 7 periods)</th>
              </tr>
              <tr>
                <th>In Time</th>
                <th>Out Time</th>
                <th>Status</th>
                <th>In Time</th>
                <th>Out Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {biometricData.map((record, index) => (
                <tr key={index}>
                  <td>{record.sNo}</td>
                  <td>{record.rollno}</td>
                  <td>{record.name}</td>
                  <td>{record.date}</td>
                  <td>{record.iareInTime}</td>
                  <td>{record.iareOutTime}</td>
                  <td>{record.iareStatus}</td>
                  <td>{record.jntuhInTime}</td>
                  <td>{record.jntuhOutTime}</td>
                  <td className={`status ${record.jntuhStatus.toLowerCase()}`}>
                    {record.jntuhStatus}
                  </td>
                  <td>{record.classAttendance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="footer">
          <p>Copyright  2025 Institute of Aeronautical Engineering. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Biometric;

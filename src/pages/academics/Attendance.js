import React, { useState } from 'react';
import './Attendance.css';

const Attendance = () => {
  const [attendanceData] = useState([
    {
      id: 1,
      courseCode: 'CSE101',
      courseName: 'Data Structures',
      totalClasses: 45,
      attendedClasses: 42,
      absentClasses: 3,
      percentage: 93.33,
      records: [
        { date: '2024-01-15', status: 'Present' },
        { date: '2024-01-17', status: 'Present' },
        { date: '2024-01-19', status: 'Absent' },
        { date: '2024-01-22', status: 'Present' },
        { date: '2024-01-24', status: 'Present' }
      ]
    },
    {
      id: 2,
      courseCode: 'CSE201',
      courseName: 'Database Systems',
      totalClasses: 40,
      attendedClasses: 35,
      absentClasses: 5,
      percentage: 87.50,
      records: [
        { date: '2024-01-16', status: 'Present' },
        { date: '2024-01-18', status: 'Absent' },
        { date: '2024-01-20', status: 'Present' },
        { date: '2024-01-23', status: 'Present' },
        { date: '2024-01-25', status: 'Absent' }
      ]
    },
    {
      id: 3,
      courseCode: 'CSE301',
      courseName: 'Software Engineering',
      totalClasses: 38,
      attendedClasses: 36,
      absentClasses: 2,
      percentage: 94.74,
      records: [
        { date: '2024-01-14', status: 'Present' },
        { date: '2024-01-16', status: 'Present' },
        { date: '2024-01-18', status: 'Present' },
        { date: '2024-01-21', status: 'Absent' },
        { date: '2024-01-23', status: 'Present' }
      ]
    }
  ]);

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');

  const getAttendanceColor = (percentage) => {
    if (percentage >= 90) return 'excellent';
    if (percentage >= 80) return 'good';
    if (percentage >= 75) return 'warning';
    return 'danger';
  };

  const getOverallAttendance = () => {
    const totalClasses = attendanceData.reduce((sum, course) => sum + course.totalClasses, 0);
    const totalAttended = attendanceData.reduce((sum, course) => sum + course.attendedClasses, 0);
    return ((totalAttended / totalClasses) * 100).toFixed(2);
  };

  const filteredRecords = selectedCourse?.records.filter(record => 
    filterStatus === 'All' || record.status === filterStatus
  ) || [];

  return (
    <div className="attendance">
      <div className="page-header">
        <h1>📊 Attendance Tracker</h1>
        <p>Track your class attendance and maintain academic requirements</p>
      </div>

      <div className="attendance-summary">
        <div className="summary-card overall">
          <h3>Overall Attendance</h3>
          <div className="percentage-circle">
            <span className="percentage">{getOverallAttendance()}%</span>
          </div>
          <p>Keep maintaining good attendance!</p>
        </div>

        <div className="summary-stats">
          <div className="stat-card">
            <span className="stat-number">{attendanceData.length}</span>
            <span className="stat-label">Total Courses</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">
              {attendanceData.reduce((sum, course) => sum + course.totalClasses, 0)}
            </span>
            <span className="stat-label">Total Classes</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">
              {attendanceData.reduce((sum, course) => sum + course.attendedClasses, 0)}
            </span>
            <span className="stat-label">Classes Attended</span>
          </div>
        </div>
      </div>

      <div className="courses-attendance">
        <h2>Course-wise Attendance</h2>
        <div className="attendance-grid">
          {attendanceData.map(course => (
            <div key={course.id} className="attendance-card">
              <div className="card-header">
                <h3>{course.courseCode}</h3>
                <h4>{course.courseName}</h4>
              </div>
              
              <div className="attendance-stats">
                <div className={`percentage-badge ${getAttendanceColor(course.percentage)}`}>
                  {course.percentage.toFixed(1)}%
                </div>
                
                <div className="class-stats">
                  <div className="stat">
                    <span className="label">Total Classes:</span>
                    <span className="value">{course.totalClasses}</span>
                  </div>
                  <div className="stat">
                    <span className="label">Attended:</span>
                    <span className="value present">{course.attendedClasses}</span>
                  </div>
                  <div className="stat">
                    <span className="label">Absent:</span>
                    <span className="value absent">{course.absentClasses}</span>
                  </div>
                </div>
              </div>

              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${course.percentage}%` }}
                ></div>
              </div>

              <button 
                className="view-details-btn"
                onClick={() => setSelectedCourse(course)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>

      {selectedCourse && (
        <div className="attendance-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{selectedCourse.courseCode} - Attendance Details</h2>
              <button 
                className="close-btn"
                onClick={() => setSelectedCourse(null)}
              >
                ✕
              </button>
            </div>

            <div className="modal-filters">
              <label>Filter by Status:</label>
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
              </select>
            </div>

            <div className="attendance-records">
              <div className="records-header">
                <span>Date</span>
                <span>Status</span>
              </div>
              {filteredRecords.map((record, index) => (
                <div key={index} className="record-item">
                  <span className="record-date">{record.date}</span>
                  <span className={`record-status ${record.status.toLowerCase()}`}>
                    {record.status === 'Present' ? '✅' : '❌'} {record.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance;
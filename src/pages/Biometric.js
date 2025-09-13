import React, { useState } from 'react';
import './Biometric.css';

const Biometric = () => {
  const [biometricData, setBiometricData] = useState({
    studentId: '20A91A0518',
    name: 'K. REVANTH',
    branch: 'Computer Science and Engineering',
    year: '4th Year',
    section: 'A',
    lastUpdated: '15/12/2024',
    status: 'Active'
  });

  const [registrationStatus, setRegistrationStatus] = useState({
    fingerprint: 'Registered',
    faceRecognition: 'Registered',
    iris: 'Not Registered',
    voice: 'Not Registered'
  });

  const [attendanceHistory, setAttendanceHistory] = useState([
    { date: '20/12/2024', time: '09:15 AM', location: 'Main Gate', status: 'Entry' },
    { date: '20/12/2024', time: '05:30 PM', location: 'Main Gate', status: 'Exit' },
    { date: '19/12/2024', time: '08:45 AM', location: 'Library', status: 'Entry' },
    { date: '19/12/2024', time: '04:15 PM', location: 'Library', status: 'Exit' },
    { date: '18/12/2024', time: '09:00 AM', location: 'Lab Block', status: 'Entry' }
  ]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'registered':
      case 'active':
        return '#28a745';
      case 'not registered':
      case 'inactive':
        return '#dc3545';
      case 'pending':
        return '#ffc107';
      default:
        return '#6c757d';
    }
  };

  const handleRegisterBiometric = (type) => {
    alert(`Initiating ${type} registration. Please follow the instructions on the biometric device.`);
  };

  return (
    <div className="biometric-container">
      <div className="page-header">
        <h2>Biometric Management System</h2>
        <div className="header-actions">
          <button className="btn btn-primary">
            <i className="fas fa-sync-alt"></i> Refresh Data
          </button>
          <button className="btn btn-success">
            <i className="fas fa-fingerprint"></i> Register New
          </button>
        </div>
      </div>

      <div className="content-grid">
        <div className="student-info-card">
          <div className="card-header">
            <h3><i className="fas fa-user"></i> Student Information</h3>
          </div>
          <div className="info-content">
            <div className="student-avatar">
              <img src="/api/placeholder/120/120" alt="Student" />
              <div className="status-indicator" style={{backgroundColor: getStatusColor(biometricData.status)}}></div>
            </div>
            <div className="student-details">
              <div className="detail-item">
                <label>Student ID:</label>
                <span>{biometricData.studentId}</span>
              </div>
              <div className="detail-item">
                <label>Name:</label>
                <span>{biometricData.name}</span>
              </div>
              <div className="detail-item">
                <label>Branch:</label>
                <span>{biometricData.branch}</span>
              </div>
              <div className="detail-item">
                <label>Year/Section:</label>
                <span>{biometricData.year} - {biometricData.section}</span>
              </div>
              <div className="detail-item">
                <label>Status:</label>
                <span className="status-badge" style={{backgroundColor: getStatusColor(biometricData.status)}}>
                  {biometricData.status}
                </span>
              </div>
              <div className="detail-item">
                <label>Last Updated:</label>
                <span>{biometricData.lastUpdated}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="biometric-status-card">
          <div className="card-header">
            <h3><i className="fas fa-fingerprint"></i> Biometric Registration Status</h3>
          </div>
          <div className="biometric-items">
            <div className="biometric-item">
              <div className="biometric-icon">
                <i className="fas fa-fingerprint"></i>
              </div>
              <div className="biometric-info">
                <h4>Fingerprint</h4>
                <span className="status-badge" style={{backgroundColor: getStatusColor(registrationStatus.fingerprint)}}>
                  {registrationStatus.fingerprint}
                </span>
              </div>
              <div className="biometric-actions">
                {registrationStatus.fingerprint === 'Registered' ? (
                  <button className="btn btn-secondary btn-sm">
                    <i className="fas fa-edit"></i> Update
                  </button>
                ) : (
                  <button className="btn btn-primary btn-sm" onClick={() => handleRegisterBiometric('Fingerprint')}>
                    <i className="fas fa-plus"></i> Register
                  </button>
                )}
              </div>
            </div>

            <div className="biometric-item">
              <div className="biometric-icon">
                <i className="fas fa-eye"></i>
              </div>
              <div className="biometric-info">
                <h4>Face Recognition</h4>
                <span className="status-badge" style={{backgroundColor: getStatusColor(registrationStatus.faceRecognition)}}>
                  {registrationStatus.faceRecognition}
                </span>
              </div>
              <div className="biometric-actions">
                {registrationStatus.faceRecognition === 'Registered' ? (
                  <button className="btn btn-secondary btn-sm">
                    <i className="fas fa-edit"></i> Update
                  </button>
                ) : (
                  <button className="btn btn-primary btn-sm" onClick={() => handleRegisterBiometric('Face Recognition')}>
                    <i className="fas fa-plus"></i> Register
                  </button>
                )}
              </div>
            </div>

            <div className="biometric-item">
              <div className="biometric-icon">
                <i className="fas fa-eye-slash"></i>
              </div>
              <div className="biometric-info">
                <h4>Iris Scan</h4>
                <span className="status-badge" style={{backgroundColor: getStatusColor(registrationStatus.iris)}}>
                  {registrationStatus.iris}
                </span>
              </div>
              <div className="biometric-actions">
                <button className="btn btn-primary btn-sm" onClick={() => handleRegisterBiometric('Iris Scan')}>
                  <i className="fas fa-plus"></i> Register
                </button>
              </div>
            </div>

            <div className="biometric-item">
              <div className="biometric-icon">
                <i className="fas fa-microphone"></i>
              </div>
              <div className="biometric-info">
                <h4>Voice Recognition</h4>
                <span className="status-badge" style={{backgroundColor: getStatusColor(registrationStatus.voice)}}>
                  {registrationStatus.voice}
                </span>
              </div>
              <div className="biometric-actions">
                <button className="btn btn-primary btn-sm" onClick={() => handleRegisterBiometric('Voice Recognition')}>
                  <i className="fas fa-plus"></i> Register
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="attendance-history-card">
          <div className="card-header">
            <h3><i className="fas fa-history"></i> Recent Access History</h3>
            <button className="btn btn-outline btn-sm">
              <i className="fas fa-download"></i> Export
            </button>
          </div>
          <div className="attendance-table">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Method</th>
                </tr>
              </thead>
              <tbody>
                {attendanceHistory.map((record, index) => (
                  <tr key={index}>
                    <td>{record.date}</td>
                    <td>{record.time}</td>
                    <td>{record.location}</td>
                    <td>
                      <span className={`status-indicator ${record.status.toLowerCase()}`}>
                        <i className={`fas ${record.status === 'Entry' ? 'fa-sign-in-alt' : 'fa-sign-out-alt'}`}></i>
                        {record.status}
                      </span>
                    </td>
                    <td>
                      <i className="fas fa-fingerprint" title="Fingerprint"></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="access-controls-card">
          <div className="card-header">
            <h3><i className="fas fa-shield-alt"></i> Access Controls</h3>
          </div>
          <div className="access-content">
            <div className="access-section">
              <h4>Campus Access</h4>
              <div className="access-item">
                <div className="access-info">
                  <span>Main Gate</span>
                  <small>24/7 Access</small>
                </div>
                <div className="access-status">
                  <span className="status-badge" style={{backgroundColor: '#28a745'}}>Enabled</span>
                </div>
              </div>
              <div className="access-item">
                <div className="access-info">
                  <span>Library</span>
                  <small>8:00 AM - 8:00 PM</small>
                </div>
                <div className="access-status">
                  <span className="status-badge" style={{backgroundColor: '#28a745'}}>Enabled</span>
                </div>
              </div>
              <div className="access-item">
                <div className="access-info">
                  <span>Lab Blocks</span>
                  <small>9:00 AM - 5:00 PM</small>
                </div>
                <div className="access-status">
                  <span className="status-badge" style={{backgroundColor: '#28a745'}}>Enabled</span>
                </div>
              </div>
            </div>

            <div className="access-section">
              <h4>System Access</h4>
              <div className="access-item">
                <div className="access-info">
                  <span>Attendance System</span>
                  <small>Biometric Login</small>
                </div>
                <div className="access-status">
                  <span className="status-badge" style={{backgroundColor: '#28a745'}}>Active</span>
                </div>
              </div>
              <div className="access-item">
                <div className="access-info">
                  <span>Exam Portal</span>
                  <small>Face Recognition</small>
                </div>
                <div className="access-status">
                  <span className="status-badge" style={{backgroundColor: '#ffc107', color: '#333'}}>Pending</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="biometric-settings-card">
          <div className="card-header">
            <h3><i className="fas fa-cog"></i> Biometric Settings</h3>
          </div>
          <div className="settings-content">
            <div className="setting-item">
              <div className="setting-info">
                <h4>Auto-sync with Attendance</h4>
                <p>Automatically mark attendance when biometric is detected</p>
              </div>
              <div className="setting-control">
                <label className="switch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider"></span>
                </label>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h4>Multi-factor Authentication</h4>
                <p>Require multiple biometric verifications for sensitive areas</p>
              </div>
              <div className="setting-control">
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider"></span>
                </label>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h4>Privacy Mode</h4>
                <p>Limit biometric data access to authorized personnel only</p>
              </div>
              <div className="setting-control">
                <label className="switch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider"></span>
                </label>
              </div>
            </div>

            <div className="action-buttons">
              <button className="btn btn-danger">
                <i className="fas fa-trash"></i> Delete All Data
              </button>
              <button className="btn btn-warning">
                <i className="fas fa-lock"></i> Temporarily Disable
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Biometric;
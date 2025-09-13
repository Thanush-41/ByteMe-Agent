import React, { useState, useRef } from 'react';
import './NoDues.css';

const NoDues = () => {
  const [studentData, setStudentData] = useState({
    rollNumber: '20A91A0518',
    name: 'K. REVANTH',
    branch: 'Computer Science and Engineering',
    year: '4th Year',
    section: 'A',
    semester: '8th Semester',
    requestDate: new Date().toLocaleDateString('en-IN'),
    purpose: 'Final Semester Clearance'
  });

  const [clearanceStatus, setClearanceStatus] = useState({
    library: 'Pending',
    hostel: 'Cleared',
    transport: 'Cleared',
    laboratory: 'Pending',
    fees: 'Cleared',
    placement: 'Cleared',
    academics: 'Pending',
    sports: 'Cleared'
  });

  const printRef = useRef();

  const handlePrint = () => {
    window.print();
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'cleared':
        return 'status-cleared';
      case 'pending':
        return 'status-pending';
      case 'rejected':
        return 'status-rejected';
      default:
        return '';
    }
  };

  const allCleared = Object.values(clearanceStatus).every(status => status === 'Cleared');

  return (
    <div className="no-dues-container">
      <div className="page-header">
        <h2>No Dues Certificate</h2>
        <button className="print-btn" onClick={handlePrint}>
          <i className="fas fa-print"></i> Print Certificate
        </button>
      </div>

      <div className="certificate-content" ref={printRef}>
        <div className="certificate-header">
          <div className="institute-logo">
            <img src="/api/placeholder/80/80" alt="IARE Logo" />
          </div>
          <div className="institute-details">
            <h3>INSTITUTE OF AERONAUTICAL ENGINEERING</h3>
            <p>(Autonomous)</p>
            <p>Dundigal, Hyderabad - 500043</p>
            <p>Telangana, India</p>
          </div>
        </div>

        <div className="certificate-title">
          <h2>NO DUES CERTIFICATE</h2>
          <p>Certificate No: NOD/{new Date().getFullYear()}/{Math.floor(Math.random() * 10000)}</p>
        </div>

        <div className="student-info-section">
          <div className="info-grid">
            <div className="info-item">
              <label>Roll Number:</label>
              <span>{studentData.rollNumber}</span>
            </div>
            <div className="info-item">
              <label>Student Name:</label>
              <span>{studentData.name}</span>
            </div>
            <div className="info-item">
              <label>Branch:</label>
              <span>{studentData.branch}</span>
            </div>
            <div className="info-item">
              <label>Year/Section:</label>
              <span>{studentData.year} - {studentData.section}</span>
            </div>
            <div className="info-item">
              <label>Semester:</label>
              <span>{studentData.semester}</span>
            </div>
            <div className="info-item">
              <label>Request Date:</label>
              <span>{studentData.requestDate}</span>
            </div>
          </div>
        </div>

        <div className="clearance-section">
          <h3>Department/Section Clearance Status</h3>
          <table className="clearance-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Department/Section</th>
                <th>Status</th>
                <th>Cleared By</th>
                <th>Date</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Library</td>
                <td><span className={`status-badge ${getStatusClass(clearanceStatus.library)}`}>{clearanceStatus.library}</span></td>
                <td>{clearanceStatus.library === 'Cleared' ? 'Librarian' : '-'}</td>
                <td>{clearanceStatus.library === 'Cleared' ? '15/12/2024' : '-'}</td>
                <td>{clearanceStatus.library === 'Pending' ? 'Return pending books' : 'All books returned'}</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Hostel</td>
                <td><span className={`status-badge ${getStatusClass(clearanceStatus.hostel)}`}>{clearanceStatus.hostel}</span></td>
                <td>Hostel Warden</td>
                <td>10/12/2024</td>
                <td>Room vacated, no damages</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Transport</td>
                <td><span className={`status-badge ${getStatusClass(clearanceStatus.transport)}`}>{clearanceStatus.transport}</span></td>
                <td>Transport In-charge</td>
                <td>12/12/2024</td>
                <td>Bus pass returned</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Laboratory</td>
                <td><span className={`status-badge ${getStatusClass(clearanceStatus.laboratory)}`}>{clearanceStatus.laboratory}</span></td>
                <td>{clearanceStatus.laboratory === 'Cleared' ? 'Lab In-charge' : '-'}</td>
                <td>{clearanceStatus.laboratory === 'Cleared' ? '14/12/2024' : '-'}</td>
                <td>{clearanceStatus.laboratory === 'Pending' ? 'Submit pending lab records' : 'All equipments returned'}</td>
              </tr>
              <tr>
                <td>5</td>
                <td>Fee Section</td>
                <td><span className={`status-badge ${getStatusClass(clearanceStatus.fees)}`}>{clearanceStatus.fees}</span></td>
                <td>Accounts Officer</td>
                <td>08/12/2024</td>
                <td>All fees paid</td>
              </tr>
              <tr>
                <td>6</td>
                <td>Placement Cell</td>
                <td><span className={`status-badge ${getStatusClass(clearanceStatus.placement)}`}>{clearanceStatus.placement}</span></td>
                <td>Placement Officer</td>
                <td>11/12/2024</td>
                <td>Documents submitted</td>
              </tr>
              <tr>
                <td>7</td>
                <td>Academics</td>
                <td><span className={`status-badge ${getStatusClass(clearanceStatus.academics)}`}>{clearanceStatus.academics}</span></td>
                <td>{clearanceStatus.academics === 'Cleared' ? 'HOD' : '-'}</td>
                <td>{clearanceStatus.academics === 'Cleared' ? '16/12/2024' : '-'}</td>
                <td>{clearanceStatus.academics === 'Pending' ? 'Pending final semester results' : 'Academic requirements completed'}</td>
              </tr>
              <tr>
                <td>8</td>
                <td>Sports & Cultural</td>
                <td><span className={`status-badge ${getStatusClass(clearanceStatus.sports)}`}>{clearanceStatus.sports}</span></td>
                <td>Sports Coordinator</td>
                <td>09/12/2024</td>
                <td>Sports equipment returned</td>
              </tr>
            </tbody>
          </table>
        </div>

        {allCleared && (
          <div className="final-clearance">
            <div className="clearance-statement">
              <p>This is to certify that <strong>{studentData.name}</strong> (Roll No: <strong>{studentData.rollNumber}</strong>) 
              has cleared all dues from the respective departments/sections of the Institute and is eligible for the 
              issue of degree certificate/transcript.</p>
            </div>
            
            <div className="signatures">
              <div className="signature-block">
                <div className="signature-line"></div>
                <p>Registrar</p>
                <p>IARE</p>
              </div>
              <div className="signature-block">
                <div className="signature-line"></div>
                <p>Principal</p>
                <p>IARE</p>
              </div>
            </div>
          </div>
        )}

        {!allCleared && (
          <div className="pending-notice">
            <div className="notice-box">
              <h4>Certificate Cannot Be Issued</h4>
              <p>The student has pending clearances from the following departments:</p>
              <ul>
                {Object.entries(clearanceStatus)
                  .filter(([dept, status]) => status !== 'Cleared')
                  .map(([dept, status]) => (
                    <li key={dept}>{dept.charAt(0).toUpperCase() + dept.slice(1)} - {status}</li>
                  ))}
              </ul>
              <p>Please clear all pending dues before requesting the No Dues Certificate.</p>
            </div>
          </div>
        )}

        <div className="certificate-footer">
          <p>Generated on: {new Date().toLocaleString('en-IN')}</p>
          <p>This is a computer-generated document and does not require a signature if all clearances are obtained.</p>
        </div>
      </div>

      <div className="actions-section">
        <div className="status-summary">
          <h3>Clearance Summary</h3>
          <div className="summary-stats">
            <div className="stat-item">
              <span className="stat-number">{Object.values(clearanceStatus).filter(s => s === 'Cleared').length}</span>
              <span className="stat-label">Cleared</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{Object.values(clearanceStatus).filter(s => s === 'Pending').length}</span>
              <span className="stat-label">Pending</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{Object.values(clearanceStatus).filter(s => s === 'Rejected').length}</span>
              <span className="stat-label">Rejected</span>
            </div>
          </div>
        </div>

        <div className="action-buttons">
          <button className="btn btn-secondary">
            <i className="fas fa-download"></i> Download PDF
          </button>
          <button className="btn btn-primary">
            <i className="fas fa-envelope"></i> Email Certificate
          </button>
          <button className="btn btn-success" disabled={!allCleared}>
            <i className="fas fa-check"></i> Submit for Final Approval
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoDues;
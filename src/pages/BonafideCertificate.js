import React, { useState, useRef } from 'react';
import './BonafideCertificate.css';

const BonafideCertificate = () => {
  const [applicationData, setApplicationData] = useState({
    rollNumber: '20A91A0518',
    name: 'K. REVANTH',
    fatherName: 'K. SURESH KUMAR',
    branch: 'Computer Science and Engineering',
    year: '4th Year',
    section: 'A',
    semester: '8th Semester',
    academicYear: '2024-25',
    admissionDate: '15/11/2020',
    purpose: 'Bank Loan',
    applicationDate: new Date().toLocaleDateString('en-IN'),
    phoneNumber: '+91 9876543210',
    email: 'revanth.k@students.iare.ac.in',
    address: 'H.No: 12-34, Street No: 5, Hyderabad, Telangana - 500001'
  });

  const [applications, setApplications] = useState([
    {
      id: 'BON2024001',
      purpose: 'Bank Loan',
      appliedDate: '15/12/2024',
      status: 'Approved',
      issuedDate: '18/12/2024',
      validTill: '18/06/2025'
    },
    {
      id: 'BON2024002',
      purpose: 'Passport Application',
      appliedDate: '10/12/2024',
      status: 'In Process',
      issuedDate: null,
      validTill: null
    },
    {
      id: 'BON2023015',
      purpose: 'Scholarship',
      appliedDate: '05/11/2023',
      status: 'Issued',
      issuedDate: '08/11/2023',
      validTill: '08/05/2024'
    }
  ]);

  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const printRef = useRef();

  const handleInputChange = (field, value) => {
    setApplicationData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmitApplication = () => {
    const newApplication = {
      id: `BON2024${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      purpose: applicationData.purpose,
      appliedDate: new Date().toLocaleDateString('en-IN'),
      status: 'Submitted',
      issuedDate: null,
      validTill: null
    };
    
    setApplications(prev => [newApplication, ...prev]);
    setShowApplicationForm(false);
    alert('Bonafide Certificate application submitted successfully!');
  };

  const handlePrint = () => {
    window.print();
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
      case 'issued':
        return '#28a745';
      case 'in process':
      case 'submitted':
        return '#ffc107';
      case 'rejected':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
      case 'issued':
        return 'fa-check-circle';
      case 'in process':
      case 'submitted':
        return 'fa-clock';
      case 'rejected':
        return 'fa-times-circle';
      default:
        return 'fa-question-circle';
    }
  };

  return (
    <div className="bonafide-container">
      <div className="page-header">
        <h2>Bonafide Certificate</h2>
        <div className="header-actions">
          <button 
            className="btn btn-primary"
            onClick={() => setShowApplicationForm(true)}
          >
            <i className="fas fa-plus"></i> New Application
          </button>
          <button className="btn btn-secondary">
            <i className="fas fa-history"></i> View History
          </button>
        </div>
      </div>

      {showApplicationForm && (
        <div className="modal-overlay">
          <div className="application-form">
            <div className="form-header">
              <h3>Apply for Bonafide Certificate</h3>
              <button 
                className="close-btn"
                onClick={() => setShowApplicationForm(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="form-content">
              <div className="form-grid">
                <div className="form-group">
                  <label>Roll Number</label>
                  <input 
                    type="text" 
                    value={applicationData.rollNumber}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label>Student Name</label>
                  <input 
                    type="text" 
                    value={applicationData.name}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label>Father's Name</label>
                  <input 
                    type="text" 
                    value={applicationData.fatherName}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label>Branch</label>
                  <input 
                    type="text" 
                    value={applicationData.branch}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label>Year/Section</label>
                  <input 
                    type="text" 
                    value={`${applicationData.year} - ${applicationData.section}`}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input 
                    type="tel" 
                    value={applicationData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group full-width">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    value={applicationData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group full-width">
                  <label>Address</label>
                  <textarea 
                    value={applicationData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    rows="3"
                    required
                  />
                </div>
                <div className="form-group full-width">
                  <label>Purpose of Certificate</label>
                  <select 
                    value={applicationData.purpose}
                    onChange={(e) => handleInputChange('purpose', e.target.value)}
                    required
                  >
                    <option value="">Select Purpose</option>
                    <option value="Bank Loan">Bank Loan</option>
                    <option value="Passport Application">Passport Application</option>
                    <option value="Scholarship">Scholarship</option>
                    <option value="Visa Application">Visa Application</option>
                    <option value="Higher Studies">Higher Studies</option>
                    <option value="Employment">Employment</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="form-actions">
                <button 
                  className="btn btn-secondary"
                  onClick={() => setShowApplicationForm(false)}
                >
                  Cancel
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={handleSubmitApplication}
                >
                  <i className="fas fa-paper-plane"></i> Submit Application
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="content-grid">
        <div className="student-info-section">
          <div className="section-header">
            <h3><i className="fas fa-user"></i> Student Information</h3>
          </div>
          <div className="info-grid">
            <div className="info-item">
              <label>Roll Number:</label>
              <span>{applicationData.rollNumber}</span>
            </div>
            <div className="info-item">
              <label>Student Name:</label>
              <span>{applicationData.name}</span>
            </div>
            <div className="info-item">
              <label>Father's Name:</label>
              <span>{applicationData.fatherName}</span>
            </div>
            <div className="info-item">
              <label>Branch:</label>
              <span>{applicationData.branch}</span>
            </div>
            <div className="info-item">
              <label>Year/Section:</label>
              <span>{applicationData.year} - {applicationData.section}</span>
            </div>
            <div className="info-item">
              <label>Academic Year:</label>
              <span>{applicationData.academicYear}</span>
            </div>
          </div>
        </div>

        <div className="applications-section">
          <div className="section-header">
            <h3><i className="fas fa-list"></i> Application History</h3>
          </div>
          <div className="applications-table">
            <table>
              <thead>
                <tr>
                  <th>Application ID</th>
                  <th>Purpose</th>
                  <th>Applied Date</th>
                  <th>Status</th>
                  <th>Issued Date</th>
                  <th>Valid Till</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app, index) => (
                  <tr key={index}>
                    <td>
                      <span className="app-id">{app.id}</span>
                    </td>
                    <td>{app.purpose}</td>
                    <td>{app.appliedDate}</td>
                    <td>
                      <span 
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(app.status) }}
                      >
                        <i className={`fas ${getStatusIcon(app.status)}`}></i>
                        {app.status}
                      </span>
                    </td>
                    <td>{app.issuedDate || '-'}</td>
                    <td>{app.validTill || '-'}</td>
                    <td>
                      <div className="action-buttons">
                        {app.status === 'Approved' || app.status === 'Issued' ? (
                          <>
                            <button className="btn btn-sm btn-primary" onClick={handlePrint}>
                              <i className="fas fa-download"></i>
                            </button>
                            <button className="btn btn-sm btn-secondary">
                              <i className="fas fa-eye"></i>
                            </button>
                          </>
                        ) : (
                          <button className="btn btn-sm btn-outline">
                            <i className="fas fa-clock"></i>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="certificate-preview" ref={printRef}>
          <div className="certificate-content">
            <div className="certificate-header">
              <div className="institute-logo">
                <img src="/api/placeholder/100/100" alt="IARE Logo" />
              </div>
              <div className="institute-details">
                <h3>INSTITUTE OF AERONAUTICAL ENGINEERING</h3>
                <p>(Autonomous)</p>
                <p>Dundigal, Hyderabad - 500043</p>
                <p>Telangana, India</p>
              </div>
            </div>

            <div className="certificate-title">
              <h2>BONAFIDE CERTIFICATE</h2>
              <p>Certificate No: BON/2024/{Math.floor(Math.random() * 10000)}</p>
              <p>Date: {new Date().toLocaleDateString('en-IN')}</p>
            </div>

            <div className="certificate-body">
              <p className="salutation">To Whom It May Concern,</p>
              
              <p className="certificate-text">
                This is to certify that <strong>{applicationData.name}</strong> 
                bearing Roll Number <strong>{applicationData.rollNumber}</strong> 
                is a bonafide student of this institute pursuing 
                <strong> {applicationData.branch}</strong> course.
              </p>

              <p className="certificate-text">
                He/She is currently studying in <strong>{applicationData.year}</strong>, 
                Section <strong>{applicationData.section}</strong> for the academic year 
                <strong> {applicationData.academicYear}</strong>.
              </p>

              <p className="certificate-text">
                He/She was admitted to this institute on <strong>{applicationData.admissionDate}</strong> 
                and is a regular student with good academic record and conduct.
              </p>

              <p className="purpose-text">
                This certificate is issued for the purpose of <strong>{applicationData.purpose}</strong> 
                as requested by the student.
              </p>
            </div>

            <div className="certificate-footer">
              <div className="date-section">
                <p>Date: {new Date().toLocaleDateString('en-IN')}</p>
                <p>Place: Hyderabad</p>
              </div>
              
              <div className="signature-section">
                <div className="signature">
                  <div className="signature-line"></div>
                  <p>Principal</p>
                  <p>Institute of Aeronautical Engineering</p>
                </div>
              </div>
            </div>

            <div className="seal-section">
              <div className="official-seal">
                <p>OFFICIAL SEAL</p>
              </div>
            </div>
          </div>
        </div>

        <div className="instructions-section">
          <div className="section-header">
            <h3><i className="fas fa-info-circle"></i> Instructions</h3>
          </div>
          <div className="instructions-content">
            <ul>
              <li>Bonafide certificate requests will be processed within 3-5 working days.</li>
              <li>Ensure all personal information is correct before submitting the application.</li>
              <li>Certificate is valid for 6 months from the date of issue.</li>
              <li>Contact the registrar office for any queries regarding your application.</li>
              <li>Fee payment is required before certificate issuance (₹50 per certificate).</li>
              <li>Original certificate can be collected from the registrar office during working hours.</li>
            </ul>
            
            <div className="contact-info">
              <h4>Contact Information</h4>
              <p><strong>Registrar Office:</strong> registrar@iare.ac.in</p>
              <p><strong>Phone:</strong> +91 40 2847 1118</p>
              <p><strong>Office Hours:</strong> 9:00 AM - 5:00 PM (Mon-Fri)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BonafideCertificate;
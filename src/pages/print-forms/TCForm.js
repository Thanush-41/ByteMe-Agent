import React, { useState, useRef } from 'react';
import './TCForm.css';

const TCForm = () => {
  const [formData, setFormData] = useState({
    rollNumber: '20A91A0518',
    name: 'K. REVANTH',
    fatherName: 'K. SURESH KUMAR',
    motherName: 'K. LAKSHMI',
    dateOfBirth: '15/03/2002',
    placeOfBirth: 'Hyderabad',
    nationality: 'Indian',
    religion: 'Hindu',
    caste: 'OBC',
    admissionDate: '15/11/2020',
    branch: 'Computer Science and Engineering',
    lastClassAttended: '4th Year B.Tech',
    lastExamPassed: '7th Semester',
    dateOfLeaving: '20/12/2024',
    reasonForLeaving: 'Completion of Course',
    conduct: 'Good',
    characterCertificate: 'Issued',
    feesStatus: 'All Dues Cleared',
    scholarships: 'Merit Scholarship',
    totalWorkingDays: '180',
    daysPresent: '162',
    attendancePercentage: '90%'
  });

  const [isEditing, setIsEditing] = useState(false);
  const printRef = useRef();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="tc-form-container">
      <div className="page-header">
        <h2>Transfer Certificate (TC) Form</h2>
        <div className="header-actions">
          <button className="edit-btn" onClick={handleEdit}>
            <i className={`fas ${isEditing ? 'fa-save' : 'fa-edit'}`}></i>
            {isEditing ? 'Save' : 'Edit'}
          </button>
          <button className="print-btn" onClick={handlePrint}>
            <i className="fas fa-print"></i> Print TC
          </button>
        </div>
      </div>

      <div className="tc-certificate" ref={printRef}>
        <div className="certificate-header">
          <div className="institute-logo">
            <img src="/api/placeholder/100/100" alt="IARE Logo" />
          </div>
          <div className="institute-details">
            <h3>INSTITUTE OF AERONAUTICAL ENGINEERING</h3>
            <p>(Autonomous)</p>
            <p>Dundigal, Hyderabad - 500043, Telangana State, India</p>
            <p>Affiliated to JNTUH | Approved by AICTE | Accredited by NAAC with 'A' Grade</p>
          </div>
        </div>

        <div className="certificate-title">
          <h2>TRANSFER CERTIFICATE</h2>
          <div className="tc-number">
            <p>TC No: IARE/TC/{new Date().getFullYear()}/{Math.floor(Math.random() * 10000)}</p>
            <p>Date: {new Date().toLocaleDateString('en-IN')}</p>
          </div>
        </div>

        <div className="tc-content">
          <table className="tc-table">
            <tbody>
              <tr>
                <td className="field-label">1. Roll Number</td>
                <td className="field-value">
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={formData.rollNumber}
                      onChange={(e) => handleInputChange('rollNumber', e.target.value)}
                    />
                  ) : (
                    formData.rollNumber
                  )}
                </td>
              </tr>
              <tr>
                <td className="field-label">2. Name of the Student</td>
                <td className="field-value">
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                  ) : (
                    formData.name
                  )}
                </td>
              </tr>
              <tr>
                <td className="field-label">3. Father's Name</td>
                <td className="field-value">
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={formData.fatherName}
                      onChange={(e) => handleInputChange('fatherName', e.target.value)}
                    />
                  ) : (
                    formData.fatherName
                  )}
                </td>
              </tr>
              <tr>
                <td className="field-label">4. Mother's Name</td>
                <td className="field-value">
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={formData.motherName}
                      onChange={(e) => handleInputChange('motherName', e.target.value)}
                    />
                  ) : (
                    formData.motherName
                  )}
                </td>
              </tr>
              <tr>
                <td className="field-label">5. Date of Birth</td>
                <td className="field-value">
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    />
                  ) : (
                    formData.dateOfBirth
                  )}
                </td>
              </tr>
              <tr>
                <td className="field-label">6. Place of Birth</td>
                <td className="field-value">
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={formData.placeOfBirth}
                      onChange={(e) => handleInputChange('placeOfBirth', e.target.value)}
                    />
                  ) : (
                    formData.placeOfBirth
                  )}
                </td>
              </tr>
              <tr>
                <td className="field-label">7. Nationality</td>
                <td className="field-value">
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={formData.nationality}
                      onChange={(e) => handleInputChange('nationality', e.target.value)}
                    />
                  ) : (
                    formData.nationality
                  )}
                </td>
              </tr>
              <tr>
                <td className="field-label">8. Religion</td>
                <td className="field-value">
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={formData.religion}
                      onChange={(e) => handleInputChange('religion', e.target.value)}
                    />
                  ) : (
                    formData.religion
                  )}
                </td>
              </tr>
              <tr>
                <td className="field-label">9. Caste</td>
                <td className="field-value">
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={formData.caste}
                      onChange={(e) => handleInputChange('caste', e.target.value)}
                    />
                  ) : (
                    formData.caste
                  )}
                </td>
              </tr>
              <tr>
                <td className="field-label">10. Date of Admission to the Institute</td>
                <td className="field-value">
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={formData.admissionDate}
                      onChange={(e) => handleInputChange('admissionDate', e.target.value)}
                    />
                  ) : (
                    formData.admissionDate
                  )}
                </td>
              </tr>
              <tr>
                <td className="field-label">11. Branch/Course</td>
                <td className="field-value">
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={formData.branch}
                      onChange={(e) => handleInputChange('branch', e.target.value)}
                    />
                  ) : (
                    formData.branch
                  )}
                </td>
              </tr>
              <tr>
                <td className="field-label">12. Last Class in which the student studied</td>
                <td className="field-value">
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={formData.lastClassAttended}
                      onChange={(e) => handleInputChange('lastClassAttended', e.target.value)}
                    />
                  ) : (
                    formData.lastClassAttended
                  )}
                </td>
              </tr>
              <tr>
                <td className="field-label">13. Last Examination passed</td>
                <td className="field-value">
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={formData.lastExamPassed}
                      onChange={(e) => handleInputChange('lastExamPassed', e.target.value)}
                    />
                  ) : (
                    formData.lastExamPassed
                  )}
                </td>
              </tr>
              <tr>
                <td className="field-label">14. Date of leaving the Institution</td>
                <td className="field-value">
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={formData.dateOfLeaving}
                      onChange={(e) => handleInputChange('dateOfLeaving', e.target.value)}
                    />
                  ) : (
                    formData.dateOfLeaving
                  )}
                </td>
              </tr>
              <tr>
                <td className="field-label">15. Reason for leaving</td>
                <td className="field-value">
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={formData.reasonForLeaving}
                      onChange={(e) => handleInputChange('reasonForLeaving', e.target.value)}
                    />
                  ) : (
                    formData.reasonForLeaving
                  )}
                </td>
              </tr>
              <tr>
                <td className="field-label">16. Conduct of the student</td>
                <td className="field-value">
                  {isEditing ? (
                    <select 
                      value={formData.conduct}
                      onChange={(e) => handleInputChange('conduct', e.target.value)}
                    >
                      <option value="Excellent">Excellent</option>
                      <option value="Good">Good</option>
                      <option value="Satisfactory">Satisfactory</option>
                    </select>
                  ) : (
                    formData.conduct
                  )}
                </td>
              </tr>
              <tr>
                <td className="field-label">17. Character Certificate</td>
                <td className="field-value">
                  {isEditing ? (
                    <select 
                      value={formData.characterCertificate}
                      onChange={(e) => handleInputChange('characterCertificate', e.target.value)}
                    >
                      <option value="Issued">Issued</option>
                      <option value="Pending">Pending</option>
                    </select>
                  ) : (
                    formData.characterCertificate
                  )}
                </td>
              </tr>
              <tr>
                <td className="field-label">18. Fee Status</td>
                <td className="field-value">
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={formData.feesStatus}
                      onChange={(e) => handleInputChange('feesStatus', e.target.value)}
                    />
                  ) : (
                    formData.feesStatus
                  )}
                </td>
              </tr>
              <tr>
                <td className="field-label">19. Scholarships received (if any)</td>
                <td className="field-value">
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={formData.scholarships}
                      onChange={(e) => handleInputChange('scholarships', e.target.value)}
                    />
                  ) : (
                    formData.scholarships
                  )}
                </td>
              </tr>
              <tr>
                <td className="field-label">20. Total Working Days</td>
                <td className="field-value">
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={formData.totalWorkingDays}
                      onChange={(e) => handleInputChange('totalWorkingDays', e.target.value)}
                    />
                  ) : (
                    formData.totalWorkingDays
                  )}
                </td>
              </tr>
              <tr>
                <td className="field-label">21. Days Present</td>
                <td className="field-value">
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={formData.daysPresent}
                      onChange={(e) => handleInputChange('daysPresent', e.target.value)}
                    />
                  ) : (
                    formData.daysPresent
                  )}
                </td>
              </tr>
              <tr>
                <td className="field-label">22. Attendance Percentage</td>
                <td className="field-value">
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={formData.attendancePercentage}
                      onChange={(e) => handleInputChange('attendancePercentage', e.target.value)}
                    />
                  ) : (
                    formData.attendancePercentage
                  )}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="certification-text">
            <p>This is to certify that the above particulars are correct to the best of my knowledge and belief.</p>
          </div>

          <div className="signatures-section">
            <div className="left-signature">
              <div className="signature-line"></div>
              <p>Date: {new Date().toLocaleDateString('en-IN')}</p>
              <p>Principal/Registrar</p>
            </div>
            <div className="right-signature">
              <div className="signature-line"></div>
              <p>Official Seal</p>
            </div>
          </div>

          <div className="office-use">
            <h4>FOR OFFICE USE ONLY</h4>
            <div className="office-fields">
              <div className="office-field">
                <label>Verified by:</label>
                <div className="underline"></div>
              </div>
              <div className="office-field">
                <label>Date:</label>
                <div className="underline"></div>
              </div>
              <div className="office-field">
                <label>Signature:</label>
                <div className="underline"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="actions-section">
        <div className="action-buttons">
          <button className="btn btn-primary">
            <i className="fas fa-download"></i> Download PDF
          </button>
          <button className="btn btn-secondary">
            <i className="fas fa-envelope"></i> Email TC
          </button>
          <button className="btn btn-success">
            <i className="fas fa-stamp"></i> Request Official Seal
          </button>
          <button className="btn btn-warning">
            <i className="fas fa-history"></i> View History
          </button>
        </div>
      </div>
    </div>
  );
};

export default TCForm;
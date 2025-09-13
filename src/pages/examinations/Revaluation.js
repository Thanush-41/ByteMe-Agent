import React, { useState } from 'react';
import './Revaluation.css';

const Revaluation = () => {
  const [studentInfo] = useState({
    rollno: '24951A05CD',
    name: 'CHAKILAM SRINATH',
    semester: '3',
    regulation: 'R23',
    academicYear: '2025-26'
  });

  const [eligibleSubjects] = useState([
    {
      courseCode: 'ACSD08',
      courseName: 'Data Structures',
      examDate: '27-11-2025',
      obtainedGrade: 'B',
      obtainedMarks: 65,
      maxMarks: 100,
      revaluationFee: 1000,
      lastRevaluation: null,
      eligible: true
    },
    {
      courseCode: 'AECD04',
      courseName: 'Computer System Architecture',
      examDate: '02-12-2025',
      obtainedGrade: 'C',
      obtainedMarks: 58,
      maxMarks: 100,
      revaluationFee: 1000,
      lastRevaluation: null,
      eligible: true
    },
    {
      courseCode: 'AHSD11',
      courseName: 'Probability and Statistics',
      examDate: '05-12-2025',
      obtainedGrade: 'B+',
      obtainedMarks: 72,
      maxMarks: 100,
      revaluationFee: 1000,
      lastRevaluation: null,
      eligible: true
    }
  ]);

  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [applicationData, setApplicationData] = useState({
    reason: '',
    phoneNumber: '',
    email: '',
    parentConsent: false
  });

  const [revaluationHistory] = useState([
    {
      id: 'REV001',
      semester: '2nd Semester',
      subject: 'Programming in C',
      appliedDate: '2025-05-15',
      status: 'Completed',
      originalMarks: 62,
      revisedMarks: 68,
      gradeChange: 'B to B+',
      feesPaid: 1000
    }
  ]);

  const handleSubjectSelection = (courseCode) => {
    if (selectedSubjects.includes(courseCode)) {
      setSelectedSubjects(selectedSubjects.filter(code => code !== courseCode));
    } else {
      setSelectedSubjects([...selectedSubjects, courseCode]);
    }
  };

  const handleInputChange = (field, value) => {
    setApplicationData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getTotalFee = () => {
    return selectedSubjects.length * 1000;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedSubjects.length === 0) {
      alert('Please select at least one subject for revaluation.');
      return;
    }
    if (!applicationData.parentConsent) {
      alert('Parent consent is required for revaluation application.');
      return;
    }
    console.log('Revaluation application submitted:', {
      subjects: selectedSubjects,
      applicationData,
      totalFee: getTotalFee()
    });
    alert('Revaluation application submitted successfully!');
  };

  return (
    <div className="revaluation-page">
      <div className="page-header">
        <h1>Examination Revaluation</h1>
        <div className="breadcrumb">
          <span className="breadcrumb-link">Home</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-link">Examinations</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Revaluation</span>
        </div>
      </div>

      <div className="revaluation-content">
        {/* Student Info Section */}
        <div className="student-info-section">
          <h2>Student Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <strong>Roll Number:</strong> {studentInfo.rollno}
            </div>
            <div className="info-item">
              <strong>Name:</strong> {studentInfo.name}
            </div>
            <div className="info-item">
              <strong>Semester:</strong> {studentInfo.semester}
            </div>
            <div className="info-item">
              <strong>Regulation:</strong> {studentInfo.regulation}
            </div>
            <div className="info-item">
              <strong>Academic Year:</strong> {studentInfo.academicYear}
            </div>
          </div>
        </div>

        {/* Important Guidelines */}
        <div className="guidelines-section">
          <h2>Revaluation Guidelines</h2>
          <div className="guidelines-grid">
            <div className="guideline-card">
              <h3>Eligibility</h3>
              <ul>
                <li>Students who have appeared for End Semester examinations</li>
                <li>Results must be declared within the last 30 days</li>
                <li>Maximum one revaluation per subject per semester</li>
              </ul>
            </div>
            <div className="guideline-card">
              <h3>Process</h3>
              <ul>
                <li>Apply within 7 days of result declaration</li>
                <li>Pay revaluation fee for each subject</li>
                <li>Results will be available within 15 working days</li>
              </ul>
            </div>
            <div className="guideline-card">
              <h3>Fee Structure</h3>
              <ul>
                <li>₹1000 per subject for revaluation</li>
                <li>Fee is non-refundable</li>
                <li>Payment through online portal only</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Eligible Subjects Section */}
        <div className="subjects-section">
          <h2>Eligible Subjects for Revaluation</h2>
          <div className="subjects-table">
            <table>
              <thead>
                <tr>
                  <th>Select</th>
                  <th>Course Code</th>
                  <th>Course Name</th>
                  <th>Exam Date</th>
                  <th>Grade</th>
                  <th>Marks</th>
                  <th>Fee (₹)</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {eligibleSubjects.map(subject => (
                  <tr key={subject.courseCode}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedSubjects.includes(subject.courseCode)}
                        onChange={() => handleSubjectSelection(subject.courseCode)}
                        disabled={!subject.eligible}
                      />
                    </td>
                    <td>{subject.courseCode}</td>
                    <td>{subject.courseName}</td>
                    <td>{subject.examDate}</td>
                    <td>
                      <span className={`grade grade-${subject.obtainedGrade.toLowerCase().replace('+', 'plus')}`}>
                        {subject.obtainedGrade}
                      </span>
                    </td>
                    <td>{subject.obtainedMarks}/{subject.maxMarks}</td>
                    <td>{subject.revaluationFee}</td>
                    <td>
                      <span className={`status ${subject.eligible ? 'eligible' : 'not-eligible'}`}>
                        {subject.eligible ? 'Eligible' : 'Not Eligible'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Application Form */}
        <div className="application-section">
          <h2>Revaluation Application</h2>
          <form onSubmit={handleSubmit} className="revaluation-form">
            <div className="form-row">
              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  value={applicationData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  value={applicationData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter your email address"
                  required
                />
              </div>
            </div>

            <div className="form-group full-width">
              <label>Reason for Revaluation *</label>
              <textarea
                value={applicationData.reason}
                onChange={(e) => handleInputChange('reason', e.target.value)}
                placeholder="Please provide a valid reason for requesting revaluation..."
                required
              />
            </div>

            <div className="consent-section">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={applicationData.parentConsent}
                  onChange={(e) => handleInputChange('parentConsent', e.target.checked)}
                  required
                />
                I confirm that I have informed my parents/guardians about this revaluation application and have their consent.
              </label>
            </div>

            {selectedSubjects.length > 0 && (
              <div className="fee-summary">
                <h3>Fee Summary</h3>
                <p>Selected Subjects: {selectedSubjects.length}</p>
                <p>Total Fee: ₹{getTotalFee()}</p>
                <small>Note: Revaluation fee is non-refundable</small>
              </div>
            )}

            <div className="form-actions">
              <button type="button" className="btn-secondary">Cancel</button>
              <button type="submit" className="btn-primary">Submit Application</button>
            </div>
          </form>
        </div>

        {/* Revaluation History */}
        <div className="history-section">
          <h2>Previous Revaluation History</h2>
          {revaluationHistory.length > 0 ? (
            <div className="history-table">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Semester</th>
                    <th>Subject</th>
                    <th>Applied Date</th>
                    <th>Status</th>
                    <th>Original Marks</th>
                    <th>Revised Marks</th>
                    <th>Grade Change</th>
                  </tr>
                </thead>
                <tbody>
                  {revaluationHistory.map(record => (
                    <tr key={record.id}>
                      <td>{record.id}</td>
                      <td>{record.semester}</td>
                      <td>{record.subject}</td>
                      <td>{record.appliedDate}</td>
                      <td>
                        <span className={`status status-${record.status.toLowerCase()}`}>
                          {record.status}
                        </span>
                      </td>
                      <td>{record.originalMarks}</td>
                      <td>{record.revisedMarks}</td>
                      <td>{record.gradeChange}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="no-history">
              <p>No previous revaluation records found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Revaluation;
import React, { useState } from 'react';
import './RemedialExamRegistration.css';

const RemedialExamRegistration = () => {
  const [studentInfo] = useState({
    rollno: '22BCE7508',
    name: 'Thanush',
    semester: '5',
    regulation: 'R23',
    academicYear: '2025-26',
    cgpa: '6.8'
  });

  const [eligibleSubjects] = useState([
    {
      courseCode: 'ACSD08',
      courseName: 'Data Structures',
      semester: '3',
      credits: 4,
      previousGrade: 'F',
      examFee: 750,
      lastAttempt: '2024-12-15',
      attemptsLeft: 2
    },
    {
      courseCode: 'AECD04',
      courseName: 'Computer System Architecture',
      semester: '4',
      credits: 3,
      previousGrade: 'F',
      examFee: 750,
      lastAttempt: '2025-05-20',
      attemptsLeft: 1
    },
    {
      courseCode: 'AHSD11',
      courseName: 'Probability and Statistics',
      semester: '3',
      credits: 3,
      previousGrade: 'F',
      examFee: 750,
      lastAttempt: '2024-12-18',
      attemptsLeft: 3
    }
  ]);

  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [formData, setFormData] = useState({
    phoneNumber: '',
    email: '',
    reason: '',
    parentConsent: false
  });

  const [examSchedule] = useState({
    registrationDeadline: '2025-10-30',
    examDates: 'November 15-25, 2025',
    resultDate: '2025-12-10',
    hallTicketDate: '2025-11-05'
  });

  const handleSubjectSelection = (courseCode) => {
    setSelectedSubjects(prev => {
      if (prev.includes(courseCode)) {
        return prev.filter(code => code !== courseCode);
      } else {
        return [...prev, courseCode];
      }
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const calculateTotalFee = () => {
    return selectedSubjects.reduce((total, courseCode) => {
      const subject = eligibleSubjects.find(s => s.courseCode === courseCode);
      return total + (subject ? subject.examFee : 0);
    }, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedSubjects.length === 0) {
      alert('Please select at least one subject for remedial exam.');
      return;
    }
    alert(`Remedial exam registration submitted for ${selectedSubjects.length} subject(s). Total fee: ₹${calculateTotalFee()}`);
  };

  return (
    <div className="remedial-page">
      <div className="page-header">
        <h1>Remedial Exam Registration</h1>
        <div className="breadcrumb">
          <span className="breadcrumb-link">Home</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-link">Examinations</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Remedial Exam</span>
        </div>
      </div>

      <div className="remedial-content">
        {/* Student Information */}
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
            <div className="info-item">
              <strong>Current CGPA:</strong> {studentInfo.cgpa}
            </div>
          </div>
        </div>

        {/* Exam Schedule */}
        <div className="schedule-section">
          <h2>Important Dates</h2>
          <div className="schedule-grid">
            <div className="schedule-item">
              <strong>Registration Deadline:</strong> {examSchedule.registrationDeadline}
            </div>
            <div className="schedule-item">
              <strong>Exam Dates:</strong> {examSchedule.examDates}
            </div>
            <div className="schedule-item">
              <strong>Hall Ticket Release:</strong> {examSchedule.hallTicketDate}
            </div>
            <div className="schedule-item">
              <strong>Result Declaration:</strong> {examSchedule.resultDate}
            </div>
          </div>
        </div>

        {/* Eligible Subjects */}
        <div className="subjects-section">
          <h2>Eligible Subjects for Remedial Exam</h2>
          <div className="subjects-table">
            <table>
              <thead>
                <tr>
                  <th>Select</th>
                  <th>Course Code</th>
                  <th>Course Name</th>
                  <th>Semester</th>
                  <th>Credits</th>
                  <th>Previous Grade</th>
                  <th>Last Attempt</th>
                  <th>Attempts Left</th>
                  <th>Exam Fee</th>
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
                      />
                    </td>
                    <td>{subject.courseCode}</td>
                    <td>{subject.courseName}</td>
                    <td>{subject.semester}</td>
                    <td>{subject.credits}</td>
                    <td className="grade-fail">{subject.previousGrade}</td>
                    <td>{subject.lastAttempt}</td>
                    <td className={subject.attemptsLeft <= 1 ? 'attempts-low' : ''}>
                      {subject.attemptsLeft}
                    </td>
                    <td>₹{subject.examFee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Registration Form */}
        <div className="registration-section">
          <h2>Registration Details</h2>
          <form onSubmit={handleSubmit} className="remedial-form">
            <div className="form-row">
              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-group full-width">
              <label>Reason for Previous Failure *</label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
                rows="4"
                placeholder="Please explain the circumstances that led to the previous failure..."
                required
              ></textarea>
            </div>

            <div className="consent-section">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="parentConsent"
                  checked={formData.parentConsent}
                  onChange={handleInputChange}
                  required
                />
                <span>I confirm that my parent/guardian is aware of this remedial exam registration</span>
              </label>
            </div>

            {/* Fee Summary */}
            {selectedSubjects.length > 0 && (
              <div className="fee-summary">
                <h3>Fee Summary</h3>
                <div className="fee-details">
                  <p>Selected Subjects: {selectedSubjects.length}</p>
                  <p>Total Exam Fee: ₹{calculateTotalFee()}</p>
                  <small>Payment can be made online after registration approval</small>
                </div>
              </div>
            )}

            <div className="form-actions">
              <button type="button" className="btn-secondary">Save Draft</button>
              <button type="submit" className="btn-primary">Submit Registration</button>
            </div>
          </form>
        </div>

        {/* Guidelines */}
        <div className="guidelines-section">
          <h2>Important Guidelines</h2>
          <ul className="guidelines-list">
            <li>Students can register for remedial exams only for failed subjects (Grade F)</li>
            <li>Maximum 3 attempts are allowed per subject</li>
            <li>Registration fee is non-refundable</li>
            <li>Hall ticket will be available 10 days before the exam</li>
            <li>Students must carry valid ID proof during the examination</li>
            <li>Remedial exam results will be declared within 15 days of completion</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RemedialExamRegistration;
import React, { useState } from 'react';
import './SEELabMarks.css';

const SEELabMarks = () => {
  const [examination, setExamination] = useState('');
  const [subject, setSubject] = useState('');
  const [labKey, setLabKey] = useState('');
  const [showEntries, setShowEntries] = useState('100');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data for dropdowns
  const examinations = [
    'Semester End Examination - July 2025',
    'Semester End Examination - December 2024',
    'Semester End Examination - May 2024'
  ];

  const subjects = [
    'Computer Networks Lab',
    'Database Management Lab',
    'Software Engineering Lab',
    'Operating Systems Lab',
    'Data Structures Lab'
  ];

  // Sample lab marks data (empty for initial state)
  const [labMarksData, setLabMarksData] = useState([]);

  const handleOK = () => {
    if (examination && subject && labKey) {
      // Simulate loading data - in real implementation, this would fetch from API
      alert('Lab marks data loaded successfully!');
    } else {
      alert('Please fill all required fields');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleAssignMarks = () => {
    alert('Assign Marks functionality would open here');
  };

  return (
    <div className="see-lab-marks-container">
      <div className="page-header">
        <h1>SEE Lab Marks</h1>
        <div className="breadcrumb">
          <span>Home</span> / <span>SEE Lab Marks</span>
        </div>
      </div>

      <div className="see-lab-marks-content">
        {/* Semester End Examination LAB Marks Section */}
        <div className="exam-marks-section">
          <h2>Semester End Examination LAB Marks</h2>
          
          <div className="form-section">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="examination">
                  Examination <span className="required">*</span>
                </label>
                <select
                  id="examination"
                  value={examination}
                  onChange={(e) => setExamination(e.target.value)}
                  className="form-select"
                >
                  <option value="">Select Examination</option>
                  {examinations.map((exam, index) => (
                    <option key={index} value={exam}>{exam}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="subject">
                  Subject <span className="required">*</span>
                </label>
                <select
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="form-select"
                >
                  <option value="">Select Subject</option>
                  {subjects.map((subj, index) => (
                    <option key={index} value={subj}>{subj}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="labKey">
                  Lab Key <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="labKey"
                  value={labKey}
                  onChange={(e) => setLabKey(e.target.value)}
                  className="form-input"
                  placeholder="Enter Lab Key"
                />
              </div>
            </div>

            <div className="form-actions">
              <button onClick={handleOK} className="ok-btn">OK</button>
              <button onClick={handlePrint} className="print-btn">Print</button>
            </div>
          </div>
        </div>

        {/* SEE LAB MARKS Table Section */}
        <div className="lab-marks-table-section">
          <h3>SEE LAB MARKS for</h3>
          
          <div className="table-controls">
            <div className="show-entries">
              <label>Show </label>
              <select 
                value={showEntries} 
                onChange={(e) => setShowEntries(e.target.value)}
                className="entries-select"
              >
                <option value="100">100</option>
                <option value="50">50</option>
                <option value="25">25</option>
                <option value="10">10</option>
              </select>
              <label> entries</label>
            </div>

            <div className="search-box">
              <label>Search: </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
                placeholder="Search..."
              />
            </div>
          </div>

          <div className="table-wrapper">
            <table className="lab-marks-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Rollno</th>
                  <th>Name</th>
                  <th>Criteria 1</th>
                  <th>Criteria 2</th>
                  <th>Criteria 3</th>
                  <th>Criteria 4</th>
                  <th>Criteria 5</th>
                  <th>Criteria 6</th>
                  <th>Total</th>
                  <th>Status (P/A/MP)</th>
                  <th>Assign SetNo</th>
                  <th>Marks</th>
                </tr>
              </thead>
              <tbody>
                {labMarksData.length === 0 ? (
                  <tr>
                    <td colSpan="13" className="no-data">
                      No data available in table
                    </td>
                  </tr>
                ) : (
                  labMarksData.map((student, index) => (
                    <tr key={index}>
                      <td>{student.sno}</td>
                      <td>{student.rollno}</td>
                      <td>{student.name}</td>
                      <td>{student.criteria1}</td>
                      <td>{student.criteria2}</td>
                      <td>{student.criteria3}</td>
                      <td>{student.criteria4}</td>
                      <td>{student.criteria5}</td>
                      <td>{student.criteria6}</td>
                      <td>{student.total}</td>
                      <td>{student.status}</td>
                      <td>
                        <button 
                          onClick={handleAssignMarks}
                          className="assign-btn"
                        >
                          Assign
                        </button>
                      </td>
                      <td>{student.marks}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="table-footer">
            <div className="table-info">
              Showing 0 to 0 of 0 entries
            </div>
            <div className="pagination">
              <button className="page-btn" disabled>Previous</button>
              <button className="page-btn" disabled>Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="page-footer">
        <p>Copyright © 2025 Institute of Aeronautical Engineering. All rights reserved.</p>
      </div>
    </div>
  );
};

export default SEELabMarks;
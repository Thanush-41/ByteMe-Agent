import React, { useState } from 'react';
import './LabRecord.css';

const LabRecord = () => {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [submittedRecords, setSubmittedRecords] = useState([]);
  const [formData, setFormData] = useState({
    academicYear: '2025-26',
    rollNo: '24PS1A05CD',
    semester: '3',
    labName: '',
    labBatchRoll: '1',
    weekNo: 'Week-1',
    experimentTitle: '',
    programDocument: null
  });

  const subjects = [
    'Data Structures Lab',
    'Database Management Systems Lab',
    'Web Programming Lab',
    'Computer Networks Lab',
    'Operating Systems Lab',
    'Software Engineering Lab',
    'Machine Learning Lab',
    'Cybersecurity Lab'
  ];

  const labNames = [
    'Data Structures Lab',
    'DBMS Lab',
    'Web Programming Lab',
    'Networks Lab',
    'OS Lab',
    'SE Lab',
    'ML Lab',
    'Security Lab'
  ];

  const weekOptions = [
    'Week-1', 'Week-2', 'Week-3', 'Week-4', 'Week-5', 
    'Week-6', 'Week-7', 'Week-8', 'Week-9', 'Week-10'
  ];

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  const handleShowSubmittedLab = () => {
    // This would normally fetch data from server
    // For demo, showing empty table
    console.log('Showing submitted labs for:', selectedSubject);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      programDocument: file
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.labName || !formData.experimentTitle || !formData.programDocument) {
      alert('Please fill all required fields and upload the document');
      return;
    }

    // Add to submitted records (in real app, this would submit to server)
    const newRecord = {
      id: Date.now(),
      ...formData,
      submissionDate: new Date().toLocaleDateString()
    };
    
    setSubmittedRecords([...submittedRecords, newRecord]);
    alert('Lab record submitted successfully!');
    
    // Reset form
    setFormData({
      academicYear: '2025-26',
      rollNo: '24PS1A05CD',
      semester: '3',
      labName: '',
      labBatchRoll: '1',
      weekNo: 'Week-1',
      experimentTitle: '',
      programDocument: null
    });
    
    // Reset file input
    const fileInput = document.getElementById('programDocument');
    if (fileInput) fileInput.value = '';
  };

  return (
    <div className="lab-record-page">
      <div className="page-header">
        <h1>Lab Record</h1>
        <div className="breadcrumb">
          <span>Home</span> / <span>Lab Record</span>
        </div>
      </div>

      {/* Get Lab Record Submitted Section */}
      <div className="lab-record-section">
        <h2>Get Lab Record Submitted</h2>
        
        <div className="subject-selection">
          <div className="form-group">
            <label>Subject</label>
            <select 
              value={selectedSubject} 
              onChange={handleSubjectChange}
              className="subject-dropdown"
            >
              <option value="">Select Lab</option>
              {subjects.map((subject, index) => (
                <option key={index} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
          
          <button 
            className="show-submitted-btn"
            onClick={handleShowSubmittedLab}
            disabled={!selectedSubject}
          >
            Show Submitted Lab
          </button>
        </div>

        <div className="experiment-details">
          <h3>Experiment Details</h3>
        </div>
      </div>

      {/* Submitted Lab Record List Section */}
      <div className="submitted-lab-section">
        <div className="section-header">
          <h3>Submitted Lab Record List</h3>
        </div>
        
        <div className="table-controls">
          <div className="show-entries">
            Show <select><option>5</option></select> entries
          </div>
          <div className="search-box">
            Search: <input type="text" />
          </div>
        </div>

        <div className="lab-table-container">
          <table className="lab-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>AY</th>
                <th>Subject Code</th>
                <th>Exp Title</th>
                <th>Week No</th>
                <th>Marks</th>
                <th>Remarks</th>
                <th>View / Update</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="8" className="no-data">No data available in table</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="table-footer">
          <div className="showing-entries">Showing 0 to 0 of 0 entries</div>
          <div className="pagination">
            <button disabled>Previous</button>
            <button disabled>Next</button>
          </div>
        </div>
      </div>

      {/* Upload Lab Record Section */}
      <div className="upload-lab-section">
        <h3>Upload Lab Record</h3>
        
        <form onSubmit={handleSubmit} className="upload-form">
          <div className="form-row">
            <div className="form-group">
              <label>Academic Year</label>
              <input 
                type="text" 
                name="academicYear"
                value={formData.academicYear}
                onChange={handleInputChange}
                readOnly
              />
            </div>
            
            <div className="form-group">
              <label>Rollno</label>
              <input 
                type="text" 
                name="rollNo"
                value={formData.rollNo}
                onChange={handleInputChange}
                readOnly
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Sem</label>
              <input 
                type="text" 
                name="semester"
                value={formData.semester}
                onChange={handleInputChange}
                readOnly
              />
            </div>
            
            <div className="form-group">
              <label>Select Lab Name</label>
              <select 
                name="labName"
                value={formData.labName}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Lab</option>
                {labNames.map((lab, index) => (
                  <option key={index} value={lab}>{lab}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Lab Batch Roll</label>
              <input 
                type="text" 
                name="labBatchRoll"
                value={formData.labBatchRoll}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
              <label>Week No</label>
              <select 
                name="weekNo"
                value={formData.weekNo}
                onChange={handleInputChange}
                required
              >
                {weekOptions.map((week, index) => (
                  <option key={index} value={week}>{week}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group full-width">
            <label>Title of Experiment</label>
            <textarea 
              name="experimentTitle"
              value={formData.experimentTitle}
              onChange={handleInputChange}
              placeholder="Enter experiment title..."
              rows="3"
              required
            />
          </div>

          <div className="form-group full-width">
            <label>
              Program Document <span className="required">*</span>
              <span className="file-info">(Upload in PDF Format)</span>
            </label>
            <div className="file-upload-container">
              <input 
                type="file" 
                id="programDocument"
                name="programDocument"
                onChange={handleFileChange}
                accept=".pdf"
                required
              />
              <label htmlFor="programDocument" className="file-upload-label">
                Choose file (PDF Format)
              </label>
              <button 
                type="button" 
                className="browse-btn"
                onClick={() => document.getElementById('programDocument').click()}
              >
                Browse
              </button>
            </div>
            {formData.programDocument && (
              <div className="selected-file">
                Selected: {formData.programDocument.name}
              </div>
            )}
          </div>

          <div className="form-group submit-container">
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LabRecord;
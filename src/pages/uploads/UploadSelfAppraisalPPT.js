import React, { useState } from 'react';
import './UploadSelfAppraisalPPT.css';

const UploadSelfAppraisalPPT = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');

  // Static staff information (would come from authentication in real app)
  const staffInfo = {
    staffIdNo: 'IARE11182',
    name: 'Ms. GANGARANI'
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type (PDF only)
      if (file.type !== 'application/pdf') {
        alert('Please select a PDF file only.');
        return;
      }
      
      // Validate file name should be PPT related
      if (!file.name.toLowerCase().includes('ppt') && !file.name.toLowerCase().includes('presentation')) {
        const confirmUpload = window.confirm('The selected file does not appear to be a PPT file. Do you want to continue?');
        if (!confirmUpload) {
          return;
        }
      }

      setSelectedFile(file);
      setFileName(file.name);
    }
  };

  const handleBrowse = () => {
    document.getElementById('fileInput').click();
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert('Please select a file first.');
      return;
    }

    // Simulate upload process
    const uploadData = {
      staffId: staffInfo.staffIdNo,
      staffName: staffInfo.name,
      fileName: selectedFile.name,
      fileSize: selectedFile.size,
      uploadDate: new Date().toISOString()
    };

    console.log('Uploading file:', uploadData);
    
    // Simulate upload delay
    setTimeout(() => {
      alert('Self Appraisal PPT uploaded successfully!');
      // Reset form
      setSelectedFile(null);
      setFileName('');
      document.getElementById('fileInput').value = '';
    }, 1000);
  };

  return (
    <div className="upload-appraisal-container">
      <div className="page-header">
        <h1>Upload Self Appraisal PPT</h1>
        <div className="breadcrumb">
          <span>Home</span> / <span>Upload Self Appraisal PPT</span>
        </div>
      </div>

      <div className="upload-appraisal-content">
        <div className="upload-section">
          <div className="upload-header">
            <h2>UPLOAD SELF APPRAISAL PPT IN PDF FORMAT</h2>
          </div>

          <div className="upload-form">
            <div className="form-row">
              <div className="form-group">
                <label className="field-label">STAFF IDNO</label>
                <div className="field-value">{staffInfo.staffIdNo}</div>
              </div>
              <div className="form-group">
                <label className="field-label">Name</label>
                <div className="field-value">{staffInfo.name}</div>
              </div>
            </div>

            <div className="file-upload-section">
              <div className="form-group file-group">
                <label className="field-label">PDF for 15 to 20 Slides of PPT</label>
                <div className="file-input-container">
                  <input
                    type="file"
                    id="fileInput"
                    accept=".pdf"
                    onChange={handleFileSelect}
                    style={{ display: 'none' }}
                  />
                  <div className="file-input-display">
                    <input
                      type="text"
                      value={fileName}
                      placeholder="Choose file"
                      readOnly
                      className="file-name-input"
                    />
                    <button 
                      type="button" 
                      onClick={handleBrowse}
                      className="browse-btn"
                    >
                      Browse
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="upload-actions">
              <button 
                onClick={handleUpload}
                className="upload-btn"
                disabled={!selectedFile}
              >
                Upload
              </button>
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

export default UploadSelfAppraisalPPT;
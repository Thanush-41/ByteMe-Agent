import React, { useState } from 'react';
import './TranscriptDuplicate.css';

const TranscriptDuplicate = () => {
  const [formData, setFormData] = useState({
    requestType: '',
    transcriptType: '',
    semester: '',
    nameChangeDetails: '',
    deliveryMethod: 'self-pickup',
    urgentRequest: false,
    reason: ''
  });

  const [requests, setRequests] = useState([
    {
      id: 'TD001',
      type: 'Official Transcript',
      semester: 'All Semesters',
      status: 'Processing',
      requestDate: '2025-09-08',
      completionDate: '',
      fee: 500
    },
    {
      id: 'TD002',
      type: 'Duplicate Degree',
      semester: 'Final',
      status: 'Completed',
      requestDate: '2025-08-20',
      completionDate: '2025-09-01',
      fee: 2000
    }
  ]);

  const requestTypes = [
    'Official Transcript',
    'Unofficial Transcript', 
    'Duplicate Degree Certificate',
    'Duplicate Marksheet',
    'Name Change Certificate',
    'Consolidated Marksheet'
  ];

  const semesterOptions = [
    'Semester 1', 'Semester 2', 'Semester 3', 'Semester 4',
    'Semester 5', 'Semester 6', 'Semester 7', 'Semester 8',
    'All Semesters', 'Final Semester Only'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fees = {
      'Official Transcript': 500,
      'Unofficial Transcript': 200,
      'Duplicate Degree Certificate': 2000,
      'Duplicate Marksheet': 300,
      'Name Change Certificate': 1000,
      'Consolidated Marksheet': 400
    };
    
    const newRequest = {
      id: `TD${String(requests.length + 1).padStart(3, '0')}`,
      type: formData.requestType,
      semester: formData.semester,
      status: 'Pending',
      requestDate: new Date().toISOString().split('T')[0],
      completionDate: '',
      fee: fees[formData.requestType] || 0
    };
    
    setRequests([newRequest, ...requests]);
    setFormData({
      requestType: '',
      transcriptType: '',
      semester: '',
      nameChangeDetails: '',
      deliveryMethod: 'self-pickup',
      urgentRequest: false,
      reason: ''
    });
    alert('Request submitted successfully!');
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return '#28a745';
      case 'Rejected': return '#dc3545';
      case 'Processing': return '#007bff';
      case 'Pending': return '#ffc107';
      default: return '#6c757d';
    }
  };

  return (
    <div className="transcript-duplicate-page">
      <div className="page-header">
        <h1>Transcript / Duplicate / Name Change</h1>
        <div className="breadcrumb">
          <span>Home</span> / <span>Requisitions</span> / <span>Transcript / Duplicate</span>
        </div>
      </div>

      <div className="content-container">
        <div className="request-form-section">
          <h2>New Request</h2>
          <form onSubmit={handleSubmit} className="transcript-form">
            <div className="form-group">
              <label htmlFor="requestType">Request Type *</label>
              <select
                id="requestType"
                name="requestType"
                value={formData.requestType}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Request Type</option>
                {requestTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="semester">Semester *</label>
                <select
                  id="semester"
                  name="semester"
                  value={formData.semester}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Semester</option>
                  {semesterOptions.map(sem => (
                    <option key={sem} value={sem}>{sem}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="deliveryMethod">Delivery Method *</label>
                <select
                  id="deliveryMethod"
                  name="deliveryMethod"
                  value={formData.deliveryMethod}
                  onChange={handleInputChange}
                  required
                >
                  <option value="self-pickup">Self Pickup</option>
                  <option value="courier">Courier Delivery</option>
                  <option value="email">Email (Unofficial only)</option>
                </select>
              </div>
            </div>

            {formData.requestType.includes('Name Change') && (
              <div className="form-group">
                <label htmlFor="nameChangeDetails">Name Change Details *</label>
                <textarea
                  id="nameChangeDetails"
                  name="nameChangeDetails"
                  value={formData.nameChangeDetails}
                  onChange={handleInputChange}
                  placeholder="Provide old name, new name, and reason for change"
                  rows="3"
                  required={formData.requestType.includes('Name Change')}
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="reason">Reason for Request *</label>
              <textarea
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
                placeholder="Enter the reason for requesting transcript/duplicate"
                rows="3"
                required
              />
            </div>

            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="urgentRequest"
                  checked={formData.urgentRequest}
                  onChange={handleInputChange}
                />
                <span className="checkmark"></span>
                Urgent Request (50% additional fee, 2-3 days processing)
              </label>
            </div>

            <div className="fee-info">
              <h3>Fee Structure</h3>
              <ul>
                <li>Official Transcript: ₹500 per copy</li>
                <li>Unofficial Transcript: ₹200 per copy</li>
                <li>Duplicate Degree Certificate: ₹2000</li>
                <li>Duplicate Marksheet: ₹300 per semester</li>
                <li>Name Change Certificate: ₹1000</li>
                <li>Consolidated Marksheet: ₹400</li>
              </ul>
            </div>

            <button type="submit" className="submit-btn">
              Submit Request
            </button>
          </form>
        </div>

        <div className="requests-history-section">
          <h2>Request History</h2>
          <div className="requests-table">
            <table>
              <thead>
                <tr>
                  <th>Request ID</th>
                  <th>Type</th>
                  <th>Semester</th>
                  <th>Status</th>
                  <th>Request Date</th>
                  <th>Completion Date</th>
                  <th>Fee (₹)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map(request => (
                  <tr key={request.id}>
                    <td>{request.id}</td>
                    <td>{request.type}</td>
                    <td>{request.semester}</td>
                    <td>
                      <span 
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(request.status) }}
                      >
                        {request.status}
                      </span>
                    </td>
                    <td>{request.requestDate}</td>
                    <td>{request.completionDate || 'N/A'}</td>
                    <td>{request.fee}</td>
                    <td>
                      <button className="action-btn view-btn">View</button>
                      {request.status === 'Completed' && (
                        <button className="action-btn download-btn">Download</button>
                      )}
                      {request.status === 'Pending' && (
                        <button className="action-btn pay-btn">Pay Fee</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranscriptDuplicate;
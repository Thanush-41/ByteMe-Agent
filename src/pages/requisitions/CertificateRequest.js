import React, { useState } from 'react';
import './CertificateRequest.css';

const CertificateRequest = () => {
  const [formData, setFormData] = useState({
    certificateType: '',
    purpose: '',
    quantity: 1,
    urgentRequest: false,
    additionalInfo: ''
  });

  const [requests, setRequests] = useState([
    {
      id: 'REQ001',
      type: 'Bonafide Certificate',
      purpose: 'Bank Loan',
      quantity: 2,
      status: 'Approved',
      requestDate: '2025-09-10',
      approvalDate: '2025-09-12',
      urgentRequest: false
    },
    {
      id: 'REQ002',
      type: 'Character Certificate',
      purpose: 'Job Application',
      quantity: 1,
      status: 'Pending',
      requestDate: '2025-09-11',
      approvalDate: '',
      urgentRequest: true
    }
  ]);

  const certificateTypes = [
    'Bonafide Certificate',
    'Character Certificate',
    'Study Certificate',
    'Conduct Certificate',
    'Course Completion Certificate',
    'Migration Certificate',
    'Transfer Certificate'
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
    const newRequest = {
      id: `REQ${String(requests.length + 1).padStart(3, '0')}`,
      ...formData,
      status: 'Pending',
      requestDate: new Date().toISOString().split('T')[0],
      approvalDate: ''
    };
    setRequests([newRequest, ...requests]);
    setFormData({
      certificateType: '',
      purpose: '',
      quantity: 1,
      urgentRequest: false,
      additionalInfo: ''
    });
    alert('Certificate request submitted successfully!');
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Approved': return '#28a745';
      case 'Rejected': return '#dc3545';
      case 'Pending': return '#ffc107';
      default: return '#6c757d';
    }
  };

  return (
    <div className="certificate-request-page">
      <div className="page-header">
        <h1>Certificate Request</h1>
        <div className="breadcrumb">
          <span>Home</span> / <span>Requisitions</span> / <span>Certificate Request</span>
        </div>
      </div>

      <div className="content-container">
        <div className="request-form-section">
          <h2>New Certificate Request</h2>
          <form onSubmit={handleSubmit} className="certificate-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="certificateType">Certificate Type *</label>
                <select
                  id="certificateType"
                  name="certificateType"
                  value={formData.certificateType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Certificate Type</option>
                  {certificateTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="quantity">Quantity *</label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  min="1"
                  max="10"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="purpose">Purpose *</label>
              <input
                type="text"
                id="purpose"
                name="purpose"
                value={formData.purpose}
                onChange={handleInputChange}
                placeholder="Enter the purpose for the certificate"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="additionalInfo">Additional Information</label>
              <textarea
                id="additionalInfo"
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleInputChange}
                placeholder="Any additional details or special instructions"
                rows="3"
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
                Urgent Request (Additional charges may apply)
              </label>
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
                  <th>Certificate Type</th>
                  <th>Purpose</th>
                  <th>Quantity</th>
                  <th>Status</th>
                  <th>Request Date</th>
                  <th>Approval Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map(request => (
                  <tr key={request.id}>
                    <td>{request.id}</td>
                    <td>{request.type}</td>
                    <td>{request.purpose}</td>
                    <td>{request.quantity}</td>
                    <td>
                      <span 
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(request.status) }}
                      >
                        {request.status}
                      </span>
                    </td>
                    <td>{request.requestDate}</td>
                    <td>{request.approvalDate || 'N/A'}</td>
                    <td>
                      <button className="action-btn view-btn">View</button>
                      {request.status === 'Approved' && (
                        <button className="action-btn download-btn">Download</button>
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

export default CertificateRequest;
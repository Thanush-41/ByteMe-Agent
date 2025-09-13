import React, { useState } from 'react';
import './OnlineFeesPayment.css';

const OnlineFeesPayment = () => {
  const [selectedSemester, setSelectedSemester] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [feeStructure] = useState({
    tuitionFee: 45000,
    developmentFee: 5000,
    libraryFee: 2000,
    labFee: 8000,
    examFee: 3000,
    miscFee: 2000
  });

  const [paymentHistory] = useState([
    {
      id: 'PAY001',
      semester: 'Semester 5',
      amount: 65000,
      paymentDate: '2025-09-01',
      status: 'Paid',
      method: 'Credit Card',
      transactionId: 'TXN123456789',
      receiptNo: 'RCP2025001'
    },
    {
      id: 'PAY002',
      semester: 'Semester 4',
      amount: 65000,
      paymentDate: '2025-02-15',
      status: 'Paid',
      method: 'Net Banking',
      transactionId: 'TXN987654321',
      receiptNo: 'RCP2025002'
    }
  ]);

  const [studentInfo] = useState({
    rollNo: '24951A05CD',
    name: 'CHAKILAM SRINATH',
    course: 'B.Tech Computer Science',
    year: '3rd Year',
    academicYear: '2025-26'
  });

  const totalFees = Object.values(feeStructure).reduce((sum, fee) => sum + fee, 0);

  const handlePayment = () => {
    if (!selectedSemester || !paymentMethod) {
      alert('Please select semester and payment method');
      return;
    }
    alert(`Redirecting to payment gateway for ${selectedSemester} fees of ₹${totalFees}`);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Paid': return '#28a745';
      case 'Pending': return '#ffc107';
      case 'Failed': return '#dc3545';
      default: return '#6c757d';
    }
  };

  return (
    <div className="online-fees-payment-page">
      <div className="page-header">
        <h1>Online Fees Payment</h1>
        <div className="breadcrumb">
          <span>Home</span> / <span>Payments</span> / <span>Online Fees Payment</span>
        </div>
      </div>

      <div className="content-container">
        <div className="student-info-section">
          <h2>Student Information</h2>
          <div className="student-details">
            <div className="detail-item">
              <span className="label">Roll Number:</span>
              <span className="value">{studentInfo.rollNo}</span>
            </div>
            <div className="detail-item">
              <span className="label">Name:</span>
              <span className="value">{studentInfo.name}</span>
            </div>
            <div className="detail-item">
              <span className="label">Course:</span>
              <span className="value">{studentInfo.course}</span>
            </div>
            <div className="detail-item">
              <span className="label">Year:</span>
              <span className="value">{studentInfo.year}</span>
            </div>
            <div className="detail-item">
              <span className="label">Academic Year:</span>
              <span className="value">{studentInfo.academicYear}</span>
            </div>
          </div>
        </div>

        <div className="payment-form-section">
          <h2>Fee Payment</h2>
          <div className="payment-form">
            <div className="form-group">
              <label htmlFor="semester">Select Semester *</label>
              <select
                id="semester"
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                required
              >
                <option value="">Select Semester</option>
                <option value="Semester 6">Semester 6 (Current)</option>
                <option value="Semester 7">Semester 7 (Advance Payment)</option>
                <option value="Annual Fee">Annual Fee</option>
              </select>
            </div>

            <div className="fee-breakdown">
              <h3>Fee Structure</h3>
              <div className="fee-items">
                <div className="fee-item">
                  <span>Tuition Fee</span>
                  <span>₹{feeStructure.tuitionFee.toLocaleString()}</span>
                </div>
                <div className="fee-item">
                  <span>Development Fee</span>
                  <span>₹{feeStructure.developmentFee.toLocaleString()}</span>
                </div>
                <div className="fee-item">
                  <span>Library Fee</span>
                  <span>₹{feeStructure.libraryFee.toLocaleString()}</span>
                </div>
                <div className="fee-item">
                  <span>Laboratory Fee</span>
                  <span>₹{feeStructure.labFee.toLocaleString()}</span>
                </div>
                <div className="fee-item">
                  <span>Examination Fee</span>
                  <span>₹{feeStructure.examFee.toLocaleString()}</span>
                </div>
                <div className="fee-item">
                  <span>Miscellaneous Fee</span>
                  <span>₹{feeStructure.miscFee.toLocaleString()}</span>
                </div>
                <div className="fee-item total">
                  <span>Total Amount</span>
                  <span>₹{totalFees.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="paymentMethod">Payment Method *</label>
              <select
                id="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                required
              >
                <option value="">Select Payment Method</option>
                <option value="creditCard">Credit Card</option>
                <option value="debitCard">Debit Card</option>
                <option value="netBanking">Net Banking</option>
                <option value="upi">UPI</option>
                <option value="wallet">Digital Wallet</option>
              </select>
            </div>

            <div className="payment-notes">
              <h4>Important Notes:</h4>
              <ul>
                <li>Payment gateway charges may apply</li>
                <li>Transaction failure refunds take 5-7 working days</li>
                <li>Keep transaction ID for future reference</li>
                <li>Download receipt immediately after payment</li>
                <li>For payment issues, contact finance department</li>
              </ul>
            </div>

            <button 
              className="pay-now-btn"
              onClick={handlePayment}
              disabled={!selectedSemester || !paymentMethod}
            >
              Pay Now - ₹{totalFees.toLocaleString()}
            </button>
          </div>
        </div>

        <div className="payment-history-section">
          <h2>Payment History</h2>
          <div className="payment-table">
            <table>
              <thead>
                <tr>
                  <th>Payment ID</th>
                  <th>Semester</th>
                  <th>Amount</th>
                  <th>Payment Date</th>
                  <th>Status</th>
                  <th>Method</th>
                  <th>Transaction ID</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.map(payment => (
                  <tr key={payment.id}>
                    <td>{payment.id}</td>
                    <td>{payment.semester}</td>
                    <td>₹{payment.amount.toLocaleString()}</td>
                    <td>{payment.paymentDate}</td>
                    <td>
                      <span 
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(payment.status) }}
                      >
                        {payment.status}
                      </span>
                    </td>
                    <td>{payment.method}</td>
                    <td>{payment.transactionId}</td>
                    <td>
                      <button className="action-btn view-btn">View</button>
                      <button className="action-btn download-btn">Receipt</button>
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

export default OnlineFeesPayment;
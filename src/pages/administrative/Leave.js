import React, { useState } from 'react';

const Leave = () => {
  const [selectedTab, setSelectedTab] = useState('apply');
  const [leaveForm, setLeaveForm] = useState({
    leaveType: '',
    fromDate: '',
    toDate: '',
    reason: '',
    alternateArrangement: ''
  });

  const [leaveHistory] = useState([
    {
      id: 1,
      type: 'Casual Leave',
      fromDate: '2023-12-15',
      toDate: '2023-12-17',
      days: 3,
      reason: 'Personal work',
      status: 'Approved',
      appliedDate: '2023-12-10'
    },
    {
      id: 2,
      type: 'Medical Leave',
      fromDate: '2023-11-20',
      toDate: '2023-11-22',
      days: 3,
      reason: 'Health issues',
      status: 'Approved',
      appliedDate: '2023-11-18'
    },
    {
      id: 3,
      type: 'Earned Leave',
      fromDate: '2024-01-10',
      toDate: '2024-01-15',
      days: 6,
      reason: 'Family vacation',
      status: 'Pending',
      appliedDate: '2024-01-05'
    }
  ]);

  const [leaveBalance] = useState({
    casualLeave: { total: 12, used: 6, remaining: 6 },
    earnedLeave: { total: 20, used: 8, remaining: 12 },
    medicalLeave: { total: 10, used: 3, remaining: 7 },
    maternityLeave: { total: 180, used: 0, remaining: 180 }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLeaveForm(prev => ({ ...prev, [name]: value }));
  };

  const calculateDays = () => {
    if (leaveForm.fromDate && leaveForm.toDate) {
      const from = new Date(leaveForm.fromDate);
      const to = new Date(leaveForm.toDate);
      const diffTime = Math.abs(to - from);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      return diffDays;
    }
    return 0;
  };

  const submitLeaveApplication = (e) => {
    e.preventDefault();
    if (!leaveForm.leaveType || !leaveForm.fromDate || !leaveForm.toDate || !leaveForm.reason) {
      alert('Please fill all required fields');
      return;
    }
    alert('Leave application submitted successfully!');
    setLeaveForm({
      leaveType: '',
      fromDate: '',
      toDate: '',
      reason: '',
      alternateArrangement: ''
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return '#28a745';
      case 'Pending': return '#ffc107';
      case 'Rejected': return '#dc3545';
      default: return '#6c757d';
    }
  };

  return (
    <div className="page-content">
      <h1>Leave Management</h1>
      <p>Apply for leave and manage your leave records</p>

      {/* Tab Navigation */}
      <div style={{ display: 'flex', marginBottom: '20px', borderBottom: '1px solid #ddd' }}>
        {['apply', 'balance', 'history'].map(tab => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            style={{
              padding: '10px 20px',
              backgroundColor: selectedTab === tab ? '#007bff' : 'transparent',
              color: selectedTab === tab ? 'white' : '#007bff',
              border: 'none',
              borderBottom: selectedTab === tab ? '2px solid #007bff' : '2px solid transparent',
              cursor: 'pointer',
              textTransform: 'capitalize'
            }}
          >
            {tab === 'apply' ? 'Apply Leave' : tab === 'balance' ? 'Leave Balance' : 'Leave History'}
          </button>
        ))}
      </div>

      {/* Apply Leave Tab */}
      {selectedTab === 'apply' && (
        <div style={{ maxWidth: '600px' }}>
          <h3>Apply for Leave</h3>
          <form onSubmit={submitLeaveApplication} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Leave Type *
              </label>
              <select
                name="leaveType"
                value={leaveForm.leaveType}
                onChange={handleInputChange}
                required
                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
              >
                <option value="">Select Leave Type</option>
                <option value="Casual Leave">Casual Leave</option>
                <option value="Earned Leave">Earned Leave</option>
                <option value="Medical Leave">Medical Leave</option>
                <option value="Maternity Leave">Maternity Leave</option>
                <option value="Emergency Leave">Emergency Leave</option>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  From Date *
                </label>
                <input
                  type="date"
                  name="fromDate"
                  value={leaveForm.fromDate}
                  onChange={handleInputChange}
                  required
                  style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  To Date *
                </label>
                <input
                  type="date"
                  name="toDate"
                  value={leaveForm.toDate}
                  onChange={handleInputChange}
                  required
                  min={leaveForm.fromDate}
                  style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                />
              </div>
            </div>

            {calculateDays() > 0 && (
              <div style={{ 
                backgroundColor: '#e7f3ff', 
                padding: '10px', 
                borderRadius: '4px', 
                border: '1px solid #b3d9ff' 
              }}>
                <strong>Total Days: {calculateDays()}</strong>
              </div>
            )}

            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Reason for Leave *
              </label>
              <textarea
                name="reason"
                value={leaveForm.reason}
                onChange={handleInputChange}
                required
                rows="3"
                placeholder="Please provide reason for leave..."
                style={{ 
                  width: '100%', 
                  padding: '8px', 
                  border: '1px solid #ccc', 
                  borderRadius: '4px',
                  resize: 'vertical'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Alternate Arrangement
              </label>
              <textarea
                name="alternateArrangement"
                value={leaveForm.alternateArrangement}
                onChange={handleInputChange}
                rows="2"
                placeholder="Arrangements made for classes/duties during leave period..."
                style={{ 
                  width: '100%', 
                  padding: '8px', 
                  border: '1px solid #ccc', 
                  borderRadius: '4px',
                  resize: 'vertical'
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                padding: '12px 24px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
            >
              Submit Leave Application
            </button>
          </form>
        </div>
      )}

      {/* Leave Balance Tab */}
      {selectedTab === 'balance' && (
        <div>
          <h3>Leave Balance Summary</h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '20px' 
          }}>
            {Object.entries(leaveBalance).map(([type, balance]) => (
              <div 
                key={type}
                style={{ 
                  border: '1px solid #ddd', 
                  borderRadius: '8px', 
                  padding: '20px',
                  backgroundColor: '#f8f9fa'
                }}
              >
                <h4 style={{ 
                  margin: '0 0 15px 0', 
                  textTransform: 'capitalize',
                  color: '#007bff'
                }}>
                  {type.replace(/([A-Z])/g, ' $1').trim()}
                </h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span>Total:</span>
                  <strong>{balance.total}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span>Used:</span>
                  <span style={{ color: '#dc3545' }}>{balance.used}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                  <span>Remaining:</span>
                  <strong style={{ color: '#28a745' }}>{balance.remaining}</strong>
                </div>
                <div style={{ 
                  backgroundColor: '#e9ecef', 
                  borderRadius: '4px', 
                  height: '8px',
                  overflow: 'hidden'
                }}>
                  <div 
                    style={{ 
                      backgroundColor: '#28a745', 
                      height: '100%',
                      width: `${(balance.remaining / balance.total) * 100}%`,
                      transition: 'width 0.3s ease'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Leave History Tab */}
      {selectedTab === 'history' && (
        <div>
          <h3>Leave History</h3>
          <div style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#007bff', color: 'white' }}>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Leave Type</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>From Date</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>To Date</th>
                  <th style={{ padding: '12px', textAlign: 'center' }}>Days</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Reason</th>
                  <th style={{ padding: '12px', textAlign: 'center' }}>Status</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Applied Date</th>
                </tr>
              </thead>
              <tbody>
                {leaveHistory.map((leave, index) => (
                  <tr key={leave.id} style={{ 
                    backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white',
                    borderBottom: '1px solid #dee2e6'
                  }}>
                    <td style={{ padding: '12px' }}>{leave.type}</td>
                    <td style={{ padding: '12px' }}>{new Date(leave.fromDate).toLocaleDateString()}</td>
                    <td style={{ padding: '12px' }}>{new Date(leave.toDate).toLocaleDateString()}</td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>{leave.days}</td>
                    <td style={{ padding: '12px' }}>{leave.reason}</td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <span style={{ 
                        backgroundColor: getStatusColor(leave.status),
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: 'bold'
                      }}>
                        {leave.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px' }}>{new Date(leave.appliedDate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leave;
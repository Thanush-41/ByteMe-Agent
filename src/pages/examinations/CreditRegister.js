import React, { useState } from 'react';

const CreditRegister = () => {
  const [studentInfo] = useState({
    rollno: '22BCE7508',
    name: 'Thanush',
    semester: '3',
    regulation: 'R23'
  });

  const [creditSummary] = useState({
    totalCreditsRequired: 160,
    creditsEarned: 87,
    creditsInProgress: 17,
    creditsRemaining: 56
  });

  return (
    <div style={{ padding: '20px', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ color: '#2c3e50', fontSize: '28px', fontWeight: '600' }}>Credit Register</h1>
        <div style={{ color: '#6c757d', fontSize: '14px' }}>
          <span style={{ color: '#007bff' }}>Home</span> / <span style={{ color: '#007bff' }}>Examinations</span> / <span>Credit Register</span>
        </div>
      </div>

      <div style={{ background: 'white', borderRadius: '8px', padding: '25px', marginBottom: '30px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          <div style={{ padding: '15px 0', borderBottom: '1px solid #e9ecef' }}>
            <span style={{ fontWeight: '600', color: '#495057', marginRight: '15px' }}>Roll No:</span>
            <span style={{ color: '#2c3e50', fontWeight: '500' }}>{studentInfo.rollno}</span>
          </div>
          <div style={{ padding: '15px 0', borderBottom: '1px solid #e9ecef' }}>
            <span style={{ fontWeight: '600', color: '#495057', marginRight: '15px' }}>Name:</span>
            <span style={{ color: '#2c3e50', fontWeight: '500' }}>{studentInfo.name}</span>
          </div>
          <div style={{ padding: '15px 0', borderBottom: '1px solid #e9ecef' }}>
            <span style={{ fontWeight: '600', color: '#495057', marginRight: '15px' }}>Semester:</span>
            <span style={{ color: '#2c3e50', fontWeight: '500' }}>{studentInfo.semester}</span>
          </div>
          <div style={{ padding: '15px 0', borderBottom: '1px solid #e9ecef' }}>
            <span style={{ fontWeight: '600', color: '#495057', marginRight: '15px' }}>Regulation:</span>
            <span style={{ color: '#2c3e50', fontWeight: '500' }}>{studentInfo.regulation}</span>
          </div>
        </div>
      </div>

      <div style={{ background: 'white', borderRadius: '8px', padding: '25px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <div style={{ marginBottom: '25px', borderBottom: '2px solid #007bff', paddingBottom: '10px' }}>
          <h3 style={{ color: '#2c3e50', fontSize: '18px', fontWeight: '600', margin: '0' }}>CREDIT SUMMARY</h3>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '30px' }}>
          <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#007bff', marginBottom: '10px' }}>{creditSummary.totalCreditsRequired}</div>
            <div style={{ fontWeight: '600', color: '#495057' }}>Total Required</div>
          </div>
          <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#d4edda', borderRadius: '8px' }}>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#28a745', marginBottom: '10px' }}>{creditSummary.creditsEarned}</div>
            <div style={{ fontWeight: '600', color: '#495057' }}>Credits Earned</div>
          </div>
          <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#fff3cd', borderRadius: '8px' }}>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#ffc107', marginBottom: '10px' }}>{creditSummary.creditsInProgress}</div>
            <div style={{ fontWeight: '600', color: '#495057' }}>In Progress</div>
          </div>
          <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f8d7da', borderRadius: '8px' }}>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#dc3545', marginBottom: '10px' }}>{creditSummary.creditsRemaining}</div>
            <div style={{ fontWeight: '600', color: '#495057' }}>Remaining</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditRegister;
import React from 'react';

const QuestionPaperSolution = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ color: '#2c3e50', fontSize: '28px', fontWeight: '600' }}>Question Paper and Solution</h1>
        <div style={{ color: '#6c757d', fontSize: '14px' }}>
          <span style={{ color: '#007bff' }}>Home</span> / <span style={{ color: '#007bff' }}>Examinations</span> / <span>Question Paper and Solution</span>
        </div>
      </div>
      <div style={{ background: 'white', borderRadius: '8px', padding: '40px', textAlign: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h3 style={{ color: '#2c3e50', marginBottom: '20px' }}>Previous Question Papers & Solutions</h3>
        <p style={{ color: '#6c757d', fontSize: '16px' }}>Access previous year question papers and their solutions for exam preparation.</p>
        <button style={{ background: '#007bff', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '6px', fontSize: '16px', cursor: 'pointer', marginTop: '20px' }}>
          View Papers
        </button>
      </div>
    </div>
  );
};

export default QuestionPaperSolution;
import React from 'react';

const Booklets = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ color: '#2c3e50', fontSize: '28px', fontWeight: '600' }}>Booklets</h1>
        <div style={{ color: '#6c757d', fontSize: '14px' }}>
          <span style={{ color: '#007bff' }}>Home</span> / <span style={{ color: '#007bff' }}>Examinations</span> / <span>Booklets</span>
        </div>
      </div>
      <div style={{ background: 'white', borderRadius: '8px', padding: '40px', textAlign: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h3 style={{ color: '#2c3e50', marginBottom: '20px' }}>Examination Booklets</h3>
        <p style={{ color: '#6c757d', fontSize: '16px' }}>Download and access examination booklets and answer sheets.</p>
        <button style={{ background: '#007bff', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '6px', fontSize: '16px', cursor: 'pointer', marginTop: '20px' }}>
          Download Booklets
        </button>
      </div>
    </div>
  );
};

export default Booklets;
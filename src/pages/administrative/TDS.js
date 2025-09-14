import React, { useState } from 'react';

const TDS = () => {
  const [selectedFinancialYear, setSelectedFinancialYear] = useState('2023-24');
  const [selectedQuarter, setSelectedQuarter] = useState('Q1');
  
  const [tdsData] = useState([
    {
      id: 1,
      date: '2023-04-15',
      particular: 'Salary TDS',
      section: '192',
      grossAmount: 75000,
      tdsAmount: 7500,
      certificateNo: 'TDS2023001',
      quarter: 'Q1'
    },
    {
      id: 2,
      date: '2023-05-15',
      particular: 'Salary TDS',
      section: '192',
      grossAmount: 75000,
      tdsAmount: 7500,
      certificateNo: 'TDS2023002',
      quarter: 'Q1'
    },
    {
      id: 3,
      date: '2023-06-15',
      particular: 'Professional Fees',
      section: '194J',
      grossAmount: 25000,
      tdsAmount: 2500,
      certificateNo: 'TDS2023003',
      quarter: 'Q1'
    }
  ]);

  const filteredData = tdsData.filter(item => 
    selectedQuarter === 'All' || item.quarter === selectedQuarter
  );

  const getTotalTDS = () => {
    return filteredData.reduce((sum, item) => sum + item.tdsAmount, 0);
  };

  const downloadForm16 = () => {
    alert('Form 16 downloaded successfully!');
  };

  const downloadTDSCertificate = (certificateNo) => {
    alert(`TDS Certificate ${certificateNo} downloaded successfully!`);
  };

  return (
    <div className="page-content">
      <h1>TDS Management</h1>
      <p>View and manage Tax Deducted at Source details</p>
      
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <div>
          <label>Financial Year: </label>
          <select 
            value={selectedFinancialYear}
            onChange={(e) => setSelectedFinancialYear(e.target.value)}
            style={{ padding: '8px', marginLeft: '10px' }}
          >
            <option value="2023-24">2023-24</option>
            <option value="2022-23">2022-23</option>
            <option value="2021-22">2021-22</option>
          </select>
        </div>
        
        <div>
          <label>Quarter: </label>
          <select 
            value={selectedQuarter}
            onChange={(e) => setSelectedQuarter(e.target.value)}
            style={{ padding: '8px', marginLeft: '10px' }}
          >
            <option value="All">All Quarters</option>
            <option value="Q1">Q1 (Apr-Jun)</option>
            <option value="Q2">Q2 (Jul-Sep)</option>
            <option value="Q3">Q3 (Oct-Dec)</option>
            <option value="Q4">Q4 (Jan-Mar)</option>
          </select>
        </div>

        <button 
          onClick={downloadForm16}
          style={{ 
            padding: '8px 16px', 
            backgroundColor: '#28a745', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Download Form 16
        </button>
      </div>

      {/* TDS Summary */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '20px', 
        marginBottom: '30px' 
      }}>
        <div style={{ 
          border: '1px solid #ddd', 
          borderRadius: '8px', 
          padding: '20px', 
          textAlign: 'center',
          backgroundColor: '#f8f9fa'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#007bff' }}>Total TDS Deducted</h3>
          <h2 style={{ margin: '0', color: '#28a745' }}>₹{getTotalTDS().toLocaleString()}</h2>
        </div>
        
        <div style={{ 
          border: '1px solid #ddd', 
          borderRadius: '8px', 
          padding: '20px', 
          textAlign: 'center',
          backgroundColor: '#f8f9fa'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#007bff' }}>Total Transactions</h3>
          <h2 style={{ margin: '0', color: '#17a2b8' }}>{filteredData.length}</h2>
        </div>
        
        <div style={{ 
          border: '1px solid #ddd', 
          borderRadius: '8px', 
          padding: '20px', 
          textAlign: 'center',
          backgroundColor: '#f8f9fa'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#007bff' }}>Financial Year</h3>
          <h2 style={{ margin: '0', color: '#6c757d' }}>{selectedFinancialYear}</h2>
        </div>
      </div>

      {/* TDS Details Table */}
      <div style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#007bff', color: 'white' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>Date</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Particular</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Section</th>
              <th style={{ padding: '12px', textAlign: 'right' }}>Gross Amount</th>
              <th style={{ padding: '12px', textAlign: 'right' }}>TDS Amount</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Certificate No</th>
              <th style={{ padding: '12px', textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={item.id} style={{ 
                backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white',
                borderBottom: '1px solid #dee2e6'
              }}>
                <td style={{ padding: '12px' }}>{new Date(item.date).toLocaleDateString()}</td>
                <td style={{ padding: '12px' }}>{item.particular}</td>
                <td style={{ padding: '12px' }}>{item.section}</td>
                <td style={{ padding: '12px', textAlign: 'right' }}>₹{item.grossAmount.toLocaleString()}</td>
                <td style={{ padding: '12px', textAlign: 'right', fontWeight: 'bold' }}>₹{item.tdsAmount.toLocaleString()}</td>
                <td style={{ padding: '12px' }}>{item.certificateNo}</td>
                <td style={{ padding: '12px', textAlign: 'center' }}>
                  <button 
                    onClick={() => downloadTDSCertificate(item.certificateNo)}
                    style={{ 
                      padding: '4px 8px', 
                      fontSize: '12px',
                      backgroundColor: '#17a2b8', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredData.length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px', 
          color: '#6c757d',
          border: '1px solid #ddd',
          borderRadius: '8px',
          marginTop: '20px'
        }}>
          <h3>No TDS records found for the selected period</h3>
          <p>Please select a different quarter or financial year</p>
        </div>
      )}
    </div>
  );
};

export default TDS;
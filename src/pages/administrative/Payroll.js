import React, { useState } from 'react';

const Payroll = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  const [payrollData] = useState({
    employeeId: 'EMP001',
    name: 'Dr. Faculty Name',
    designation: 'Associate Professor',
    department: 'Computer Science & Engineering',
    basicSalary: 75000,
    hra: 15000,
    da: 10000,
    allowances: 5000,
    deductions: {
      pf: 9000,
      esi: 562,
      tds: 8500,
      others: 1000
    }
  });

  const calculateGrossSalary = () => {
    return payrollData.basicSalary + payrollData.hra + payrollData.da + payrollData.allowances;
  };

  const calculateTotalDeductions = () => {
    return Object.values(payrollData.deductions).reduce((sum, amount) => sum + amount, 0);
  };

  const calculateNetSalary = () => {
    return calculateGrossSalary() - calculateTotalDeductions();
  };

  const downloadPayslip = () => {
    alert('Payslip downloaded successfully!');
  };

  return (
    <div className="page-content">
      <h1>Payroll Management</h1>
      <p>View and manage salary details and payslips</p>
      
      <div style={{ marginBottom: '20px' }}>
        <label>Select Month: </label>
        <input 
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          style={{ padding: '8px', marginLeft: '10px' }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Employee Details */}
        <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px' }}>
          <h3>Employee Details</h3>
          <table style={{ width: '100%', marginTop: '15px' }}>
            <tbody>
              <tr>
                <td style={{ padding: '8px', fontWeight: 'bold' }}>Employee ID:</td>
                <td style={{ padding: '8px' }}>{payrollData.employeeId}</td>
              </tr>
              <tr>
                <td style={{ padding: '8px', fontWeight: 'bold' }}>Name:</td>
                <td style={{ padding: '8px' }}>{payrollData.name}</td>
              </tr>
              <tr>
                <td style={{ padding: '8px', fontWeight: 'bold' }}>Designation:</td>
                <td style={{ padding: '8px' }}>{payrollData.designation}</td>
              </tr>
              <tr>
                <td style={{ padding: '8px', fontWeight: 'bold' }}>Department:</td>
                <td style={{ padding: '8px' }}>{payrollData.department}</td>
              </tr>
              <tr>
                <td style={{ padding: '8px', fontWeight: 'bold' }}>Pay Period:</td>
                <td style={{ padding: '8px' }}>{selectedMonth}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Salary Breakdown */}
        <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px' }}>
          <h3>Salary Breakdown</h3>
          <table style={{ width: '100%', marginTop: '15px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f5f5f5' }}>
                <th style={{ padding: '8px', textAlign: 'left' }}>Component</th>
                <th style={{ padding: '8px', textAlign: 'right' }}>Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '8px' }}>Basic Salary</td>
                <td style={{ padding: '8px', textAlign: 'right' }}>{payrollData.basicSalary.toLocaleString()}</td>
              </tr>
              <tr>
                <td style={{ padding: '8px' }}>HRA</td>
                <td style={{ padding: '8px', textAlign: 'right' }}>{payrollData.hra.toLocaleString()}</td>
              </tr>
              <tr>
                <td style={{ padding: '8px' }}>DA</td>
                <td style={{ padding: '8px', textAlign: 'right' }}>{payrollData.da.toLocaleString()}</td>
              </tr>
              <tr>
                <td style={{ padding: '8px' }}>Other Allowances</td>
                <td style={{ padding: '8px', textAlign: 'right' }}>{payrollData.allowances.toLocaleString()}</td>
              </tr>
              <tr style={{ fontWeight: 'bold', backgroundColor: '#f9f9f9' }}>
                <td style={{ padding: '8px' }}>Gross Salary</td>
                <td style={{ padding: '8px', textAlign: 'right' }}>₹{calculateGrossSalary().toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Deductions */}
      <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', marginTop: '20px' }}>
        <h3>Deductions</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <table style={{ width: '100%' }}>
            <thead>
              <tr style={{ backgroundColor: '#f5f5f5' }}>
                <th style={{ padding: '8px', textAlign: 'left' }}>Deduction</th>
                <th style={{ padding: '8px', textAlign: 'right' }}>Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '8px' }}>Provident Fund (PF)</td>
                <td style={{ padding: '8px', textAlign: 'right' }}>{payrollData.deductions.pf.toLocaleString()}</td>
              </tr>
              <tr>
                <td style={{ padding: '8px' }}>ESI</td>
                <td style={{ padding: '8px', textAlign: 'right' }}>{payrollData.deductions.esi.toLocaleString()}</td>
              </tr>
              <tr>
                <td style={{ padding: '8px' }}>TDS</td>
                <td style={{ padding: '8px', textAlign: 'right' }}>{payrollData.deductions.tds.toLocaleString()}</td>
              </tr>
              <tr>
                <td style={{ padding: '8px' }}>Others</td>
                <td style={{ padding: '8px', textAlign: 'right' }}>{payrollData.deductions.others.toLocaleString()}</td>
              </tr>
              <tr style={{ fontWeight: 'bold', backgroundColor: '#f9f9f9' }}>
                <td style={{ padding: '8px' }}>Total Deductions</td>
                <td style={{ padding: '8px', textAlign: 'right' }}>₹{calculateTotalDeductions().toLocaleString()}</td>
              </tr>
            </tbody>
          </table>

          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ 
              backgroundColor: '#28a745', 
              color: 'white', 
              padding: '20px', 
              borderRadius: '8px', 
              textAlign: 'center',
              width: '100%'
            }}>
              <h3 style={{ margin: '0 0 10px 0' }}>Net Salary</h3>
              <h2 style={{ margin: '0' }}>₹{calculateNetSalary().toLocaleString()}</h2>
            </div>
            <button 
              onClick={downloadPayslip}
              style={{ 
                marginTop: '20px', 
                padding: '10px 20px', 
                backgroundColor: '#007bff', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Download Payslip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payroll;
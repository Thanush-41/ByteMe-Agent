import React, { useState } from 'react';

const Reports = () => {
  const [selectedCategory, setSelectedCategory] = useState('academic');
  const [selectedReport, setSelectedReport] = useState('');
  const [dateRange, setDateRange] = useState({
    fromDate: '',
    toDate: ''
  });

  const reportCategories = {
    academic: [
      { id: 'attendance', name: 'Student Attendance Report', description: 'Detailed attendance records by class/subject' },
      { id: 'marks', name: 'Marks Analysis Report', description: 'Assessment and exam marks summary' },
      { id: 'performance', name: 'Performance Report', description: 'Student academic performance analysis' },
      { id: 'course-completion', name: 'Course Completion Report', description: 'Course completion status and progress' }
    ],
    administrative: [
      { id: 'leave', name: 'Leave Report', description: 'Faculty leave records and balance' },
      { id: 'payroll', name: 'Payroll Summary', description: 'Salary and compensation details' },
      { id: 'tds', name: 'TDS Report', description: 'Tax deducted at source summary' },
      { id: 'faculty-load', name: 'Faculty Workload Report', description: 'Teaching load and assignment distribution' }
    ],
    financial: [
      { id: 'fee-collection', name: 'Fee Collection Report', description: 'Student fee payment status' },
      { id: 'expenses', name: 'Expense Report', description: 'Departmental expenses and budget utilization' },
      { id: 'grants', name: 'Grants and Funding Report', description: 'Research grants and funding status' }
    ],
    research: [
      { id: 'publications', name: 'Publications Report', description: 'Faculty publications and research output' },
      { id: 'projects', name: 'Research Projects Report', description: 'Ongoing and completed research projects' },
      { id: 'conferences', name: 'Conference Participation Report', description: 'Conference presentations and attendance' }
    ]
  };

  const [generatedReports] = useState([
    {
      id: 1,
      name: 'Student Attendance Report - CSE Dept',
      category: 'Academic',
      generatedDate: '2024-01-15',
      status: 'Completed',
      fileSize: '2.3 MB'
    },
    {
      id: 2,
      name: 'Faculty Leave Report - Q4 2023',
      category: 'Administrative',
      generatedDate: '2024-01-10',
      status: 'Completed',
      fileSize: '850 KB'
    },
    {
      id: 3,
      name: 'Fee Collection Report - Semester 1',
      category: 'Financial',
      generatedDate: '2024-01-08',
      status: 'Processing',
      fileSize: 'Pending'
    }
  ]);

  const handleDateChange = (field, value) => {
    setDateRange(prev => ({ ...prev, [field]: value }));
  };

  const generateReport = () => {
    if (!selectedReport) {
      alert('Please select a report type');
      return;
    }
    if (!dateRange.fromDate || !dateRange.toDate) {
      alert('Please select date range');
      return;
    }
    alert(`Generating ${reportCategories[selectedCategory].find(r => r.id === selectedReport)?.name}...\nReport will be available in the "Generated Reports" section once completed.`);
  };

  const downloadReport = (reportName) => {
    alert(`Downloading ${reportName}...`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return '#28a745';
      case 'Processing': return '#ffc107';
      case 'Failed': return '#dc3545';
      default: return '#6c757d';
    }
  };

  return (
    <div className="page-content">
      <h1>Reports Management</h1>
      <p>Generate and download various academic and administrative reports</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        {/* Report Generation Section */}
        <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px' }}>
          <h3>Generate New Report</h3>
          
          {/* Category Selection */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
              Report Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setSelectedReport('');
              }}
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
            >
              <option value="academic">Academic Reports</option>
              <option value="administrative">Administrative Reports</option>
              <option value="financial">Financial Reports</option>
              <option value="research">Research Reports</option>
            </select>
          </div>

          {/* Report Type Selection */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
              Report Type
            </label>
            <select
              value={selectedReport}
              onChange={(e) => setSelectedReport(e.target.value)}
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
            >
              <option value="">Select Report Type</option>
              {reportCategories[selectedCategory].map(report => (
                <option key={report.id} value={report.id}>
                  {report.name}
                </option>
              ))}
            </select>
            {selectedReport && (
              <p style={{ 
                marginTop: '8px', 
                fontSize: '14px', 
                color: '#6c757d',
                fontStyle: 'italic'
              }}>
                {reportCategories[selectedCategory].find(r => r.id === selectedReport)?.description}
              </p>
            )}
          </div>

          {/* Date Range Selection */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
              Date Range
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ fontSize: '12px', color: '#6c757d' }}>From Date</label>
                <input
                  type="date"
                  value={dateRange.fromDate}
                  onChange={(e) => handleDateChange('fromDate', e.target.value)}
                  style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#6c757d' }}>To Date</label>
                <input
                  type="date"
                  value={dateRange.toDate}
                  onChange={(e) => handleDateChange('toDate', e.target.value)}
                  min={dateRange.fromDate}
                  style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                />
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={generateReport}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            Generate Report
          </button>

          {/* Available Report Types */}
          <div style={{ marginTop: '30px' }}>
            <h4>Available Report Types</h4>
            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
              {reportCategories[selectedCategory].map(report => (
                <div 
                  key={report.id}
                  style={{ 
                    padding: '10px',
                    margin: '5px 0',
                    border: '1px solid #e9ecef',
                    borderRadius: '4px',
                    backgroundColor: selectedReport === report.id ? '#e7f3ff' : '#f8f9fa',
                    cursor: 'pointer'
                  }}
                  onClick={() => setSelectedReport(report.id)}
                >
                  <strong style={{ color: '#007bff' }}>{report.name}</strong>
                  <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#6c757d' }}>
                    {report.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Generated Reports Section */}
        <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px' }}>
          <h3>Generated Reports</h3>
          <p style={{ color: '#6c757d', marginBottom: '20px' }}>
            Recently generated reports available for download
          </p>

          <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
            {generatedReports.map(report => (
              <div 
                key={report.id}
                style={{ 
                  border: '1px solid #e9ecef',
                  borderRadius: '8px',
                  padding: '15px',
                  marginBottom: '15px',
                  backgroundColor: '#f8f9fa'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <h5 style={{ margin: '0 0 8px 0', color: '#007bff' }}>
                      {report.name}
                    </h5>
                    <div style={{ fontSize: '12px', color: '#6c757d', marginBottom: '8px' }}>
                      <span>Category: {report.category}</span> | 
                      <span> Generated: {new Date(report.generatedDate).toLocaleDateString()}</span>
                    </div>
                    <div style={{ fontSize: '12px', color: '#6c757d' }}>
                      Size: {report.fileSize}
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                    <span 
                      style={{ 
                        backgroundColor: getStatusColor(report.status),
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: 'bold'
                      }}
                    >
                      {report.status}
                    </span>
                    {report.status === 'Completed' && (
                      <button
                        onClick={() => downloadReport(report.name)}
                        style={{
                          padding: '6px 12px',
                          backgroundColor: '#28a745',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                      >
                        Download
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {generatedReports.length === 0 && (
            <div style={{ 
              textAlign: 'center', 
              padding: '40px', 
              color: '#6c757d',
              border: '2px dashed #dee2e6',
              borderRadius: '8px'
            }}>
              <h4>No reports generated yet</h4>
              <p>Generate your first report using the form on the left</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ 
        marginTop: '30px',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        border: '1px solid #e9ecef'
      }}>
        <h4 style={{ marginBottom: '15px' }}>Quick Actions</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
          <button
            onClick={() => {
              setSelectedCategory('academic');
              setSelectedReport('attendance');
            }}
            style={{
              padding: '15px',
              backgroundColor: '#17a2b8',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            📊 Attendance Report
          </button>
          <button
            onClick={() => {
              setSelectedCategory('administrative');
              setSelectedReport('leave');
            }}
            style={{
              padding: '15px',
              backgroundColor: '#6f42c1',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            📋 Leave Report
          </button>
          <button
            onClick={() => {
              setSelectedCategory('financial');
              setSelectedReport('fee-collection');
            }}
            style={{
              padding: '15px',
              backgroundColor: '#fd7e14',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            💰 Fee Collection
          </button>
          <button
            onClick={() => {
              setSelectedCategory('research');
              setSelectedReport('publications');
            }}
            style={{
              padding: '15px',
              backgroundColor: '#20c997',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            📚 Publications
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reports;
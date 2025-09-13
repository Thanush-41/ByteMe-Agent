import React, { useState } from 'react';
import './Timetable.css';

const Timetable = () => {
  const [selectedAY, setSelectedAY] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [showTimetable, setShowTimetable] = useState(false);

  const academicYears = [
    '2024-25',
    '2025-26',
    '2026-27'
  ];

  const sections = [
    'Computer Science and Engineering - III Semester (Section - F)',
    'Computer Science and Engineering - IV Semester (Section - A)',
    'Computer Science and Engineering - V Semester (Section - B)',
    'Computer Science and Engineering - VI Semester (Section - C)',
    'Electronics and Communication Engineering - III Semester (Section - D)',
    'Mechanical Engineering - IV Semester (Section - E)'
  ];

  // Sample timetable data
  const timetableData = {
    academicYear: '2024-25',
    branchSection: '432/Computer',
    schedule: {
      'Monday': {
        'Period - I': { time: '09:40 AM - 10:30 AM', subject: '', code: '', staff: '' },
        'Period - II': { time: '10:30 AM - 11:20 AM', subject: '', code: '', staff: '' },
        'Period - III': { time: '11:20 AM - 12:10 PM', subject: '', code: '', staff: '' },
        'Period - IV': { time: '12:10 PM - 01:00 PM', subject: '', code: '', staff: '' },
        'Period - V': { time: '01:40 PM - 02:30 PM', subject: '', code: '', staff: '' },
        'Period - VI': { time: '02:30 PM - 03:20 PM', subject: '', code: '', staff: '' },
        'Period - VII': { time: '03:20 PM - 04:10 PM', subject: '', code: '', staff: '' }
      },
      'Tuesday': {
        'Period - I': { time: '09:40 AM - 10:30 AM', subject: '', code: '', staff: '' },
        'Period - II': { time: '10:30 AM - 11:20 AM', subject: '', code: '', staff: '' },
        'Period - III': { time: '11:20 AM - 12:10 PM', subject: '', code: '', staff: '' },
        'Period - IV': { time: '12:10 PM - 01:00 PM', subject: '', code: '', staff: '' },
        'Period - V': { time: '01:40 PM - 02:30 PM', subject: '', code: '', staff: '' },
        'Period - VI': { time: '02:30 PM - 03:20 PM', subject: '', code: '', staff: '' },
        'Period - VII': { time: '03:20 PM - 04:10 PM', subject: '', code: '', staff: '' }
      },
      'Wednesday': {
        'Period - I': { time: '09:40 AM - 10:30 AM', subject: '', code: '', staff: '' },
        'Period - II': { time: '10:30 AM - 11:20 AM', subject: '', code: '', staff: '' },
        'Period - III': { time: '11:20 AM - 12:10 PM', subject: '', code: '', staff: '' },
        'Period - IV': { time: '12:10 PM - 01:00 PM', subject: '', code: '', staff: '' },
        'Period - V': { time: '01:40 PM - 02:30 PM', subject: '', code: '', staff: '' },
        'Period - VI': { time: '02:30 PM - 03:20 PM', subject: '', code: '', staff: '' },
        'Period - VII': { time: '03:20 PM - 04:10 PM', subject: '', code: '', staff: '' }
      },
      'Thursday': {
        'Period - I': { time: '09:40 AM - 10:30 AM', subject: '', code: '', staff: '' },
        'Period - II': { time: '10:30 AM - 11:20 AM', subject: '', code: '', staff: '' },
        'Period - III': { time: '11:20 AM - 12:10 PM', subject: '', code: '', staff: '' },
        'Period - IV': { time: '12:10 PM - 01:00 PM', subject: '', code: '', staff: '' },
        'Period - V': { time: '01:40 PM - 02:30 PM', subject: '', code: '', staff: '' },
        'Period - VI': { time: '02:30 PM - 03:20 PM', subject: '', code: '', staff: '' },
        'Period - VII': { time: '03:20 PM - 04:10 PM', subject: '', code: '', staff: '' }
      },
      'Friday': {
        'Period - I': { time: '09:40 AM - 10:30 AM', subject: '', code: '', staff: '' },
        'Period - II': { time: '10:30 AM - 11:20 AM', subject: '', code: '', staff: '' },
        'Period - III': { time: '11:20 AM - 12:10 PM', subject: '', code: '', staff: '' },
        'Period - IV': { time: '12:10 PM - 01:00 PM', subject: '', code: '', staff: '' },
        'Period - V': { time: '01:40 PM - 02:30 PM', subject: '', code: '', staff: '' },
        'Period - VI': { time: '02:30 PM - 03:20 PM', subject: '', code: '', staff: '' },
        'Period - VII': { time: '03:20 PM - 04:10 PM', subject: '', code: '', staff: '' }
      },
      'Saturday': {
        'Period - I': { time: '09:40 AM - 10:30 AM', subject: '', code: '', staff: '' },
        'Period - II': { time: '10:30 AM - 11:20 AM', subject: '', code: '', staff: '' },
        'Period - III': { time: '11:20 AM - 12:10 PM', subject: '', code: '', staff: '' },
        'Period - IV': { time: '12:10 PM - 01:00 PM', subject: '', code: '', staff: '' },
        'Period - V': { time: '01:40 PM - 02:30 PM', subject: '', code: '', staff: '' },
        'Period - VI': { time: '02:30 PM - 03:20 PM', subject: '', code: '', staff: '' },
        'Period - VII': { time: '03:20 PM - 04:10 PM', subject: '', code: '', staff: '' }
      }
    }
  };

  // Sample time blocks data (shown at bottom)
  const timeBlocks = [
    { block: 'BLOCK - I: S.BHANDHWAJA', periods: [
      { period: 'Period - 1', time: '09:40 AM - 10:30 AM' },
      { period: 'Period - 2', time: '10:30 AM - 11:20 AM' },
      { period: 'Period - 3', time: '11:20 AM - 12:10 PM' }
    ]},
    { block: 'BLOCK - III: ARYASRITHA', periods: [
      { period: 'Period - 1', time: '09:40 AM - 10:30 AM' },
      { period: 'Period - 2', time: '10:30 AM - 11:20 AM' },
      { period: 'Period - 3', time: '11:20 AM - 12:10 PM' }
    ]},
    { block: 'Lunch', periods: [
      { period: 'Period - 4', time: '12:10 PM - 01:00 PM' }
    ]},
    { block: 'Period - 5', periods: [
      { period: 'Period - 5', time: '01:40 PM - 02:30 PM' }
    ]},
    { block: 'Period - 6', periods: [
      { period: 'Period - 6', time: '02:30 PM - 03:20 PM' }
    ]},
    { block: 'Period - 7', periods: [
      { period: 'Period - 7', time: '03:20 PM - 04:10 PM' }
    ]}
  ];

  const handleShow = () => {
    if (selectedAY && selectedSection) {
      setShowTimetable(true);
    } else {
      alert('Please select both Academic Year and Section');
    }
  };

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const periods = ['Period - I', 'Period - II', 'Period - III', 'Period - IV', 'Period - V', 'Period - VI', 'Period - VII'];

  return (
    <div className="timetable-page">
      <div className="page-header">
        <h1>Timetable</h1>
        <div className="breadcrumb">
          <span>Home</span> / <span>Timetable</span>
        </div>
      </div>

      {/* Selection Form */}
      <div className="timetable-selection">
        <div className="section-header">
          <h3>Time Table</h3>
        </div>
        
        <div className="selection-form">
          <div className="form-row">
            <div className="form-group">
              <label>AY</label>
              <select 
                value={selectedAY} 
                onChange={(e) => setSelectedAY(e.target.value)}
                className="ay-dropdown"
              >
                <option value="">Select Academic Year</option>
                {academicYears.map((year, index) => (
                  <option key={index} value={year}>{year}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label>SECTION</label>
              <select 
                value={selectedSection} 
                onChange={(e) => setSelectedSection(e.target.value)}
                className="section-dropdown"
              >
                <option value="">SECTION</option>
                {sections.map((section, index) => (
                  <option key={index} value={section}>{section}</option>
                ))}
              </select>
            </div>
            
            <button 
              className="show-btn"
              onClick={handleShow}
            >
              Show
            </button>
          </div>
        </div>
      </div>

      {/* Timetable Display */}
      {showTimetable && (
        <div className="timetable-display">
          <div className="timetable-header">
            <h3>TIME TABLE</h3>
          </div>
          
          <div className="timetable-info">
            <div className="info-row">
              <span className="info-label">Academic Year</span>
              <span className="info-value">{timetableData.academicYear}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Branch/Section</span>
              <span className="info-value">{timetableData.branchSection}</span>
            </div>
          </div>

          <div className="timetable-grid">
            <table className="timetable-table">
              <thead>
                <tr>
                  <th className="day-header">DAY/PERIOD</th>
                  {periods.map((period) => (
                    <th key={period} className="period-header">{period}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {days.map((day) => (
                  <tr key={day}>
                    <td className="day-cell">
                      <div className="day-info">
                        <strong>{day}</strong>
                        <div className="day-date">
                          {day === 'Monday' && '09 Sep 2025'}
                          {day === 'Tuesday' && '10 Sep 2025'}
                          {day === 'Wednesday' && '11 Sep 2025'}
                          {day === 'Thursday' && '12 Sep 2025'}
                          {day === 'Friday' && '13 Sep 2025'}
                          {day === 'Saturday' && '14 Sep 2025'}
                        </div>
                      </div>
                    </td>
                    {periods.map((period) => (
                      <td key={`${day}-${period}`} className="period-cell">
                        <div className="period-content">
                          {timetableData.schedule[day][period].subject && (
                            <div className="subject-info">
                              <div className="subject-name">{timetableData.schedule[day][period].subject}</div>
                              <div className="subject-code">{timetableData.schedule[day][period].code}</div>
                              <div className="staff-name">{timetableData.schedule[day][period].staff}</div>
                            </div>
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Time Blocks Section */}
          <div className="time-blocks-section">
            <div className="time-blocks-grid">
              {timeBlocks.map((block, index) => (
                <div key={index} className={`time-block ${block.block.toLowerCase().includes('lunch') ? 'lunch-block' : 'regular-block'}`}>
                  <div className="block-header">
                    {block.block}
                  </div>
                  {block.periods.map((periodInfo, periodIndex) => (
                    <div key={periodIndex} className="period-time">
                      {periodInfo.period}: {periodInfo.time}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Subject Details Table */}
            <div className="subject-details-table">
              <table className="details-table">
                <thead>
                  <tr>
                    <th>Subject Code</th>
                    <th>Subject Name</th>
                    <th>Short Code</th>
                    <th>Staff ID</th>
                    <th>Staff Name</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="5" className="no-data">No subject data available</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Timetable;
import React, { useState } from 'react';
import './CourseContent.css';

const CourseContent = () => {
  const [academicYear] = useState('2025-26');
  
  const [courseContentData] = useState([
    // ACS008 - Data Structures
    {
      sNo: 1,
      date: '23 Aug, 2025',
      period: '2',
      topicsCovered: 'RECURSIVE ALGORITHM, PERFORMANCE ANALYSIS',
      status: 'PRESENT',
      youtubeLink: 'NIL',
      powerpointLecture: 'PPT',
      subject: 'ACS008',
      subjectName: 'Data Structures'
    },
    {
      sNo: 2,
      date: '21 Aug, 2025',
      period: '2',
      topicsCovered: 'SORTING TECHNIQUES: MERGE SORT AND RADIX SORT',
      status: 'PRESENT',
      youtubeLink: 'NIL',
      powerpointLecture: 'PPT',
      subject: 'ACS008',
      subjectName: 'Data Structures'
    },
    {
      sNo: 3,
      date: '19 Aug, 2025',
      period: '2',
      topicsCovered: 'CLASSIFICATION OF DATA STRUCTURES',
      status: 'PRESENT',
      youtubeLink: 'NIL',
      powerpointLecture: 'PPT',
      subject: 'ACS008',
      subjectName: 'Data Structures'
    },
    {
      sNo: 4,
      date: '18 Aug, 2025',
      period: '2',
      topicsCovered: 'SORTING TECHNIQUES: BUBBLE SORT, SELECTION SORT',
      status: 'PRESENT',
      youtubeLink: 'NIL',
      powerpointLecture: 'PPT',
      subject: 'ACS008',
      subjectName: 'Data Structures'
    },
    {
      sNo: 5,
      date: '14 Aug, 2025',
      period: '2',
      topicsCovered: 'SORTING TECHNIQUES: BUBBLE SORT, SELECTION SORT',
      status: 'ABSENT',
      youtubeLink: 'NIL',
      powerpointLecture: 'PPT',
      subject: 'ACS008',
      subjectName: 'Data Structures'
    },
    {
      sNo: 6,
      date: '12 Aug, 2025',
      period: '2',
      topicsCovered: 'QUEUES: PRIMITIVE OPERATIONS; IMPLEMENTATION OF QUEUES USING ARRAY',
      status: 'ABSENT',
      youtubeLink: 'NIL',
      powerpointLecture: 'PPT',
      subject: 'ACS008',
      subjectName: 'Data Structures'
    },
    {
      sNo: 7,
      date: '11 Aug, 2025',
      period: '2',
      topicsCovered: 'SEARCHING TECHNIQUES: UNIFORM BINARY SEARCH AND INTERPOLATION SEARCH',
      status: 'ABSENT',
      youtubeLink: 'NIL',
      powerpointLecture: 'PPT',
      subject: 'ACS008',
      subjectName: 'Data Structures'
    },
    {
      sNo: 8,
      date: '09 Aug, 2025',
      period: '1',
      topicsCovered: 'SEARCHING TECHNIQUES: FIBONACCI SEARCH AND COMPARISON',
      status: 'ABSENT',
      youtubeLink: 'NIL',
      powerpointLecture: 'PPT',
      subject: 'ACS008',
      subjectName: 'Data Structures'
    },
    {
      sNo: 9,
      date: '07 Aug, 2025',
      period: '2',
      topicsCovered: 'SEARCHING TECHNIQUES: LINEAR SEARCH, BINARY SEARCH',
      status: 'PRESENT',
      youtubeLink: 'NIL',
      powerpointLecture: 'PDF',
      subject: 'ACS008',
      subjectName: 'Data Structures'
    },
    {
      sNo: 10,
      date: '06 Aug, 2025',
      period: '3',
      topicsCovered: 'RECURSIVE ALGORITHM, PERFORMANCE ANALYSIS',
      status: 'PRESENT',
      youtubeLink: 'NIL',
      powerpointLecture: 'PPT',
      subject: 'ACS008',
      subjectName: 'Data Structures'
    },
    {
      sNo: 11,
      date: '05 Aug, 2025',
      period: '2',
      topicsCovered: 'OPERATIONS ON DATA STRUCTURES',
      status: 'ABSENT',
      youtubeLink: 'NIL',
      powerpointLecture: 'PPT',
      subject: 'ACS008',
      subjectName: 'Data Structures'
    },
    {
      sNo: 12,
      date: '04 Aug, 2025',
      period: '3',
      topicsCovered: 'INTRODUCTION OF DATA STRUCTURES',
      status: 'ABSENT',
      youtubeLink: 'NIL',
      powerpointLecture: 'PPT',
      subject: 'ACS008',
      subjectName: 'Data Structures'
    },
    // ACS009 - Operating Systems
    {
      sNo: 1,
      date: '12 Sep, 2025',
      period: '6',
      topicsCovered: 'PETERSON\'S SOLUTION',
      status: 'PRESENT',
      youtubeLink: 'NIL',
      powerpointLecture: 'PPT',
      subject: 'ACS009',
      subjectName: 'Operating Systems'
    },
    {
      sNo: 2,
      date: '09 Sep, 2025',
      period: '3',
      topicsCovered: 'PROCESS SYNCHRONIZATION, THE CRITICAL SECTION PROBLEM',
      status: 'PRESENT',
      youtubeLink: 'NIL',
      powerpointLecture: 'PPT',
      subject: 'ACS009',
      subjectName: 'Operating Systems'
    },
    {
      sNo: 3,
      date: '09 Sep, 2025',
      period: '2',
      topicsCovered: 'REALTIME SCHEDULING, THREAD SCHEDULING',
      status: 'PRESENT',
      youtubeLink: 'NIL',
      powerpointLecture: 'PPT',
      subject: 'ACS009',
      subjectName: 'Operating Systems'
    },
    {
      sNo: 4,
      date: '08 Sep, 2025',
      period: '1',
      topicsCovered: 'MULTIPLEPROCESSOR SCHEDULING',
      status: 'ABSENT',
      youtubeLink: 'NIL',
      powerpointLecture: 'PPT',
      subject: 'ACS009',
      subjectName: 'Operating Systems'
    }
  ]);

  const groupedData = courseContentData.reduce((acc, item) => {
    const key = `${item.subject} - ${item.subjectName}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {});

  return (
    <div className="course-content-page">
      <div className="page-header">
        <h1>Course Content Delivery</h1>
        <div className="breadcrumb">
          <span>Home</span> / <span>Course Content Delivery</span>
        </div>
      </div>

      <div className="content-container">
        <div className="academic-year-info">
          <strong>Academic Year: {academicYear}</strong>
        </div>

        <div className="course-content-table">
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Date</th>
                <th>Period</th>
                <th>Topics Covered</th>
                <th>Status</th>
                <th>Youtube Link</th>
                <th>Powerpoint Lecture</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(groupedData).map(([subjectKey, sessions]) => (
                <React.Fragment key={subjectKey}>
                  <tr className="subject-header">
                    <td colSpan="7">
                      {subjectKey}
                    </td>
                  </tr>
                  {sessions.map((session, index) => (
                    <tr key={`${session.subject}-${session.sNo}`}>
                      <td>{session.sNo}</td>
                      <td>{session.date}</td>
                      <td>{session.period}</td>
                      <td className="topics-cell">{session.topicsCovered}</td>
                      <td>
                        <span className={`status ${session.status.toLowerCase()}`}>
                          {session.status}
                        </span>
                      </td>
                      <td>{session.youtubeLink}</td>
                      <td>
                        {session.powerpointLecture !== 'NIL' && (
                          <button 
                            className={`download-btn ${session.powerpointLecture.toLowerCase()}`}
                            onClick={() => alert(`Downloading ${session.powerpointLecture} for ${session.topicsCovered}`)}
                          >
                            {session.powerpointLecture}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
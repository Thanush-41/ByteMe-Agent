import React, { useState } from 'react';
import './PATAttendance.css';

const PATAttendance = () => {
  const [patSessions] = useState([
    {
      id: 1,
      date: '2024-01-15',
      time: '10:00 AM - 11:00 AM',
      mentor: 'Dr. Sarah Johnson',
      topic: 'Academic Progress Review',
      status: 'Present',
      notes: 'Discussed study schedule and upcoming exams'
    },
    {
      id: 2,
      date: '2024-01-22',
      time: '2:00 PM - 3:00 PM',
      mentor: 'Dr. Sarah Johnson',
      topic: 'Career Guidance Session',
      status: 'Present',
      notes: 'Explored internship opportunities and career paths'
    },
    {
      id: 3,
      date: '2024-01-29',
      time: '10:00 AM - 11:00 AM',
      mentor: 'Dr. Sarah Johnson',
      topic: 'Personal Development',
      status: 'Absent',
      notes: 'Session missed due to illness'
    },
    {
      id: 4,
      date: '2024-02-05',
      time: '2:00 PM - 3:00 PM',
      mentor: 'Dr. Sarah Johnson',
      topic: 'Mid-Semester Review',
      status: 'Present',
      notes: 'Reviewed academic performance and set goals'
    },
    {
      id: 5,
      date: '2024-02-12',
      time: '10:00 AM - 11:00 AM',
      mentor: 'Dr. Sarah Johnson',
      topic: 'Project Discussion',
      status: 'Present',
      notes: 'Discussed final year project ideas and timeline'
    }
  ]);

  const [selectedSession, setSelectedSession] = useState(null);
  const [newNote, setNewNote] = useState('');

  const totalSessions = patSessions.length;
  const attendedSessions = patSessions.filter(session => session.status === 'Present').length;
  const attendancePercentage = ((attendedSessions / totalSessions) * 100).toFixed(1);

  const getStatusIcon = (status) => {
    return status === 'Present' ? '✅' : '❌';
  };

  const getStatusColor = (status) => {
    return status === 'Present' ? 'present' : 'absent';
  };

  const handleAddNote = (sessionId) => {
    if (newNote.trim()) {
      // In a real app, this would update the backend
      alert(`Note added to session: ${newNote}`);
      setNewNote('');
      setSelectedSession(null);
    }
  };

  return (
    <div className="pat-attendance">
      <div className="page-header">
        <h1>👨‍🏫 PAT Attendance</h1>
        <p>Personal Academic Tutoring (PAT) session attendance and notes</p>
      </div>

      <div className="pat-summary">
        <div className="summary-card">
          <h3>PAT Summary</h3>
          <div className="summary-stats">
            <div className="stat">
              <span className="stat-value">{attendancePercentage}%</span>
              <span className="stat-label">Attendance Rate</span>
            </div>
            <div className="stat">
              <span className="stat-value">{attendedSessions}</span>
              <span className="stat-label">Sessions Attended</span>
            </div>
            <div className="stat">
              <span className="stat-value">{totalSessions}</span>
              <span className="stat-label">Total Sessions</span>
            </div>
          </div>
        </div>

        <div className="mentor-info">
          <h3>Your PAT Mentor</h3>
          <div className="mentor-details">
            <div className="mentor-avatar">👩‍🏫</div>
            <div className="mentor-text">
              <h4>Dr. Sarah Johnson</h4>
              <p>Computer Science Department</p>
              <p>📧 sarah.johnson@iare.ac.in</p>
              <p>📞 +91 9876543210</p>
            </div>
          </div>
        </div>
      </div>

      <div className="sessions-list">
        <h2>PAT Sessions</h2>
        <div className="sessions-grid">
          {patSessions.map(session => (
            <div key={session.id} className="session-card">
              <div className="session-header">
                <div className="session-date">
                  <span className="date">{session.date}</span>
                  <span className="time">{session.time}</span>
                </div>
                <div className={`session-status ${getStatusColor(session.status)}`}>
                  {getStatusIcon(session.status)} {session.status}
                </div>
              </div>

              <div className="session-content">
                <h4>{session.topic}</h4>
                <p className="mentor">👨‍🏫 {session.mentor}</p>
                
                <div className="session-notes">
                  <strong>Notes:</strong>
                  <p>{session.notes}</p>
                </div>
              </div>

              <div className="session-actions">
                <button 
                  className="add-note-btn"
                  onClick={() => setSelectedSession(session)}
                >
                  📝 Add Note
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="upcoming-sessions">
        <h2>Upcoming Sessions</h2>
        <div className="upcoming-card">
          <div className="upcoming-info">
            <h4>Next PAT Session</h4>
            <p>📅 February 19, 2024</p>
            <p>🕒 10:00 AM - 11:00 AM</p>
            <p>📍 Faculty Room - 301</p>
            <p>💬 Topic: Final Semester Planning</p>
          </div>
          <button className="remind-btn">
            🔔 Set Reminder
          </button>
        </div>
      </div>

      {selectedSession && (
        <div className="note-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add Note to Session</h3>
              <button 
                className="close-btn"
                onClick={() => setSelectedSession(null)}
              >
                ✕
              </button>
            </div>

            <div className="session-info">
              <p><strong>Date:</strong> {selectedSession.date}</p>
              <p><strong>Topic:</strong> {selectedSession.topic}</p>
            </div>

            <div className="note-input">
              <label>Your Note:</label>
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add your thoughts, questions, or action items from this session..."
                rows="4"
              />
            </div>

            <div className="modal-actions">
              <button 
                className="save-btn"
                onClick={() => handleAddNote(selectedSession.id)}
              >
                Save Note
              </button>
              <button 
                className="cancel-btn"
                onClick={() => setSelectedSession(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PATAttendance;
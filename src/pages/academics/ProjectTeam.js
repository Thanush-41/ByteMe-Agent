import React, { useState } from 'react';
import './ProjectTeam.css';

const ProjectTeam = () => {
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: 'John Doe',
      rollNumber: 'CSE2021001',
      email: 'john.doe@student.iare.ac.in',
      role: 'Team Leader',
      skills: ['React', 'Node.js', 'MongoDB'],
      status: 'confirmed'
    }
  ]);

  const [availableStudents] = useState([
    {
      id: 2,
      name: 'Jane Smith',
      rollNumber: 'CSE2021002',
      email: 'jane.smith@student.iare.ac.in',
      skills: ['Python', 'Machine Learning', 'TensorFlow'],
      cgpa: 8.5
    },
    {
      id: 3,
      name: 'Alex Johnson',
      rollNumber: 'CSE2021003',
      email: 'alex.johnson@student.iare.ac.in',
      skills: ['Java', 'Spring Boot', 'MySQL'],
      cgpa: 8.2
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      rollNumber: 'CSE2021004',
      email: 'sarah.wilson@student.iare.ac.in',
      skills: ['Flutter', 'Dart', 'Firebase'],
      cgpa: 8.8
    }
  ]);

  const [invitations, setInvitations] = useState([
    {
      id: 5,
      name: 'Mike Brown',
      rollNumber: 'CSE2021005',
      status: 'pending',
      sentDate: '2024-01-15'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [inviteMessage, setInviteMessage] = useState('');

  const maxTeamSize = 4;

  const filteredStudents = availableStudents.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInviteStudent = (student) => {
    setSelectedStudent(student);
  };

  const sendInvitation = () => {
    if (teamMembers.length >= maxTeamSize) {
      alert('Team is already full!');
      return;
    }

    const newInvitation = {
      id: selectedStudent.id,
      name: selectedStudent.name,
      rollNumber: selectedStudent.rollNumber,
      status: 'pending',
      sentDate: new Date().toISOString().split('T')[0]
    };

    setInvitations([...invitations, newInvitation]);
    alert(`Invitation sent to ${selectedStudent.name}!`);
    setSelectedStudent(null);
    setInviteMessage('');
  };

  const removeTeamMember = (memberId) => {
    setTeamMembers(teamMembers.filter(member => member.id !== memberId));
  };

  const updateMemberRole = (memberId, newRole) => {
    setTeamMembers(teamMembers.map(member =>
      member.id === memberId ? { ...member, role: newRole } : member
    ));
  };

  return (
    <div className="project-team">
      <div className="page-header">
        <h1>👥 Project Team Member Selection</h1>
        <p>Build your project team and manage member roles</p>
      </div>

      <div className="team-overview">
        <div className="team-stats">
          <div className="stat-card">
            <span className="stat-number">{teamMembers.length}</span>
            <span className="stat-label">Current Members</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{maxTeamSize - teamMembers.length}</span>
            <span className="stat-label">Available Slots</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{invitations.length}</span>
            <span className="stat-label">Pending Invitations</span>
          </div>
        </div>
      </div>

      <div className="current-team">
        <h2>Current Team Members</h2>
        <div className="team-members-list">
          {teamMembers.map(member => (
            <div key={member.id} className="member-card">
              <div className="member-info">
                <div className="member-avatar">👤</div>
                <div className="member-details">
                  <h4>{member.name}</h4>
                  <p>{member.rollNumber}</p>
                  <p>📧 {member.email}</p>
                  <div className="member-skills">
                    {member.skills.map((skill, index) => (
                      <span key={index} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="member-role">
                <select
                  value={member.role}
                  onChange={(e) => updateMemberRole(member.id, e.target.value)}
                >
                  <option value="Team Leader">Team Leader</option>
                  <option value="Developer">Developer</option>
                  <option value="Designer">Designer</option>
                  <option value="Tester">Tester</option>
                </select>
              </div>

              <div className="member-actions">
                <button 
                  className="remove-btn"
                  onClick={() => removeTeamMember(member.id)}
                  disabled={member.role === 'Team Leader'}
                >
                  ❌ Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pending-invitations">
        <h2>Pending Invitations</h2>
        <div className="invitations-list">
          {invitations.map(invitation => (
            <div key={invitation.id} className="invitation-card">
              <div className="invitation-info">
                <h4>{invitation.name}</h4>
                <p>{invitation.rollNumber}</p>
                <p>Sent: {invitation.sentDate}</p>
              </div>
              <div className="invitation-status">
                <span className="status pending">⏳ Pending</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {teamMembers.length < maxTeamSize && (
        <div className="add-members">
          <h2>Add Team Members</h2>
          
          <div className="search-section">
            <input
              type="text"
              placeholder="Search students by name or roll number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="available-students">
            {filteredStudents.map(student => (
              <div key={student.id} className="student-card">
                <div className="student-info">
                  <div className="student-avatar">👤</div>
                  <div className="student-details">
                    <h4>{student.name}</h4>
                    <p>{student.rollNumber}</p>
                    <p>📧 {student.email}</p>
                    <p>📊 CGPA: {student.cgpa}</p>
                    <div className="student-skills">
                      {student.skills.map((skill, index) => (
                        <span key={index} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="student-actions">
                  <button 
                    className="invite-btn"
                    onClick={() => handleInviteStudent(student)}
                  >
                    📧 Send Invitation
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedStudent && (
        <div className="invitation-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Send Invitation</h3>
              <button 
                className="close-btn"
                onClick={() => setSelectedStudent(null)}
              >
                ✕
              </button>
            </div>

            <div className="student-summary">
              <h4>Inviting: {selectedStudent.name}</h4>
              <p>{selectedStudent.rollNumber}</p>
              <p>Skills: {selectedStudent.skills.join(', ')}</p>
            </div>

            <div className="invitation-form">
              <label>Personal Message (Optional):</label>
              <textarea
                value={inviteMessage}
                onChange={(e) => setInviteMessage(e.target.value)}
                placeholder="Add a personal message to your invitation..."
                rows="3"
              />
            </div>

            <div className="modal-actions">
              <button 
                className="send-btn"
                onClick={sendInvitation}
              >
                📧 Send Invitation
              </button>
              <button 
                className="cancel-btn"
                onClick={() => setSelectedStudent(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="team-guidelines">
        <h3>📋 Team Formation Guidelines</h3>
        <ul>
          <li>Maximum team size: {maxTeamSize} members</li>
          <li>At least one member must have programming experience</li>
          <li>Team leader is responsible for project coordination</li>
          <li>All members must confirm their participation</li>
          <li>Teams cannot be changed after project allotment</li>
        </ul>
      </div>
    </div>
  );
};

export default ProjectTeam;
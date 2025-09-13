import React, { useState } from 'react';
import './SkillProgram.css';

const SkillProgram = () => {
  const [formData, setFormData] = useState({
    programType: '',
    skillCategory: '',
    duration: '',
    preferredSchedule: '',
    hasPrerequisites: false,
    previousExperience: '',
    motivation: ''
  });

  const [enrollments, setEnrollments] = useState([
    {
      id: 'SP001',
      program: 'Python Programming',
      category: 'Programming',
      duration: '3 months',
      status: 'Enrolled',
      startDate: '2025-09-01',
      endDate: '2025-11-30',
      progress: 45,
      instructor: 'Dr. Rajesh Kumar'
    },
    {
      id: 'SP002',
      program: 'Digital Marketing',
      category: 'Marketing',
      duration: '2 months',
      status: 'Completed',
      startDate: '2025-07-01',
      endDate: '2025-08-30',
      progress: 100,
      instructor: 'Ms. Priya Sharma'
    }
  ]);

  const [availablePrograms] = useState([
    {
      id: 'prog1',
      name: 'Python Programming',
      category: 'Programming',
      duration: '3 months',
      level: 'Beginner',
      fee: 5000,
      description: 'Learn Python from basics to advanced concepts',
      prerequisites: 'Basic computer knowledge'
    },
    {
      id: 'prog2',
      name: 'Web Development',
      category: 'Programming',
      duration: '4 months',
      level: 'Intermediate',
      fee: 8000,
      description: 'Full-stack web development with modern technologies',
      prerequisites: 'Basic programming knowledge'
    },
    {
      id: 'prog3',
      name: 'Digital Marketing',
      category: 'Marketing',
      duration: '2 months',
      level: 'Beginner',
      fee: 4000,
      description: 'Complete digital marketing strategy and implementation',
      prerequisites: 'None'
    },
    {
      id: 'prog4',
      name: 'Data Analytics',
      category: 'Analytics',
      duration: '3 months',
      level: 'Intermediate',
      fee: 7000,
      description: 'Data analysis and visualization using modern tools',
      prerequisites: 'Basic statistics knowledge'
    }
  ]);

  const categories = ['Programming', 'Marketing', 'Analytics', 'Design', 'Business', 'Communication'];
  const durations = ['1 month', '2 months', '3 months', '4 months', '6 months'];
  const schedules = ['Weekdays', 'Weekends', 'Evening', 'Flexible'];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedProgram = availablePrograms.find(p => p.name === formData.programType);
    if (selectedProgram) {
      const newEnrollment = {
        id: `SP${String(enrollments.length + 1).padStart(3, '0')}`,
        program: formData.programType,
        category: formData.skillCategory,
        duration: formData.duration,
        status: 'Applied',
        startDate: '',
        endDate: '',
        progress: 0,
        instructor: 'TBA'
      };
      
      setEnrollments([newEnrollment, ...enrollments]);
      setFormData({
        programType: '',
        skillCategory: '',
        duration: '',
        preferredSchedule: '',
        hasPrerequisites: false,
        previousExperience: '',
        motivation: ''
      });
      alert('Skill program application submitted successfully!');
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return '#28a745';
      case 'Enrolled': return '#007bff';
      case 'Applied': return '#ffc107';
      case 'Rejected': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return '#28a745';
    if (progress >= 60) return '#007bff';
    if (progress >= 40) return '#ffc107';
    return '#dc3545';
  };

  return (
    <div className="skill-program-page">
      <div className="page-header">
        <h1>Skill Program</h1>
        <div className="breadcrumb">
          <span>Home</span> / <span>Requisitions</span> / <span>Skill Program</span>
        </div>
      </div>

      <div className="content-container">
        <div className="available-programs-section">
          <h2>Available Programs</h2>
          <div className="programs-grid">
            {availablePrograms.map(program => (
              <div key={program.id} className="program-card">
                <div className="program-header">
                  <h3>{program.name}</h3>
                  <span className="program-level">{program.level}</span>
                </div>
                <div className="program-details">
                  <p><strong>Category:</strong> {program.category}</p>
                  <p><strong>Duration:</strong> {program.duration}</p>
                  <p><strong>Fee:</strong> ₹{program.fee}</p>
                  <p><strong>Prerequisites:</strong> {program.prerequisites}</p>
                  <p className="program-description">{program.description}</p>
                </div>
                <button 
                  className="enroll-btn"
                  onClick={() => setFormData(prev => ({
                    ...prev,
                    programType: program.name,
                    skillCategory: program.category,
                    duration: program.duration
                  }))}
                >
                  Select Program
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="application-form-section">
          <h2>Program Application</h2>
          <form onSubmit={handleSubmit} className="skill-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="programType">Program *</label>
                <select
                  id="programType"
                  name="programType"
                  value={formData.programType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Program</option>
                  {availablePrograms.map(program => (
                    <option key={program.id} value={program.name}>{program.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="preferredSchedule">Preferred Schedule *</label>
                <select
                  id="preferredSchedule"
                  name="preferredSchedule"
                  value={formData.preferredSchedule}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Schedule</option>
                  {schedules.map(schedule => (
                    <option key={schedule} value={schedule}>{schedule}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="previousExperience">Previous Experience</label>
              <textarea
                id="previousExperience"
                name="previousExperience"
                value={formData.previousExperience}
                onChange={handleInputChange}
                placeholder="Describe any relevant previous experience or skills"
                rows="3"
              />
            </div>

            <div className="form-group">
              <label htmlFor="motivation">Motivation *</label>
              <textarea
                id="motivation"
                name="motivation"
                value={formData.motivation}
                onChange={handleInputChange}
                placeholder="Why do you want to join this program? What are your goals?"
                rows="3"
                required
              />
            </div>

            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="hasPrerequisites"
                  checked={formData.hasPrerequisites}
                  onChange={handleInputChange}
                />
                <span className="checkmark"></span>
                I confirm that I meet all the prerequisites for this program
              </label>
            </div>

            <button type="submit" className="submit-btn">
              Apply for Program
            </button>
          </form>
        </div>

        <div className="enrollments-section">
          <h2>My Enrollments</h2>
          <div className="enrollments-table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Program</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Progress</th>
                  <th>Instructor</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {enrollments.map(enrollment => (
                  <tr key={enrollment.id}>
                    <td>{enrollment.id}</td>
                    <td>{enrollment.program}</td>
                    <td>{enrollment.category}</td>
                    <td>
                      <span 
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(enrollment.status) }}
                      >
                        {enrollment.status}
                      </span>
                    </td>
                    <td>
                      <div className="progress-container">
                        <div 
                          className="progress-bar"
                          style={{ 
                            width: `${enrollment.progress}%`,
                            backgroundColor: getProgressColor(enrollment.progress)
                          }}
                        ></div>
                        <span className="progress-text">{enrollment.progress}%</span>
                      </div>
                    </td>
                    <td>{enrollment.instructor}</td>
                    <td>{enrollment.startDate || 'TBA'}</td>
                    <td>{enrollment.endDate || 'TBA'}</td>
                    <td>
                      <button className="action-btn view-btn">View</button>
                      {enrollment.status === 'Enrolled' && (
                        <button className="action-btn continue-btn">Continue</button>
                      )}
                      {enrollment.status === 'Completed' && (
                        <button className="action-btn certificate-btn">Certificate</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillProgram;
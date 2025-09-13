import React, { useState } from 'react';
import './PLARForeignCourses.css';

const PLARForeignCourses = () => {
  const [foreignCourses] = useState([
    {
      id: 'PLARF001',
      name: 'International Business Management',
      code: 'PLARF001',
      credits: 4,
      university: 'Harvard Business School',
      country: 'USA',
      duration: '12 weeks',
      mode: 'Online',
      language: 'English',
      timeZone: 'EST',
      level: 'Graduate',
      fee: '$2,500',
      equivalentINR: '₹2,08,000',
      certificate: 'Harvard Certificate',
      startDate: '2025-03-01',
      application_deadline: '2025-02-15',
      description: 'Comprehensive international business management course from Harvard'
    },
    {
      id: 'PLARF002',
      name: 'Advanced Machine Learning',
      code: 'PLARF002',
      credits: 5,
      university: 'Stanford University',
      country: 'USA',
      duration: '16 weeks',
      mode: 'Online',
      language: 'English',
      timeZone: 'PST',
      level: 'Graduate',
      fee: '$3,200',
      equivalentINR: '₹2,66,000',
      certificate: 'Stanford Certificate',
      startDate: '2025-02-20',
      application_deadline: '2025-02-10',
      description: 'Advanced ML techniques and applications taught by Stanford faculty'
    },
    {
      id: 'PLARF003',
      name: 'Sustainable Engineering',
      code: 'PLARF003',
      credits: 3,
      university: 'Technical University of Munich',
      country: 'Germany',
      duration: '10 weeks',
      mode: 'Hybrid',
      language: 'English',
      timeZone: 'CET',
      level: 'Undergraduate',
      fee: '€1,800',
      equivalentINR: '₹1,62,000',
      certificate: 'TUM Certificate',
      startDate: '2025-04-01',
      application_deadline: '2025-03-15',
      description: 'Focus on sustainable engineering practices and green technology'
    },
    {
      id: 'PLARF004',
      name: 'Digital Innovation Strategy',
      code: 'PLARF004',
      credits: 3,
      university: 'University of Oxford',
      country: 'UK',
      duration: '8 weeks',
      mode: 'Online',
      language: 'English',
      timeZone: 'GMT',
      level: 'Executive',
      fee: '£2,100',
      equivalentINR: '₹2,20,000',
      certificate: 'Oxford Certificate',
      startDate: '2025-03-15',
      application_deadline: '2025-03-01',
      description: 'Strategic approach to digital transformation and innovation'
    }
  ]);

  const [selectedCourses, setSelectedCourses] = useState([]);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [applicationData, setApplicationData] = useState({
    motivation: '',
    academic_background: '',
    english_proficiency: '',
    prior_experience: ''
  });

  const handleCourseApplication = (course) => {
    setSelectedCourse(course);
    setShowApplicationModal(true);
  };

  const getCountryFlag = (country) => {
    const flags = {
      'USA': '🇺🇸',
      'Germany': '🇩🇪',
      'UK': '🇬🇧',
      'Canada': '🇨🇦',
      'Australia': '🇦🇺'
    };
    return flags[country] || '🌍';
  };

  const getLevelColor = (level) => {
    switch(level) {
      case 'Undergraduate': return '#28a745';
      case 'Graduate': return '#007bff';
      case 'Executive': return '#6f42c1';
      default: return '#6c757d';
    }
  };

  const isDeadlinePassed = (deadline) => {
    return new Date(deadline) < new Date();
  };

  const submitApplication = () => {
    if (!applicationData.motivation || !applicationData.academic_background) {
      alert('Please fill in all required fields');
      return;
    }

    setSelectedCourses([...selectedCourses, selectedCourse]);
    setShowApplicationModal(false);
    setApplicationData({
      motivation: '',
      academic_background: '',
      english_proficiency: '',
      prior_experience: ''
    });
    alert('Application submitted successfully! You will be notified about the admission decision.');
  };

  return (
    <div className="plar-foreign-courses">
      <div className="page-header">
        <h1>🌍 PLAR Foreign Courses</h1>
        <p>Gain international exposure through foreign university courses under PLAR program</p>
      </div>

      <div className="foreign-info">
        <div className="info-banner">
          <h3>🎓 International Learning Opportunity</h3>
          <p>Experience world-class education from top international universities. These courses are specially curated under our PLAR program to provide global exposure and internationally recognized certifications.</p>
        </div>
      </div>

      <div className="courses-section">
        <h2>Available International Courses</h2>
        
        <div className="courses-grid">
          {foreignCourses.map(course => {
            const isApplied = selectedCourses.find(c => c.id === course.id);
            const deadlinePassed = isDeadlinePassed(course.application_deadline);
            
            return (
              <div key={course.id} className={`course-card ${isApplied ? 'applied' : ''}`}>
                <div className="course-header">
                  <div className="university-info">
                    <h3>{course.name}</h3>
                    <div className="university-details">
                      <span className="university">{course.university}</span>
                      <span className="country">
                        {getCountryFlag(course.country)} {course.country}
                      </span>
                    </div>
                  </div>
                  <div className="course-badges">
                    <span 
                      className="level-badge"
                      style={{ backgroundColor: getLevelColor(course.level) }}
                    >
                      {course.level}
                    </span>
                  </div>
                </div>

                <div className="course-details">
                  <div className="detail-row">
                    <span>Course Code:</span>
                    <span>{course.code}</span>
                  </div>
                  <div className="detail-row">
                    <span>Credits:</span>
                    <span>{course.credits}</span>
                  </div>
                  <div className="detail-row">
                    <span>Duration:</span>
                    <span>{course.duration}</span>
                  </div>
                  <div className="detail-row">
                    <span>Mode:</span>
                    <span>{course.mode}</span>
                  </div>
                  <div className="detail-row">
                    <span>Language:</span>
                    <span>{course.language}</span>
                  </div>
                  <div className="detail-row">
                    <span>Time Zone:</span>
                    <span>{course.timeZone}</span>
                  </div>
                  <div className="detail-row">
                    <span>Fee:</span>
                    <span className="fee">{course.fee} ({course.equivalentINR})</span>
                  </div>
                  <div className="detail-row">
                    <span>Start Date:</span>
                    <span>{course.startDate}</span>
                  </div>
                  <div className="detail-row">
                    <span>Application Deadline:</span>
                    <span className={deadlinePassed ? 'deadline-passed' : 'deadline-active'}>
                      {course.application_deadline}
                    </span>
                  </div>
                </div>

                <div className="course-description">
                  <p>{course.description}</p>
                </div>

                <div className="certificate-info">
                  <div className="certificate-badge">
                    🏆 {course.certificate}
                  </div>
                </div>

                <div className="course-actions">
                  <button
                    className={`apply-btn ${isApplied ? 'applied' : ''}`}
                    onClick={() => handleCourseApplication(course)}
                    disabled={deadlinePassed || isApplied}
                  >
                    {deadlinePassed ? 'Deadline Passed' :
                     isApplied ? '✓ Applied' : 'Apply Now'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedCourses.length > 0 && (
        <div className="application-summary">
          <h3>My Applications</h3>
          <div className="applied-courses">
            {selectedCourses.map(course => (
              <div key={course.id} className="applied-course">
                <div className="course-info">
                  <h4>{course.name}</h4>
                  <p>{course.university}, {course.country}</p>
                </div>
                <div className="application-status">
                  <span className="status pending">Under Review</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showApplicationModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Apply for {selectedCourse?.name}</h3>
              <button 
                className="close-btn"
                onClick={() => setShowApplicationModal(false)}
              >
                ✕
              </button>
            </div>
            
            <div className="application-form">
              <div className="course-summary">
                <h4>{selectedCourse?.university}</h4>
                <p>{getCountryFlag(selectedCourse?.country)} {selectedCourse?.country}</p>
                <p>Fee: {selectedCourse?.fee} ({selectedCourse?.equivalentINR})</p>
              </div>

              <div className="form-group">
                <label>Motivation Statement *</label>
                <textarea
                  value={applicationData.motivation}
                  onChange={(e) => setApplicationData({...applicationData, motivation: e.target.value})}
                  placeholder="Why do you want to take this course? (500 words max)"
                  rows="4"
                  required
                />
              </div>

              <div className="form-group">
                <label>Academic Background *</label>
                <textarea
                  value={applicationData.academic_background}
                  onChange={(e) => setApplicationData({...applicationData, academic_background: e.target.value})}
                  placeholder="Describe your relevant academic background and achievements"
                  rows="3"
                  required
                />
              </div>

              <div className="form-group">
                <label>English Proficiency</label>
                <select
                  value={applicationData.english_proficiency}
                  onChange={(e) => setApplicationData({...applicationData, english_proficiency: e.target.value})}
                >
                  <option value="">Select proficiency level</option>
                  <option value="native">Native Speaker</option>
                  <option value="fluent">Fluent (IELTS 7+/TOEFL 100+)</option>
                  <option value="intermediate">Intermediate (IELTS 6-7/TOEFL 80-100)</option>
                  <option value="basic">Basic (IELTS 5-6/TOEFL 60-80)</option>
                </select>
              </div>

              <div className="form-group">
                <label>Prior Experience</label>
                <textarea
                  value={applicationData.prior_experience}
                  onChange={(e) => setApplicationData({...applicationData, prior_experience: e.target.value})}
                  placeholder="Any relevant work experience or projects"
                  rows="3"
                />
              </div>
            </div>

            <div className="modal-actions">
              <button 
                className="submit-btn"
                onClick={submitApplication}
              >
                Submit Application
              </button>
              <button 
                className="cancel-btn"
                onClick={() => setShowApplicationModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="foreign-guidelines">
        <h3>📋 International Course Guidelines</h3>
        <ul>
          <li>English proficiency test scores may be required for admission</li>
          <li>Time zone differences should be considered for live sessions</li>
          <li>Payment in foreign currency - exchange rates apply</li>
          <li>Certificate verification process takes 4-6 weeks</li>
          <li>Maximum 2 international courses per semester</li>
          <li>Scholarship opportunities available for selected courses</li>
          <li>Credit transfer subject to university approval</li>
        </ul>
      </div>
    </div>
  );
};

export default PLARForeignCourses;
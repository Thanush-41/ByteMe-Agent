import React, { useState } from 'react';
import './AICTELiteProgram.css';

const AICTELiteProgram = () => {
  const [aicteCourses] = useState([
    {
      id: 'AICTE001',
      name: 'Artificial Intelligence and Machine Learning',
      code: 'AICTE-AI-ML',
      credits: 4,
      duration: '6 months',
      category: 'AI/ML',
      level: 'Intermediate',
      provider: 'IIT Bombay',
      mode: 'Online',
      startDate: '2025-02-01',
      endDate: '2025-08-01',
      registrationFee: 0,
      examFee: 1000,
      certificate: 'AICTE Approved Certificate',
      eligibility: 'Engineering students (3rd year onwards)',
      description: 'Comprehensive AI/ML course covering fundamental and advanced concepts'
    },
    {
      id: 'AICTE002',
      name: 'Cybersecurity and Ethical Hacking',
      code: 'AICTE-CYBER',
      credits: 3,
      duration: '4 months',
      category: 'Cybersecurity',
      level: 'Advanced',
      provider: 'IIT Delhi',
      mode: 'Online',
      startDate: '2025-03-01',
      endDate: '2025-07-01',
      registrationFee: 0,
      examFee: 1000,
      certificate: 'AICTE Approved Certificate',
      eligibility: 'CS/IT students (2nd year onwards)',
      description: 'Learn cybersecurity fundamentals and ethical hacking techniques'
    },
    {
      id: 'AICTE003',
      name: 'Internet of Things (IoT)',
      code: 'AICTE-IOT',
      credits: 3,
      duration: '5 months',
      category: 'IoT',
      level: 'Intermediate',
      provider: 'IIT Madras',
      mode: 'Online',
      startDate: '2025-02-15',
      endDate: '2025-07-15',
      registrationFee: 0,
      examFee: 1000,
      certificate: 'AICTE Approved Certificate',
      eligibility: 'Engineering students (2nd year onwards)',
      description: 'Explore IoT ecosystem, sensors, connectivity, and applications'
    },
    {
      id: 'AICTE004',
      name: 'Blockchain Technology',
      code: 'AICTE-BLOCKCHAIN',
      credits: 3,
      duration: '4 months',
      category: 'Blockchain',
      level: 'Advanced',
      provider: 'IIT Kharagpur',
      mode: 'Online',
      startDate: '2025-03-15',
      endDate: '2025-07-15',
      registrationFee: 0,
      examFee: 1000,
      certificate: 'AICTE Approved Certificate',
      eligibility: 'Engineering students (3rd year onwards)',
      description: 'Understanding blockchain technology, cryptocurrencies, and smart contracts'
    },
    {
      id: 'AICTE005',
      name: 'Data Science and Analytics',
      code: 'AICTE-DS',
      credits: 4,
      duration: '6 months',
      category: 'Data Science',
      level: 'Intermediate',
      provider: 'IIT Roorkee',
      mode: 'Online',
      startDate: '2025-02-01',
      endDate: '2025-08-01',
      registrationFee: 0,
      examFee: 1000,
      certificate: 'AICTE Approved Certificate',
      eligibility: 'Engineering/Science students (2nd year onwards)',
      description: 'Comprehensive data science course with hands-on analytics projects'
    }
  ]);

  const [registeredCourses, setRegisteredCourses] = useState([]);
  const [filterCategory, setFilterCategory] = useState('all');
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const filteredCourses = aicteCourses.filter(course => {
    return filterCategory === 'all' || course.category.toLowerCase().includes(filterCategory.toLowerCase());
  });

  const handleCourseRegistration = (course) => {
    setSelectedCourse(course);
    setShowRegistrationModal(true);
  };

  const confirmRegistration = () => {
    if (!registeredCourses.find(c => c.id === selectedCourse.id)) {
      setRegisteredCourses([...registeredCourses, selectedCourse]);
      alert(`Successfully registered for ${selectedCourse.name}!`);
    }
    setShowRegistrationModal(false);
    setSelectedCourse(null);
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'AI/ML': '🤖',
      'Cybersecurity': '🔒',
      'IoT': '🌐',
      'Blockchain': '⛓️',
      'Data Science': '📊'
    };
    return icons[category] || '📚';
  };

  const getLevelColor = (level) => {
    switch(level) {
      case 'Beginner': return '#28a745';
      case 'Intermediate': return '#ffc107';
      case 'Advanced': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const isRegistrationOpen = (startDate) => {
    const registrationDeadline = new Date(startDate);
    registrationDeadline.setDate(registrationDeadline.getDate() - 7); // 7 days before start
    return new Date() < registrationDeadline;
  };

  const totalCredits = registeredCourses.reduce((sum, course) => sum + course.credits, 0);

  return (
    <div className="aicte-lite-program">
      <div className="page-header">
        <h1>🏛️ AICTE LITE Program Registration</h1>
        <p>Leadership in Teaching Excellence - Industry Relevant Courses</p>
      </div>

      <div className="aicte-info">
        <div className="info-section">
          <h3>About AICTE LITE Program</h3>
          <p>The AICTE Leadership in Teaching Excellence (LITE) program offers industry-relevant courses designed to bridge the gap between academic learning and industry requirements. These courses are offered by premier institutions and provide AICTE-approved certifications.</p>
          
          <div className="program-highlights">
            <div className="highlight">
              <span className="highlight-icon">🆓</span>
              <span>Free Registration</span>
            </div>
            <div className="highlight">
              <span className="highlight-icon">🏆</span>
              <span>AICTE Approved</span>
            </div>
            <div className="highlight">
              <span className="highlight-icon">🎓</span>
              <span>IIT Faculty</span>
            </div>
            <div className="highlight">
              <span className="highlight-icon">💻</span>
              <span>Online Mode</span>
            </div>
          </div>
        </div>
      </div>

      <div className="course-filters">
        <div className="filter-section">
          <label>Filter by Category:</label>
          <select 
            value={filterCategory} 
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="ai">AI/ML</option>
            <option value="cyber">Cybersecurity</option>
            <option value="iot">IoT</option>
            <option value="blockchain">Blockchain</option>
            <option value="data">Data Science</option>
          </select>
        </div>
      </div>

      <div className="courses-section">
        <h2>Available AICTE LITE Courses ({filteredCourses.length})</h2>
        
        <div className="courses-grid">
          {filteredCourses.map(course => {
            const isRegistered = registeredCourses.find(c => c.id === course.id);
            const registrationOpen = isRegistrationOpen(course.startDate);
            
            return (
              <div key={course.id} className={`course-card ${isRegistered ? 'registered' : ''}`}>
                <div className="course-header">
                  <div className="course-title">
                    <h3>
                      {getCategoryIcon(course.category)} {course.name}
                    </h3>
                    <span className="course-code">{course.code}</span>
                  </div>
                  <div className="course-badges">
                    <span 
                      className="level-badge"
                      style={{ backgroundColor: getLevelColor(course.level) }}
                    >
                      {course.level}
                    </span>
                    <span className="provider-badge">
                      {course.provider}
                    </span>
                  </div>
                </div>

                <div className="course-details">
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
                    <span>💻 {course.mode}</span>
                  </div>
                  <div className="detail-row">
                    <span>Start Date:</span>
                    <span>{course.startDate}</span>
                  </div>
                  <div className="detail-row">
                    <span>End Date:</span>
                    <span>{course.endDate}</span>
                  </div>
                  <div className="detail-row">
                    <span>Registration Fee:</span>
                    <span className="free">FREE</span>
                  </div>
                  <div className="detail-row">
                    <span>Exam Fee:</span>
                    <span>₹{course.examFee}</span>
                  </div>
                  <div className="detail-row">
                    <span>Eligibility:</span>
                    <span>{course.eligibility}</span>
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
                    className={`register-btn ${isRegistered ? 'registered' : ''}`}
                    onClick={() => handleCourseRegistration(course)}
                    disabled={!registrationOpen || isRegistered}
                  >
                    {!registrationOpen ? 'Registration Closed' :
                     isRegistered ? '✓ Registered' : 'Register Now'}
                  </button>
                </div>

                {!registrationOpen && (
                  <div className="registration-status">
                    ⚠️ Registration deadline passed
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {registeredCourses.length > 0 && (
        <div className="registration-summary">
          <h3>My AICTE LITE Registrations</h3>
          <div className="summary-stats">
            <div className="stat">
              <span>Courses Registered:</span>
              <span>{registeredCourses.length}</span>
            </div>
            <div className="stat">
              <span>Total Credits:</span>
              <span>{totalCredits}</span>
            </div>
            <div className="stat">
              <span>Total Exam Fee:</span>
              <span>₹{registeredCourses.length * 1000}</span>
            </div>
          </div>
          
          <div className="registered-courses-list">
            {registeredCourses.map(course => (
              <div key={course.id} className="registered-course">
                <div className="course-info">
                  <h4>{getCategoryIcon(course.category)} {course.name}</h4>
                  <p>{course.provider} • {course.duration}</p>
                </div>
                <div className="course-status">
                  <span className="status registered">Registered</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showRegistrationModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Register for AICTE LITE Course</h3>
              <button 
                className="close-btn"
                onClick={() => setShowRegistrationModal(false)}
              >
                ✕
              </button>
            </div>
            
            <div className="registration-details">
              <h4>{selectedCourse?.name}</h4>
              <div className="course-summary">
                <p><strong>Provider:</strong> {selectedCourse?.provider}</p>
                <p><strong>Duration:</strong> {selectedCourse?.duration}</p>
                <p><strong>Credits:</strong> {selectedCourse?.credits}</p>
                <p><strong>Start Date:</strong> {selectedCourse?.startDate}</p>
                <p><strong>Registration Fee:</strong> <span className="free">FREE</span></p>
                <p><strong>Exam Fee:</strong> ₹{selectedCourse?.examFee}</p>
              </div>
              
              <div className="terms-and-conditions">
                <h5>Terms and Conditions:</h5>
                <ul>
                  <li>Regular attendance and participation required</li>
                  <li>Minimum 60% marks required to pass</li>
                  <li>Exam fee to be paid before final examination</li>
                  <li>Certificate issued only after successful completion</li>
                  <li>Credits transferable to degree program</li>
                </ul>
                
                <div className="checkbox-group">
                  <input type="checkbox" id="terms" required />
                  <label htmlFor="terms">I agree to the terms and conditions</label>
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button 
                className="confirm-btn"
                onClick={confirmRegistration}
              >
                Confirm Registration
              </button>
              <button 
                className="cancel-btn"
                onClick={() => setShowRegistrationModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="aicte-guidelines">
        <h3>📋 AICTE LITE Program Guidelines</h3>
        <ul>
          <li>Open to all engineering students from 2nd year onwards</li>
          <li>Free registration with nominal exam fee</li>
          <li>Courses delivered by IIT/NIT faculty members</li>
          <li>Online mode with flexible timing</li>
          <li>AICTE approved certificates valid for placements</li>
          <li>Credits can be transferred to your degree program</li>
          <li>Maximum 2 courses can be taken per semester</li>
          <li>Regular assignments and projects are mandatory</li>
        </ul>
      </div>
    </div>
  );
};

export default AICTELiteProgram;
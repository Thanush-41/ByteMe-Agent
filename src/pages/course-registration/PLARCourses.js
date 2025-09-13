import React, { useState } from 'react';
import './PLARCourses.css';

const PLARCourses = () => {
  const [plarCourses] = useState([
    {
      id: 'PLAR101',
      name: 'Professional Communication Skills',
      code: 'PLAR101',
      credits: 2,
      duration: '3 months',
      mode: 'Online',
      provider: 'NPTEL',
      category: 'Communication',
      level: 'Beginner',
      certificate: 'Industry Recognized',
      eligibility: 'All students',
      description: 'Develop professional communication skills for workplace success'
    },
    {
      id: 'PLAR201',
      name: 'Digital Marketing Fundamentals',
      code: 'PLAR201',
      credits: 3,
      duration: '4 months',
      mode: 'Hybrid',
      provider: 'Google Digital Garage',
      category: 'Marketing',
      level: 'Intermediate',
      certificate: 'Google Certified',
      eligibility: 'Final year students',
      description: 'Comprehensive digital marketing course with industry certification'
    },
    {
      id: 'PLAR301',
      name: 'Data Analytics with Python',
      code: 'PLAR301',
      credits: 4,
      duration: '6 months',
      mode: 'Online',
      provider: 'Coursera',
      category: 'Technology',
      level: 'Advanced',
      certificate: 'IBM Professional Certificate',
      eligibility: 'CS/IT students',
      description: 'Advanced data analytics using Python and machine learning'
    },
    {
      id: 'PLAR401',
      name: 'Project Management Professional',
      code: 'PLAR401',
      credits: 3,
      duration: '5 months',
      mode: 'Blended',
      provider: 'PMI',
      category: 'Management',
      level: 'Professional',
      certificate: 'PMP Preparation',
      eligibility: 'Final year students',
      description: 'Prepare for PMP certification with industry-standard practices'
    }
  ]);

  const [selectedCourses, setSelectedCourses] = useState([]);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterLevel, setFilterLevel] = useState('all');

  const filteredCourses = plarCourses.filter(course => {
    const categoryMatch = filterCategory === 'all' || course.category.toLowerCase() === filterCategory.toLowerCase();
    const levelMatch = filterLevel === 'all' || course.level.toLowerCase() === filterLevel.toLowerCase();
    return categoryMatch && levelMatch;
  });

  const handleCourseSelect = (course) => {
    const isSelected = selectedCourses.find(c => c.id === course.id);
    
    if (isSelected) {
      setSelectedCourses(selectedCourses.filter(c => c.id !== course.id));
    } else {
      setSelectedCourses([...selectedCourses, course]);
    }
  };

  const getLevelColor = (level) => {
    switch(level) {
      case 'Beginner': return '#28a745';
      case 'Intermediate': return '#ffc107';
      case 'Advanced': return '#dc3545';
      case 'Professional': return '#6f42c1';
      default: return '#6c757d';
    }
  };

  const getModeIcon = (mode) => {
    switch(mode) {
      case 'Online': return '💻';
      case 'Hybrid': return '🔄';
      case 'Blended': return '📚';
      default: return '📖';
    }
  };

  const totalCredits = selectedCourses.reduce((sum, course) => sum + course.credits, 0);

  return (
    <div className="plar-courses">
      <div className="page-header">
        <h1>🎓 PLAR Courses</h1>
        <p>Prior Learning Assessment and Recognition - Gain credits for industry-relevant skills</p>
      </div>

      <div className="plar-info">
        <div className="info-section">
          <h3>What is PLAR?</h3>
          <p>Prior Learning Assessment and Recognition (PLAR) allows students to earn academic credits for learning acquired outside traditional academic settings through professional courses, certifications, and industry training.</p>
        </div>
      </div>

      <div className="course-filters">
        <div className="filter-section">
          <div className="filter-group">
            <label>Category:</label>
            <select 
              value={filterCategory} 
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="communication">Communication</option>
              <option value="marketing">Marketing</option>
              <option value="technology">Technology</option>
              <option value="management">Management</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Level:</label>
            <select 
              value={filterLevel} 
              onChange={(e) => setFilterLevel(e.target.value)}
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="professional">Professional</option>
            </select>
          </div>
        </div>
      </div>

      <div className="courses-section">
        <h2>Available PLAR Courses ({filteredCourses.length})</h2>
        
        <div className="courses-grid">
          {filteredCourses.map(course => {
            const isSelected = selectedCourses.find(c => c.id === course.id);
            
            return (
              <div key={course.id} className={`course-card ${isSelected ? 'selected' : ''}`}>
                <div className="course-header">
                  <div className="course-title">
                    <h3>{course.name}</h3>
                    <span className="course-code">{course.code}</span>
                  </div>
                  <div className="course-badges">
                    <span 
                      className="level-badge"
                      style={{ backgroundColor: getLevelColor(course.level) }}
                    >
                      {course.level}
                    </span>
                    <span className="mode-badge">
                      {getModeIcon(course.mode)} {course.mode}
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
                    <span>Provider:</span>
                    <span>{course.provider}</span>
                  </div>
                  <div className="detail-row">
                    <span>Category:</span>
                    <span>{course.category}</span>
                  </div>
                  <div className="detail-row">
                    <span>Certificate:</span>
                    <span className="certificate">{course.certificate}</span>
                  </div>
                  <div className="detail-row">
                    <span>Eligibility:</span>
                    <span>{course.eligibility}</span>
                  </div>
                </div>

                <div className="course-description">
                  <p>{course.description}</p>
                </div>

                <div className="course-actions">
                  <button
                    className={`select-btn ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleCourseSelect(course)}
                  >
                    {isSelected ? '✓ Enrolled' : 'Enroll Now'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedCourses.length > 0 && (
        <div className="enrollment-summary">
          <h3>Enrollment Summary</h3>
          <div className="summary-stats">
            <div className="stat">
              <span>Courses Selected:</span>
              <span>{selectedCourses.length}</span>
            </div>
            <div className="stat">
              <span>Total Credits:</span>
              <span>{totalCredits}</span>
            </div>
          </div>
          
          <div className="selected-courses-list">
            {selectedCourses.map(course => (
              <div key={course.id} className="selected-course">
                <span>{course.name}</span>
                <span>{course.credits} credits</span>
              </div>
            ))}
          </div>
          
          <button className="enroll-btn">
            Complete Enrollment ({selectedCourses.length} courses)
          </button>
        </div>
      )}

      <div className="plar-benefits">
        <h3>🌟 Benefits of PLAR Courses</h3>
        <div className="benefits-grid">
          <div className="benefit-card">
            <h4>🏆 Industry Recognition</h4>
            <p>Earn certificates recognized by leading industry partners</p>
          </div>
          <div className="benefit-card">
            <h4>📈 Career Advancement</h4>
            <p>Gain skills that directly impact your career prospects</p>
          </div>
          <div className="benefit-card">
            <h4>🎯 Flexible Learning</h4>
            <p>Study at your own pace with online and hybrid options</p>
          </div>
          <div className="benefit-card">
            <h4>📜 Academic Credits</h4>
            <p>Earn academic credits that count towards your degree</p>
          </div>
        </div>
      </div>

      <div className="plar-guidelines">
        <h3>📋 PLAR Guidelines</h3>
        <ul>
          <li>Maximum 10% of degree credits can be earned through PLAR</li>
          <li>Must maintain minimum 80% completion rate in enrolled courses</li>
          <li>Industry certifications must be from recognized providers</li>
          <li>Assessment and validation required for credit transfer</li>
          <li>Some courses may have prerequisites or eligibility criteria</li>
          <li>Credits earned are clearly marked as PLAR on transcript</li>
        </ul>
      </div>
    </div>
  );
};

export default PLARCourses;
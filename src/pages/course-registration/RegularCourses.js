import React, { useState } from 'react';
import './RegularCourses.css';

const RegularCourses = () => {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [currentSemester] = useState('Fall 2025');
  const [totalCredits, setTotalCredits] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const [availableCourses] = useState([
    {
      id: 'CS301',
      name: 'Data Structures and Algorithms',
      code: 'CS301',
      credits: 4,
      category: 'Core',
      prerequisites: ['CS201', 'CS202'],
      faculty: 'Dr. Rajesh Kumar',
      schedule: 'MWF 10:00-11:00 AM',
      capacity: 60,
      enrolled: 45,
      description: 'Fundamental data structures and algorithm design techniques'
    },
    {
      id: 'CS302',
      name: 'Database Management Systems',
      code: 'CS302',
      credits: 3,
      category: 'Core',
      prerequisites: ['CS201'],
      faculty: 'Dr. Priya Sharma',
      schedule: 'TTh 2:00-3:30 PM',
      capacity: 50,
      enrolled: 38,
      description: 'Design and implementation of database systems'
    },
    {
      id: 'CS303',
      name: 'Computer Networks',
      code: 'CS303',
      credits: 3,
      category: 'Core',
      prerequisites: ['CS202'],
      faculty: 'Dr. Anil Verma',
      schedule: 'MWF 2:00-3:00 PM',
      capacity: 55,
      enrolled: 42,
      description: 'Principles of computer networking and protocols'
    },
    {
      id: 'CS401',
      name: 'Machine Learning',
      code: 'CS401',
      credits: 4,
      category: 'Elective',
      prerequisites: ['CS301', 'MATH301'],
      faculty: 'Dr. Kavita Singh',
      schedule: 'TTh 10:00-12:00 PM',
      capacity: 40,
      enrolled: 35,
      description: 'Introduction to machine learning algorithms and applications'
    },
    {
      id: 'CS402',
      name: 'Web Development',
      code: 'CS402',
      credits: 3,
      category: 'Elective',
      prerequisites: ['CS201'],
      faculty: 'Prof. Sandeep Kumar',
      schedule: 'MW 3:00-4:30 PM',
      capacity: 45,
      enrolled: 28,
      description: 'Modern web development technologies and frameworks'
    },
    {
      id: 'MATH301',
      name: 'Discrete Mathematics',
      code: 'MATH301',
      credits: 3,
      category: 'Core',
      prerequisites: ['MATH201'],
      faculty: 'Dr. Sunita Rao',
      schedule: 'MWF 11:00-12:00 PM',
      capacity: 70,
      enrolled: 52,
      description: 'Mathematical foundations for computer science'
    },
    {
      id: 'ENG301',
      name: 'Technical Communication',
      code: 'ENG301',
      credits: 2,
      category: 'General',
      prerequisites: [],
      faculty: 'Prof. Meera Gupta',
      schedule: 'Th 1:00-3:00 PM',
      capacity: 80,
      enrolled: 65,
      description: 'Written and oral communication skills for engineers'
    }
  ]);

  const [registrationPeriod] = useState({
    startDate: '2025-01-10',
    endDate: '2025-01-20',
    isOpen: true
  });

  const maxCredits = 20;
  const minCredits = 12;

  const filteredCourses = availableCourses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.faculty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || course.category.toLowerCase() === filterCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const handleCourseSelect = (course) => {
    const isSelected = selectedCourses.find(c => c.id === course.id);
    
    if (isSelected) {
      // Remove course
      const updatedCourses = selectedCourses.filter(c => c.id !== course.id);
      setSelectedCourses(updatedCourses);
      setTotalCredits(updatedCourses.reduce((sum, c) => sum + c.credits, 0));
    } else {
      // Add course
      const newTotal = totalCredits + course.credits;
      if (newTotal <= maxCredits) {
        const updatedCourses = [...selectedCourses, course];
        setSelectedCourses(updatedCourses);
        setTotalCredits(newTotal);
      } else {
        alert(`Cannot exceed maximum credit limit of ${maxCredits}. Current: ${totalCredits}, Attempting to add: ${course.credits}`);
      }
    }
  };

  const getAvailabilityStatus = (course) => {
    const percentage = (course.enrolled / course.capacity) * 100;
    if (percentage >= 90) return 'almost-full';
    if (percentage >= 70) return 'filling-up';
    return 'available';
  };

  const getAvailabilityText = (course) => {
    const available = course.capacity - course.enrolled;
    return `${available} seats available`;
  };

  const handleRegistration = () => {
    if (totalCredits < minCredits) {
      alert(`Minimum credit requirement is ${minCredits}. Current: ${totalCredits}`);
      return;
    }

    if (selectedCourses.length === 0) {
      alert('Please select at least one course to register.');
      return;
    }

    // Simulate registration
    alert(`Registration successful! Registered for ${selectedCourses.length} courses (${totalCredits} credits)`);
  };

  const resetSelection = () => {
    setSelectedCourses([]);
    setTotalCredits(0);
  };

  return (
    <div className="regular-courses">
      <div className="page-header">
        <h1>📚 Regular Course Registration</h1>
        <p>Register for regular semester courses - {currentSemester}</p>
      </div>

      <div className="registration-info">
        <div className="info-cards">
          <div className="info-card">
            <h3>Registration Period</h3>
            <p>{registrationPeriod.startDate} to {registrationPeriod.endDate}</p>
            <span className={`status ${registrationPeriod.isOpen ? 'open' : 'closed'}`}>
              {registrationPeriod.isOpen ? '🟢 Open' : '🔴 Closed'}
            </span>
          </div>
          
          <div className="info-card">
            <h3>Credit Summary</h3>
            <p>Selected: {totalCredits} / {maxCredits} credits</p>
            <div className="credit-bar">
              <div 
                className="credit-fill"
                style={{ width: `${(totalCredits / maxCredits) * 100}%` }}
              ></div>
            </div>
            <small>Minimum: {minCredits} credits required</small>
          </div>

          <div className="info-card">
            <h3>Selected Courses</h3>
            <p>{selectedCourses.length} courses selected</p>
            <div className="selected-courses-list">
              {selectedCourses.map(course => (
                <span key={course.id} className="selected-course-tag">
                  {course.code}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="course-filters">
        <div className="filter-section">
          <div className="search-filter">
            <input
              type="text"
              placeholder="Search courses by name, code, or faculty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="category-filter">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Categories</option>
              <option value="core">Core Courses</option>
              <option value="elective">Elective Courses</option>
              <option value="general">General Courses</option>
            </select>
          </div>
        </div>
      </div>

      <div className="courses-section">
        <h2>Available Courses ({filteredCourses.length})</h2>
        
        <div className="courses-grid">
          {filteredCourses.map(course => {
            const isSelected = selectedCourses.find(c => c.id === course.id);
            const availabilityStatus = getAvailabilityStatus(course);
            
            return (
              <div 
                key={course.id} 
                className={`course-card ${isSelected ? 'selected' : ''} ${availabilityStatus}`}
              >
                <div className="course-header">
                  <div className="course-title">
                    <h3>{course.name}</h3>
                    <span className="course-code">{course.code}</span>
                  </div>
                  <div className="course-credits">
                    {course.credits} Credits
                  </div>
                </div>

                <div className="course-details">
                  <div className="detail-row">
                    <span className="detail-label">Faculty:</span>
                    <span className="detail-value">{course.faculty}</span>
                  </div>
                  
                  <div className="detail-row">
                    <span className="detail-label">Schedule:</span>
                    <span className="detail-value">{course.schedule}</span>
                  </div>
                  
                  <div className="detail-row">
                    <span className="detail-label">Category:</span>
                    <span className={`detail-value category-${course.category.toLowerCase()}`}>
                      {course.category}
                    </span>
                  </div>

                  {course.prerequisites.length > 0 && (
                    <div className="detail-row">
                      <span className="detail-label">Prerequisites:</span>
                      <span className="detail-value">
                        {course.prerequisites.join(', ')}
                      </span>
                    </div>
                  )}
                </div>

                <div className="course-description">
                  <p>{course.description}</p>
                </div>

                <div className="course-availability">
                  <div className="availability-info">
                    <span className={`availability-status ${availabilityStatus}`}>
                      {getAvailabilityText(course)}
                    </span>
                    <div className="enrollment-bar">
                      <div 
                        className="enrollment-fill"
                        style={{ width: `${(course.enrolled / course.capacity) * 100}%` }}
                      ></div>
                    </div>
                    <small>{course.enrolled}/{course.capacity} enrolled</small>
                  </div>
                </div>

                <div className="course-actions">
                  <button
                    className={`select-btn ${isSelected ? 'selected' : 'available'}`}
                    onClick={() => handleCourseSelect(course)}
                    disabled={!registrationPeriod.isOpen || (course.enrolled >= course.capacity && !isSelected)}
                  >
                    {isSelected ? '✓ Selected' : '+ Select Course'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="registration-actions">
        <div className="actions-summary">
          <p>Total: {selectedCourses.length} courses, {totalCredits} credits</p>
          {totalCredits < minCredits && (
            <p className="warning">⚠️ Minimum {minCredits} credits required</p>
          )}
        </div>
        
        <div className="action-buttons">
          <button 
            className="reset-btn"
            onClick={resetSelection}
            disabled={selectedCourses.length === 0}
          >
            🔄 Reset Selection
          </button>
          
          <button 
            className="register-btn"
            onClick={handleRegistration}
            disabled={!registrationPeriod.isOpen || totalCredits < minCredits || selectedCourses.length === 0}
          >
            📝 Register for Courses
          </button>
        </div>
      </div>

      <div className="registration-guidelines">
        <h3>📋 Registration Guidelines</h3>
        <ul>
          <li>Minimum {minCredits} credits and maximum {maxCredits} credits per semester</li>
          <li>Check prerequisites before selecting courses</li>
          <li>Registration is on a first-come, first-served basis</li>
          <li>Changes can be made during the add/drop period</li>
          <li>Contact academic advisor for course planning assistance</li>
          <li>Ensure no time conflicts between selected courses</li>
        </ul>
      </div>
    </div>
  );
};

export default RegularCourses;
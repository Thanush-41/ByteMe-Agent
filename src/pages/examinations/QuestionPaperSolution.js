import React, { useState } from 'react';
import './QuestionPaperSolution.css';

const QuestionPaperSolution = () => {
  const [questionPapers] = useState([
    {
      id: 'QP001',
      subject: 'Data Structures',
      code: 'ACSD08',
      examType: 'End Semester',
      semester: '3rd Semester',
      year: '2024',
      month: 'November',
      hasQuestions: true,
      hasSolutions: true,
      downloadCount: 245,
      rating: 4.5
    },
    {
      id: 'QP002',
      subject: 'Computer System Architecture',
      code: 'AECD04',
      examType: 'Mid Semester',
      semester: '3rd Semester',
      year: '2024',
      month: 'September',
      hasQuestions: true,
      hasSolutions: false,
      downloadCount: 189,
      rating: 4.2
    },
    {
      id: 'QP003',
      subject: 'Object Oriented Programming',
      code: 'ACSD09',
      examType: 'End Semester',
      semester: '3rd Semester',
      year: '2023',
      month: 'November',
      hasQuestions: true,
      hasSolutions: true,
      downloadCount: 412,
      rating: 4.8
    },
    {
      id: 'QP004',
      subject: 'Database Management Systems',
      code: 'ACSD10',
      examType: 'End Semester',
      semester: '4th Semester',
      year: '2024',
      month: 'April',
      hasQuestions: true,
      hasSolutions: true,
      downloadCount: 321,
      rating: 4.6
    },
    {
      id: 'QP005',
      subject: 'Software Engineering',
      code: 'ACSD11',
      examType: 'Mid Semester',
      semester: '5th Semester',
      year: '2024',
      month: 'September',
      hasQuestions: true,
      hasSolutions: false,
      downloadCount: 156,
      rating: 4.1
    }
  ]);

  const [filters, setFilters] = useState({
    semester: '',
    examType: '',
    year: '',
    hasQuestions: false,
    hasSolutions: false
  });

  const [searchTerm, setSearchTerm] = useState('');

  const filteredPapers = questionPapers.filter(paper => {
    const matchesSearch = paper.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         paper.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSemester = filters.semester === '' || paper.semester === filters.semester;
    const matchesExamType = filters.examType === '' || paper.examType === filters.examType;
    const matchesYear = filters.year === '' || paper.year === filters.year;
    const matchesQuestions = !filters.hasQuestions || paper.hasQuestions;
    const matchesSolutions = !filters.hasSolutions || paper.hasSolutions;
    
    return matchesSearch && matchesSemester && matchesExamType && matchesYear && 
           matchesQuestions && matchesSolutions;
  });

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const handleDownload = (paper, type) => {
    console.log(`Downloading ${type} for ${paper.subject}`);
    // Implementation for actual download would go here
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? 'star filled' : 'star'}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="qp-solution-page">
      <div className="page-header">
        <h1>Question Papers & Solutions</h1>
        <div className="breadcrumb">
          <span className="breadcrumb-link">Home</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-link">Examinations</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Question Papers & Solutions</span>
        </div>
      </div>

      <div className="qp-content">
        {/* Info Section */}
        <div className="info-section">
          <h2>Previous Year Question Papers</h2>
          <p>
            Access previous year question papers and their detailed solutions for effective exam preparation. 
            All papers are organized by semester, subject, and exam type for easy navigation.
          </p>
          <div className="info-stats">
            <div className="stat-item">
              <strong>{questionPapers.length}</strong>
              <span>Question Papers</span>
            </div>
            <div className="stat-item">
              <strong>{questionPapers.filter(p => p.hasSolutions).length}</strong>
              <span>With Solutions</span>
            </div>
            <div className="stat-item">
              <strong>{questionPapers.reduce((sum, p) => sum + p.downloadCount, 0)}</strong>
              <span>Total Downloads</span>
            </div>
            <div className="stat-item">
              <strong>Free</strong>
              <span>All Resources</span>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="filters-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by subject name or course code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filters-grid">
            <div className="filter-group">
              <label>Semester</label>
              <select 
                value={filters.semester} 
                onChange={(e) => handleFilterChange('semester', e.target.value)}
              >
                <option value="">All Semesters</option>
                <option value="3rd Semester">3rd Semester</option>
                <option value="4th Semester">4th Semester</option>
                <option value="5th Semester">5th Semester</option>
                <option value="6th Semester">6th Semester</option>
                <option value="7th Semester">7th Semester</option>
                <option value="8th Semester">8th Semester</option>
              </select>
            </div>
            
            <div className="filter-group">
              <label>Exam Type</label>
              <select 
                value={filters.examType} 
                onChange={(e) => handleFilterChange('examType', e.target.value)}
              >
                <option value="">All Types</option>
                <option value="Mid Semester">Mid Semester</option>
                <option value="End Semester">End Semester</option>
              </select>
            </div>
            
            <div className="filter-group">
              <label>Year</label>
              <select 
                value={filters.year} 
                onChange={(e) => handleFilterChange('year', e.target.value)}
              >
                <option value="">All Years</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
              </select>
            </div>
          </div>
          
          <div className="checkbox-filters">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={filters.hasQuestions}
                onChange={(e) => handleFilterChange('hasQuestions', e.target.checked)}
              />
              Questions Available
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={filters.hasSolutions}
                onChange={(e) => handleFilterChange('hasSolutions', e.target.checked)}
              />
              Solutions Available
            </label>
          </div>
        </div>

        {/* Question Papers Grid */}
        <div className="papers-section">
          <h2>Available Papers ({filteredPapers.length})</h2>
          <div className="papers-grid">
            {filteredPapers.map(paper => (
              <div key={paper.id} className="paper-card">
                <div className="paper-header">
                  <h3>{paper.subject}</h3>
                  <span className="course-code">{paper.code}</span>
                </div>
                
                <div className="paper-details">
                  <div className="detail-row">
                    <span className="label">Exam Type:</span>
                    <span className={`exam-type ${paper.examType.toLowerCase().replace(' ', '-')}`}>
                      {paper.examType}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Semester:</span>
                    <span>{paper.semester}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Period:</span>
                    <span>{paper.month} {paper.year}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Downloads:</span>
                    <span>{paper.downloadCount}</span>
                  </div>
                </div>
                
                <div className="paper-rating">
                  <div className="stars">
                    {renderStars(paper.rating)}
                  </div>
                  <span className="rating-value">({paper.rating})</span>
                </div>
                
                <div className="paper-availability">
                  <div className={`availability-item ${paper.hasQuestions ? 'available' : 'unavailable'}`}>
                    <span className="status-icon">{paper.hasQuestions ? '✓' : '✗'}</span>
                    <span>Question Paper</span>
                  </div>
                  <div className={`availability-item ${paper.hasSolutions ? 'available' : 'unavailable'}`}>
                    <span className="status-icon">{paper.hasSolutions ? '✓' : '✗'}</span>
                    <span>Solutions</span>
                  </div>
                </div>
                
                <div className="paper-actions">
                  <button 
                    className={`btn-download ${!paper.hasQuestions ? 'disabled' : ''}`}
                    onClick={() => handleDownload(paper, 'questions')}
                    disabled={!paper.hasQuestions}
                  >
                    Download Questions
                  </button>
                  <button 
                    className={`btn-download ${!paper.hasSolutions ? 'disabled' : ''}`}
                    onClick={() => handleDownload(paper, 'solutions')}
                    disabled={!paper.hasSolutions}
                  >
                    Download Solutions
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Study Tips Section */}
        <div className="tips-section">
          <h2>Exam Preparation Tips</h2>
          <div className="tips-grid">
            <div className="tip-card">
              <h3>Question Pattern Analysis</h3>
              <p>Study multiple years to understand recurring question patterns and important topics.</p>
            </div>
            <div className="tip-card">
              <h3>Time Management</h3>
              <p>Practice with previous papers under timed conditions to improve speed and accuracy.</p>
            </div>
            <div className="tip-card">
              <h3>Solution Understanding</h3>
              <p>Don't just memorize solutions - understand the approach and methodology used.</p>
            </div>
            <div className="tip-card">
              <h3>Regular Practice</h3>
              <p>Solve papers regularly throughout the semester, not just before exams.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionPaperSolution;
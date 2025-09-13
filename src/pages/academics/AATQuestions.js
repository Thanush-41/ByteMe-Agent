import React, { useState } from 'react';
import './AATQuestions.css';

const AATQuestions = () => {
  const [subjects] = useState([
    {
      id: 1,
      code: 'CSE101',
      name: 'Data Structures',
      questions: [
        {
          id: 1,
          type: 'Technical',
          question: 'Explain the time complexity of different sorting algorithms.',
          difficulty: 'Medium',
          marks: 10,
          selected: false
        },
        {
          id: 2,
          type: 'Practical',
          question: 'Implement a binary search tree with insertion and deletion operations.',
          difficulty: 'Hard',
          marks: 15,
          selected: true
        },
        {
          id: 3,
          type: 'Theoretical',
          question: 'Compare and contrast arrays vs linked lists.',
          difficulty: 'Easy',
          marks: 5,
          selected: false
        }
      ]
    },
    {
      id: 2,
      code: 'CSE201',
      name: 'Database Systems',
      questions: [
        {
          id: 4,
          type: 'Technical',
          question: 'Design a normalized database schema for a library management system.',
          difficulty: 'Medium',
          marks: 12,
          selected: true
        },
        {
          id: 5,
          type: 'Practical',
          question: 'Write SQL queries for complex joins and subqueries.',
          difficulty: 'Hard',
          marks: 15,
          selected: false
        }
      ]
    }
  ]);

  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);
  const [submissionStatus, setSubmissionStatus] = useState('draft'); // draft, submitted, evaluated

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return 'easy';
      case 'Medium': return 'medium';
      case 'Hard': return 'hard';
      default: return 'medium';
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'Technical': return '⚙️';
      case 'Practical': return '💻';
      case 'Theoretical': return '📚';
      default: return '❓';
    }
  };

  const handleQuestionToggle = (questionId) => {
    const updatedSubjects = subjects.map(subject => ({
      ...subject,
      questions: subject.questions.map(q => 
        q.id === questionId ? { ...q, selected: !q.selected } : q
      )
    }));
    
    const updatedSelectedSubject = updatedSubjects.find(s => s.id === selectedSubject.id);
    setSelectedSubject(updatedSelectedSubject);
  };

  const getSelectedQuestionsCount = () => {
    return selectedSubject.questions.filter(q => q.selected).length;
  };

  const getTotalMarks = () => {
    return selectedSubject.questions
      .filter(q => q.selected)
      .reduce((sum, q) => sum + q.marks, 0);
  };

  const handleSubmit = () => {
    if (getSelectedQuestionsCount() === 0) {
      alert('Please select at least one question before submitting.');
      return;
    }
    
    setSubmissionStatus('submitted');
    alert(`AAT questions submitted successfully for ${selectedSubject.name}!`);
  };

  return (
    <div className="aat-questions">
      <div className="page-header">
        <h1>❓ AAT Question Selection</h1>
        <p>Select questions for Alternative Assessment Test (AAT)</p>
      </div>

      <div className="selection-summary">
        <div className="summary-card">
          <h3>Selection Summary</h3>
          <div className="summary-stats">
            <div className="stat">
              <span className="stat-value">{getSelectedQuestionsCount()}</span>
              <span className="stat-label">Questions Selected</span>
            </div>
            <div className="stat">
              <span className="stat-value">{getTotalMarks()}</span>
              <span className="stat-label">Total Marks</span>
            </div>
            <div className="stat">
              <span className={`stat-value ${submissionStatus}`}>
                {submissionStatus.charAt(0).toUpperCase() + submissionStatus.slice(1)}
              </span>
              <span className="stat-label">Status</span>
            </div>
          </div>
        </div>
      </div>

      <div className="subject-tabs">
        <h2>Select Subject</h2>
        <div className="tabs">
          {subjects.map(subject => (
            <button
              key={subject.id}
              className={`tab ${selectedSubject.id === subject.id ? 'active' : ''}`}
              onClick={() => setSelectedSubject(subject)}
            >
              {subject.code} - {subject.name}
            </button>
          ))}
        </div>
      </div>

      <div className="questions-section">
        <div className="section-header">
          <h2>Available Questions - {selectedSubject.name}</h2>
          <p>Select the questions you want to attempt for AAT</p>
        </div>

        <div className="questions-list">
          {selectedSubject.questions.map(question => (
            <div key={question.id} className={`question-card ${question.selected ? 'selected' : ''}`}>
              <div className="question-header">
                <div className="question-checkbox">
                  <input
                    type="checkbox"
                    checked={question.selected}
                    onChange={() => handleQuestionToggle(question.id)}
                    disabled={submissionStatus === 'submitted'}
                  />
                </div>
                <div className="question-meta">
                  <span className="type-icon">{getTypeIcon(question.type)}</span>
                  <span className="question-type">{question.type}</span>
                  <span className={`difficulty-badge ${getDifficultyColor(question.difficulty)}`}>
                    {question.difficulty}
                  </span>
                  <span className="marks-badge">{question.marks} marks</span>
                </div>
              </div>

              <div className="question-content">
                <p>{question.question}</p>
              </div>

              {question.selected && (
                <div className="selection-indicator">
                  ✅ Selected for AAT
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="aat-guidelines">
        <h3>📋 AAT Guidelines</h3>
        <ul>
          <li>Select minimum 3 questions from each subject</li>
          <li>Total marks should be at least 50</li>
          <li>Mix of theoretical and practical questions recommended</li>
          <li>Questions once submitted cannot be changed</li>
          <li>AAT will be conducted within 2 weeks of submission</li>
        </ul>
      </div>

      <div className="submission-section">
        {submissionStatus === 'draft' && (
          <button 
            className="submit-btn"
            onClick={handleSubmit}
            disabled={getSelectedQuestionsCount() === 0}
          >
            🚀 Submit AAT Questions
          </button>
        )}
        
        {submissionStatus === 'submitted' && (
          <div className="submission-success">
            <div className="success-message">
              ✅ Questions submitted successfully!
              <p>Your AAT will be scheduled soon. Check your email for updates.</p>
            </div>
            <button className="view-submission-btn">
              📄 View Submission
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AATQuestions;
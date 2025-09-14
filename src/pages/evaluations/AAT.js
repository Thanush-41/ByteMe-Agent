import React, { useState } from 'react';

const AAT = () => {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    question: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    correctAnswer: '1',
    marks: '1'
  });

  const subjects = ['Data Structures', 'Database Management', 'Computer Networks', 'Operating Systems'];
  const classes = ['CSE-A', 'CSE-B', 'ECE-A', 'ECE-B', 'EEE-A', 'MECH-A'];

  const addQuestion = () => {
    if (newQuestion.question && newQuestion.option1 && newQuestion.option2) {
      setQuestions([...questions, { ...newQuestion, id: Date.now() }]);
      setNewQuestion({
        question: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        correctAnswer: '1',
        marks: '1'
      });
      alert('Question added successfully!');
    } else {
      alert('Please fill required fields');
    }
  };

  const saveAATTest = () => {
    if (questions.length > 0) {
      alert(`AAT test for ${selectedSubject} - ${selectedClass} saved with ${questions.length} questions!`);
    } else {
      alert('Please add at least one question');
    }
  };

  return (
    <div className="page-content">
      <h1>AAT (Academic Assessment Test)</h1>
      <p>Create and manage Academic Assessment Tests</p>
      
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <div>
          <label>Subject: </label>
          <select 
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            style={{ padding: '8px', marginLeft: '10px' }}
          >
            <option value="">-- Select Subject --</option>
            {subjects.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Class: </label>
          <select 
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            style={{ padding: '8px', marginLeft: '10px' }}
          >
            <option value="">-- Select Class --</option>
            {classes.map(cls => (
              <option key={cls} value={cls}>{cls}</option>
            ))}
          </select>
        </div>
      </div>

      {selectedSubject && selectedClass && (
        <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
          <h3>Add Question - {selectedSubject} ({selectedClass})</h3>
          <div style={{ marginTop: '15px' }}>
            <div style={{ marginBottom: '15px' }}>
              <label>Question: </label>
              <textarea 
                value={newQuestion.question}
                onChange={(e) => setNewQuestion({...newQuestion, question: e.target.value})}
                style={{ width: '100%', padding: '8px', marginTop: '5px', minHeight: '60px' }}
                placeholder="Enter the question"
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div>
                <label>Option A: </label>
                <input 
                  type="text"
                  value={newQuestion.option1}
                  onChange={(e) => setNewQuestion({...newQuestion, option1: e.target.value})}
                  style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                  placeholder="Option A"
                />
              </div>
              <div>
                <label>Option B: </label>
                <input 
                  type="text"
                  value={newQuestion.option2}
                  onChange={(e) => setNewQuestion({...newQuestion, option2: e.target.value})}
                  style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                  placeholder="Option B"
                />
              </div>
              <div>
                <label>Option C: </label>
                <input 
                  type="text"
                  value={newQuestion.option3}
                  onChange={(e) => setNewQuestion({...newQuestion, option3: e.target.value})}
                  style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                  placeholder="Option C (optional)"
                />
              </div>
              <div>
                <label>Option D: </label>
                <input 
                  type="text"
                  value={newQuestion.option4}
                  onChange={(e) => setNewQuestion({...newQuestion, option4: e.target.value})}
                  style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                  placeholder="Option D (optional)"
                />
              </div>
              <div>
                <label>Correct Answer: </label>
                <select 
                  value={newQuestion.correctAnswer}
                  onChange={(e) => setNewQuestion({...newQuestion, correctAnswer: e.target.value})}
                  style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                >
                  <option value="1">Option A</option>
                  <option value="2">Option B</option>
                  <option value="3">Option C</option>
                  <option value="4">Option D</option>
                </select>
              </div>
              <div>
                <label>Marks: </label>
                <input 
                  type="number"
                  value={newQuestion.marks}
                  onChange={(e) => setNewQuestion({...newQuestion, marks: e.target.value})}
                  style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                  min="1"
                  max="10"
                />
              </div>
            </div>
            <button 
              onClick={addQuestion}
              style={{ 
                marginTop: '15px', 
                padding: '10px 20px', 
                backgroundColor: '#28a745', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Add Question
            </button>
          </div>
        </div>
      )}

      {questions.length > 0 && (
        <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h3>AAT Questions ({questions.length} questions)</h3>
            <button 
              onClick={saveAATTest}
              style={{ 
                padding: '10px 20px', 
                backgroundColor: '#007bff', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Save AAT Test
            </button>
          </div>
          {questions.map((q, index) => (
            <div key={q.id} style={{ border: '1px solid #eee', borderRadius: '4px', padding: '15px', marginBottom: '15px' }}>
              <h4>Question {index + 1} (Marks: {q.marks})</h4>
              <p><strong>Q:</strong> {q.question}</p>
              <div style={{ marginLeft: '20px' }}>
                <p>A) {q.option1} {q.correctAnswer === '1' && '✓'}</p>
                <p>B) {q.option2} {q.correctAnswer === '2' && '✓'}</p>
                {q.option3 && <p>C) {q.option3} {q.correctAnswer === '3' && '✓'}</p>}
                {q.option4 && <p>D) {q.option4} {q.correctAnswer === '4' && '✓'}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AAT;
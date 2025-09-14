import React, { useState } from 'react';

const ActivityDiaryUG = () => {
  const [selectedWeek, setSelectedWeek] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [activities, setActivities] = useState([]);
  const [newActivity, setNewActivity] = useState({
    date: '',
    topic: '',
    duration: '',
    type: 'lecture'
  });

  const subjects = ['Data Structures', 'Database Management', 'Computer Networks', 'Operating Systems'];
  const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'];

  const addActivity = () => {
    if (newActivity.date && newActivity.topic && newActivity.duration) {
      setActivities([...activities, { ...newActivity, id: Date.now() }]);
      setNewActivity({ date: '', topic: '', duration: '', type: 'lecture' });
      alert('Activity added successfully!');
    } else {
      alert('Please fill all required fields');
    }
  };

  return (
    <div className="page-content">
      <h1>Activity Diary - UG</h1>
      <p>Record daily teaching activities for undergraduate courses</p>
      
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
          <label>Week: </label>
          <select 
            value={selectedWeek}
            onChange={(e) => setSelectedWeek(e.target.value)}
            style={{ padding: '8px', marginLeft: '10px' }}
          >
            <option value="">-- Select Week --</option>
            {weeks.map(week => (
              <option key={week} value={week}>{week}</option>
            ))}
          </select>
        </div>
      </div>

      {selectedSubject && selectedWeek && (
        <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
          <h3>Add Activity - {selectedSubject} ({selectedWeek})</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
            <div>
              <label>Date: </label>
              <input 
                type="date"
                value={newActivity.date}
                onChange={(e) => setNewActivity({...newActivity, date: e.target.value})}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>
            <div>
              <label>Duration (hours): </label>
              <input 
                type="number"
                value={newActivity.duration}
                onChange={(e) => setNewActivity({...newActivity, duration: e.target.value})}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                placeholder="e.g., 1.5"
              />
            </div>
            <div>
              <label>Activity Type: </label>
              <select 
                value={newActivity.type}
                onChange={(e) => setNewActivity({...newActivity, type: e.target.value})}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              >
                <option value="lecture">Lecture</option>
                <option value="practical">Practical</option>
                <option value="tutorial">Tutorial</option>
                <option value="assignment">Assignment</option>
              </select>
            </div>
            <div>
              <label>Topic Covered: </label>
              <input 
                type="text"
                value={newActivity.topic}
                onChange={(e) => setNewActivity({...newActivity, topic: e.target.value})}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                placeholder="Enter topic covered"
              />
            </div>
          </div>
          <button 
            onClick={addActivity}
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
            Add Activity
          </button>
        </div>
      )}

      {activities.length > 0 && (
        <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px' }}>
          <h3>Recorded Activities</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f5f5f5' }}>
                <th style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'left' }}>Date</th>
                <th style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'left' }}>Type</th>
                <th style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'left' }}>Topic</th>
                <th style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>Duration</th>
              </tr>
            </thead>
            <tbody>
              {activities.map(activity => (
                <tr key={activity.id}>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>{activity.date}</td>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>{activity.type}</td>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>{activity.topic}</td>
                  <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>{activity.duration}h</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ActivityDiaryUG;
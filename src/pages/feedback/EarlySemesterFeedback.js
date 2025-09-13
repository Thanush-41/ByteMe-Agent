import React, { useState } from 'react';
import './EarlySemesterFeedback.css';

const EarlySemesterFeedback = () => {
  const [feedbackData, setFeedbackData] = useState({
    semester: '',
    academicYear: '2025-26',
    courseCode: '',
    facultyName: '',
    teachingQuality: '',
    courseContent: '',
    classroomEnvironment: '',
    learningResources: '',
    overallSatisfaction: '',
    suggestions: '',
    wouldRecommend: ''
  });

  const [submittedFeedbacks] = useState([
    {
      id: 'FB001',
      courseCode: 'ACS008',
      courseName: 'Data Structures',
      facultyName: 'Dr. Rajesh Kumar',
      submissionDate: '2025-09-10',
      status: 'Submitted',
      overallRating: 4.5
    },
    {
      id: 'FB002',
      courseCode: 'ACS009',
      courseName: 'Operating Systems',
      facultyName: 'Prof. Priya Sharma',
      submissionDate: '2025-09-08',
      status: 'Submitted',
      overallRating: 4.2
    }
  ]);

  const [availableCourses] = useState([
    { code: 'ACS008', name: 'Data Structures', faculty: 'Dr. Rajesh Kumar' },
    { code: 'ACS009', name: 'Operating Systems', faculty: 'Prof. Priya Sharma' },
    { code: 'ACS010', name: 'Computer Networks', faculty: 'Dr. Suresh Patel' },
    { code: 'AHS011', name: 'Technical Communication', faculty: 'Ms. Kavita Singh' }
  ]);

  const ratingOptions = [
    { value: '5', label: 'Excellent (5)' },
    { value: '4', label: 'Very Good (4)' },
    { value: '3', label: 'Good (3)' },
    { value: '2', label: 'Fair (2)' },
    { value: '1', label: 'Poor (1)' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFeedbackData(prev => ({
      ...prev,
      [name]: value
    }));

    // Auto-populate faculty name when course is selected
    if (name === 'courseCode') {
      const selectedCourse = availableCourses.find(course => course.code === value);
      setFeedbackData(prev => ({
        ...prev,
        facultyName: selectedCourse ? selectedCourse.faculty : ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Feedback submitted successfully! Thank you for your valuable input.');
    setFeedbackData({
      semester: '',
      academicYear: '2025-26',
      courseCode: '',
      facultyName: '',
      teachingQuality: '',
      courseContent: '',
      classroomEnvironment: '',
      learningResources: '',
      overallSatisfaction: '',
      suggestions: '',
      wouldRecommend: ''
    });
  };

  const getRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push('★');
    }
    if (hasHalfStar) {
      stars.push('☆');
    }
    return stars.join('');
  };

  return (
    <div className="early-semester-feedback-page">
      <div className="page-header">
        <h1>Early Semester Feedback</h1>
        <div className="breadcrumb">
          <span>Home</span> / <span>Feedback</span> / <span>Early Semester Feedback</span>
        </div>
      </div>

      <div className="content-container">
        <div className="feedback-form-section">
          <h2>Course & Faculty Feedback</h2>
          <div className="feedback-info">
            <p><strong>Purpose:</strong> This feedback helps improve teaching methods and course delivery during the semester.</p>
            <p><strong>Deadline:</strong> Feedback should be submitted by the 6th week of the semester.</p>
            <p><strong>Anonymity:</strong> Your responses are confidential and used only for improvement purposes.</p>
          </div>

          <form onSubmit={handleSubmit} className="feedback-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="semester">Semester *</label>
                <select
                  id="semester"
                  name="semester"
                  value={feedbackData.semester}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Semester</option>
                  <option value="Semester 5">Semester 5</option>
                  <option value="Semester 6">Semester 6</option>
                  <option value="Semester 7">Semester 7</option>
                  <option value="Semester 8">Semester 8</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="academicYear">Academic Year</label>
                <input
                  type="text"
                  id="academicYear"
                  name="academicYear"
                  value={feedbackData.academicYear}
                  readOnly
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="courseCode">Course *</label>
                <select
                  id="courseCode"
                  name="courseCode"
                  value={feedbackData.courseCode}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Course</option>
                  {availableCourses.map(course => (
                    <option key={course.code} value={course.code}>
                      {course.code} - {course.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="facultyName">Faculty Name</label>
                <input
                  type="text"
                  id="facultyName"
                  name="facultyName"
                  value={feedbackData.facultyName}
                  readOnly
                />
              </div>
            </div>

            <div className="rating-section">
              <h3>Rate the following aspects (1 = Poor, 5 = Excellent)</h3>
              
              <div className="rating-group">
                <label>Teaching Quality *</label>
                <div className="rating-options">
                  {ratingOptions.map(option => (
                    <label key={option.value} className="radio-label">
                      <input
                        type="radio"
                        name="teachingQuality"
                        value={option.value}
                        checked={feedbackData.teachingQuality === option.value}
                        onChange={handleInputChange}
                        required
                      />
                      <span className="radio-custom"></span>
                      {option.label}
                    </label>
                  ))}
                </div>
              </div>

              <div className="rating-group">
                <label>Course Content & Curriculum *</label>
                <div className="rating-options">
                  {ratingOptions.map(option => (
                    <label key={option.value} className="radio-label">
                      <input
                        type="radio"
                        name="courseContent"
                        value={option.value}
                        checked={feedbackData.courseContent === option.value}
                        onChange={handleInputChange}
                        required
                      />
                      <span className="radio-custom"></span>
                      {option.label}
                    </label>
                  ))}
                </div>
              </div>

              <div className="rating-group">
                <label>Classroom Environment *</label>
                <div className="rating-options">
                  {ratingOptions.map(option => (
                    <label key={option.value} className="radio-label">
                      <input
                        type="radio"
                        name="classroomEnvironment"
                        value={option.value}
                        checked={feedbackData.classroomEnvironment === option.value}
                        onChange={handleInputChange}
                        required
                      />
                      <span className="radio-custom"></span>
                      {option.label}
                    </label>
                  ))}
                </div>
              </div>

              <div className="rating-group">
                <label>Learning Resources & Materials *</label>
                <div className="rating-options">
                  {ratingOptions.map(option => (
                    <label key={option.value} className="radio-label">
                      <input
                        type="radio"
                        name="learningResources"
                        value={option.value}
                        checked={feedbackData.learningResources === option.value}
                        onChange={handleInputChange}
                        required
                      />
                      <span className="radio-custom"></span>
                      {option.label}
                    </label>
                  ))}
                </div>
              </div>

              <div className="rating-group">
                <label>Overall Satisfaction *</label>
                <div className="rating-options">
                  {ratingOptions.map(option => (
                    <label key={option.value} className="radio-label">
                      <input
                        type="radio"
                        name="overallSatisfaction"
                        value={option.value}
                        checked={feedbackData.overallSatisfaction === option.value}
                        onChange={handleInputChange}
                        required
                      />
                      <span className="radio-custom"></span>
                      {option.label}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="wouldRecommend">Would you recommend this course to other students? *</label>
              <select
                id="wouldRecommend"
                name="wouldRecommend"
                value={feedbackData.wouldRecommend}
                onChange={handleInputChange}
                required
              >
                <option value="">Select an option</option>
                <option value="Definitely Yes">Definitely Yes</option>
                <option value="Probably Yes">Probably Yes</option>
                <option value="Maybe">Maybe</option>
                <option value="Probably No">Probably No</option>
                <option value="Definitely No">Definitely No</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="suggestions">Suggestions for Improvement</label>
              <textarea
                id="suggestions"
                name="suggestions"
                value={feedbackData.suggestions}
                onChange={handleInputChange}
                placeholder="Please provide specific suggestions to improve the course or teaching methods..."
                rows="4"
              />
            </div>

            <button type="submit" className="submit-btn">
              Submit Feedback
            </button>
          </form>
        </div>

        <div className="feedback-history-section">
          <h2>Submitted Feedbacks</h2>
          <div className="feedback-table">
            <table>
              <thead>
                <tr>
                  <th>Course Code</th>
                  <th>Course Name</th>
                  <th>Faculty</th>
                  <th>Submission Date</th>
                  <th>Rating</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {submittedFeedbacks.map(feedback => (
                  <tr key={feedback.id}>
                    <td>{feedback.courseCode}</td>
                    <td>{feedback.courseName}</td>
                    <td>{feedback.facultyName}</td>
                    <td>{feedback.submissionDate}</td>
                    <td>
                      <div className="rating-display">
                        <span className="stars">{getRatingStars(feedback.overallRating)}</span>
                        <span className="rating-value">{feedback.overallRating}/5</span>
                      </div>
                    </td>
                    <td>
                      <span className="status-badge submitted">
                        {feedback.status}
                      </span>
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

export default EarlySemesterFeedback;
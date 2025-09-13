import React, { useState } from 'react';
import './InternshipProgramRegistration.css';

const InternshipProgramRegistration = () => {
  const [formData, setFormData] = useState({
    studentId: '22BCE7508',
    name: 'Thanush',
    branch: 'Computer Science Engineering',
    semester: '5',
    cgpa: '',
    phoneNumber: '',
    email: '',
    preferredCompany: '',
    internshipType: '',
    duration: '',
    startDate: '',
    resume: null,
    coverLetter: ''
  });

  const [availablePrograms] = useState([
    {
      id: 1,
      company: 'Tech Mahindra',
      type: 'Software Development',
      duration: '6 months',
      stipend: '₹25,000/month',
      location: 'Hyderabad',
      deadline: '2025-10-15',
      requirements: 'CGPA: 7.0+, Programming Skills'
    },
    {
      id: 2,
      company: 'Infosys',
      type: 'Data Analytics',
      duration: '4 months',
      stipend: '₹20,000/month',
      location: 'Bangalore',
      deadline: '2025-10-20',
      requirements: 'CGPA: 6.5+, SQL, Python'
    },
    {
      id: 3,
      company: 'TCS',
      type: 'Full Stack Development',
      duration: '6 months',
      stipend: '₹30,000/month',
      location: 'Chennai',
      deadline: '2025-10-25',
      requirements: 'CGPA: 7.5+, React, Node.js'
    },
    {
      id: 4,
      company: 'Wipro',
      type: 'Cloud Computing',
      duration: '5 months',
      stipend: '₹22,000/month',
      location: 'Pune',
      deadline: '2025-11-01',
      requirements: 'CGPA: 7.0+, AWS/Azure Knowledge'
    }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, resume: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Internship application submitted successfully!');
  };

  return (
    <div className="internship-page">
      <div className="page-header">
        <h1>Internship Program Registration</h1>
        <div className="breadcrumb">
          <span className="breadcrumb-link">Home</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-link">Programs</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Internship Registration</span>
        </div>
      </div>

      <div className="internship-content">
        {/* Available Programs Section */}
        <div className="programs-section">
          <h2>Available Internship Programs</h2>
          <div className="programs-grid">
            {availablePrograms.map(program => (
              <div key={program.id} className="program-card">
                <div className="program-header">
                  <h3>{program.company}</h3>
                  <span className="program-type">{program.type}</span>
                </div>
                <div className="program-details">
                  <p><strong>Duration:</strong> {program.duration}</p>
                  <p><strong>Stipend:</strong> {program.stipend}</p>
                  <p><strong>Location:</strong> {program.location}</p>
                  <p><strong>Deadline:</strong> {program.deadline}</p>
                  <p><strong>Requirements:</strong> {program.requirements}</p>
                </div>
                <button className="apply-btn">Apply Now</button>
              </div>
            ))}
          </div>
        </div>

        {/* Registration Form */}
        <div className="registration-section">
          <h2>Internship Application Form</h2>
          <form onSubmit={handleSubmit} className="internship-form">
            <div className="form-row">
              <div className="form-group">
                <label>Student ID</label>
                <input 
                  type="text" 
                  name="studentId" 
                  value={formData.studentId} 
                  readOnly 
                />
              </div>
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  readOnly 
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Branch</label>
                <input 
                  type="text" 
                  name="branch" 
                  value={formData.branch} 
                  readOnly 
                />
              </div>
              <div className="form-group">
                <label>Current Semester</label>
                <input 
                  type="text" 
                  name="semester" 
                  value={formData.semester} 
                  readOnly 
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>CGPA *</label>
                <input 
                  type="number" 
                  name="cgpa" 
                  value={formData.cgpa} 
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  max="10"
                  required 
                />
              </div>
              <div className="form-group">
                <label>Phone Number *</label>
                <input 
                  type="tel" 
                  name="phoneNumber" 
                  value={formData.phoneNumber} 
                  onChange={handleInputChange}
                  required 
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email Address *</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleInputChange}
                  required 
                />
              </div>
              <div className="form-group">
                <label>Preferred Company *</label>
                <select 
                  name="preferredCompany" 
                  value={formData.preferredCompany} 
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Company</option>
                  <option value="tech-mahindra">Tech Mahindra</option>
                  <option value="infosys">Infosys</option>
                  <option value="tcs">TCS</option>
                  <option value="wipro">Wipro</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Internship Type *</label>
                <select 
                  name="internshipType" 
                  value={formData.internshipType} 
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Type</option>
                  <option value="software-development">Software Development</option>
                  <option value="data-analytics">Data Analytics</option>
                  <option value="full-stack">Full Stack Development</option>
                  <option value="cloud-computing">Cloud Computing</option>
                  <option value="cybersecurity">Cybersecurity</option>
                  <option value="ai-ml">AI/Machine Learning</option>
                </select>
              </div>
              <div className="form-group">
                <label>Preferred Duration *</label>
                <select 
                  name="duration" 
                  value={formData.duration} 
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Duration</option>
                  <option value="3-months">3 Months</option>
                  <option value="4-months">4 Months</option>
                  <option value="5-months">5 Months</option>
                  <option value="6-months">6 Months</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Preferred Start Date *</label>
                <input 
                  type="date" 
                  name="startDate" 
                  value={formData.startDate} 
                  onChange={handleInputChange}
                  required 
                />
              </div>
              <div className="form-group">
                <label>Resume Upload *</label>
                <input 
                  type="file" 
                  name="resume" 
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  required 
                />
              </div>
            </div>

            <div className="form-group full-width">
              <label>Cover Letter *</label>
              <textarea 
                name="coverLetter" 
                value={formData.coverLetter} 
                onChange={handleInputChange}
                rows="5"
                placeholder="Write a brief cover letter explaining your interest and qualifications..."
                required
              ></textarea>
            </div>

            <div className="form-actions">
              <button type="button" className="btn-secondary">Save Draft</button>
              <button type="submit" className="btn-primary">Submit Application</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InternshipProgramRegistration;
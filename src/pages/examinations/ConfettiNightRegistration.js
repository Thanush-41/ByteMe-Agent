import React, { useState } from 'react';
import './ConfettiNightRegistration.css';

const ConfettiNightRegistration = () => {
  const [formData, setFormData] = useState({
    studentId: '22BCE7508',
    name: 'Thanush',
    branch: 'Computer Science Engineering',
    semester: '5',
    phoneNumber: '',
    email: '',
    graduationYear: '2027',
    ticketType: '',
    numberOfTickets: '1',
    dietaryRestrictions: '',
    emergencyContact: '',
    tshirtSize: ''
  });

  const [eventDetails] = useState({
    eventName: 'Confetti Night 2025',
    date: '2025-12-15',
    time: '7:00 PM - 11:00 PM',
    venue: 'IARE Main Auditorium',
    dresscode: 'Formal/Semi-Formal',
    deadline: '2025-11-30'
  });

  const [ticketTypes] = useState([
    {
      type: 'Single Entry',
      price: '₹500',
      includes: 'Entry, Dinner, Entertainment'
    },
    {
      type: 'Couple Entry',
      price: '₹900',
      includes: 'Entry for 2, Dinner for 2, Entertainment, Special Seating'
    },
    {
      type: 'Group Entry (4+)',
      price: '₹1800',
      includes: 'Entry for 4+, Dinner, Entertainment, Group Photo'
    }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Confetti Night registration submitted successfully!');
  };

  return (
    <div className="confetti-page">
      <div className="page-header">
        <h1>Confetti Night Registration</h1>
        <div className="breadcrumb">
          <span className="breadcrumb-link">Home</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-link">Events</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Confetti Night</span>
        </div>
      </div>

      <div className="confetti-content">
        {/* Event Details Section */}
        <div className="event-details-section">
          <div className="event-banner">
            <h2>{eventDetails.eventName}</h2>
            <p className="event-tagline">The Most Awaited Night of the Year!</p>
          </div>
          
          <div className="event-info">
            <div className="info-grid">
              <div className="info-item">
                <strong>Date:</strong> {eventDetails.date}
              </div>
              <div className="info-item">
                <strong>Time:</strong> {eventDetails.time}
              </div>
              <div className="info-item">
                <strong>Venue:</strong> {eventDetails.venue}
              </div>
              <div className="info-item">
                <strong>Dress Code:</strong> {eventDetails.dresscode}
              </div>
              <div className="info-item">
                <strong>Registration Deadline:</strong> {eventDetails.deadline}
              </div>
            </div>
          </div>
        </div>

        {/* Ticket Types Section */}
        <div className="ticket-types-section">
          <h3>Ticket Options</h3>
          <div className="tickets-grid">
            {ticketTypes.map((ticket, index) => (
              <div key={index} className="ticket-card">
                <h4>{ticket.type}</h4>
                <div className="ticket-price">{ticket.price}</div>
                <p className="ticket-includes">{ticket.includes}</p>
                <button className="select-ticket-btn">Select</button>
              </div>
            ))}
          </div>
        </div>

        {/* Registration Form */}
        <div className="registration-section">
          <h3>Registration Form</h3>
          <form onSubmit={handleSubmit} className="confetti-form">
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
                <label>Semester</label>
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
                <label>Phone Number *</label>
                <input 
                  type="tel" 
                  name="phoneNumber" 
                  value={formData.phoneNumber} 
                  onChange={handleInputChange}
                  required 
                />
              </div>
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
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Ticket Type *</label>
                <select 
                  name="ticketType" 
                  value={formData.ticketType} 
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Ticket Type</option>
                  <option value="single">Single Entry - ₹500</option>
                  <option value="couple">Couple Entry - ₹900</option>
                  <option value="group">Group Entry (4+) - ₹1800</option>
                </select>
              </div>
              <div className="form-group">
                <label>Number of Tickets *</label>
                <select 
                  name="numberOfTickets" 
                  value={formData.numberOfTickets} 
                  onChange={handleInputChange}
                  required
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>T-Shirt Size *</label>
                <select 
                  name="tshirtSize" 
                  value={formData.tshirtSize} 
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Size</option>
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                </select>
              </div>
              <div className="form-group">
                <label>Emergency Contact *</label>
                <input 
                  type="tel" 
                  name="emergencyContact" 
                  value={formData.emergencyContact} 
                  onChange={handleInputChange}
                  placeholder="Emergency contact number"
                  required 
                />
              </div>
            </div>

            <div className="form-group full-width">
              <label>Dietary Restrictions / Food Allergies</label>
              <textarea 
                name="dietaryRestrictions" 
                value={formData.dietaryRestrictions} 
                onChange={handleInputChange}
                rows="3"
                placeholder="Please mention any dietary restrictions or food allergies..."
              ></textarea>
            </div>

            <div className="terms-section">
              <label className="checkbox-label">
                <input type="checkbox" required />
                <span>I agree to the terms and conditions and event guidelines</span>
              </label>
            </div>

            <div className="form-actions">
              <button type="button" className="btn-secondary">Save Draft</button>
              <button type="submit" className="btn-primary">Register & Pay</button>
            </div>
          </form>
        </div>

        {/* Event Highlights */}
        <div className="highlights-section">
          <h3>Event Highlights</h3>
          <div className="highlights-grid">
            <div className="highlight-item">
              <h4>🎵 Live Performances</h4>
              <p>Professional artists and student performances</p>
            </div>
            <div className="highlight-item">
              <h4>🍽️ Gala Dinner</h4>
              <p>Multi-cuisine buffet dinner</p>
            </div>
            <div className="highlight-item">
              <h4>🎭 Entertainment</h4>
              <p>Games, photo booths, and surprises</p>
            </div>
            <div className="highlight-item">
              <h4>🏆 Awards Ceremony</h4>
              <p>Recognition for outstanding students</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfettiNightRegistration;
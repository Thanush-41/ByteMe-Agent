import React, { useState } from 'react';
import './Booklets.css';

const Booklets = () => {
  const [booklets] = useState([
    {
      id: 'BOOK001',
      name: 'End Semester Answer Booklet',
      type: 'Answer Booklet',
      pages: 16,
      subject: 'All Subjects',
      format: 'A4',
      downloadUrl: '#',
      previewUrl: '#',
      lastUpdated: '2025-01-15'
    },
    {
      id: 'BOOK002',
      name: 'Mid Semester Answer Booklet',
      type: 'Answer Booklet',
      pages: 8,
      subject: 'All Subjects',
      format: 'A4',
      downloadUrl: '#',
      previewUrl: '#',
      lastUpdated: '2025-01-10'
    },
    {
      id: 'BOOK003',
      name: 'Lab Record Booklet',
      type: 'Lab Record',
      pages: 50,
      subject: 'Lab Subjects',
      format: 'A4',
      downloadUrl: '#',
      previewUrl: '#',
      lastUpdated: '2025-01-12'
    },
    {
      id: 'BOOK004',
      name: 'Project Report Format',
      type: 'Project Template',
      pages: 20,
      subject: 'Final Year Projects',
      format: 'A4',
      downloadUrl: '#',
      previewUrl: '#',
      lastUpdated: '2025-01-08'
    },
    {
      id: 'BOOK005',
      name: 'Supplementary Exam Booklet',
      type: 'Answer Booklet',
      pages: 12,
      subject: 'All Subjects',
      format: 'A4',
      downloadUrl: '#',
      previewUrl: '#',
      lastUpdated: '2025-01-05'
    }
  ]);

  const [filterType, setFilterType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBooklets = booklets.filter(booklet => {
    const matchesType = filterType === '' || booklet.type === filterType;
    const matchesSearch = booklet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booklet.subject.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleDownload = (booklet) => {
    console.log('Downloading:', booklet.name);
    // Implementation for actual download would go here
  };

  const handlePreview = (booklet) => {
    console.log('Previewing:', booklet.name);
    // Implementation for preview would go here
  };

  return (
    <div className="booklets-page">
      <div className="page-header">
        <h1>Examination Booklets</h1>
        <div className="breadcrumb">
          <span className="breadcrumb-link">Home</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-link">Examinations</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Booklets</span>
        </div>
      </div>

      <div className="booklets-content">
        {/* Info Section */}
        <div className="info-section">
          <h2>About Examination Booklets</h2>
          <p>
            Download official examination answer booklets, lab record formats, and project templates. 
            All booklets are designed according to university standards and examination requirements.
          </p>
          <div className="info-highlights">
            <div className="highlight-item">
              <strong>Official Formats</strong>
              <span>University approved templates</span>
            </div>
            <div className="highlight-item">
              <strong>Multiple Types</strong>
              <span>Answer sheets, lab records, project formats</span>
            </div>
            <div className="highlight-item">
              <strong>Free Download</strong>
              <span>All booklets available at no cost</span>
            </div>
            <div className="highlight-item">
              <strong>Regular Updates</strong>
              <span>Updated formats as per latest guidelines</span>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="filters-section">
          <div className="filters-grid">
            <div className="filter-group">
              <label>Search Booklets</label>
              <input
                type="text"
                placeholder="Search by name or subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-group">
              <label>Filter by Type</label>
              <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                <option value="">All Types</option>
                <option value="Answer Booklet">Answer Booklet</option>
                <option value="Lab Record">Lab Record</option>
                <option value="Project Template">Project Template</option>
              </select>
            </div>
          </div>
        </div>

        {/* Booklets Section */}
        <div className="booklets-section">
          <h2>Available Booklets ({filteredBooklets.length})</h2>
          <div className="booklets-grid">
            {filteredBooklets.map(booklet => (
              <div key={booklet.id} className="booklet-card">
                <div className="booklet-header">
                  <h3>{booklet.name}</h3>
                  <span className={`booklet-type type-${booklet.type.toLowerCase().replace(/\s+/g, '-')}`}>
                    {booklet.type}
                  </span>
                </div>
                <div className="booklet-details">
                  <div className="booklet-detail">
                    <strong>Subject:</strong> {booklet.subject}
                  </div>
                  <div className="booklet-detail">
                    <strong>Pages:</strong> {booklet.pages}
                  </div>
                  <div className="booklet-detail">
                    <strong>Format:</strong> {booklet.format}
                  </div>
                  <div className="booklet-detail">
                    <strong>Updated:</strong> {booklet.lastUpdated}
                  </div>
                </div>
                <div className="booklet-actions">
                  <button 
                    className="btn-preview"
                    onClick={() => handlePreview(booklet)}
                  >
                    Preview
                  </button>
                  <button 
                    className="btn-download"
                    onClick={() => handleDownload(booklet)}
                  >
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Guidelines Section */}
        <div className="guidelines-section">
          <h2>Usage Guidelines</h2>
          <ul className="guidelines-list">
            <li>Download the appropriate booklet format before your examination</li>
            <li>Print booklets on A4 size paper with standard margins</li>
            <li>Use blue or black ink only for writing in answer booklets</li>
            <li>Fill student details clearly on the cover page</li>
            <li>Do not make any modifications to the official format</li>
            <li>For lab records, follow the prescribed format strictly</li>
            <li>Project reports must adhere to the template structure</li>
            <li>Contact examination cell for any format-related queries</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Booklets;
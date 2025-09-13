import React, { useState } from 'react';
import './AccessionRegister.css';

const AccessionRegister = () => {
  const [searchFilters, setSearchFilters] = useState({
    searchTerm: '',
    category: '',
    author: '',
    yearFrom: '',
    yearTo: '',
    availability: 'all'
  });

  const [booksData] = useState([
    {
      accessionNo: 'ACC001234',
      title: 'Data Structures and Algorithms in Python',
      author: 'Michael T. Goodrich',
      publisher: 'Wiley',
      isbn: '978-1118290279',
      category: 'Computer Science',
      yearOfPublication: 2013,
      edition: '1st',
      pages: 768,
      price: 4500,
      location: 'CS-A1-S3',
      status: 'Available',
      dateAcquired: '2024-01-15',
      vendor: 'Academic Books Pvt Ltd'
    },
    {
      accessionNo: 'ACC001235',
      title: 'Operating System Concepts',
      author: 'Abraham Silberschatz',
      publisher: 'Wiley',
      isbn: '978-1118063330',
      category: 'Computer Science',
      yearOfPublication: 2018,
      edition: '10th',
      pages: 976,
      price: 5200,
      location: 'CS-A1-S4',
      status: 'Issued',
      dateAcquired: '2024-02-10',
      vendor: 'Tech Books India'
    },
    {
      accessionNo: 'ACC001236',
      title: 'Database System Concepts',
      author: 'Henry F. Korth',
      publisher: 'McGraw-Hill',
      isbn: '978-0073523323',
      category: 'Computer Science',
      yearOfPublication: 2019,
      edition: '7th',
      pages: 1376,
      price: 6800,
      location: 'CS-A2-S1',
      status: 'Available',
      dateAcquired: '2024-03-05',
      vendor: 'Educational Publishers'
    },
    {
      accessionNo: 'ACC001237',
      title: 'Linear Algebra and Its Applications',
      author: 'David C. Lay',
      publisher: 'Pearson',
      isbn: '978-0321982384',
      category: 'Mathematics',
      yearOfPublication: 2015,
      edition: '5th',
      pages: 576,
      price: 3200,
      location: 'MATH-B1-S2',
      status: 'Available',
      dateAcquired: '2024-01-20',
      vendor: 'Academic Books Pvt Ltd'
    },
    {
      accessionNo: 'ACC001238',
      title: 'Signals and Systems',
      author: 'Alan V. Oppenheim',
      publisher: 'Pearson',
      isbn: '978-0138147570',
      category: 'Electronics',
      yearOfPublication: 2016,
      edition: '2nd',
      pages: 957,
      price: 4800,
      location: 'ECE-C1-S3',
      status: 'Under Repair',
      dateAcquired: '2024-02-25',
      vendor: 'Tech Books India'
    }
  ]);

  const [filteredBooks, setFilteredBooks] = useState(booksData);

  const categories = ['Computer Science', 'Mathematics', 'Electronics', 'Mechanical', 'Civil', 'Chemical'];
  const statusOptions = ['Available', 'Issued', 'Under Repair', 'Lost', 'Damaged'];

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = () => {
    let filtered = booksData.filter(book => {
      const matchesSearchTerm = !searchFilters.searchTerm || 
        book.title.toLowerCase().includes(searchFilters.searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchFilters.searchTerm.toLowerCase()) ||
        book.accessionNo.toLowerCase().includes(searchFilters.searchTerm.toLowerCase());
      
      const matchesCategory = !searchFilters.category || book.category === searchFilters.category;
      const matchesAuthor = !searchFilters.author || 
        book.author.toLowerCase().includes(searchFilters.author.toLowerCase());
      
      const matchesYear = (!searchFilters.yearFrom || book.yearOfPublication >= parseInt(searchFilters.yearFrom)) &&
        (!searchFilters.yearTo || book.yearOfPublication <= parseInt(searchFilters.yearTo));
      
      const matchesAvailability = searchFilters.availability === 'all' || 
        (searchFilters.availability === 'available' && book.status === 'Available') ||
        (searchFilters.availability === 'issued' && book.status === 'Issued');

      return matchesSearchTerm && matchesCategory && matchesAuthor && matchesYear && matchesAvailability;
    });

    setFilteredBooks(filtered);
  };

  const clearFilters = () => {
    setSearchFilters({
      searchTerm: '',
      category: '',
      author: '',
      yearFrom: '',
      yearTo: '',
      availability: 'all'
    });
    setFilteredBooks(booksData);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Available': return '#28a745';
      case 'Issued': return '#007bff';
      case 'Under Repair': return '#ffc107';
      case 'Lost': return '#dc3545';
      case 'Damaged': return '#fd7e14';
      default: return '#6c757d';
    }
  };

  const handleReserve = (accessionNo) => {
    alert(`Book ${accessionNo} has been reserved for you. Please collect within 24 hours.`);
  };

  return (
    <div className="accession-register-page">
      <div className="page-header">
        <h1>Accession Register</h1>
        <div className="breadcrumb">
          <span>Home</span> / <span>Accession Register</span>
        </div>
      </div>

      <div className="content-container">
        <div className="search-section">
          <h2>Search Books</h2>
          <div className="search-filters">
            <div className="filter-row">
              <div className="filter-group">
                <label htmlFor="searchTerm">Search (Title/Author/Accession No.)</label>
                <input
                  type="text"
                  id="searchTerm"
                  name="searchTerm"
                  value={searchFilters.searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Enter search term..."
                />
              </div>
              <div className="filter-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={searchFilters.category}
                  onChange={handleSearchChange}
                >
                  <option value="">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="filter-group">
                <label htmlFor="author">Author</label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={searchFilters.author}
                  onChange={handleSearchChange}
                  placeholder="Author name..."
                />
              </div>
            </div>

            <div className="filter-row">
              <div className="filter-group">
                <label htmlFor="yearFrom">Year From</label>
                <input
                  type="number"
                  id="yearFrom"
                  name="yearFrom"
                  value={searchFilters.yearFrom}
                  onChange={handleSearchChange}
                  min="1900"
                  max="2025"
                />
              </div>
              <div className="filter-group">
                <label htmlFor="yearTo">Year To</label>
                <input
                  type="number"
                  id="yearTo"
                  name="yearTo"
                  value={searchFilters.yearTo}
                  onChange={handleSearchChange}
                  min="1900"
                  max="2025"
                />
              </div>
              <div className="filter-group">
                <label htmlFor="availability">Availability</label>
                <select
                  id="availability"
                  name="availability"
                  value={searchFilters.availability}
                  onChange={handleSearchChange}
                >
                  <option value="all">All Books</option>
                  <option value="available">Available Only</option>
                  <option value="issued">Issued Only</option>
                </select>
              </div>
            </div>

            <div className="filter-actions">
              <button className="search-btn" onClick={handleSearch}>
                Search Books
              </button>
              <button className="clear-btn" onClick={clearFilters}>
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        <div className="results-section">
          <div className="results-header">
            <h2>Search Results ({filteredBooks.length} books found)</h2>
            <div className="view-options">
              <button className="view-btn active">Table View</button>
              <button className="view-btn">Card View</button>
            </div>
          </div>

          <div className="books-table">
            <table>
              <thead>
                <tr>
                  <th>Accession No.</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Publisher</th>
                  <th>Category</th>
                  <th>Year</th>
                  <th>Edition</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.map(book => (
                  <tr key={book.accessionNo}>
                    <td className="accession-no">{book.accessionNo}</td>
                    <td className="book-title">{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.publisher}</td>
                    <td>{book.category}</td>
                    <td>{book.yearOfPublication}</td>
                    <td>{book.edition}</td>
                    <td className="location">{book.location}</td>
                    <td>
                      <span 
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(book.status) }}
                      >
                        {book.status}
                      </span>
                    </td>
                    <td>
                      <button className="action-btn view-btn">View</button>
                      {book.status === 'Available' && (
                        <button 
                          className="action-btn reserve-btn"
                          onClick={() => handleReserve(book.accessionNo)}
                        >
                          Reserve
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredBooks.length === 0 && (
            <div className="no-results">
              <p>No books found matching your search criteria.</p>
              <button className="clear-btn" onClick={clearFilters}>
                Clear Filters
              </button>
            </div>
          )}
        </div>

        <div className="library-stats">
          <h2>Library Statistics</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">{booksData.length}</div>
              <div className="stat-label">Total Books</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">
                {booksData.filter(book => book.status === 'Available').length}
              </div>
              <div className="stat-label">Available</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">
                {booksData.filter(book => book.status === 'Issued').length}
              </div>
              <div className="stat-label">Issued</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">
                {categories.length}
              </div>
              <div className="stat-label">Categories</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessionRegister;
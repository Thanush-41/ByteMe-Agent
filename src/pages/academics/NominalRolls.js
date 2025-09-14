import React, { useState } from 'react';

const NominalRolls = () => {
  const [selectedClass, setSelectedClass] = useState('Civil Engineering - I Semester (Section - A)');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [students] = useState([
    {
      id: 1,
      rollNo: '25951A0101',
      name: 'MOHAMMAD ABDUL RAZAK',
      gender: 'M',
      semester: 1,
      section: 'A',
      phone: '7670830310',
      parentPhone: '9010172189',
      email: 'abdulrazak786189@gmail.com',
      regulation: 'R25'
    },
    {
      id: 2,
      rollNo: '25951A0102',
      name: 'SAKA AKSHAYA',
      gender: 'F',
      semester: 1,
      section: 'A',
      phone: '7780417123',
      parentPhone: '9397348889',
      email: 'sakasonia123@gmail.com',
      regulation: 'R25'
    },
    {
      id: 3,
      rollNo: '25951A0104',
      name: 'DEVIREDDY AVANI REDDY',
      gender: 'F',
      semester: 1,
      section: 'A',
      phone: '9849136660',
      parentPhone: '7702012642',
      email: 'devireddyavani@gmail.com',
      regulation: 'R25'
    },
    {
      id: 4,
      rollNo: '25951A0105',
      name: 'BODDU DEEPAK',
      gender: 'M',
      semester: 1,
      section: 'A',
      phone: '7995966331',
      parentPhone: '7995966331',
      email: 'nithinboddu13@gmail.com',
      regulation: 'R25'
    },
    {
      id: 5,
      rollNo: '25951A0107',
      name: 'MANDALA HANSIKA LAXMI',
      gender: 'F',
      semester: 1,
      section: 'A',
      phone: '8978918666',
      parentPhone: '9912043477',
      email: 'hansikalaxmi086@gmail.com',
      regulation: 'R25'
    },
    {
      id: 6,
      rollNo: '25951A0108',
      name: 'MORLA JAIDEEP KUMAR',
      gender: 'M',
      semester: 1,
      section: 'A',
      phone: '8125952469',
      parentPhone: '9502835553',
      email: 'jaideepkumar000@gmail.com',
      regulation: 'R25'
    },
    {
      id: 7,
      rollNo: '25951A0109',
      name: 'PERIKA JANAKEE',
      gender: 'F',
      semester: 1,
      section: 'A',
      phone: '9052559646',
      parentPhone: '9133695546',
      email: 'editoramodam@gmail.com',
      regulation: 'R25'
    },
    {
      id: 8,
      rollNo: '25951A0110',
      name: 'BOINI KARTHIK',
      gender: 'M',
      semester: 1,
      section: 'A',
      phone: '9100971905',
      parentPhone: '9505264529',
      email: 'boinik885@gmail.com',
      regulation: 'R25'
    },
    {
      id: 9,
      rollNo: '25951A0111',
      name: 'KUNCHALA MAHESH',
      gender: 'M',
      semester: 1,
      section: 'A',
      phone: '8106531224',
      parentPhone: '9705859534',
      email: 'kunchalamahesh2007@gmail.com',
      regulation: 'R25'
    },
    {
      id: 10,
      rollNo: '25951A0112',
      name: 'UPPARA MANISH SAGAR',
      gender: 'M',
      semester: 1,
      section: 'A',
      phone: '8500855635',
      parentPhone: '8686899585',
      email: 'manishtinku6@gmail.com',
      regulation: 'R25'
    }
  ]);

  const classOptions = [
    'Civil Engineering - I Semester (Section - A)',
    'Civil Engineering - I Semester (Section - B)',
    'Computer Science - I Semester (Section - A)',
    'Computer Science - I Semester (Section - B)',
    'Electrical Engineering - I Semester (Section - A)',
    'Mechanical Engineering - I Semester (Section - A)'
  ];

  const handleShowStudents = () => {
    if (!selectedClass) {
      alert('Please select a section');
      return;
    }
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ 
      backgroundColor: '#f5f5f5',
      padding: '0',
      minHeight: '100%'
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#2c3e50',
        color: 'white',
        padding: '15px 20px',
        borderBottom: '3px solid #3498db'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ margin: 0, fontSize: '24px' }}>Nominal Rolls</h1>
          <div style={{ fontSize: '14px' }}>
            <span>Home</span> / <span style={{ color: '#3498db' }}>Nominal Rolls</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '20px' }}>
        {/* Section Selection */}
        <div style={{ 
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '5px',
          marginBottom: '20px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', gap: '15px', alignItems: 'end' }}>
            <div style={{ flex: 1 }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: 'bold',
                color: '#2c3e50'
              }}>
                Section
              </label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px',
                  backgroundColor: 'white'
                }}
              >
                {classOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleShowStudents}
              style={{
                padding: '10px 30px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold'
              }}
            >
              Show
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '5px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}>
          {/* Header with title and search */}
          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '15px 20px',
            borderBottom: '1px solid #dee2e6',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h3 style={{ 
              margin: 0, 
              color: '#2c3e50',
              fontSize: '16px',
              fontWeight: 'bold'
            }}>
              NOMINAL ROLLS - {selectedClass}
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '14px', color: '#666' }}>Search:</span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search students..."
                style={{
                  padding: '6px 10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px',
                  width: '200px'
                }}
              />
            </div>
          </div>

          {/* Download button */}
          <div style={{
            backgroundColor: '#e8f4fd',
            padding: '10px 20px',
            borderBottom: '1px solid #dee2e6'
          }}>
            <button style={{
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              padding: '8px 15px',
              borderRadius: '4px',
              fontSize: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}>
              📄 Download
            </button>
          </div>
          
          {/* Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ 
              width: '100%', 
              borderCollapse: 'collapse',
              fontSize: '14px'
            }}>
              <thead>
                <tr style={{ 
                  backgroundColor: '#f8f9fa',
                  borderBottom: '2px solid #dee2e6'
                }}>
                  <th style={{ 
                    padding: '12px 8px', 
                    textAlign: 'left', 
                    fontWeight: 'bold',
                    color: '#2c3e50',
                    borderRight: '1px solid #dee2e6'
                  }}>S.No.</th>
                  <th style={{ 
                    padding: '12px 8px', 
                    textAlign: 'left', 
                    fontWeight: 'bold',
                    color: '#2c3e50',
                    borderRight: '1px solid #dee2e6'
                  }}>Roll No</th>
                  <th style={{ 
                    padding: '12px 8px', 
                    textAlign: 'left', 
                    fontWeight: 'bold',
                    color: '#2c3e50',
                    borderRight: '1px solid #dee2e6'
                  }}>Student Name</th>
                  <th style={{ 
                    padding: '12px 8px', 
                    textAlign: 'left', 
                    fontWeight: 'bold',
                    color: '#2c3e50',
                    borderRight: '1px solid #dee2e6'
                  }}>Gender</th>
                  <th style={{ 
                    padding: '12px 8px', 
                    textAlign: 'left', 
                    fontWeight: 'bold',
                    color: '#2c3e50',
                    borderRight: '1px solid #dee2e6'
                  }}>Sem</th>
                  <th style={{ 
                    padding: '12px 8px', 
                    textAlign: 'left', 
                    fontWeight: 'bold',
                    color: '#2c3e50',
                    borderRight: '1px solid #dee2e6'
                  }}>Sec</th>
                  <th style={{ 
                    padding: '12px 8px', 
                    textAlign: 'left', 
                    fontWeight: 'bold',
                    color: '#2c3e50',
                    borderRight: '1px solid #dee2e6'
                  }}>Student Phone</th>
                  <th style={{ 
                    padding: '12px 8px', 
                    textAlign: 'left', 
                    fontWeight: 'bold',
                    color: '#2c3e50',
                    borderRight: '1px solid #dee2e6'
                  }}>Parent Phone</th>
                  <th style={{ 
                    padding: '12px 8px', 
                    textAlign: 'left', 
                    fontWeight: 'bold',
                    color: '#2c3e50',
                    borderRight: '1px solid #dee2e6'
                  }}>Student Email</th>
                  <th style={{ 
                    padding: '12px 8px', 
                    textAlign: 'left', 
                    fontWeight: 'bold',
                    color: '#2c3e50'
                  }}>Regulation</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student, index) => (
                  <tr key={student.id} style={{ 
                    borderBottom: '1px solid #e9ecef',
                    backgroundColor: index % 2 === 0 ? '#ffffff' : '#f8f9fa'
                  }}>
                    <td style={{ 
                      padding: '12px 8px',
                      borderRight: '1px solid #e9ecef'
                    }}>
                      <div style={{ 
                        backgroundColor: '#007bff',
                        color: 'white',
                        borderRadius: '50%',
                        width: '20px',
                        height: '20px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '11px',
                        fontWeight: 'bold'
                      }}>
                        {index + 1}
                      </div>
                    </td>
                    <td style={{ 
                      padding: '12px 8px', 
                      fontFamily: 'monospace',
                      borderRight: '1px solid #e9ecef'
                    }}>
                      {student.rollNo}
                    </td>
                    <td style={{ 
                      padding: '12px 8px', 
                      fontWeight: '500',
                      borderRight: '1px solid #e9ecef'
                    }}>
                      {student.name}
                    </td>
                    <td style={{ 
                      padding: '12px 8px',
                      borderRight: '1px solid #e9ecef'
                    }}>
                      {student.gender}
                    </td>
                    <td style={{ 
                      padding: '12px 8px',
                      borderRight: '1px solid #e9ecef'
                    }}>
                      {student.semester}
                    </td>
                    <td style={{ 
                      padding: '12px 8px',
                      borderRight: '1px solid #e9ecef'
                    }}>
                      {student.section}
                    </td>
                    <td style={{ 
                      padding: '12px 8px',
                      borderRight: '1px solid #e9ecef'
                    }}>
                      {student.phone}
                    </td>
                    <td style={{ 
                      padding: '12px 8px',
                      borderRight: '1px solid #e9ecef'
                    }}>
                      {student.parentPhone}
                    </td>
                    <td style={{ 
                      padding: '12px 8px', 
                      color: '#007bff',
                      borderRight: '1px solid #e9ecef'
                    }}>
                      {student.email}
                    </td>
                    <td style={{ 
                      padding: '12px 8px'
                    }}>
                      {student.regulation}
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

export default NominalRolls;
import React, { useState, useEffect } from 'react';
import './Student.css';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { TARGET_URL } from './Config';

const Student = () => {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const history = useHistory();

  const handleStudentName = (srn) => {
    history.push({
      pathname: './StudentDetails',
      state: { srn: srn },
      
    });
    window.location.reload();
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const exampleLink = TARGET_URL + '/students/get';

    axios
      .post(exampleLink, {
        cookies: document.cookie,
      })
      .then((response) => {
        // Handle the response
        console.log(response);
        setStudents(response.data.students);
      })
      .catch((error) => {
        // Handle the error if needed
        console.log(error);
      });
  }, []);

  return (
    <div className="student-container">
      <h2 className="student-title">Student Details</h2>
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-bar"
        />
      </div>
      <table className="student-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>SRN</th>
            <th>Department</th>
            <th>Semester</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student.srn}>
              <td>
                <button className="ButtonStyle" onClick={() => handleStudentName(student.srn)}>
                  {student.name}
                </button>
              </td>
              <td>{student.srn}</td>
              <td>{student.departmentName}</td>
              <td>{student.sem}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Student;

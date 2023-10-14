import React, { useState, useEffect } from 'react';
import './DummyAttendancePage.css';
import { TARGET_URL } from './Config';
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const DummyAttendancePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [numberInput, setNumberInput] = useState('');
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterMessage, setFilterMessage] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    const exampleLink = TARGET_URL + '/attendance/request/get/';
    const postData = {
      // Add your data to be sent in the request payload
      cookies: document.cookie,
    };

    axios
      .post(exampleLink, postData)
      .then(response => {
        const attendanceRequest = response.data.attendanceRequest;
        setOriginalData(attendanceRequest);
        setFilteredData(attendanceRequest);
        console.log('POST request successful');
        console.log(response.data);
      })
      .catch(error => {
        console.error('POST request error:', error);
      });
  }, []);

  const handleSearch = event => {
    setSearchQuery(event.target.value);
  };

  const handleNumberInputChange = event => {
    setNumberInput(event.target.value);
  };

  const handleSubmit = () => {
    const filterValue = parseFloat(numberInput);
    const filteredRows = originalData.filter(item => item.cgpa > filterValue);
    setFilteredData(filteredRows);
    setNumberInput('');
    setFilterMessage(`Displaying all students who have a CGPA of more than ${filterValue}`);
  };

  const handleAcceptRejectChange = (index, field) => {
    const updatedData = [...filteredData];
    if (!updatedData[index][field]) {
      // If the current field is not selected, mark it as selected
      updatedData[index][field] = true;
    } else {
      // If the current field is selected, deselect it
      updatedData[index][field] = false;
    }
    // If both fields are deselected, set accept to true
    if (!updatedData[index].accept && !updatedData[index].reject) {
      updatedData[index].accept = true;
    }
    setFilteredData(updatedData);
  };
  
  const handleAcceptAll = () => {
    const updatedData = filteredData.map(item => ({
      ...item,
      accept: true,
      reject: false,
    }));
    setFilteredData(updatedData);
  };

  const handleRejectAll = () => {
    const updatedData = filteredData.map(item => ({
      ...item,
      reject: true,
    }));
    setFilteredData(updatedData);
  };

  const handleDepartmentFilter = department => {
    setSelectedDepartment(department);
    const filteredRows = originalData.filter(item => item.department === department);
    setFilteredData(filteredRows);
  };

  const clearDepartmentFilter = () => {
    setSelectedDepartment(null);
    setFilteredData(originalData);
  };

  const handleSubmitChanges = async () => {
    try {
      const postData = {
        cookies: document.cookie,
        data: filteredData.map(item => ({
          id: item.id,
          result: item.accept ? 'true' : 'false',
        })),
      };
  
      const exampleLink = TARGET_URL + '/attendance/approval/'; // Replace with the actual endpoint to send the POST request
  
      const response = await axios.post(exampleLink, postData);
      console.log('POST request successful');
      console.log(response);
      // Perform any necessary actions after successful submission
    } catch (error) {
      console.error('POST request error:', error);
    }
    window.location.reload();
  };
  
  const history = useHistory();
  const handleRequestInfo = async (id) => {
    try {
      const exampleLink = TARGET_URL + '/attendance/request/details/';
      const postData = {
        id: id,
        cookies: document.cookie,
      };

      const response = await axios.post(exampleLink, postData);
      const subjectAttendanceData = response.data.subjectAttendance;
      setSelectedRow({ id, subjectAttendanceData });
      console.log('POST request successful');
      console.log(response);
    } catch (error) {
      console.error('POST request error:', error);
    }
  }

  return (
    <div className="attendance-page">
      <h1 className="tiyar">Attendance Page</h1>

      <div className="search-bar">
        <input type="text" placeholder="Search by name..." value={searchQuery} onChange={handleSearch} />
      </div>

      <div className="department-buttons">
        <button className={`ButtonStyle ${selectedDepartment === 'CSE' ? 'active' : ''}`} onClick={() => handleDepartmentFilter('CSE')}>
          CSE
        </button>
        <button className={`ButtonStyle ${selectedDepartment === 'ECE' ? 'active' : ''}`} onClick={() => handleDepartmentFilter('ECE')}>
          ECE
        </button>
        <button className={`ButtonStyle ${selectedDepartment === 'ME' ? 'active' : ''}`} onClick={() => handleDepartmentFilter('ME')}>
          ME
        </button>
        <button className={`ButtonStyle ${selectedDepartment === 'EEE' ? 'active' : ''}`} onClick={() => handleDepartmentFilter('EEE')}>
          EEE
        </button>
      </div>

      <div className="number-input-container">
        <p className="tiyar">Filter by CGPA:</p>
        <input type="number" placeholder="Enter a number" value={numberInput} onChange={handleNumberInputChange} />
        <button className="ButtonStyle" onClick={handleSubmit}>
          Apply Filter
        </button>
        <button className="ButtonStyle" onClick={handleAcceptAll}>
          Accept All
        </button>
        <button className="ButtonStyle" onClick={handleRejectAll}>
          Reject All
        </button>
      </div>

      <table className="attendance-table">
        <thead>
          <tr className="tiyar">
            <th>Name</th>
            <th>SRN</th>
            <th>Event</th>
            <th>CGPA</th>
            <th>Total Hours Claimed</th>
            <th>Request Info</th>
            <th>Accept</th>
            <th>Reject</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.srn}</td>
              <td>{item.eventname}</td>
              <td>{item.cgpa}</td>
              <td>{item.total}</td>
              <td>
                <button onClick={() => handleRequestInfo(item.id)} className="ButtonStyle">Request Info</button>
                {selectedRow && selectedRow.id === item.id && (
                  <table>
                    <thead>
                      <tr>
                        <th>Subject</th>
                        <th>Attendance</th>
                        <th>start time</th>
                        <th>end time</th>
                        <th>subject name</th>
                        <th>date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedRow.subjectAttendanceData.map((subjectAttendance, index) => (
                        <tr key={index}>
                          <td>{subjectAttendance.subject}</td>
                          <td>{subjectAttendance.current}</td>
                          <td>{subjectAttendance.starttime}</td>
                          <td>{subjectAttendance.endtime}</td>
                          <td>{subjectAttendance.subjectName}</td>
                          <td>{subjectAttendance.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </td>
              <td>
                <input
                  type="radio"
                  name={`acceptReject-${index}`}
                  checked={item.accept}
                  onChange={() => handleAcceptRejectChange(index, 'accept')}
                />
              </td>
              <td>
                <input
                  type="radio"
                  name={`acceptReject-${index}`}
                  checked={item.reject}
                  onChange={() => handleAcceptRejectChange(index, 'reject')}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <p>{filterMessage}</p>
      </div>

      <div>
        <button className="ButtonStyle" onClick={handleSubmitChanges}>
          Submit Changes
        </button>
      </div>
    </div>
  );
};

export default DummyAttendancePage;

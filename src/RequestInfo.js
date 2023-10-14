import React, { useState, useEffect } from 'react';
import './Home.css';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import cookies from 'js-cookie';
import { TARGET_URL } from './Config';

const RequestInfo = () => {
  const [subjectAttendance, setSubjectAttendance] = useState([]);
  const location = useLocation();
  const { id } = location.state;
  const history = useHistory();

  useEffect(() => {
    const fetchSubjectAttendance = async () => {
      try {
        const exampleLink = TARGET_URL + '/attendance/request/details/';
        const postData = {
          id: id,
          cookies: document.cookie,
        };

        const response = await axios.post(exampleLink, postData);
        const subjectAttendanceData = response.data.subjectAttendance;
        setSubjectAttendance(subjectAttendanceData);
        console.log('POST request successful');
        console.log(response);
      } catch (error) {
        console.error('POST request error:', error);
      }
    };

    fetchSubjectAttendance();
  }, []);

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <div>
      <h1 className="tiyar">Subject Attendance</h1>
      <table className="attendance-table">
        <thead>
          <tr className="tiyar">
            <th>Subject</th>
            <th>Subject Name</th>
            <th>Current</th>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
          </tr>
        </thead>
        <tbody>
          {subjectAttendance.map((attendance, index) => (
            <tr key={index}>
              <td>{attendance.subject}</td>
              <td>{attendance.subjectName}</td>
              <td>{attendance.current}</td>
              <td>{attendance.date}</td>
              <td>{attendance.starttime}</td>
              <td>{attendance.endtime}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="ButtonStyle" onClick={handleGoBack}>
        Back
      </button>
    </div>
  );
};

export default RequestInfo;

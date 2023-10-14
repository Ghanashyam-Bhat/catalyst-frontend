import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TARGET_URL } from './Config';
import './AttendanceApproval.css';

const AttendanceApproval = () => {
  const [attendanceRequests, setAttendanceRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState([]);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [showActions, setShowActions] = useState(false); // Add state for showing/hiding actions

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(TARGET_URL + '/attendance/request/get/', {
          cookies: document.cookie,
        });
        console.log('POST request successful:', response);
        setAttendanceRequests(response.data.attendanceRequest);
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchData();
  }, []);

  const handleButtonClick = async (id) => {
    try {
      const response = await axios.post(TARGET_URL + '/attendance/request/details/', {
        cookies: document.cookie,
        id: id,
      });
      console.log('POST request successful:', response);
      setSelectedRequest(response.data.subjectAttendance);
      setSelectedRequestId(id); // Update the selected request ID
      setShowActions(true); // Show the actions column
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const handleAttendanceApproval = async (result) => {
    try {
      if (selectedRequestId) {
        const response = await axios.post(TARGET_URL + '/attendance/approval/', {
          id: selectedRequestId,
          cookies: document.cookie,
          result: result,
        });
        console.log('POST request successful:', response);
        // Do something with the response if needed
        window.location.reload();
      } else {
        console.log('No selected request to submit.');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <div className="club-approval-container">
      <h2 className='tidi'>Attendance Approval Page</h2>
      <table className="attendance-table">
        <thead>
          <tr className='tidi'>
            <th>ID</th>
            <th>SRN</th>
            <th>Event ID</th>
            {showActions && <th>Action</th>} {/* Show the actions column conditionally */}
          </tr>
        </thead>
        <tbody>
          {attendanceRequests.map((request) => (
            <tr key={request.id} className={selectedRequestId === request.id ? 'selected-row' : ''}>
              <td>
                <button className="ButtonStyle" onClick={() => handleButtonClick(request.id)}>
                  {request.id}
                </button>
              </td>
              <td>
                <button className="ButtonStyle">{request.srn}</button>
              </td>
              <td>
                <button className="ButtonStyle">{request.eventid}</button>
              </td>
              <td>
                {selectedRequestId === request.id ? (
                  <>
                    <button onClick={() => handleAttendanceApproval(true)} className="ButtonStyle">Accept</button>
                    <button onClick={() => handleAttendanceApproval(false)} className="ButtonStyle">Reject</button>
                  </>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedRequest.length > 0 && (
        <div className="selected-request-container">
          <h3 className='tidi'>Selected Request Details</h3>
          <table className="selected-request-table">
            <thead>
              <tr className="tidi">
                {/* <id>ID</id> */}
                <th>Subject</th>
                <th>Subject Name</th>
                <th>Date</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Current Attendance</th>
                {/* <th>Student Attendance</th> */}
              </tr>
            </thead>
            <tbody>
              {selectedRequest.map((request, index) => (
                <tr className="tidi" key={request.id}>
                  {/* <td>{request.id}</td>   */}
                  <td className="tidi">{request.subject}</td>
                  <td>{request.subjectName}</td>
                  <td>{request.date}</td>
                  <td>{request.starttime}</td>
                  <td>{request.endtime}</td>
                  <td>{request.current}</td>
                  {/* <td>
                    {request.studentAttendance && request.studentAttendance.length > 0 ? (
                      <div className={`student-attendance-wrapper ${index % 2 === 0 ? 'slide-in' : 'drop-down'}`}>
                        <table className="student-attendance-table">
                          <thead>
                            <tr>
                              <th>SRN</th>
                              <th>Attendance</th>
                            </tr>
                          </thead>
                          <tbody>
                            {request.studentAttendance.map((attendance) => (
                              <tr key={attendance.id}>
                                <td>{attendance.srn}</td>
                                <td>{attendance.attendance}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p>No student attendance data available.</p>
                    )}
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AttendanceApproval;

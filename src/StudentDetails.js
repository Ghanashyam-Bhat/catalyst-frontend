import React, { useEffect, useState } from 'react';
import './StudentDetails.css';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { TARGET_URL } from './Config';

const StudentDetails = (props) => {
  const [studentDetails, setStudentDetails] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const exampleLink = TARGET_URL + '/student/profile';

    const postData = {
      cookies: document.cookie,
      srn: props.location.state.srn,
    };

    axios
      .post(exampleLink, postData)
      .then((response) => {
        // Handle the response
        console.log(response);
        setStudentDetails(response.data);
      })
      .catch((error) => {
        // Handle the error if needed
        console.log(error);
      });
  }, [props.location.state.srn]);

  const handleStudentEvent = (eventId) => {
    history.push('./EventDetails', { event: { id: eventId } });
    window.location.reload();
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 0:
      case 1:
      case 2:
        return 'Pending';
      case 3:
        return 'Accepted';
      case -1:
        return 'Rejected';
      default:
        return '';
    }
  };

  return (
    <div className="student-details-container">
      <h2 className="student-details-title">Student Details</h2>
      {studentDetails ? (
        <div className="student-details-info">
          <p>
            SRN: <span className="student-details-value">{studentDetails.srn}</span>
          </p>
          <p>
            Student Name: <span className="student-details-value">{studentDetails.name}</span>
          </p>
          <p>
            Department: <span className="student-details-value">{studentDetails.departmentName}</span>
          </p>
          <p>
            CGPA: <span className="student-details-value">{studentDetails.cgpa}</span>
          </p>
          <p>
            Semester: <span className="student-details-value">{studentDetails.sem}</span>
          </p>
        </div>
      ) : (
        <p>Loading student details...</p>
      )}
      {studentDetails && studentDetails.events && (
        <div className="student-details-events">
          <h3>Events List</h3>
          <table className="student-details-events-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {studentDetails.events.map((event, index) => (
                <tr key={index}>
                  <td>
                    <button className="ButtonStyle" onClick={() => handleStudentEvent(event.id)}>
                      {event.name}
                    </button>
                  </td>
                  <td>{event.date}</td>
                  <td>{event.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {studentDetails && studentDetails.declaration && (
        <div className="student-declaration">
          <h3>Declaration List</h3>
          <table className="student-declaration-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Status</th>
                <th>Document</th>
              </tr>
            </thead>
            <tbody>
              {studentDetails.declaration.map((declarationItem, index) => (
                <tr key={index}>
                  <td>{declarationItem.id}</td>
                  <td>{getStatusLabel(declarationItem.status)}</td>
                  <td>
                    {declarationItem.doc && (
                      <a href={TARGET_URL + declarationItem.doc} target="_blank" rel="noopener noreferrer">
                        View Document
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentDetails;

import React, { useEffect, useState } from 'react';
import './ClubList.css';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { TARGET_URL } from './Config';

const ClubList = () => {
  const [clubData, setClubData] = useState([]); // State to store the club data

  const history = useHistory();

  const handleClubEventList = (club) => {
    history.push('/ClubEventList', { club });
    window.location.reload();
  };

  useEffect(() => {
    const exampleLink = TARGET_URL + '/events/club/get/';

    axios
      .post(exampleLink, {
        cookies: document.cookie,
      })
      .then((response) => {
        // Handle the response if needed
        console.log(response);
        setClubData(response.data['clubs']); // Update the club data state with the response
      })
      .catch((error) => {
        // Handle the error if needed
        console.log(error);
      });
  }, []);

  return (
    <div className="clublists-container">
      <h2 className="clublists-title">Club Lists</h2>
      <table className="clublists-table">
        <thead>
          <tr>
            <th>Club Name</th>
            <th>Club Head</th>
            <th>Faculty in Charge</th>
            <th>ID</th>
          </tr>
        </thead>
        <tbody>
          {clubData.map((club, index) => (
            <tr key={index}>
              <td>
                <button className="ButtonStyle" onClick={() => handleClubEventList(club)}>
                  {club.name}
                </button>
              </td>
              <td>{club.headName}</td>
              <td>{club.facultyName}</td>
              <td>{club.id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClubList;

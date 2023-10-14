import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { TARGET_URL } from './Config';

const Profile = () => {
  const location = useLocation();
  const participant = location.state.participant;

  useEffect(() => {
    const data = {
      cookies: document.cookie,
      srn: participant.srn,
    };

    axios
      .post( TARGET_URL + '/student/profile', data)
      .then((response) => {
        console.log('POST request successful:', response.data);
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }, [participant]);

  return (
    <div>
      <h2>Profile</h2>
      <h3>Name: {participant.name}</h3>
      <h3>SRN: {participant.srn}</h3>
    </div>
  );
};

export default Profile;

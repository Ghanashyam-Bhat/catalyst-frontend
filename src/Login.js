import React, { useState } from 'react';
import './Login.css';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { TARGET_URL } from './Config';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleGoToNext = (who, uname) => {
    if (who === 'students') {
      history.push('/home');
      window.location.reload();
    } else if (who === 'clubs') {
      history.push('/ClubEventList', { club: { id: uname } });
      window.location.reload();
    } else if (who === 'faculties') {
      history.push('/home');
      window.location.reload();
    }
  };

  const setCookie = (name, value, options = {}) => {
    Cookies.set(name, value, options);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const jsonData = {
        id: username,
        passwd: password,
      };

      const xrl = '/proxy/login';

      axios
        .post(TARGET_URL + xrl, jsonData, {
          withCredentials: true, // Include this option to send cookies
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          console.log(document.cookie + 'hi');
          console.log(response);
          console.log(response.data['sessionid']);
          setCookie('sessionid', response.data['sessionid'], { expires: 7 });

          if (response.status === 200) {
            handleGoToNext(response.data['group'], username);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error('Error occurred while logging in:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="background-image">
        <img
          src="\src\logo.png"
          alt="Logo"
          className="small-logo"
        />
        <form className="login-form" onSubmit={handleLoginSubmit}>
          <h2 className="htwo">Sign in</h2>
          <p> </p>
          <input
            type="text"
            placeholder="Username"
            className="input-field"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <div>
            <p> </p>
          </div>
          <input
            type="password"
            placeholder="Password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p></p>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

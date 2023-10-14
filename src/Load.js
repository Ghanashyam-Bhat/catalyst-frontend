import React from 'react';
import './Load.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import { TARGET_URL } from './Config';


const Load = () => {

    const history = useHistory();
    const jsonData = {
        cookies:document.cookie
      }
        
        axios.post(TARGET_URL, jsonData, {
          withCredentials: true, // Include this option to send cookies
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          console.log(response);
      
         
          if (response.status === 200) {
            console.log("authenticated")
            history.push('/Home');
          window.location.reload();
            
          }
          else 
          {
            console.log("not authenticated");
            
          }
      
        })
        .catch((error) => {
          history.push('/Login');
          window.location.reload();
          console.log(error);
        });
      
  return (
    <div className="loader">
      <p>PLEASE wait</p>
    </div>
  );
};

export default Load;

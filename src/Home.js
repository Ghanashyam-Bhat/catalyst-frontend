import React, { useState, useEffect } from 'react';
import './Home.css';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { TARGET_URL } from './Config';

const Home = () => {
  console.log(document.cookie);
  const history = useHistory();
  const [showEventsButton, setShowEventsButton] = useState(true);
  const [showStudentButton, setShowStudentButton] = useState(false);
  const [showUploadButton, setShowUploadButton] = useState(false); // Add state for upload button visibility
  const [showApprovalButton, setShowApprovalButton] = useState(false); // Add state for approval button visibility
  const [id, setId] = useState(null); // Add state for id
  const [userGroup, setUserGroup] = useState(null); // Add state for user group
  const [menuOpen, setMenuOpen] = useState(false); // Add state for menu open/close

  const handleNav = () => {
    history.push('/Events');
    window.location.reload();
  };

  const handleProj = () => {
    history.push('/Project');
    window.location.reload();
  };

  const handleClub = () => {
    history.push('/ClubList');
    window.location.reload();
  };

  const handleStudent = () => {
    history.push('/Student');
    window.location.reload();
  };

  const handleUpload = () => {
    history.push('/Uploads');
    window.location.reload();
  };

  const jsonData = {
    cookies: document.cookie,
  };

  useEffect(() => {
    axios
      .post(TARGET_URL + '/auth', jsonData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response);

        if (response.data['group'] === 'faculties') {
          setShowEventsButton(false);
          setShowStudentButton(true);
          setShowUploadButton(false); // Hide upload button for faculties
          setShowApprovalButton(true); // Show approval button for faculties
          setUserGroup(response.data['group']); // Set user group to 'faculties'
        } else if (response.data['group'] === 'students') {
          setShowEventsButton(true);
          setShowStudentButton(false);
          setShowUploadButton(true); // Show upload button for students
          setShowApprovalButton(false); // Hide approval button for students
          setUserGroup(response.data['group']); // Set user group to 'students'
        } else if (response.data['group'] === 'clubs') {
          setShowEventsButton(false); // Hide events button for clubs
          setShowStudentButton(false);
          setShowUploadButton(false); // Hide upload button for clubs
          setShowApprovalButton(false); // Hide approval button for clubs
          setUserGroup(response.data['group']); // Set user group to 'clubs'
        } else {
          setShowEventsButton(true);
          setShowStudentButton(false);
          setShowUploadButton(false); // Hide upload button for any other group
          setShowApprovalButton(false); // Hide approval button for any other group
          setUserGroup(response.data['group']); // Set user group to other groups
        }

        // Set the id state
        setId(response.data['id']);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleLogout = () => {
    axios
      .post(TARGET_URL + '/logout', jsonData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response);

        if (response.status === 200) {
          console.log('logged out');
          console.log('removed');
        } else {
          console.log('not authenticated');
        }
      })
      .catch((error) => {
        console.log(error);
      });

    Cookies.remove('sessionid', { path: '/' });
    history.push('/Login');
    window.location.reload();
  };

  const handleApproval = () => {
    history.push('/Approval');
    window.location.reload();
  };

  const handleProfile = (srn) => {
    history.push('/StudentDetails', { srn });
    window.location.reload();
  };

  const handleMyEvents = () => {
    history.push('/ClubEventList', { club: { id } });
    window.location.reload();
  };

  const handleClubApproval = () => {
    history.push('/AttendanceApproval');
    // window.location.reload();
  };

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const dummyAttendanceRequest = () => {
    history.push('/DummyAttendancePage')
  }

  return (
    <div>
      <nav className="navbar">
        <div className="menu-icon" onClick={handleToggleMenu}>
          <div className={menuOpen ? 'menu-line open' : 'menu-line'}></div>
          <div className={menuOpen ? 'menu-line open' : 'menu-line'}></div>
          <div className={menuOpen ? 'menu-line open' : 'menu-line'}></div>
        </div>
        {menuOpen && (
          <ul className="nav-list">
            {showEventsButton && (
              <li className="nav-item">
                <button className="ButtonStyle" onClick={handleNav}>
                  Events
                </button>
              </li>
            )}
            {showStudentButton && (
              <li className="nav-item">
                <button onClick={handleStudent} className="ButtonStyle">
                  Student
                </button>
              </li>
            )}
            {userGroup === 'clubs' ? (
              <li className="nav-item">
                <button onClick={handleMyEvents} className="ButtonStyle">
                  My events
                </button>
              </li>
            ) : null}
            {userGroup !== 'clubs' ? (
              <li className="nav-item">
                <button onClick={handleProj} className="ButtonStyle">
                  Projects
                </button>
              </li>
            ) : null}
            {userGroup !== 'clubs' ? (
              <li className="nav-item">
                <button onClick={() => handleProfile(id)} className="ButtonStyle">
                  Profile
                </button>
              </li>
            ) : null}
            {userGroup == 'clubs' ? (
              <li className="nav-item">
                <button onClick={handleClubApproval} className="ButtonStyle">
                  Attendance Approval
                </button>
              </li>
            ) : null}
            <li className="nav-item">
              <button onClick={handleClub} className="ButtonStyle">
                Club
              </button>
            </li>
            {showUploadButton && (
              <li className="nav-item">
                <button onClick={handleUpload} className="ButtonStyle">
                  Upload
                </button>
              </li>
            )}
            {showApprovalButton && (
              <li className="nav-item">
                <button onClick={handleApproval} className="ButtonStyle">
                  Approval
                </button>
              </li>
            )}
            <li className="nav-item">
              <button onClick={handleLogout} className="ButtonStyle">
                Logout
              </button>
            </li>
          </ul>
        )}
      </nav>

      {userGroup === 'faculties' && (
        <p>
          <button className='ButtonStyle' onClick={dummyAttendanceRequest}>Attendance Request</button>
          <button className='ButtonStyle'>Declaration</button>
        </p>
      )}
    </div>
  );
};

export default Home;

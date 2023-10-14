import React from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink, useHistory } from 'react-router-dom';
import Login from './Login';
import Profile from './Profile';
import Events from './Events';
import EventDetails from './EventDetails';
import Project from './Project';
import Home from './Home';
import ClubList from './ClubList';
import ClubEventList from './ClubEventList';
import AddEvent from './AddEvent';
import Load from './Load';
import Participants from './Participants';
import OrgCommittee from './OrgCommittee';
import Student from './Student';
import StudentDetails from './StudentDetails';
import FormDetails from './FormDetails';
import Uploads from './Uploads';
import Approval from './Approval';
import AddOutsideEvent from './AddOutsideEvent';
import './App.css';
import AttendanceApproval from './AttendanceApproval';
import ReloadOnBackButton from './ReloadOnBackButton';
import DummyAttendancePage from './DummyAttendancePage';
import RequestInfo from './RequestInfo'

const App = () => {
  return (
    <Router forceRefresh={true}>
      <div>
        <Navbar />
        <div className="for-div2">
          <h1 className="for-h1" style={{ textAlign: 'center' }}>
            Welcome to Ed-cred
          </h1>
          <Switch>
            <Route exact path="/" component={Load} />
            <Route path="/Login" component={Login} />
            <Route path="/Home" component={Home} />
            <Route path="/Profile" component={Profile} />
            <Route path="/Events" component={Events} />
            <Route path="/EventDetails" component={EventDetails} />
            <Route path="/Project" component={Project} />
            <Route path="/ClubList" component={ClubList} />
            <Route path="/ClubEventList" component={ClubEventList} />
            <Route path="/AddEvent" component={AddEvent} />
            <Route path="/Participants" component={Participants} />
            <Route path="/OrgCommittee" component={OrgCommittee} />
            <Route path="/Student" component={Student} />
            <Route path="/StudentDetails" component={StudentDetails} />
            <Route path="/FormDetails" component={FormDetails} />
            <Route path="/Uploads" component={Uploads} />
            <Route path="/Approval" component={Approval} />
            <Route path= "/AddOutsideEvent" component={AddOutsideEvent}/>
            <Route path= "/AttendanceApproval" component={AttendanceApproval}/>
            <Route path = "/DummyAttendancePage" component={DummyAttendancePage}/>
            <Route path = "/RequestInfo" component={RequestInfo}/>
          </Switch>
        </div>
        <div className="rotating-container">
          <img className="rotating-image" src=".\peslogo.jpeg" alt="Rotating Image" />
        </div>
        <ReloadOnBackButton />
      </div>
    </Router>
  );
};

const Navbar = () => {
  const history = useHistory();
  const currentPath = history.location.pathname;

  const handleHome = () => {
    history.push('/Home');
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <ul className="nav-list">
        {currentPath !== '/Login' && currentPath !== '/home' && currentPath !== '/Home' && (
          <li className="nav-item">
            <button className="ButtonStyle" onClick={handleHome}>Home</button>
          </li>
        )}
        {/* Add other navigation items here */}
      </ul>
    </nav>
  );
};


export default App;

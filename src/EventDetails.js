import React, { useEffect, useState } from 'react';
import './EventDetails.css';
import axios from 'axios';
import { TARGET_URL } from './Config';
import { useHistory } from 'react-router-dom';

const EventDetails = (props) => {
  const { event } = props.location.state;
  const [report, setReport] = useState('');
  const [showUpload, setShowUpload] = useState(false);
  const [imageURL, setImageURL] = useState('');
  const [eventReport, setEventReport] = useState('');
  const history = useHistory();

  useEffect(() => {
    const jsonData = {
      cookies: document.cookie,
      eventid: event.id,
    };

    axios
      .post(TARGET_URL + '/events/report/get/', jsonData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response);

        if (response.status === 200) {
          setImageURL(response.data.image);
          setEventReport(response.data.report);
          console.log('verified');
          if (response.data.group === 'clubs') {
            setShowUpload(true);
            console.log('clubs');
          }
        } else {
          console.log('not verified');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [event.id]);

  const handleReportChange = (e) => {
    setReport(e.target.value);
  };

  const handleUpload = () => {
    // Handle image upload logic here
  };

  const handleModify = (event) => {
    const { id, name } = event;
    history.push('/FormDetails', { id, name });
    window.location.reload();
  };

  return (
    <div className="event-details-container">
      <h2 className="event-details-title">Event Details</h2>
      <div className="event-details-card">
        <div className="event-details-info">
          <h3 className="event-details-name">Event ID: {event.id}</h3>
          <h3 className="event-details-name">{event.name}</h3>
          <p>Date: {event.date}</p>
          <p>Details: {event.details}</p>
        </div>
      </div>
      {imageURL && (
        <div className="image-container">
          <img src={TARGET_URL + imageURL} alt="Event" className="event-image" />
        </div>
      )}
      {eventReport && (
        <div className="report-container">
          <h3>Event Report</h3>
          <p>{eventReport}</p>
        </div>
      )}
      {!eventReport && showUpload && (
        <div className="report-container">
          <button onClick={() => handleModify(event)} className="ButtonStyle">
            Add Report
          </button>
        </div>
      )}
      {/* ...existing code... */} 
    </div>
  );
};

export default EventDetails;

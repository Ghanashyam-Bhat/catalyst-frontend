import React, { useState } from 'react';
import axios from 'axios';
import { TARGET_URL } from './Config.js';
import './AddOutsideEvent.css';

const AddOutsideEvent = () => {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [date, setDate] = useState('');
  const [subject, setSubject] = useState('');
  const [eventProof, setEventProof] = useState(null);
  const cookies = document.cookie;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create form data object
    const formData = new FormData();
    formData.append('file', eventProof);
    formData.append('request', JSON.stringify({ title, details, date, subject,cookies }));

    try {
      const response = await axios.post(TARGET_URL + '/events/participant/add/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        console.log('Event added successfully!');
        // Perform any necessary actions after successful event submission
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle the error appropriately
    }
  };

  const handleFileChange = (e) => {
    setEventProof(e.target.files[0]);
  };

  return (
    <div className="add-outside-event-container">
      <h2>Add Outside Event</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-field"
          />
        </div>
        <div>
          <label htmlFor="details">Details:</label>
          <input
            type="text"
            id="details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="input-field"
          />
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="input-field"
          />
        </div>
        <div>
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="input-field"
          />
        </div>
        <div>
          <label htmlFor="eventProof">Event Proof:</label>
          <input
            type="file"
            id="eventProof"
            accept="image/*"
            onChange={handleFileChange}
            className="file-input"
          />
        </div>
        <button type="submit" className="ButtonStyle">Submit</button>
      </form>
    </div>
  );
};

export default AddOutsideEvent;

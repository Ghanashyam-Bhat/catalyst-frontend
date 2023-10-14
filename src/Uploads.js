import React, { useState } from 'react';
import './Uploads.css';
import axios from 'axios';
import { TARGET_URL } from './Config';

const Uploads = () => {
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [showAttendanceForm, setShowAttendanceForm] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [attendanceDetails, setAttendanceDetails] = useState([
    { subjectCode: '', date: '', startTime: '', endTime: '' },
  ]);
  const [newInputCount, setNewInputCount] = useState(1);
  const [eventID, setEventID] = useState('');

  const handleUploadFormClick = () => {
    setShowUploadForm(!showUploadForm);
    setShowAttendanceForm(false);
  };

  const handleAttendanceFormClick = () => {
    setShowAttendanceForm(!showAttendanceForm);
    setShowUploadForm(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('file', selectedImage);
    const request = {
      cookies: document.cookie,
    };
    formData.append('request', JSON.stringify(request));

    try {
      const response = await axios.post(TARGET_URL + '/attendance/declaration/add/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Response:', response);

      setSelectedImage(null);
      setShowUploadForm(false);
      // Handle the response or perform any other actions here
    } catch (error) {
      console.log('Error:', error);
      // Handle the error or display an error message
    }
  };

  const handleAddInput = () => {
    setAttendanceDetails([...attendanceDetails, { subjectCode: '', date: '', startTime: '', endTime: '' }]);
    setNewInputCount(newInputCount + 1);
  };

  const handleInputChange = (index, field, value) => {
    const updatedDetails = [...attendanceDetails];
    updatedDetails[index][field] = value;
    setAttendanceDetails(updatedDetails);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Filter out entries with null fields
    const filteredDetails = attendanceDetails.filter((detail) => Object.values(detail).every((field) => field !== ''));

    // Create the attendance request list
    const attendanceRequest = filteredDetails.map((detail) => ({
      subject: detail.subjectCode,
      date: detail.date,
      start: detail.startTime,
      end: detail.endTime,
    }));

    // Create the JSON payload
    const payload = {
      cookies: document.cookie,
      attendancerequest: attendanceRequest,
      eventid: eventID, // Include event ID in the payload
    };

    try {
      const response = await axios.post(TARGET_URL + '/attendance/request/add/', payload);

      console.log('Response:', response);

      setShowAttendanceForm(false);
      setAttendanceDetails([{ subjectCode: '', date: '', startTime: '', endTime: '' }]);
      setNewInputCount(1);
      setEventID(''); // Reset event ID
      // Handle the response or perform any other actions here
    } catch (error) {
      console.log('Error:', error);
      // Handle the error or display an error message
    }
  };

  return (
    <div className="uploads-container">
      <h2 className="text">Uploads</h2>
      <button className="ButtonStyle" onClick={handleUploadFormClick}>
        Upload declaration form
      </button>
      <button className="ButtonStyle" onClick={handleAttendanceFormClick}>
        Fill Attendance request form
      </button>
      {showUploadForm && (
        <div>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          <button className="ButtonStyle" onClick={handleSave}>
            Save
          </button>
        </div>
      )}
      {showAttendanceForm && (
        <form onSubmit={handleFormSubmit}>
          <div className="attendance-inputs">
            <label className="text" htmlFor="eventID">
              Event ID:
            </label>
            <input
              type="text"
              id="eventID"
              value={eventID}
              onChange={(e) => setEventID(e.target.value)}
            />
          </div>
          {attendanceDetails.map((detail, index) => (
            <div key={index} className="attendance-inputs">
              <label className="text" htmlFor={`subjectCode${index}`}>
                Subject Code:
              </label>
              <input
                type="text"
                id={`subjectCode${index}`}
                value={detail.subjectCode}
                onChange={(e) => handleInputChange(index, 'subjectCode', e.target.value)}
              />

              <label className="text" htmlFor={`date${index}`}>
                Date:
              </label>
              <input
                type="date"
                id={`date${index}`}
                value={detail.date}
                onChange={(e) => handleInputChange(index, 'date', e.target.value)}
              />

              <label className="text" htmlFor={`startTime${index}`}>
                Start Time:
              </label>
              <select
                id={`startTime${index}`}
                value={detail.startTime}
                onChange={(e) => handleInputChange(index, 'startTime', e.target.value)}
              >
                <option value="">Select start time</option>
                <option value="8:15AM">08:15AM</option>
                <option value="9:15AM">09:15AM</option>
                <option value="10:45AM">10:45AM</option>
                <option value="11:45AM">11:45AM</option>
                <option value="1:30PM">01:30PM</option>
                <option value="2:30PM">02:30PM</option>
                <option value="3:30PM">03:30PM</option>
              </select>

              <label className="text" htmlFor={`endTime${index}`}>
                End Time:
              </label>
              <select
                id={`endTime${index}`}
                value={detail.endTime}
                onChange={(e) => handleInputChange(index, 'endTime', e.target.value)}
              >
                <option value="">Select end time</option>
                <option value="9:15AM">09:15AM</option>
                <option value="10:15AM">10:15AM</option>
                <option value="11:45AM">11:45AM</option>
                <option value="12:45PM">12:45PM</option>
                <option value="2:30PM">02:30PM</option>
                <option value="3:30PM">03:30PM</option>
                <option value="4:30PM">04:30PM</option>
              </select>
            </div>
          ))}
          <button className="ButtonStyle" onClick={handleFormSubmit}>
            Save
          </button>
        </form>
      )}
      <button className="ButtonStyle" onClick={handleAddInput}>
        +
      </button>
    </div>
  );
};

export default Uploads;

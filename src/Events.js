import React, { useState, useEffect } from 'react';
import './Events.css';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { TARGET_URL } from './Config';

const Events = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [eventsData, setEventsData] = useState([]);


  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const history = useHistory();

  const handleEventDetails = (event) => {
    // Navigate to the "EventDetails" page
    history.push('/EventDetails', { event: event });
    window.location.reload();
  };

  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        const response = await axios.post(TARGET_URL + '/events/get/', {
          cookies: document.cookie,
        });
        setEventsData(response.data.events);
        console.log(response);
      } catch (error) {
        console.log('Error:', error);
      }
    };
    

    fetchEventsData();
  }, []);

  const filteredEvents = eventsData.filter(
    (event) =>
      event.name &&
      event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddOutsideEvent = () =>
  {
    history.push('/AddOutsideEvent');
    window.location.reload();
  }
  const handlecertificate = async (id,name) => {
    try {
      const response = await axios.post(TARGET_URL + '/events/certificate/', {
        cookies: document.cookie,
        eventid: id,
      });
      console.log(response)
  
      // Convert the response data to a Blob object
      const blob = new Blob([response.data], { type: 'application/pdf' });
  
      // Create a URL for the Blob object
      const url = URL.createObjectURL(blob);
  
      // Create a link element and click it to start the download
      const link = document.createElement('a');
      link.href = url;
      link.download = `${name}_certificate.pdf`;
      link.click();
  
      // Clean up the URL object
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading certificate:', error);
    }
  };
  

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <table className="events-table">
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Date</th>
            <th>Details</th>
            <th>Download Certificate</th>
          </tr>
        </thead>
        <tbody>
          {filteredEvents.map((event, index) => (
            <tr key={index}>
              <td>
                <button
                  className="ButtonStyle"
                  onClick={() => handleEventDetails(event)}
                >
                  {event.name}
                </button>
              </td>
              <td>{event.date}</td>
              <td>{event.details}</td>
              <td><button onClick={()=> handlecertificate(event.id,event.name)} className='ButtonStyle'>click to Download</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div>
      <button className='ButtonStyle' onClick={handleAddOutsideEvent}> Add outside event</button>
      </div>
    </div>
    
  );
};

export default Events;

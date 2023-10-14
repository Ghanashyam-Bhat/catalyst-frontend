import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';
import { TARGET_URL } from './Config';
import './Participants.css';

const Participants = () => {
  const location = useLocation();
  const history = useHistory();
  const [eventid, setEventId] = useState('');
  const [eventName, setEventName] = useState('');
  const [participantList, setParticipantList] = useState([]);
  const [srn, setNewParticipantSRN] = useState('');
  const [showAddParticipant, setShowAddParticipant] = useState(false);

  useEffect(() => {
    if (location.state) {
      const { eventId, eventName } = location.state;
      setEventId(eventId);
      setEventName(eventName);
      fetchData(eventId);
    }
  }, [location.state]);

  const fetchData = async (eventId) => {
    try {
      const response = await axios.post(
        TARGET_URL + '/events/participant/get/',
        {
          cookies: document.cookie,
          eventid: eventId,
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log(response);

      if (response.status === 200) {
        setParticipantList(response.data.participants);
        setShowAddParticipant(response.data.group === 'clubs');
      } else {
        console.log('Failed to fetch participants');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const handleAddParticipant = () => {
    setShowAddParticipant(true);
  };
  const refresh =() =>
  {
    window.location.reload();
  }

  
  const handleSaveParticipant = () => {
    if (srn.trim() !== '') {
      const newParticipant = {
        srn: srn,
        //name: 'John Doe', // Replace with actual participant name
      };
      setParticipantList((prevList) => [...prevList, newParticipant]);
      setNewParticipantSRN('');
      setShowAddParticipant(false);
      
      
      
      
      const formData = new FormData();
      
      formData.append('request', JSON.stringify({ eventid, srn, cookies:document.cookie }));
  
      axios
        .post(TARGET_URL + '/events/participant/add/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          console.log('POST request successful:', response.data);
          refresh();
          
        })
        
        .catch((error) => {
          console.log('Error:', error);
        });
        
        
    }
    
  };
  
  

  const handleProfile = (srn) => {
    history.push('/StudentDetails', { srn });
    window.location.reload();
  };

  return (
    <div>
      <h2 className="htwo">Participants</h2>
      <h3 className="hthree">Event ID: {eventid}</h3>
      <h3 className="hthree">Event Name: {eventName}</h3>
      <table className="participants-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>SRN</th>
          </tr>
        </thead>
        <tbody>
          {participantList && participantList.length > 0 ? (
            participantList.map((participant, index) => (
              <tr key={index}>
                <td>
                  <button className="ButtonStyle" onClick={() => handleProfile(participant.srn)}>
                    {participant.name}
                  </button>
                </td>
                <td>{participant.srn}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No participants found.</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        {showAddParticipant && (
          <div>
            <input
              type="text"
              placeholder="Participant SRN"
              value={srn}
              onChange={(e) => setNewParticipantSRN(e.target.value)}
            />
            <button className="ButtonStyle" onClick={handleSaveParticipant}>
              Save Participant
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Participants;

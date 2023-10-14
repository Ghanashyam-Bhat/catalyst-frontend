import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TARGET_URL } from './Config';
import './OrgCommittee.css';

const OrgCommittee = ({ location }) => {
  const [showAddMember, setShowAddMember] = useState(false);
  const [newMemberSRN, setNewMemberSRN] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [eventId, setEventId] = useState(location.state.eventId);
  const [organisers, setOrganisers] = useState([]);
  const [group, setGroup] = useState('');

  const handleAddMember = () => {
    setShowAddMember(true);
  };

  const handleSaveMember = async () => {
    if (newMemberSRN.trim() !== '' && selectedRole !== '') {
      try {
        const response = await axios.post(
          TARGET_URL + '/events/organizer/add/',
          {
            cookies: document.cookie,
            eventid: eventId,
            role: selectedRole,
            srn: newMemberSRN,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        // Handle the response as needed
        console.log('Response:', response.data);

        // Reset the input values
        setNewMemberSRN('');
        setSelectedRole('');
        setShowAddMember(false);
      } catch (error) {
        console.log('Error:', error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          TARGET_URL + '/events/organizer/get/',
          {
            cookies: document.cookie,
            eventid: eventId,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        // Handle the response as needed
        console.log('Response:', response.data);

        if (response.status === 200) {
          setOrganisers(response.data['organizers'] || []);
          setGroup(response.data['group'] || '');
        }
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchData();
  }, [eventId]);

  return (
    <div className="org-committee-container">
      <h2 className="org-committee-title">Org Committee - Event ID: {eventId}</h2>
      <div>
        <h3 className="hthree">Organisers:</h3>
        {organisers.length > 0 ? (
          <table className="org-committee-table">
            <thead>
              <tr>
                <th>SRN</th>
                <th>Name</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {organisers.map((organizer, index) => (
                <tr key={index}>
                  <td>{organizer.srn}</td>
                  <td>{organizer.name}</td>
                  <td>{organizer.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No organisers found.</p>
        )}
      </div>
      {group === 'clubs' && showAddMember ? (
        <div>
          <input
            type="text"
            placeholder="SRN"
            value={newMemberSRN}
            onChange={(e) => setNewMemberSRN(e.target.value)}
          />
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="">Select Role</option>
            <option value="Domain head">Domain head</option>
            <option value="Organiser">Organiser</option>
            <option value="Volunteer">Volunteer</option>
          </select>
          <button className="ButtonStyle" onClick={handleSaveMember}>
            Save
          </button>
        </div>
      ) : (
        group === 'clubs' && (
          <button className="ButtonStyle" onClick={handleAddMember}>
            Add Member
          </button>
        )
      )}
    </div>
  );
};

export default OrgCommittee;

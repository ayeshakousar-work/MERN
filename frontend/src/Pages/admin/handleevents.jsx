import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './handleevents.css';

export default function EventManagement() {
  const [events, setEvents] = useState([]);
  const [eventName, setEventName] = useState('');
  const [venue, setVenue] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [description, setDescription] = useState('');
  const [selectedEventId, setSelectedEventId] = useState(null);
  const BASE_URL =  process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${BASE_URL}admin/events`);
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleAddOrUpdateEvent = async () => {
    const eventData = { eventName, venue, startTime, endTime, description };
    const confirmed = window.confirm('Are you sure??');
    if (confirmed) {
    try {
     
      if (selectedEventId) {
        await axios.put(`${BASE_URL}admin/updateevents/${selectedEventId}`, eventData);
      } else {
        await axios.post(`${BASE_URL}admin/addevents`, eventData);
      }
      fetchEvents();
      setEventName('');
      setVenue('');
      setStartTime('');
      setEndTime('');
      setDescription('');
      setSelectedEventId(null);
    } catch (error) {
      console.error(`Error ${selectedEventId ? 'updating' : 'adding'} event:`, error);
    }
  }
  };

  const handleDeleteEvent = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this event?');
    if (confirmed) {
      try {
        await axios.delete(`${BASE_URL}admin/deleteevents/${id}`);
        fetchEvents();
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  const handleEditEvent = (event) => {
    setEventName(event.eventName);
    setVenue(event.venue);
    setStartTime(new Date(event.startTime).toISOString().slice(0, 16));
    setEndTime(new Date(event.endTime).toISOString().slice(0, 16));
    setDescription(event.description);
    setSelectedEventId(event._id);
  };

  return (
    <div className="event-management">
      <h2>Event Management</h2>
      <div className="form-section">
        <h3>{selectedEventId ? 'Update Event' : 'Add New Event'}</h3>
        <input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} placeholder="Event Name" />
        <input type="text" value={venue} onChange={(e) => setVenue(e.target.value)} placeholder="Venue" />
        <input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        <input type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
        <button onClick={handleAddOrUpdateEvent}>{selectedEventId ? 'Update Event' : 'Add Event'}</button>
      </div>
      <div className="events-section">
        <h3>Upcoming Events</h3>
        <ul>
          {events.map((event) => (
            <li key={event._id}>
              <p>{event.eventName}</p>
              <p>{event.venue}</p>
              <p>Start Time: {new Date(event.startTime).toLocaleString()}</p>
              <p>End Time: {new Date(event.endTime).toLocaleString()}</p>
              <p>{event.description}</p>
              <button onClick={() => handleEditEvent(event)}>Edit</button>
              <button onClick={() => handleDeleteEvent(event._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

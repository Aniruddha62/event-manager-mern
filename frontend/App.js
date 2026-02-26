
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({ name: '', date: '', location: '', status: '' });

  const fetchEvents = async () => {
    const res = await axios.get('http://localhost:5000/api/events');
    setEvents(res.data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/events', form);
    setForm({ name: '', date: '', location: '', status: '' });
    fetchEvents();
  };

  const deleteEvent = async (id) => {
    await axios.delete(`http://localhost:5000/api/events/${id}`);
    fetchEvents();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Simple Event Manager</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={form.name} onChange={e => setForm({...form, name:e.target.value})} required />
        <input placeholder="Date" value={form.date} onChange={e => setForm({...form, date:e.target.value})} required />
        <input placeholder="Location" value={form.location} onChange={e => setForm({...form, location:e.target.value})} required />
        <input placeholder="Status" value={form.status} onChange={e => setForm({...form, status:e.target.value})} required />
        <button type="submit">Add Event</button>
      </form>
      <ul>
        {events.map(event => (
          <li key={event._id}>
            {event.name} | {event.date} | {event.location} | {event.status}
            <button onClick={() => deleteEvent(event._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import axios from 'axios';
import './Booking.css';
import Cookies from 'js-cookie'

const Booking = () => {
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get('token');
    console.log(token)

    try {
      const response = await axios.post('http://localhost:5000/api/appointments', 
        { date }, 
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      setMessage('Appointment booked successfully');
    } catch (error) {
      console.error('Error booking appointment:', error);
      setMessage('Booking failed');
    }
  };

  const getCurrentDateTimeLocal = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  };

  return (
    <div className="booking-container">
      <h2>Book Appointment</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="datetime-local" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
          min={getCurrentDateTimeLocal()}
          required 
        />
        <button type="submit">Book</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Booking;

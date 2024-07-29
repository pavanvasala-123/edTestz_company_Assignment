import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AppointmentHistory.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const AppointmentHistory = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate()

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = Cookies.get('token');
      try {
        const { data } = await axios.get('http://localhost:5000/api/appointments', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setAppointments(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch appointments:', error);
        setError('Failed to fetch appointments');
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  const bookappointment = () =>{
    navigate("/book-appointment")
  }

  return (
    <div className="appointment-history-container">
      <h2>Appointment History</h2>
      <div className="table-container">
        {
          appointments.length == 0 ? 
          <>
            <p>No Appointments</p>
            <button onClick={bookappointment} className='myButton'>Shedule Appointment</button>
          </> 
          :  
          <table className="appointment-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => {
              const date = new Date(appointment.date);
              const formattedDate = date.toLocaleDateString();
              const formattedTime = date.toLocaleTimeString();
              return (
                <tr key={appointment.id}>
                  <td>{appointment.id}</td>
                  <td>{formattedDate}</td>
                  <td>{formattedTime}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        }
       
      </div>
    </div>
  );
};

export default AppointmentHistory;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';
import { useAuth } from '../AuthContext';
const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/signin', { username, password });
      // console.log(data)
      login(data.token);
      navigate('/appointments');
    } catch (error) {
      console.log(error.response.data.error)
      setError(error.response.data.error);
    }
  };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        <button type="submit" >Sign In</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default SignIn;

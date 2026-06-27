import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation
import './login.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook for navigation
const BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000";
  const handleLogin = async () => {
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/user/login`, { email, password });
      // Handle successful login
      console.log(response.data);
      // Display success message
      alert('Login successful!');
      // Call the onLogin function to update isAuthenticated state in parent component
      const { token } = response.data;
      onLogin(token);
      // Redirect to home page
      navigate('/');
    } catch (error) {
      setError('Invalid email or password');
      console.error('Error:', error);
    }
  };

  return (
    <div className='container'>
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {error && <p>{error}</p>}
      <h3>Don't have an account? <span onClick={() => navigate('/register')}>Register</span></h3>
    </div>
  );
};

export default Login;

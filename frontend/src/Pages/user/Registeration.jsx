import React, { useState } from 'react';
import axios from 'axios';
import './RegisterationForm.css'
import { useNavigate } from 'react-router-dom';
function RegistrationForm() {
  const [registrationStatus, setRegistrationStatus] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    gender: '',
    email: '',
    password: '',
    dgame: ''
  });
  const navigate = useNavigate(); // Initialize useNavigate hook for navigation


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegistration = async (userData) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}user/register`, userData);
      console.log(response.data);
      setRegistrationStatus('success');
      alert('Registered successful!');
      navigate('/login');

    } catch (error) {
     
        console.error('Error:', error);
    
      setRegistrationStatus('error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegistration(formData);
  };

  return (
    <>
    <div>
      
      <form onSubmit={handleSubmit}>
      <h1>User Registration</h1>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          required
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          minLength="8"
          required
        />
        <select
          name="dgame"
          value={formData.dgame}
          onChange={handleChange}
          required
        >
          <option value="">Select Game</option>
          <option value="table tennis">Table Tennis</option>
          <option value="cricket">Cricket</option>
          <option value="football">Football</option>
          <option value="dodgeball">Dodgeball</option>
          <option value="badminton">Badminton</option>
        </select>
        <button type="submit">Register</button>
        <h3>Already have an account? <span onClick={() => navigate('/login')}>Sign in</span></h3>


      </form>
      {registrationStatus === 'success' && <p>Registration successful!</p>}
      {registrationStatus === 'error' && <p>Error occurred during registration.</p>}\

    </div>
    
    </>
  );
}

export default RegistrationForm;

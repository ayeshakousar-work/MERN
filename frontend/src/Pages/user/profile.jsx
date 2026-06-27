import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import './profile.css';

const BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000";
const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    gender: '',
    email: '',
    dgame: ''
  });
  const [isEditable, setIsEditable] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${BASE_URL}/user/userProfile`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.status === 200) {
          setUser(response.data);
          setFormData(response.data);
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/login');
      }
    };

    fetchUser();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const confirmed = window.confirm('Are you sure you want to save your profile?');
    if (confirmed) {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${BASE_URL}/user/userUpdate`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        setUser(response.data);
        setIsEditable(false);
      } else {
        console.error('Error updating user data:', response.data);
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
    if (confirmDelete) {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`${BASE_URL}/user/deleteAccount`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.status === 200) {
          // Clear token and redirect to login page
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          console.error('Error deleting account:', response.data);
        }
      } catch (error) {
        console.error('Error deleting account:', error);
      }
    }
  };
  const pass = async () => {
    navigate('/change_password');
  }
  return (
    <div className="user-profile-container">
      <h1>User Profile</h1>

      {user ? (
        <div className="user-profile-form">
          <div className="form-group">
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} disabled={!isEditable} />
          </div>
          <div className="form-group">
            <label>Phone:</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} disabled={!isEditable} />
          </div>
          <div className="form-group">
            <label>Gender:</label>
            <input type="text" name="gender" value={formData.gender} onChange={handleChange} disabled={!isEditable} />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} disabled={!isEditable} />
          </div>
        
          <div className="form-group">
            <label>Registered In Game:</label>
            <input type="text" name="dgame" value={formData.dgame} onChange={handleChange} disabled={!isEditable} />
          </div>
          <button onClick={() => setIsEditable(!isEditable)}>
            {isEditable ? 'Cancel' : 'Edit'}
          </button>
          {isEditable && <button onClick={handleSave}>Save</button>}
          <button onClick={handleDelete} className="delete-button">Delete Account</button>
      
            <button className="change-password-button" onClick={pass}>Change Password</button>
        
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserProfile;

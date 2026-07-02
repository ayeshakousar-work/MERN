import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './league.css';
const BASE_URL =
  process.env.REACT_APP_API_URL;
const Leagues = () => {
  const [leagues, setLeagues] = useState([]);
  const navigate = useNavigate();

  // Function to fetch leagues
  const fetchLeagues = async () => {
    try {
      // Get the token from local storage
      const token = localStorage.getItem('token');
      // Fetch leagues data from the backend
      const response = await axios.get(`${BASE_URL}/user/leagues`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
console.log(response.data);
      // Check if the user is authenticated before setting leagues
      if (response.status === 200) {
        setLeagues(response.data);
      } else {
        // Handle unauthorized access (e.g., redirect to login page)
        console.log('User is not authenticated. Redirecting to login page...');
        navigate('/login');
      }
    } catch (error) {
      console.error('Error fetching leagues:', error);
      // Handle error (e.g., display error message)
      navigate('/login');
    }
  };

  // Use useEffect to fetch leagues only once when the component mounts
  useEffect(() => {
    fetchLeagues();
  }, []); 

  return (
    <>

    <div className="leagues-container">
      <h2>Leagues</h2>
      <div className="league-cards">
        {leagues.map((league) => (
          <div key={league._id} className="league-card">
            <h3>{league.game.name}</h3> {/* Adjust to league.game.name if the game has a name */}
            <p>Start Time: {new Date(league.startTime).toLocaleString()}</p> {/* Convert to a readable format */}
            <p>Status: {league.status}</p>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Leagues;

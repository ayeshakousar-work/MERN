import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './team.css'
const Teams = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/team`, {
          headers: {
            Authorization: `Bearer ${token}`, // Add backticks to properly interpolate the token
          },
        });
        setPlayers(response.data);
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };

    fetchPlayers(); // Call the fetchPlayers function inside useEffect

  }, []); // Empty dependency array ensures useEffect only runs once on component mount

  return (
    <div className="players-container">
      {players.map((player) => (
        <div className="player-card" key={player._id}>
          <h2>{player.name}</h2>
          <p>Gender: {player.gender}</p>
          <p>Phone no: {player.phone}</p>
          <p>Email: {player.email}</p>
          <p>Participant: {player.dgame}</p>
          {/* Add other player attributes here */}
        </div>
      ))}
    </div>
  );
};

export default Teams;

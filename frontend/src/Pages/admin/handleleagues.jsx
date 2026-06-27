import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './handleleagues.css';
import { useNavigate } from 'react-router-dom';

export default function AdminLeagueForm() {
  const [game, setGame] = useState('');
  const [startTime, setStartTime] = useState(new Date());
  const [status, setStatus] = useState('upcoming');
  const [winner, setWinner] = useState('');
  const [leagues, setLeagues] = useState([]);
  const [games, setGames] = useState([]);
  const [selectedLeagueId, setSelectedLeagueId] = useState(null);
  const navigate = useNavigate();

  const BASE_URL =  process.env.REACT_APP_API_URL || "http://localhost:5000";

  const fetchGames = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/games`, getAuthConfig());
      setGames(response.data);
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  };

  const fetchLeagues = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/getLeagues`, getAuthConfig());
      setLeagues(response.data);
    } catch (error) {
      console.error('Error fetching leagues:', error);
    }
  };

  useEffect(() => {
    fetchGames();
    fetchLeagues();
  }, []);

  const handleAddLeague = async () => {
    const confirmed = window.confirm('Are you sure you want to add this league?');
    if (confirmed) {
    try {
      await axios.post(`${BASE_URL}/admin/addLeagues`, {
        game,
        startTime,
        status,
        winner: status === 'completed' ? winner : undefined,
      }, getAuthConfig());
      alert('League added successfully');
      fetchLeagues(); // Refresh leagues after adding
    } catch (error) {
      console.error('Error adding league:', error);
    }
  }
  };

  const handleUpdateLeague = async () => {
    const confirmed = window.confirm('Are you sure you want to update this league?');
    if (confirmed) {
    try {
      await axios.put(`${BASE_URL}/admin/update/${selectedLeagueId}`, {
        game,
        startTime,
        status,
        winner: status === 'completed' ? winner : undefined,
      }, getAuthConfig());
      alert('League updated successfully');
      fetchLeagues(); // Refresh leagues after updating
    } catch (error) {
      console.error('Error updating league:', error);
    }
  }
  };

  const handleDeleteLeague = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this league?');
    if (confirmed) {
    try {
      const config = getAuthConfig();
      if (!config) return; // If getAuthConfig returns null, exit the function
  
      await axios.delete(`${BASE_URL}/admin/deleteLeagues`, {
        headers: config.headers,
        data: { game, status } // Ensure the property name matches what the backend expects
      });
  
      alert('League deleted successfully');
      fetchLeagues(); // Refresh leagues after deleting
    } catch (error) {
      console.error('Error deleting league:', error);
    }
  }
  };
  
  
  
  

  const getAuthConfig = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to login page if token is missing
      // You may need to import useNavigate from 'react-router-dom'
      navigate('/AdminLogin');
      return null;
    }
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };


  return (
<div className="main">
<h2>Admin League Management</h2>

    <div className="admin-league-form">
      <h2>Leagues</h2>
      <ul>
        {leagues.map(league => (
         <li key={league._id} onClick={() => {
          setSelectedLeagueId(league._id);
          setGame(league.game._id);
          setStartTime(new Date(league.startTime));
          setStatus(league.status);
          setWinner(league.winner);
        }}>
            {league.game.name} - {new Date(league.startTime).toLocaleString()} - {league.status}
            {league.status === 'completed' && ` - Winner: ${league.winner}`}
          </li>
        ))}
      </ul>
    </div>
    <form>
        <label>
          Game:
          <select value={game} onChange={e => setGame(e.target.value)}>
            <h1>{game}</h1>
            <option value="">Select Game</option>
            {games.map(g => (
              <option key={g._id} value={g._id}>{g.name}</option>
            ))}
          </select>
        </label>
        <label>
          Start Time:
          <DatePicker selected={startTime} onChange={date => setStartTime(date)} showTimeSelect dateFormat="Pp" />
        </label>
        <label>
          Status:
          <select value={status} onChange={e => setStatus(e.target.value)}>
            <option value="upcoming">Upcoming</option>
            <option value="completed">Completed</option>
          </select>
        </label>
        {status === 'completed' && (
          <label>
            Winner:
            <input type="text" value={winner} onChange={e => setWinner(e.target.value)} />
          </label>
        )}
        <button type="button" onClick={handleAddLeague}>Add League</button>
        {selectedLeagueId && (
          <>
            <button type="button" onClick={handleUpdateLeague}>Update League</button>
            <button type="button" onClick={handleDeleteLeague}>Delete League</button>
          </>
        )}
      </form>
    </div>
  );
}

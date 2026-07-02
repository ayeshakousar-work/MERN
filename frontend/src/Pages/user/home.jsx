import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './home.css';
import { useNavigate } from 'react-router-dom'; 
export default function Home() {
  const [events, setEvents] = useState([]);
  const [games, setGames] = useState([]);
const BASE_URL =
  process.env.REACT_APP_API_URL ;  const navigate = useNavigate();

  // Function to fetch events
  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/UpcomingEvent`);
      if (response.status === 200) {
        setEvents(response.data);
      } else {
        console.error('Failed to fetch events');
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };
const handleTry = async()=>{
  navigate('/register');
}
  // Function to fetch games
  const fetchGames = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/games`);
      if (response.status === 200) {
        setGames(response.data);
      } else {
        console.error('Failed to fetch games');
      }
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  };

  // Use useEffect to fetch events and games when the component mounts
  useEffect(() => {
    fetchEvents();
    fetchGames();
  }, []);

  // Function to get image URL based on game name
  const getImageUrl = (gameName) => {
    switch (gameName) {
      case 'Cricket':
        return '/Assets/cr.webp';
      case 'Football':
        return '/Assets/football.webp';
      case 'Table Tennis':
        return '/Assets/tennis.gif';
      case 'Dodgeball':
        return '/Assets/dodge ball.webp';
        case 'Badminton':
        return '/Assets/min.webp';
      default:
        return '/Assets/default.png';
    }
  };

  return (
    <>
      <section className="hero-section">
        <div className="mx-auto">
          <div className="max-w-3xl mx-auto text-center hero-content">
            <img
              className="background-image"
              src="/Assets/bg.png"
              alt="Hero"
            />
          </div>
        </div>
        
      </section>
      <div className="body-container">
      <section className='enter'>
          <button  onClick={handleTry}>Let's Enter the Gamer's Realm</button>
        </section>
        <section className="featured-games">
          <h2>Featured Games</h2>
          <div className="game-cards">
          {games.map((game) => (
    <div key={game._id} className="game-card">
      <h3>{game.name}</h3>
      <img src={getImageUrl(game.name)} alt={game.name} />
    </div>
  ))}
          </div>
        </section>
        
        <section className="upcoming-events">
          <h2>Upcoming Events</h2>
          <div className="event-cards">
            {events.map((event) => (
              <div key={event._id} className="event-card">
                <h3>{event.eventName}</h3>
                <p>Venue: {event.venue}</p>
                <p>Start Time: {new Date(event.startTime).toLocaleString()}</p>
                <p>End Time: {new Date(event.endTime).toLocaleString()}</p>
                <p>Description: {event.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

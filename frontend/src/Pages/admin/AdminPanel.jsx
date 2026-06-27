import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPanel.css';
import { useNavigate } from 'react-router-dom';

export default function Panel() {
  const [adminInfo, setAdminInfo] = useState({ name: '', image: '' });
  const [loading, setLoading] = useState(true);

  const BASE_URL =  process.env.REACT_APP_API_URL || "http://localhost:5000";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/AdminLogin');
          return;
        }

        const response = await axios.get(`${BASE_URL}/admin/adminProfile`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          setAdminInfo(response.data);
        } else {
          navigate('/AdminLogin');
        }
      } catch (error) {
        console.error('Error fetching admin data:', error);
        navigate('/AdminLogin');
      } finally {
        setLoading(false);
      }
    };

    fetchAdmin();
  }, [navigate]);

  if (loading) {
    return <p>Loading...</p>;
  }
const handleMove = (option) =>{
  if (option === "league"){
  navigate('/Handle leagues')
  }
  if (option === "upcoming"){
    navigate('/events')
    }

}
  return (
    <>
    <div className='topclass'>
     <ul className="nav-list flex items-center">
          <li className="nav-item">
            <h3>Welcome</h3>
            <div className="admin-info">
              <img className='admin-img' src={adminInfo.image}/>
              <span className="admin-name">{adminInfo.name}</span>

            </div>
          </li>
        </ul>
   
    <div className="head">
      
      <section className="hero-section">
        
      
        <div className="mx-auto">
          <div className="max-w-3xl mx-auto text-center hero-content">
            <img className="background-image" src="/Assets/bg.png" alt="Hero" />
          </div>
        </div>
       
        </section>
       
      
      <section className='enter'>
      <button onClick={() => handleMove("league")}>Leagues Management</button>
<button onClick={() => handleMove("upcoming")}>Events Management</button>
</section>

    </div>
    </div>
    
    </>

  );
}

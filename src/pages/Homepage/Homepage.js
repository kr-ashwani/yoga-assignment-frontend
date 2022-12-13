import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Homepage.css';

const Homepage = () => {
  const { currentUser, setUser } = useAuth();
  const navigate = useNavigate();

  console.log(currentUser);

  async function logOut(e) {
    try {
      await fetch(`${process.env.REACT_APP_SERVER_ENDPOINT}/logout`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      setUser({ currentUser: null });
    } catch (err) {
      console.log(err.message);
    }
  }
  if (currentUser)
    if (currentUser.enrolled)
      return (
        <div>
          <h1>Welcome back {currentUser.name}</h1>
          <button onClick={logOut}>Logout</button>
          <h1>
            {` congratulatons you have successfuly enrolled into ${currentUser.orderTimeSlot} yoga class batch`}
          </h1>
          <h3>{`your monthly subscription will expire in ${
            30 -
            Math.floor(
              (Date.now() - currentUser.orderPlacedTime) / (1000 * 60 * 60)
            )
          } days`}</h3>
        </div>
      );
    else
      return (
        <div>
          <h1>Welcome back {currentUser.name}</h1>
          <button onClick={logOut}>Logout</button>
          <h1>Enroll into Yoga Classes</h1>
          <button onClick={() => navigate('/yogaenroll')}>Enroll</button>
        </div>
      );
  else
    return (
      <div>
        <h1>Welcome to Yoga classes</h1>
        <h3>login or signup inorder to enroll into yoga classes</h3>
        <button onClick={() => navigate('/login')}>Login</button>
        <button onClick={() => navigate('/signup')}>Signup</button>
      </div>
    );
};

export default Homepage;

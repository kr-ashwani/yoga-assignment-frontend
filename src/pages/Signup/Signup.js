import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Signup.css';

const Signup = () => {
  const { setUser, currentUser } = useAuth();
  const navigate = useNavigate();
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const signupBtn = useRef();

  useEffect(() => {
    if (currentUser) navigate('/');
  }, [currentUser, navigate]);

  useEffect(() => {
    setErrorMessage('');
  }, [signupData]);

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_ENDPOINT}/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...signupData,
          }),
          credentials: 'include',
        }
      );
      if (!response.ok) throw new Error(JSON.parse(await response.text()));
      const { currentUser } = await response.json();

      console.log(currentUser);
      if (currentUser) {
        setUser({
          currentUser,
        });
      }
      setLoading(false);
    } catch (err) {
      setErrorMessage(err.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (loading) {
      signupBtn.current.disabled = true;
      document.body.style.cursor = 'wait';
    } else {
      signupBtn.current.disabled = false;
      document.body.style.cursor = 'auto';
    }
  }, [loading]);

  const handleChange = (name) => (event) => {
    setSignupData((prev) => ({
      ...prev,
      [name]: event.target.value.trim(),
    }));
  };

  return (
    <div className="mainContent">
      <div className="signupForm">
        <form onSubmit={handleSubmit}>
          <h2>Sign up</h2>
          <div className="field">
            <label htmlFor="name">Name</label>
            <input
              value={signupData.firstName}
              onChange={handleChange('name')}
              id="name"
              type="text"
              name="name"
              required
              placeholder="Name"
            />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              value={signupData.email}
              onChange={handleChange('email')}
              id="email"
              type="email"
              name="email"
              required
              placeholder="Email Address"
            />
          </div>
          <div className="field">
            <label htmlFor="pwd">Password</label>
            <input
              value={signupData.password}
              onChange={handleChange('password')}
              id="pwd"
              type="password"
              name="password"
              required
              placeholder="Password"
              autoComplete="off"
            />
          </div>
          <div style={{ height: '20px' }}>{errorMessage}</div>
          <button ref={signupBtn} type="submit">
            {loading ? 'wait' : 'Sign up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;

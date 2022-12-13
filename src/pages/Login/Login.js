import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

const Login = () => {
  const { setUser, currentUser } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const loginBtn = useRef();

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (currentUser) navigate('/');
  }, [currentUser, navigate]);

  const handleChange = (name) => (event) => {
    setLoginData((prev) => ({
      ...prev,
      [name]: event.target.value.trim(),
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_ENDPOINT}/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginData),
          credentials: 'include',
        }
      );
      if (!response.ok) throw new Error(JSON.parse(await response.text()));
      const { currentUser } = await response.json();
      if (currentUser) setUser((prev) => ({ ...prev, currentUser }));
      setLoading(false);
    } catch (err) {
      setErrorMessage(err.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (loading) {
      loginBtn.current.disabled = true;
      document.body.style.cursor = 'wait';
    } else {
      loginBtn.current.disabled = false;
      document.body.style.cursor = 'auto';
    }
  }, [loading]);

  return (
    <div className="mainContent">
      <div className="signupForm">
        <form onSubmit={handleSubmit}>
          <h2>Log In</h2>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              value={loginData.email}
              onChange={handleChange('email')}
              id="email"
              type="email"
              name="email"
              required
              placeholder="Email Address"
            />
          </div>
          <div className="field">
            <label htmlFor="name">Password</label>
            <input
              value={loginData.password}
              onChange={handleChange('password')}
              id="pwd"
              type="password"
              name="password"
              required
              autoComplete="off"
              placeholder="Password"
            />
          </div>
          <div style={{ height: '20px' }}>{errorMessage}</div>
          <button ref={loginBtn} type="submit">
            {loading ? 'wait' : 'log in'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

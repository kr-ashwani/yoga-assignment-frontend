import React, { useState } from 'react';

import { useAuth } from '../../context/AuthContext';

import './YogaEnroll.css';

const Homepage = () => {
  const { setUser } = useAuth();
  const [yogaData, setYogaData] = useState({
    time: '',
    enrolled: false,
    amountPaid: 0,
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (name) => (event) => {
    setErrorMessage('');
    if (name === 'amountPaid')
      if (event.target.checked)
        setYogaData((prev) => ({
          ...prev,
          enrolled: true,
          amountPaid: 500,
        }));
      else
        setYogaData((prev) => ({
          ...prev,
          enrolled: false,
          amountPaid: 0,
        }));
    else
      setYogaData((prev) => ({
        ...prev,
        [name]: event.target.value.trim(),
      }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (!yogaData.time) throw new Error('select time');
      if (!yogaData.enrolled || !yogaData.amountPaid)
        throw new Error('please pay the amount to enroll');

      const response = await fetch(
        `${process.env.REACT_APP_SERVER_ENDPOINT}/yogaenroll`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(yogaData),
          credentials: 'include',
        }
      );
      if (!response.ok) throw new Error(JSON.parse(await response.text()));
      const { currentUser, yogaDetail } = await response.json();

      console.log('hello');
      console.log(currentUser, yogaDetail);
      setUser({ ...currentUser, ...yogaDetail });
    } catch (err) {
      console.log('error');
      setErrorMessage(err.message);
      console.log(err.message);
    }
  }

  return (
    <div>
      <h1>Welcome to Yoga classes</h1>

      <h3>Select a suitable time to enroll into yoga classes </h3>

      <form class="yogaEnrollnment" onSubmit={handleSubmit}>
        <input
          type="radio"
          id="time1"
          name="age"
          value="6 - 7AM"
          onChange={handleChange('time')}
        />
        <label htmlFor="time1">6 - 7AM</label>
        <br />
        <input
          type="radio"
          id="time2"
          name="age"
          value="7 - 8AM"
          onChange={handleChange('time')}
        />
        <label htmlFor="time2">7 - 8AM</label>
        <br />
        <input
          type="radio"
          id="time3"
          name="age"
          value="8 - 9AM"
          onChange={handleChange('time')}
        />
        <label htmlFor="time3">8 - 9AM</label>
        <br />
        <input
          type="radio"
          id="time4"
          name="age"
          value="5 - 6PM"
          onChange={handleChange('time')}
        />
        <label htmlFor="time4">5 - 6PM</label>
        <br />
        <br />

        <input
          type="checkbox"
          id="payMoney"
          onChange={handleChange('amountPaid')}
        />
        <label htmlFor="payMoney">Pay INR 500 for 1 month</label>
        <br />

        <div style={{ height: '20px' }}>{errorMessage}</div>
        <button type="submit">Apply</button>
      </form>
    </div>
  );
};

export default Homepage;

import React, { useState, useRef, useEffect } from 'react';
import './timer.css';

const CountdownTimer = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isActive && remainingTime > 0) {
      intervalRef.current = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (remainingTime === 0) {
      clearInterval(intervalRef.current);
      setIsActive(false);
    }

    return () => clearInterval(intervalRef.current);
  }, [isActive, remainingTime]);

  const handleChangeHours = (e) => {
    setHours(parseInt(e.target.value, 10));
  };

  const handleChangeMinutes = (e) => {
    setMinutes(parseInt(e.target.value, 10));
  };

  const handleChangeSeconds = (e) => {
    setSeconds(parseInt(e.target.value, 10));
  };

  const startTimer = () => {
    if (!isActive) {
      setRemainingTime(remainingTime || hours * 3600 + minutes * 60 + seconds);
      setIsActive(true);
    }
  };

  const stopTimer = () => {
    setIsActive(false);
    clearInterval(intervalRef.current);
  };

  const formatTime = (time) => {
    const hrs = Math.floor(time / 3600);
    const mins = Math.floor((time % 3600) / 60);
    const secs = time % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div>
      <h1>Countdown Timer</h1>
      <div>
        <input
          type="number"
          value={hours}
          onChange={handleChangeHours}
          disabled={isActive}
          placeholder="HH"
        />
        <input
          type="number"
          value={minutes}
          onChange={handleChangeMinutes}
          disabled={isActive}
          placeholder="MM"
        />
        <input
          type="number"
          value={seconds}
          onChange={handleChangeSeconds}
          disabled={isActive}
          placeholder="SS"
        />
      </div>
      <button onClick={startTimer} disabled={isActive}>
        Start
      </button>
      <button onClick={stopTimer} disabled={!isActive}>
        Stop
      </button>
      <div>
        <h2>{formatTime(remainingTime)}</h2>
      </div>
    </div>
  );
};

export default CountdownTimer;

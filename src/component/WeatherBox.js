import React from "react";
import Spinner from 'react-bootstrap/Spinner';

const WeatherBox = ({weather}) => {
    if (!weather || !weather.main || typeof weather.main.temp === 'undefined') {
        return   <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      }
  return (
    <div className="weather-box">
      <h3>{weather?.name}</h3>
      <h1>{(weather?.main.temp).toFixed(2)}°C / {((weather?.main.temp) * 9/5 + 32).toFixed(2)}°F</h1>
      <h2>{weather?.weather[0]?.description}</h2>
    </div>
  );
};

export default WeatherBox;

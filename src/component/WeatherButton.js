import React from "react";
import Button from "react-bootstrap/Button";

const WeatherButton = ({cityName, handlingCityName}) => {
  return (
    <div className="weather-button">
      <Button variant="primary" onClick={()=>handlingCityName("current")}>Current</Button>{" "}
       
       {cityName.map((name)=>(
        <Button variant="primary" onClick={()=>{handlingCityName(name)}}>{name}</Button>
         ))}
    </div>
  );
};

export default WeatherButton;

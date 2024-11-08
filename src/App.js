import "./App.css";
import Container from "react-bootstrap/Container";
import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";

function App() {
  const cityName = ["Asan", "Seoul", "New york", "London"];
  const ApiKey = `277f634c499fe1f8686c78db1111d573`;

  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const getCurrentLocationPosition = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getCurrentLocationWeather(lat, lon);
    });
  };

  const getCurrentLocationWeather = async (lat, lon) => {
    try {
      let url = new URL(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${ApiKey}&units=metric`
      );
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch (error) {
      setApiError(error.message);
      setLoading(false);
    }
  };

  const getCityWeather = async () => {
    try {
      let url = new URL(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}&units=metric`
      );
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch (error) {
      setApiError(error.message);
      setLoading(false);
    }
  };

  const handlingCityName = (cityName) => {
    if (cityName === "current") {
      setCity("");
    } else {
      setCity(cityName);
    }
  };

  useEffect(() => {
    if (city === "") {
      getCurrentLocationPosition();
    } else {
      getCityWeather(city);
    }
  }, [city]);

  return (
    <Container className="container">
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : !apiError ? (
        <div className="container">
          <WeatherBox weather={weather} />
          <WeatherButton
            cityName={cityName}
            handlingCityName={handlingCityName}
          />
        </div>
      ) : (
        <div>{apiError}</div>
      )}
    </Container>
  );
}

export default App;

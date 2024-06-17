import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchEngine from "./SearchEngine";
import Forecast from "./Forecast";

import "../styles.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

function MainComponent({ setFavorites }) {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({
    loading: true,
    data: {},
    error: false
  });

  const toDate = () => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const days = [
      "Sunday", "Monday", "Tuesday", "Wednesday",
      "Thursday", "Friday", "Saturday"
    ];

    const currentDate = new Date();
    const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${
      months[currentDate.getMonth()]
    }`;
    return date;
  };

  const search = async () => {
    if (query.trim() === '') {
      return;
    }

    setWeather({ ...weather, loading: true });
    const apiKey = "12a15b4f2a34aee821f0f79cebc08698";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&APPID=${apiKey}`;

    try {
      const response = await axios.get(url);
      setWeather({ data: response.data, loading: false, error: false });
      setQuery(''); // Reset query to empty string after successful search
    } catch (error) {
      setWeather({ ...weather, data: {}, loading: false, error: true });
      console.log("error", error);
    }
  };

  const addToFavorites = () => {
    if (!weather.data || !weather.data.main) {
      return; // Check if weather data is available
    }

    const newFavorite = {
      id: weather.data.id,
      name: weather.data.name,
      weather: weather.data.weather
    };

    setFavorites(prevFavorites => [...prevFavorites, newFavorite]);
  };

  useEffect(() => {
    const fetchData = async () => {
      const apiKey = "12a15b4f2a34aee821f0f79cebc08698";
      const defaultCity = "Hyderabad"; // Default city to fetch data on initial load
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultCity}&units=metric&APPID=${apiKey}`;

      try {
        const response = await axios.get(url);
        setWeather({ data: response.data, loading: false, error: false });
      } catch (error) {
        setWeather({ data: {}, loading: false, error: true });
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      {/* SearchEngine component */}
      <SearchEngine query={query} setQuery={setQuery} search={search} />

      {/* Loading state */}
      {weather.loading && (
        <>
          <br />
          <br />
          <h4>Searching..</h4>
        </>
      )}

      {/* Error state */}
      {weather.error && (
        <>
          <br />
          <br />
          <span className="error-message">
            <span style={{ fontFamily: "font" }}>
              Sorry city not found, please try again.
            </span>
          </span>
        </>
      )}

      {/* Display weather data */}
      {weather && weather.data && weather.data.main && (
        <Forecast weather={weather} toDate={toDate} />
      )}<br></br><br></br>
      <button onClick={addToFavorites}>Add City to Favorites</button>
    </div>
  );
}

export default MainComponent;

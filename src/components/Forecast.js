
import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactAnimatedWeather from "react-animated-weather";

function Forecast({ weather }) {
  const [forecastData, setForecastData] = useState([]);
  const [isCelsius, setIsCelsius] = useState(true); // Track temperature unit
  const [currentTemp, setCurrentTemp] = useState(null); // Track current temperature

  useEffect(() => {
    const fetchCurrentWeather = async () => {
      const apiKey = "12a15b4f2a34aee821f0f79cebc08698";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${weather.data.name}&units=metric&APPID=${apiKey}`;

      try {
        const response = await axios.get(url);
        setCurrentTemp(response.data.main.temp);
      } catch (error) {
        console.log("Error fetching current weather data:", error);
      }
    };

    const fetchForecastData = async () => {
      const apiKey = "12a15b4f2a34aee821f0f79cebc08698";
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${weather.data.name}&units=metric&APPID=${apiKey}`;

      try {
        const response = await axios.get(url);
        const dailyForecast = processDailyForecast(response.data.list);
        setForecastData(dailyForecast);
      } catch (error) {
        console.log("Error fetching forecast data:", error);
      }
    };

    if (weather.data.name) {
      fetchCurrentWeather();
      fetchForecastData();
    }
  }, [weather.data.name]);

  const processDailyForecast = (forecastList) => {
    const dailyForecast = [];

    // Group forecasts by date
    const groupedForecasts = forecastList.reduce((grouped, forecast) => {
      const date = forecast.dt_txt.split(" ")[0];
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(forecast);
      return grouped;
    }, {});

    // Extract the first forecast of each day
    Object.keys(groupedForecasts).forEach(date => {
      const forecasts = groupedForecasts[date];
      const firstForecast = forecasts[0];
      const temperatureMin = Math.min(...forecasts.map(f => f.main.temp_min));
      const temperatureMax = Math.max(...forecasts.map(f => f.main.temp_max));
      const iconUrl = `https://openweathermap.org/img/wn/${firstForecast.weather[0].icon}.png`;

      dailyForecast.push({
        time: new Date(date).getTime() / 1000,
        temperature: {
          min: temperatureMin,
          max: temperatureMax
        },
        condition: {
          icon_url: iconUrl,
          description: firstForecast.weather[0].description
        }
      });
    });

    return dailyForecast;
  };

  const formatDay = (dateString) => {
    const options = { weekday: "short" };
    const date = new Date(dateString * 1000);
    return date.toLocaleDateString("en-US", options);
  };

  const getCurrentDate = () => {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    };
    const currentDate = new Date().toLocaleDateString("en-US", options);
    return currentDate;
  };

  const toggleTemperatureUnit = () => {
    setIsCelsius((prevState) => !prevState);
  };

  const convertToCelsius = (temperature) => {
    return Math.round(temperature);
  };

  const convertToFahrenheit = (temperature) => {
    return Math.round((temperature * 9) / 5 + 32);
  };

  const renderTemperature = (temperature) => {
    if (temperature === null) {
      return "-";
    }

    if (isCelsius) {
      return Math.round(temperature);
    } else {
      return convertToFahrenheit(temperature);
    }
  };

  return (
    <div>
      <div className="city-name">
        <h2>
          {weather.data.name}, <span>{weather.data.sys && weather.data.sys.country}</span>
        </h2>
      </div>
      <div className="date">
        <span>{getCurrentDate()}</span>
      </div>
      <div className="temp">
        {/* Update the way to display temperature and icon */}
        {weather.data.weather && (
          <img
            src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}.png`}
            alt={weather.data.weather[0].description}
            className="temp-icon"
          />
        )}
        {renderTemperature(currentTemp)}
        <sup className="temp-deg" onClick={toggleTemperatureUnit}>
          {isCelsius ? "°C" : "°F"} | {isCelsius ? "°F" : "°C"}
        </sup>
      </div>
      <p className="weather-des">{weather.data.weather && weather.data.weather[0].description}</p>
      <div className="weather-info">
        <div className="col">
          <ReactAnimatedWeather icon="WIND" size="40"/>
          <div>
            {/* Ensure data.wind exists before accessing speed */}
            <p className="wind">{weather.data.wind ? weather.data.wind.speed : "-"} m/s</p>
            <p>Wind speed</p>
          </div>
        </div>
        <div className="col">
          <ReactAnimatedWeather icon="RAIN" size="40"/>
          <div>
            {/* Ensure data.main exists before accessing humidity */}
            <p className="humidity">{weather.data.main ? weather.data.main.humidity : "-"}%</p>
            <p>Humidity</p>
          </div>
        </div>
      </div>
      <div className="forecast">
        <h3>5-Day Forecast:</h3>
        <div className="forecast-container">
          {forecastData &&
            forecastData.slice(1, 6).map((day) => ( // Start from index 1 to skip today's forecast
              <div className="day" key={day.time}>
                <p className="day-name">{formatDay(day.time)}</p>
                {day.condition.icon_url && (
                  <img
                    className="day-icon"
                    src={day.condition.icon_url}
                    alt={day.condition.description}
                  />
                )}
                <p className="day-temperature">
                  {Math.round(day.temperature.min)}° / <span>{Math.round(day.temperature.max)}°</span>
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Forecast;

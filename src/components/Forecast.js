// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import ReactAnimatedWeather from "react-animated-weather";

// function Forecast({ weather }) {
//   const { data } = weather;
//   const [forecastData, setForecastData] = useState([]);
//   const [isCelsius, setIsCelsius] = useState(true); // Track temperature unit

//   useEffect(() => {
//     const fetchForecastData = async () => {
//       const apiKey = "b03a640e5ef6980o4da35b006t5f2942";
//       const url = `https://api.shecodes.io/weather/v1/forecast?query=${data.city}&key=${apiKey}&units=metric`;
//       // const base="https://api.openweathermap.org/data/2.5/"
//       // const url=`${fetchForecastData.base}weather?q=${data.city}&units=metric&APPID=${fetchForecastData.key}`


//       try {
//         const response = await axios.get(url);
//         setForecastData(response.data.daily);
//       } catch (error) {
//         console.log("Error fetching forecast data:", error);
//       }
//     };

//     fetchForecastData();
//   }, [data.city]);

//   const formatDay = (dateString) => {
//     const options = { weekday: "short" };
//     const date = new Date(dateString * 1000);
//     return date.toLocaleDateString("en-US", options);
//   };

//   const getCurrentDate = () => {
//     const options = {
//       weekday: "long",
//       day: "numeric",
//       month: "long",
//       year: "numeric"
//     };
//     const currentDate = new Date().toLocaleDateString("en-US", options);
//     return currentDate;
//   };

//   const toggleTemperatureUnit = () => {
//     setIsCelsius((prevState) => !prevState);
//   };

//   const convertToCelsius = (temperature) => {
//     return Math.round((temperature - 32) * (5 / 9));
//   };

//   const convertToFahrenheit = (temperature) => {
//     return Math.round((temperature * 9) / 5 + 32);
//   };

//   const renderTemperature = (temperature) => {
//     if (isCelsius) {
//       return Math.round(temperature);
//     } else {
//       return convertToFahrenheit(temperature);
//     }
//   };

//   return (
//     <div>
//       <div className="city-name">
//         <h2>
//           {data.city}, <span>{data.country}</span>
//         </h2>
//       </div>
//       <div className="date">
//         <span>{getCurrentDate()}</span>
//       </div>
//       <div className="temp">
//         {data.condition.icon_url && (
//           <img
//             src={data.condition.icon_url}
//             alt={data.condition.description}
//             className="temp-icon"
//           />
//         )}
//         {renderTemperature(data.temperature.current)}
//         <sup className="temp-deg" onClick={toggleTemperatureUnit}>
//           {isCelsius ? "°C" : "°F"} | {isCelsius ? "°F" : "°C"}
//         </sup>
//       </div>
//       <p className="weather-des">{data.condition.description}</p>
//       <div className="weather-info">
//         <div className="col">
//           <ReactAnimatedWeather icon="WIND" size="40"/>
//           <div>
//             <p className="wind">{data.wind.speed}m/s</p>
//             <p>Wind speed</p>
//           </div>
//         </div>
//         <div className="col">
//           <ReactAnimatedWeather icon="RAIN" size="40"/>
//           <div>
//             <p className="humidity">{data.temperature.humidity}%</p>
//             <p>Humidity</p>
//         </div>
//         </div>
//       </div>
//       <div className="forecast">
//         <h3>5-Day Forecast:</h3>
//         <div className="forecast-container">
//           {forecastData &&
//             forecastData.slice(0, 5).map((day) => (
//               <div className="day" key={day.time}>
//                 <p className="day-name">{formatDay(day.time)}</p>
//                 {day.condition.icon_url && (
//                   <img
//                     className="day-icon"
//                     src={day.condition.icon_url}
//                     alt={day.condition.description}
//                   />
//                 )}
//                 <p className="day-temperature">
//                   {Math.round(day.temperature.minimum)}°/ <span>{Math.round(day.temperature.maximum)}°</span>
//                 </p>
//               </div>
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// }        

// export default Forecast;
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import ReactAnimatedWeather from "react-animated-weather";

// function Forecast({ weather }) {
//   const { data } = weather;
//   const [forecastData, setForecastData] = useState([]);
//   const [isCelsius, setIsCelsius] = useState(true); // Track temperature unit

//   useEffect(() => {
//     const fetchForecastData = async () => {
//       const apiKey = "12a15b4f2a34aee821f0f79cebc08698";
//       const url = `https://api.openweathermap.org/data/2.5/forecast?q=${data.city}&units=metric&APPID=${apiKey}`;

//       try {
//         const response = await axios.get(url);
//         // OpenWeatherMap returns hourly forecast, we need daily forecast, so we will process the response to extract daily data
//         const dailyForecast = processDailyForecast(response.data.list);
//         setForecastData(dailyForecast);
//       } catch (error) {
//         console.log("Error fetching forecast data:", error);
//       }
//     };

//     fetchForecastData();
//   }, [data.city]);

//   const processDailyForecast = (forecastList) => {
//     const dailyForecast = [];

//     // OpenWeatherMap returns forecast for every 3 hours, we need daily forecast
//     // Assuming the list is ordered chronologically, we'll group by date
//     const groupedByDate = forecastList.reduce((acc, forecast) => {
//       const date = forecast.dt_txt.split(" ")[0]; // Get date part only
//       if (!acc[date]) {
//         acc[date] = [];
//       }
//       acc[date].push(forecast);
//       return acc;
//     }, {});

//     // Now extract the daily data
//     for (const date in groupedByDate) {
//       const forecasts = groupedByDate[date];
//       const minTemp = Math.min(...forecasts.map(forecast => forecast.main.temp_min));
//       const maxTemp = Math.max(...forecasts.map(forecast => forecast.main.temp_max));
//       const iconUrl = `https://openweathermap.org/img/wn/${forecasts[0].weather[0].icon}.png`; // Assuming we use the first forecast entry for icon

//       dailyForecast.push({
//         time: new Date(date).getTime() / 1000, // Convert date to Unix timestamp
//         temperature: {
//           minimum: minTemp,
//           maximum: maxTemp
//         },
//         condition: {
//           icon_url: iconUrl,
//           description: forecasts[0].weather[0].description // Assuming we use the first forecast entry for description
//         }
//       });
//     }

//     return dailyForecast;
//   };

//   const formatDay = (dateString) => {
//     const options = { weekday: "short" };
//     const date = new Date(dateString * 1000);
//     return date.toLocaleDateString("en-US", options);
//   };

//   const getCurrentDate = () => {
//     const options = {
//       weekday: "long",
//       day: "numeric",
//       month: "long",
//       year: "numeric"
//     };
//     const currentDate = new Date().toLocaleDateString("en-US", options);
//     return currentDate;
//   };

//   const toggleTemperatureUnit = () => {
//     setIsCelsius((prevState) => !prevState);
//   };

//   const convertToCelsius = (temperature) => {
//     return Math.round(temperature);
//   };

//   const convertToFahrenheit = (temperature) => {
//     return Math.round((temperature * 9) / 5 + 32);
//   };

//   const renderTemperature = (temperature) => {
//     if (isCelsius) {
//       return Math.round(temperature);
//     } else {
//       return convertToFahrenheit(temperature);
//     }
//   };

//   return (
//     <div>
//       <div className="city-name">
//         <h2>
//           {data.city}, <span>{data.country}</span>
//         </h2>
//       </div>
//       <div className="date">
//         <span>{getCurrentDate()}</span>
//       </div>
//       <div className="temp">
//         {/* Update the way to display temperature and icon */}
//         {data.weather && (
//           <img
//             src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
//             alt={data.weather[0].description}
//             className="temp-icon"
//           />
//         )}
//         {renderTemperature(data.main)}
//         <sup className="temp-deg" onClick={toggleTemperatureUnit}>
//           {isCelsius ? "°C" : "°F"} | {isCelsius ? "°F" : "°C"}
//         </sup>
//       </div>
//       <p className="weather-des">{data.weather && data.weather[0].description}</p>
//       <div className="weather-info">
//         <div className="col">
//           <ReactAnimatedWeather icon="WIND" size="40"/>
//           <div>
//             <p className="wind">{data.wind.speed}m/s</p>
//             <p>Wind speed</p>
//           </div>
//         </div>
//         <div className="col">
//           <ReactAnimatedWeather icon="RAIN" size="40"/>
//           <div>
//             <p className="humidity">{data.main}%</p>
//             <p>Humidity</p>
//         </div>
//         </div>
//       </div>
//       <div className="forecast">
//         <h3>5-Day Forecast:</h3>
//         <div className="forecast-container">
//           {forecastData &&
//             forecastData.slice(0, 5).map((day) => (
//               <div className="day" key={day.time}>
//                 <p className="day-name">{formatDay(day.time)}</p>
//                 {day.condition.icon_url && (
//                   <img
//                     className="day-icon"
//                     src={day.condition.icon_url}
//                     alt={day.condition.description}
//                   />
//                 )}
//                 <p className="day-temperature">
//                   {Math.round(day.temperature.minimum)}°/ <span>{Math.round(day.temperature.maximum)}°</span>
//                 </p>
//               </div>
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Forecast;
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import ReactAnimatedWeather from "react-animated-weather";

// function Forecast({ weather }) {
//   const [forecastData, setForecastData] = useState([]);
//   const [isCelsius, setIsCelsius] = useState(true); // Track temperature unit
//   const [currentTemp, setCurrentTemp] = useState(null); // Track current temperature

//   useEffect(() => {
//     const fetchCurrentWeather = async () => {
//       const apiKey = "12a15b4f2a34aee821f0f79cebc08698";
//       const url = `https://api.openweathermap.org/data/2.5/weather?q=${weather.data.city}&units=metric&APPID=${apiKey}`;

//       try {
//         const response = await axios.get(url);
//         setCurrentTemp(response.data.main.temp);
//       } catch (error) {
//         console.log("Error fetching current weather data:", error);
//       }
//     };

//     const fetchForecastData = async () => {
//       const apiKey = "12a15b4f2a34aee821f0f79cebc08698";
//       const url = `https://api.openweathermap.org/data/2.5/forecast?q=${weather.data.city}&units=metric&APPID=${apiKey}`;

//       try {
//         const response = await axios.get(url);
//         const dailyForecast = processDailyForecast(response.data.list);
//         setForecastData(dailyForecast);
//       } catch (error) {
//         console.log("Error fetching forecast data:", error);
//       }
//     };

//     if (weather.data.city) {
//       fetchCurrentWeather();
//       fetchForecastData();
//     }
//   }, [weather.data.city]);

//   const processDailyForecast = (forecastList) => {
//     const dailyForecast = [];

//     // Group forecasts by date
//     const groupedForecasts = forecastList.reduce((grouped, forecast) => {
//       const date = forecast.dt_txt.split(" ")[0];
//       if (!grouped[date]) {
//         grouped[date] = [];
//       }
//       grouped[date].push(forecast);
//       return grouped;
//     }, {});

//     // Extract the first forecast of each day
//     Object.keys(groupedForecasts).forEach(date => {
//       const forecasts = groupedForecasts[date];
//       const firstForecast = forecasts[0];
//       const temperatureMin = Math.min(...forecasts.map(f => f.main.temp_min));
//       const temperatureMax = Math.max(...forecasts.map(f => f.main.temp_max));
//       const iconUrl = `https://openweathermap.org/img/wn/${firstForecast.weather[0].icon}.png`;

//       dailyForecast.push({
//         time: new Date(date).getTime() / 1000,
//         temperature: {
//           min: temperatureMin,
//           max: temperatureMax
//         },
//         condition: {
//           icon_url: iconUrl,
//           description: firstForecast.weather[0].description
//         }
//       });
//     });

//     return dailyForecast;
//   };

//   const formatDay = (dateString) => {
//     const options = { weekday: "short" };
//     const date = new Date(dateString * 1000);
//     return date.toLocaleDateString("en-US", options);
//   };

//   const getCurrentDate = () => {
//     const options = {
//       weekday: "long",
//       day: "numeric",
//       month: "long",
//       year: "numeric"
//     };
//     const currentDate = new Date().toLocaleDateString("en-US", options);
//     return currentDate;
//   };

//   const toggleTemperatureUnit = () => {
//     setIsCelsius((prevState) => !prevState);
//   };

//   const convertToCelsius = (temperature) => {
//     return Math.round(temperature);
//   };

//   const convertToFahrenheit = (temperature) => {
//     return Math.round((temperature * 9) / 5 + 32);
//   };

//   const renderTemperature = (temperature) => {
//     if (temperature === null) {
//       return "-";
//     }

//     if (isCelsius) {
//       return Math.round(temperature);
//     } else {
//       return convertToFahrenheit(temperature);
//     }
//   };

//   return (
//     <div>
//       <div className="city-name">
//         <h2>
//           {weather.data.city}, <span>{weather.data.country}</span>
//         </h2>
//       </div>
//       <div className="date">
//         <span>{getCurrentDate()}</span>
//       </div>
//       <div className="temp">
//         {/* Update the way to display temperature and icon */}
//         {weather.data.weather && (
//           <img
//             src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}.png`}
//             alt={weather.data.weather[0].description}
//             className="temp-icon"
//           />
//         )}
//         {renderTemperature(currentTemp)}
//         <sup className="temp-deg" onClick={toggleTemperatureUnit}>
//           {isCelsius ? "°C" : "°F"} | {isCelsius ? "°F" : "°C"}
//         </sup>
//       </div>
//       <p className="weather-des">{weather.data.weather && weather.data.weather[0].description}</p>
//       <div className="weather-info">
//         <div className="col">
//           <ReactAnimatedWeather icon="WIND" size="40"/>
//           <div>
//             {/* Ensure data.wind exists before accessing speed */}
//             <p className="wind">{weather.data.wind ? weather.data.wind.speed : "-"} m/s</p>
//             <p>Wind speed</p>
//           </div>
//         </div>
//         <div className="col">
//           <ReactAnimatedWeather icon="RAIN" size="40"/>
//           <div>
//             {/* Ensure data.main exists before accessing humidity */}
//             <p className="humidity">{weather.data.main ? weather.data.main.humidity : "-"}%</p>
//             <p>Humidity</p>
//           </div>
//         </div>
//       </div>
//       <div className="forecast">
//         <h3>5-Day Forecast:</h3>
//         <div className="forecast-container">
//           {forecastData &&
//             forecastData.slice(1, 6).map((day) => ( // Start from index 1 to skip today's forecast
//               <div className="day" key={day.time}>
//                 <p className="day-name">{formatDay(day.time)}</p>
//                 {day.condition.icon_url && (
//                   <img
//                     className="day-icon"
//                     src={day.condition.icon_url}
//                     alt={day.condition.description}
//                   />
//                 )}
//                 <p className="day-temperature">
//                   {Math.round(day.temperature.min)}° / <span>{Math.round(day.temperature.max)}°</span>
//                 </p>
//               </div>
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Forecast;
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

import React, { useState } from "react";
import axios from "axios";
import Location from "./Location";
import DateUnic from "./DateUnic";

export default function SearchInformation() {
  const [city, setCity] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState({});
  const [forecast, setForecast] = useState({});

  function displayWeather(response) {
    setWeather({
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description,
    });
    setLoaded(true);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  function DailyForecast(response) {
    setForecast = [7, 15, 23, 31, 39].map((index) => {
      return {
        description: response.data.list.weather[0].main,
        icon: `http://openweathermap.org/img/wn/${response.data.list.weather[0].icon}@2x.png`,
        precipitation: Math.round(response.data.list.main.humidity) + "%",
        temperature: Math.round(response.data.list.main.temp),
        day: new Date(response.data.list.dt * 1000).day(true),
        wind: Math.round(response.data.list.wind.speed) + "km/h",
      };
    });

    return (
      <div className="row">
        {forecast.map((forecasts, index) => {
          return (
            <div className="col-sm-2" key={index}>
              <div className="forecast-day">{forecasts.day}</div>
              <div className="forecast-icon">{forecasts.icon}</div>
              <div className="forecast-temperature">
                {forecasts.temperature}°
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "094780c710fa4efd669f0df8c3991927";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
    let url = `https://api.openweathermap.org/data/2.5/forecast?appid=c95d60a1e3adbeb286133f1ebebc2579&units=metric&q=${city}`;
    axios.get(url).then(DailyForecast);
  }
  /////////////////////////////////////////////

  let form = (
    <div className="search-form">
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Enter a city.."
          onChange={updateCity}
        />
        <button type="Submit">Search</button>

        <button>
          <a href="Location.js">Current location</a>
        </button>
      </form>
    </div>
  );
  let CityInfo = (
    <div className="city-info">
      <h1>{city}</h1>

      <DateUnic />

      <h1 className="icon-temp">
        <img src={weather.icon} alt={weather.description} />{" "}
        {Math.round(weather.temperature)}°C
      </h1>
    </div>
  );
  let CurrentInfo = (
    <div className="current-info">
      <ul>
        <li>Description: {weather.description}</li>
        <li>Humidity: {weather.humidity}%</li>
        <li>Wind: {weather.wind}km/h</li>
      </ul>
    </div>
  );

  if (loaded) {
    return (
      <div className="Information">
        {form}
        <br />
        {CityInfo}
        <br />
        {CurrentInfo}
        <br />
        DailyForecast()
      </div>
    );
  } else {
    return (
      <div className="Information">
        {form}
        <Location />;
      </div>
    );
  }
}

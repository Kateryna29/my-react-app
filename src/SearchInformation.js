import React, { useState } from "react";
import axios from "axios";
import Forecast from "./Forecast";
import DateUnic from "./DateUnic";

export default function SearchInformation() {
  const [city, setCity] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState({});

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

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "094780c710fa4efd669f0df8c3991927";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  /////////////////////////////////////////////

  let form = (
    <form onSubmit={handleSubmit}>
      <input type="search" placeholder="Enter a city.." onChange={updateCity} />
      <button type="Submit">Search</button>
    </form>
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
        <Forecast />
      </div>
    );
  } else {
    return <div className="Information">{form}</div>;
  }
}

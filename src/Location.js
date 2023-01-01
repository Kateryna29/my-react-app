import React, { useState } from "react";
import axios from "axios";
import { useGeoLocation } from "use-geo-location";

import DateUnic from "./DateUnic";

function Location() {
  const [weather, setWeather] = useState({});

  function displayForecastLocation(response) {
    setWeather({
      city: response.data.name,
      temperature: Math.round(response.data.main.temp),
      wind: Math.round(response.data.wind.speed),
      humidity: Math.round(response.data.main.humidity),
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description,
    });
  }

  const apiKey = "094780c710fa4efd669f0df8c3991927";
  const { latitude, longitude } = useGeoLocation({ apiKey });
  let apiUrlTwo = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlTwo).then(displayForecastLocation);

  return (
    <div className="Information">
      <div className="city-info">
        <h1>{weather.city}</h1>

        <DateUnic />

        <h1 className="icon-temp">
          <img src={weather.icon} alt={weather.description} />{" "}
          {Math.round(weather.temperature)}°C
        </h1>
      </div>
      <div className="current-info">
        <ul>
          <li>Description: {weather.description}</li>
          <li>Humidity: {weather.humidity}%</li>
          <li>Wind: {weather.wind}km/h</li>
        </ul>
      </div>
      <br />
    </div>
  );
}
export default Location;

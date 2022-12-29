import Forecast from "./Forecast";
export default function SearchInformation() {
  let form = (
    <form>
      <input type="search" placeholder="Enter a city.." />
      <button type="Submit">Search</button>
      <button type="Submit">Current location</button>
    </form>
  );
  let CityInfo = (
    <div className="city-info">
      <h1>City name</h1>
      <h3>Data</h3>
      <h2>Icon + Temperature</h2>
    </div>
  );
  let CurrentInfo = (
    <div className="current-info">
      <ul>
        <li>Temperature: 15°C</li>
        <li>Description:</li>
        <li>Humidity: %</li>
        <li>Wind:km/h</li>
        <li>
          <img src="#" alt="weather description" />
        </li>
      </ul>
    </div>
  );
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
}

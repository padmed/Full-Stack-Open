import weatherService from "../services/weatherService";
import { useState, useEffect } from "react";

const Weather = ({ country }) => {
  const [weather, setWeather] = useState(null); //Object is assigned later, with the props - icon, temperature, wind
  const [coordinates, setCoordinates] = useState({
    //Coordinates are assigned using API, and is used to get weather from another API
    lon: null,
    lat: null,
  });

  //If new country is selected, corrdinates state is updated
  useEffect(() => {
    if (country) {
      const capital = country.capital[0];
      weatherService.getCoordinates(capital).then((coordinates) => {
        setCoordinates({
          lon: coordinates.longitude,
          lat: coordinates.latitude,
        });
      });
    }
  }, [country]);

  //if coordinates are updated, weather state is updated
  useEffect(() => {
    if (coordinates.lon && coordinates.lat) {
      weatherService
        .getWeather(coordinates.lat, coordinates.lon)
        .then((response) => {
          setWeather(response);
        });
    }
  }, [coordinates]);

  if (!country || !weather) return;

  return (
    <>
      <h1>Weather in {country.capital}</h1>
      <p>Temperature: {weather.temperature} celsius</p>
      <img src={weather.icon} alt="Weather icon" />
      <p>Wind: {weather.wind} m/s</p>
    </>
  );
};

export default Weather;

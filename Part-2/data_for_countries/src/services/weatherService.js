//API requests for weather services
import axios from "axios";

const getCoordinates = (city) => {
  const request = axios
    .get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${process.env.REACT_APP_WEATHER_KEY}`
    )
    .then((response) => {
      return {
        latitude: response.data[0].lat,
        longitude: response.data[0].lon,
      };
    });
  return request;
};

const getWeather = (lat, lon) => {
  const request = axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_KEY}&units=metric`
    )
    .then((response) => {
      const weather = {
        temperature: response.data.main.temp,
        icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
        wind: response.data.wind.speed,
      };
      return weather;
    });

  return request;
};

export default { getCoordinates, getWeather };

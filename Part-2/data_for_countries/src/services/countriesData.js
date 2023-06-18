import axios from "axios";

const getAll = () => {
  const request = axios
    .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
    .then((response) => {
      return response.data;
    });

  return request;
};

export default { getAll };

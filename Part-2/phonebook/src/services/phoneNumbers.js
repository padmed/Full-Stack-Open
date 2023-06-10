import axios from "axios";
const baseURL = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseURL);
  return request;
};

const create = (persons) => {
  const request = axios.post(baseURL, persons);
  return request;
};

export default {
  getAll,
  create,
};

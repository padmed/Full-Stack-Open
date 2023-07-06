import axios from "axios";
const baseURL = "http://localhost:3001/api/persons";

const getAll = () => {
  const request = axios.get(baseURL);
  return request.then((response) => response.data);
};

const create = (persons) => {
  const request = axios.post(baseURL, persons);
  return request.then((response) => response.data);
};

const remove = (id) => {
  const requestURL = `${baseURL}/${id}`;
  return axios.delete(requestURL);
};

const put = (id, personObj) => {
  const requestURL = `${baseURL}/${id}`;
  return axios.put(requestURL, personObj);
};

export default {
  getAll,
  create,
  remove,
  put,
};

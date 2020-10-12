import axios from "axios";

const URL = 'http://localhost:';
const PORT = process.env.REACT_APP_PORT || 3000;
const BASIC_URL = URL + PORT;

export const getCatalogs = () => {
  return axios.get(BASIC_URL + "/catalog");
}

export const removeCatalog = (id) => {
  return axios.delete(BASIC_URL + "/catalog/" + id);
}

export const createCatalog = (params) => {
  return axios.post(BASIC_URL + "/catalog", params);
}
import axios from "axios";

const URL = 'http://localhost:';
const PORT = process.env.REACT_APP_PORT || 3000;
const BASIC_URL = URL + PORT;

export const getMovieCatalog = (id) => {
  return axios.get(BASIC_URL + "/catalog/" + id);
}

export const removeMovie = (id) => {
  return axios.delete(BASIC_URL + "/movie/" + id)
}

export const createMovie = (params) => {
  return axios.post(BASIC_URL + "/movie", params)
}

export const getMovies = (id) => {
  return axios.get(BASIC_URL + "/movie/" + id);
}
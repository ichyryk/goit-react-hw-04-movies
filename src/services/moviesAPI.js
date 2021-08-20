import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.params = {
  api_key: "a658f8e62d15ef4feb37fd3d689a2e0e",
};

const fetchTrendingMovies = () => {
  return axios
    .get(`/trending/movie/week`)
    .then(({ data: { results } }) => results);
};

const fetchMovieDetails = (movieId = 414) => {
  return axios.get(`/movie/${movieId}`).then(({ data }) => data);
};

const searchMovie = (query) => {
  return axios
    .get(`/search/movie?query=${query}`)
    .then(({ data: { results } }) => results);
};

const fetchCast = (movieId = 414) => {
  return axios
    .get(`/movie/${movieId}/credits`)
    .then(({ data: { cast } }) => cast);
};

const fetchReviews = (movieId = 414) => {
  return axios
    .get(`/movie/${movieId}/reviews`)
    .then(({ data: { results } }) => results);
};

const exportedObject = {
  fetchTrendingMovies,
  fetchMovieDetails,
  searchMovie,
  fetchCast,
  fetchReviews,
};

export default exportedObject;

// const BASE_URL = 'https://api.themoviedb.org/3';
// const API_KEY = 'a658f8e62d15ef4feb37fd3d689a2e0e';

// function fetchMovies(page) {
//   return fetch(
//     `https://api.themoviedb.org/3/trending/movie/week?api_key=a658f8e62d15ef4feb37fd3d689a2e0e`,
//   ).then(response => {
//     if (response.ok) {
//       return response.json();
//     }

//     return Promise.reject(new Error('Not found'));
//   });
// }

// export default fetchMovies;

import axios from 'axios';

const URL = 'https://api.themoviedb.org/3';

const searchTrendingMovies = async () => {
  const response = await axios.get(
    `${URL}/trending/movie/day?api_key=a4c507e56effa1158f9e8b1f806bf6ad`
  );

  return response.data.results;
};

const getMovieById = async id => {
  const response = await axios.get(
    `${URL}/movie/${id}?api_key=a4c507e56effa1158f9e8b1f806bf6ad`
  );

  return response.data;
};

const getMovieByName = async searchQuery => {
  const response = await axios.get(
    `${URL}/search/movie?api_key=a4c507e56effa1158f9e8b1f806bf6ad&query=${searchQuery}`
  );
  return response.data.results;
};

const getMovieCredits = async id => {
  const response = await axios.get(
    `${URL}/movie/${id}/credits?api_key=a4c507e56effa1158f9e8b1f806bf6ad`
  );
  return response.data.cast;
};

const getMovieReviews = async id => {
  const response = await axios.get(
    `${URL}/movie/${id}/reviews?api_key=a4c507e56effa1158f9e8b1f806bf6ad`
  );
  return response.data.results;
};

const api = {
  searchTrendingMovies,
  getMovieById,
  getMovieByName,
  getMovieCredits,
  getMovieReviews,
};

export default api;

import { useEffect, useState } from 'react';
import api from '../../shared/api/movies-api';
import MoviesList from '../../shared/MoviesList/MoviesList';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const movies = await api.searchTrendingMovies();
        setMovies(movies);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchTrending();
  }, []);

  return (
    <>
      <h1>Trending today</h1>
      {!error && <MoviesList movies={movies} />}
    </>
  );
};

export default Home;

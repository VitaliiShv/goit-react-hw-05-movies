import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../../shared/api/movies-api';
import Searchbar from 'components/Searchbar/Searchbar';
import MoviesList from '../../shared/MoviesList/MoviesList';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get('searchQuery');

  useEffect(() => {
    if (searchQuery) {
      const fetchMovies = async () => {
        try {
          const movies = await api.getMovieByName(searchQuery);
          setMovies(movies);
        } catch ({ response }) {
          console.log(response.data.message);
        }
      };
      fetchMovies();
    }
  }, [searchQuery]);

  const handleFormSubmit = ({ searchQuery }) => {
    setSearchParams({ searchQuery });
  };

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
      <MoviesList movies={movies} />
    </>
  );
};

export default MoviesPage;

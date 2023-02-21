import { useState, useEffect } from 'react';
import {
  Link,
  useParams,
  useNavigate,
  Outlet,
  useLocation,
} from 'react-router-dom';
import api from 'shared/api/movies-api';

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const { movieId } = useParams();

  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movie = await api.getMovieById(movieId);
        setMovie(movie);
      } catch (data) {
        setError('An error occurred while fetching movie data.');
      }
    };
    fetchMovieDetails();
  }, [movieId]);

  const {
    poster_path,
    original_title,
    vote_average,
    release_date,
    overview,
    genres,
  } = movie;
  const imageURL = 'https://image.tmdb.org/t/p/w500/';
  const voteAverage = (vote_average * 10).toFixed(2);
  return (
    <>
      {error && <div>{error}</div>}
      <button type="button" onClick={() => navigate(from)}>
        Go back
      </button>
      <div>
        <img
          src={poster_path ? `${imageURL}${poster_path}` : 'error'}
          alt={original_title}
          width={250}
        />
        <h2>
          {original_title}
          <span>({release_date && release_date.slice(0, 4)})</span>
        </h2>
        <h3>User Score</h3>
        <p>{voteAverage}%</p>
        <h3>Overwiew</h3>
        <p>{overview}</p>
        <h3>Genres</h3>
        <p>{genres?.map(({ name }) => name).join(', ')}</p>
        <h3>Additional information</h3>
        <ul>
          <li>
            <Link to="cast" state={{ from }}>
              Cast
            </Link>
          </li>
          <li>
            <Link to="reviews" state={{ from }}>
              Reviews
            </Link>
          </li>
        </ul>
        <Outlet />
      </div>
    </>
  );
};

export default MovieDetailsPage;

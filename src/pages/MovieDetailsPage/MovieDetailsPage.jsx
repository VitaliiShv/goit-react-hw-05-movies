import { useState, useEffect } from 'react';
import {
  Link,
  useParams,
  useNavigate,
  Outlet,
  useLocation,
} from 'react-router-dom';
import api from 'shared/api/movies-api';
import styles from './MovieDetailsPage.module.css';

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
      } catch (error) {
        setError('An error occurred while fetching movie data.');
      }
    };
    fetchMovieDetails();
  }, [movieId]);

  const imageURL = 'https://image.tmdb.org/t/p/w500/';
  let poster_path, original_title, vote_average, release_date, overview, genres;

  if (movie) {
    poster_path = movie.poster_path;
    original_title = movie.original_title;
    vote_average = movie.vote_average;
    release_date = movie.release_date;
    overview = movie.overview;
    genres = movie.genres;
  }

  const voteAverage = (vote_average * 10).toFixed(2);

  return (
    <div className={styles.container}>
      <img
        src={poster_path ? `${imageURL}${poster_path}` : 'error'}
        alt={original_title}
        className={styles.image}
      />
      <div className={styles.details}>
        <h2 className={styles.title}>
          {original_title}
          {release_date && <span>({release_date.slice(0, 4)})</span>}
        </h2>
        <h3 className={styles.score}>User Score</h3>
        <p>{voteAverage}%</p>
        <h3 className={styles.overview}>Overview</h3>
        <p className={styles.overview}>{overview}</p>
        <h3 className={styles.genres}>Genres</h3>
        <p className={styles.genres}>
          {genres?.map(({ name }) => name).join(', ')}
        </p>
        <h3 className={styles.additionalInfo}>Additional information</h3>
        <ul className={styles.additionalInfo}>
          <li>
            <Link to="cast" state={{ from }} className={styles.link}>
              Cast
            </Link>
          </li>
          <li>
            <Link to="reviews" state={{ from }} className={styles.link}>
              Reviews
            </Link>
          </li>
        </ul>
      </div>
      <button className={styles.backBtn} onClick={() => navigate(from)}>
        Go back
      </button>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;

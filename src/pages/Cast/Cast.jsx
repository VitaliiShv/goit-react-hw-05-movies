import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import api from 'shared/api/movies-api';

const Cast = () => {
  const [cast, setCast] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    if (movieId) {
      const fetchCast = async () => {
        try {
          const credits = await api.getMovieCredits(movieId);
          setCast(credits);
        } catch (data) {
          console.log(data.message);
        }
      };
      fetchCast();
    }
  }, [movieId]);

  const imageURL = 'https://image.tmdb.org/t/p/w500/';

  const elements = cast.map(({ profile_path, name, character, id }) => (
    <li key={id}>
      <img src={`${imageURL}${profile_path}`} alt="name" />
      <p>{name}</p>
      <p>Character:{character}</p>
    </li>
  ));

  return <ul>{elements}</ul>;
};

export default Cast;

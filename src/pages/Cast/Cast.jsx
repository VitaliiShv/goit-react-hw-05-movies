import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import api from 'shared/api/movies-api';
import defaultImage from 'shared/images/default-profile-image.png';

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

  const elements = cast.length ? (
    cast.map(({ profile_path, name, character, id }) => (
      <li key={id}>
        {profile_path ? (
          <img src={`${imageURL}${profile_path}`} alt={name} width={150} />
        ) : (
          <img src={defaultImage} alt={name} width={150} />
        )}
        <p>{name}</p>
        <p>Character:{character}</p>
      </li>
    ))
  ) : (
    <p>We don't have any actors for this movie</p>
  );

  return <ul>{elements}</ul>;
};

export default Cast;

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import api from 'shared/api/movies-api';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    if (movieId) {
      const fetchCast = async () => {
        try {
          const reviews = await api.getMovieReviews(movieId);
          setReviews(reviews);
        } catch ({ data }) {
          console.log(data.message);
        }
      };
      fetchCast();
    }
  }, [movieId]);

  const elements = reviews.map(({ author_details, content, id }) => (
    <li key={id}>
      <h3>Author: {author_details.name}</h3>
      <p>{content}</p>
    </li>
  ));

  return <ul>{elements}</ul>;
};

export default Reviews;

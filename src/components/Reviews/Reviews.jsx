import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from 'services/api';

export const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  const renderReviews = async movieId => {
    try {
      const fetchedReviews = await fetchMovieReviews(movieId);
      setReviews(fetchedReviews);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    renderReviews(movieId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ul>
        {reviews.length !== 0
          ? reviews.map(({ author, content, id }) => (
              <li key={id}>
                <h4>{author}</h4>
                <span>{content}</span>
              </li>
            ))
          : 'No reviews yet'}
      </ul>
    </>
  );
};

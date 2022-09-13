import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCredits } from 'services/api';

export const Cast = () => {
  const [castCredits, setCastCredits] = useState([]);
  const { movieId } = useParams();

  const renderCast = async movieId => {
    try {
      const fetchedCast = await fetchMovieCredits(movieId);
      setCastCredits(fetchedCast);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    renderCast(movieId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ul>
      {castCredits?.map(({ id, original_name, character, profile_path }) => (
        <div key={id}>
          <img
            src={
              profile_path
                ? `https://image.tmdb.org/t/p/w500${profile_path}`
                : 'https://restorixhealth.com/wp-content/uploads/2018/08/No-Image-684x1024.png'
            }
            alt=""
            width="100"
          />
          <li className="crew__container">
            <p>{original_name}</p>
            <p>Character: {character}</p>
          </li>
        </div>
      ))}
    </ul>
  );
};

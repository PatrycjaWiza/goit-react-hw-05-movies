import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from 'services/api';

export const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieById, setMovieById] = useState({});

  useEffect(() => {
    renderDetails(movieId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderDetails = async movieId => {
    try {
      const fetchedMovieDetails = await fetchMovieDetails(movieId);
      setMovieById({ ...fetchedMovieDetails });
    } catch (error) {
      console.error(error.message);
    }
  };

  console.log(movieById);

  const { poster_path, original_title, vote_average, overview, release_date } =
    movieById;

  const genres = movieById.genres.map(n => n.name).join(' ');
  const year = release_date.slice(0, 4);
  const roundVoteAvg = vote_average.toFixed(0);

  return (
    <>
      <div className="movieDetails__image">
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt="movie poster"
        />
      </div>
      <div className="movieDetails__info">
        <h3>
          {original_title} ({year})
        </h3>
        <p>Vote Average: {roundVoteAvg}</p>
        <h4>Overview</h4>
        <p>{overview}</p>
        <h4>Genres</h4>
        <p>{genres}</p>
      </div>
      <div className="movieDetails__additionalInfo">
        <p>Additional information</p>
        <ul>
          <li>Cast</li>
          <li>Reviews</li>
        </ul>
      </div>
    </>
  );
};

import { Suspense, useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { fetchMovieDetails } from 'services/api';
import { AdditionalInfo, LinkBtn, MovieDetails } from './MoviesDetailsStyles';

export const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieById, setMovieById] = useState({});
  const location = useLocation();
  const backLinkDefault = location.state ? '/movies' : '/';

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

  const {
    poster_path,
    original_title,
    vote_average,
    overview,
    release_date,
    genres,
  } = movieById;

  const year = new Date(release_date).getFullYear();
  const roundVoteAvg = (+vote_average).toFixed(0);
  return (
    <>
      <LinkBtn to={backLinkDefault}>&larr;Go back</LinkBtn>
      <MovieDetails className="movieDetails__container--upper_block">
        <div className="movieDetails__image">
          <img
            src={
              poster_path
                ? `https://image.tmdb.org/t/p/w500${poster_path}`
                : 'https://restorixhealth.com/wp-content/uploads/2018/08/No-Image-684x1024.png'
            }
            alt={original_title}
            width="250"
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
          <p>
            {genres?.map(({ id, name }) => (
              <span key={id}>{name} </span>
            ))}
          </p>
        </div>
      </MovieDetails>

      <AdditionalInfo className="movieDetails__additionalInfo">
        <p>Additional information</p>
        <ul>
          <li>
            <Link to="cast" state={location.state}>
              Cast
            </Link>
          </li>
          <li>
            <Link to="reviews" state={location.state}>
              Reviews
            </Link>
          </li>
        </ul>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </AdditionalInfo>
    </>
  );
};

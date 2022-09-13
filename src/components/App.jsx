import { Suspense, useEffect, useState, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { searchMovies, fetchTrendingMovies } from 'services/api';
import { Nav, StyledLink } from './NavLinkStyles';

const Homepage = lazy(() =>
  import('./Homepage/Homepage').then(module => ({ default: module.Homepage }))
);
const MoviesPage = lazy(() =>
  import('./MoviesPage/MoviesPage').then(module => ({
    default: module.MoviesPage,
  }))
);
const MovieDetailsPage = lazy(() =>
  import('./MovieDetailsPage/MovieDetailsPage').then(module => ({
    default: module.MovieDetailsPage,
  }))
);
const Cast = lazy(() =>
  import('./Cast/Cast').then(module => ({ default: module.Cast }))
);
const Reviews = lazy(() =>
  import('./Reviews/Reviews').then(module => ({ default: module.Reviews }))
);

export const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    renderHome();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    renderMovies(searchQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const renderHome = async () => {
    try {
      const fetchedTrendingMovies = await fetchTrendingMovies();
      setTrendingMovies([...fetchedTrendingMovies, ...trendingMovies]);
    } catch (error) {
      setError(error);
    }
  };

  const renderMovies = async searchQuery => {
    try {
      if (searchQuery !== '') {
        const searchedMovies = await searchMovies(searchQuery);
        setMovies([...searchedMovies, ...movies]);
      }
    } catch (error) {
      setError(error);
    }
  };

  const searchQueryUpdate = value => {
    setMovies([]);
    setSearchQuery(value);
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Nav>
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="/movies">Movies</StyledLink>
      </Nav>

      <Routes>
        <Route
          path="/"
          element={<Homepage trendingMovies={trendingMovies} />}
        />
        <Route
          path="/movies"
          element={<MoviesPage onSubmit={searchQueryUpdate} movies={movies} />}
        />

        <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>

        <Route
          path="*"
          element={<Homepage trendingMovies={trendingMovies} />}
        />
      </Routes>

      {error && <p> {error.message} </p>}
    </Suspense>
  );
};

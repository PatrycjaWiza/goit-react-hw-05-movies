import { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { searchMovies, fetchTrendingMovies } from 'services/api';
import { Homepage } from './Homepage/Homepage';
import { MoviesPage } from './MoviesPage/MoviesPage';
import { MovieDetailsPage } from './MovieDetailsPage/MovieDetailsPage';
import { Cast } from './Cast/Cast';
import { Reviews } from './Reviews/Reviews';

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
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/movies">Movies</Link>
      </nav>

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
    </div>
  );
};

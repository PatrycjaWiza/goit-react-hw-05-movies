import { Link } from 'react-router-dom';

export const Homepage = ({ trendingMovies }) => {
  // const location = useLocation();

  return (
    <>
      <h2>Trending today</h2>
      <ul>
        {trendingMovies.map(({ title, name, id }) => (
          <li key={id}>
            <Link to={`/movies/${id}`}>{title ? title : name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

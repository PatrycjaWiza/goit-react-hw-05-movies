import { useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { Form } from './MoviesStyles';

export const MoviesPage = ({ onSubmit, movies }) => {
  const [inptValue, setInptValue] = useState('');
  const location = useLocation();
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = e => {
    setInptValue(e.target.value);
    setSearchParams({ query: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(inptValue);
    setInptValue('');
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          name="movieName"
          value={inptValue}
          onChange={handleChange}
        ></input>
        <button
          type="submit"
          autoComplete="off"
          autoFocus
          placeholder="Search movies..."
        >
          Search
        </button>
      </Form>
      <ul>
        {movies.map(({ id, title, name }) => (
          <li key={id}>
            <Link to={`${id}`} state={location}>
              {title ? title : name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

import { useState } from 'react';
import { Link } from 'react-router-dom';

export const MoviesPage = ({ onSubmit, movies }) => {
  const [inptValue, setInptValue] = useState('');

  const handleChange = e => {
    setInptValue(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(inptValue);
    setInptValue('');
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
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
      </form>
      <ul>
        {movies.map(({ id, title, name }) => (
          <li key={id}>
            <Link to={`${id}`}>{title ? title : name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

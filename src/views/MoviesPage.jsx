import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import filmsApi from '../services/moviesAPI';
import MoviesList from '../components/MoviesList/MoviesList';

function MoviePage() {
  const history = useHistory();
  const location = useLocation();
  const [query, setQuery] = useState(location?.state?.query || '');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      const moviesRes = await filmsApi.searchMovie(query);
      setMovies(moviesRes);
      setError(false);
      history.push({ ...location, search: `query=${query}` });
    } catch (error) {
      setError();
    }
  };

  useEffect(() => {
    if (!query) return;
    fetchData();
  }, []);

  const handleNameChange = e => {
    setQuery(e.currentTarget.value);
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input
          className="input"
          type="text"
          autoFocus
          autoComplete="off"
          value={query}
          onChange={handleNameChange}
        />
        <button type="button" className="btn">
          Search
        </button>
      </form>
      {error && <p>Oops, something went wrong... {error}</p>}
      <MoviesList movies={movies} query={query} />
    </div>
  );
}

export default MoviePage;

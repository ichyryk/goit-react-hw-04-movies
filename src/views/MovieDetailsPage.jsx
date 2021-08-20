import { useState, useEffect, Suspense, lazy } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { NavLink, Route, useRouteMatch } from 'react-router-dom';
import filmsApi from '../services/moviesAPI';
import MovieDetails from '../components/MovieDetails/MovieDetails';
import routes from '../routes';

const Cast = lazy(() =>
  import('../components/Cast/Cast' /* webpackChunkName: "cast" */),
);
const Reviews = lazy(() =>
  import('../components/Reviews/Reviews' /* webpackChunkName: "reviews" */),
);

function MovieDetailsPage({ match }) {
  const { url, path } = useRouteMatch();
  const history = useHistory();
  const { state } = useLocation();
  const { movieId } = useParams();
  const [movie, setMovie] = useState({
    title: '',
    overview: '',
    poster_path: '',
    genres: [],
    release_date: '',
    vote_average: null,
  });

  useEffect(() => {
    filmsApi.fetchMovieDetails(movieId).then(setMovie);
  }, [movieId]);

  // const movieId = Number(match.params.movieId);

  // const fetchdata = async () => {
  //   try {
  //     const movieInfo = await filmsApi.fetchMovieDetails(movieId);
  //     const normalizedDate = await movieInfo.release_date
  //       .split('-')
  //       .reverse()
  //       .join('.');
  //     setMovie({ ...movieInfo, release_date: normalizedDate });
  //     setError(false);
  //   } catch (err) {
  //     setError(`${err}`);
  //   }
  // };

  // useEffect(() => {
  //   fetchdata();
  // }, []);

  const handleGoBack = () => {
    history.push({
      pathname: state?.from.pathname ?? routes.home,
      search: state?.from.search,
      state,
    });
  };

  return (
    <>
      <button type="button" onClick={handleGoBack} className="btn">
        Go back
      </button>
      {movie && <MovieDetails movie={movie} />}
      <div>
        <h2>Additional information</h2>
        <ul className="add-info-block">
          <li>
            <NavLink
              className="add-info"
              activeClassName="add-info--active"
              to={`${url}/${movieId}/cast`}
            >
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink
              className="add-info"
              activeClassName="add-info--active"
              to={`${url}/${movieId}/reviews`}
            >
              Reviews
            </NavLink>
          </li>
        </ul>
      </div>
      <Suspense fallback={<h2>Loading...</h2>}>
        <Route path={`${path}/${movieId}/cast`}>
          <Cast />
        </Route>
        <Route path={`${path}/${movieId}/reviews`}>
          <Reviews />
        </Route>
      </Suspense>
    </>
  );
}

export default MovieDetailsPage;

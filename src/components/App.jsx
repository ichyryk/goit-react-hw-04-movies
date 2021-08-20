import { Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import routes from '../routes';
import Container from './Container/Container';
import AppBar from './AppBar/AppBar';

const HomePage = lazy(() =>
  import('../views/HomePage' /* webpackChunkName: "home-page" */),
);
const MoviesPage = lazy(() =>
  import('../views/MoviesPage' /* webpackChunkName: "movies-page" */),
);
const MovieDetailsPage = lazy(() =>
  import(
    '../views/MovieDetailsPage' /* webpackChunkName: "movies-detail-page" */
  ),
);

function App() {
  return (
    <Container>
      <AppBar />

      <Suspense fallback={<h2>Loading...</h2>}>
        <Switch>
          <Route exact path={routes.home} component={HomePage} />
          <Route exact path={routes.movies} component={MoviesPage} />
          <Route path={routes.movieDetail} component={MovieDetailsPage} />
          <Redirect to={routes.home} />
          {/* <Route path={routes.home} exact>
            <HomePage />
          </Route>

          <Route path={routes.movies} exact>
            <MoviesPage />
          </Route>

          <Route path={routes.movieDetail}>
            <MovieDetailsPage />
          </Route>
          <Redirect to={routes.home} /> */}
        </Switch>
      </Suspense>
    </Container>
  );
}

export default App;

import PropTypes from 'prop-types';
import { Link, withRouter, useLocation } from 'react-router-dom';
import styles from './MoviesList.module.css';
import unnamed from '../../images/unnamed.jpg';

const MoviesList = ({ movies, query }) => {
  const location = useLocation();
  return (
    <>
      <ul className={styles.list}>
        {movies.map(({ id, title, name, poster_path }) => {
          const imgUrl = poster_path
            ? `https://image.tmdb.org/t/p/w500${poster_path}`
            : unnamed;
          return (
            <li key={id} className={styles.card}>
              <Link
                to={{
                  pathname: `/movies/${id}`,
                  state: { from: location, query },
                }}
              >
                <img src={imgUrl} alt={title} />
                <h3>{title ? title : name}</h3>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

MoviesList.defaultProps = {
  query: '',
};

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({})),
  query: PropTypes.string,
};

export default withRouter(MoviesList);

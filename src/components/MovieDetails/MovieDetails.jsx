import PropTypes from 'prop-types';
import defaultImg from '../../images/unnamed.jpg';
import s from './MovieDetails.module.css';

const MovieDetails = ({ movie }) => {
  const { title, overview, poster_path, genres, release_date, vote_average } =
    movie;

  const imgUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : defaultImg;

  return (
    <>
      <div className={s.flex}>
        <img src={imgUrl} alt={title} width="320" />
        <div className={s.info}>
          <h2>{title}</h2>
          <b>Release: {release_date}</b>
          <p>User score: {vote_average}</p>
          <h3>Overview: </h3>
          <p>{overview}</p>
          <h3>Genres: </h3>
          <ul>
            {genres && genres.map(({ id, name }) => <li key={id}>- {name}</li>)}
          </ul>
        </div>
      </div>
    </>
  );
};

MovieDetails.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
    overview: PropTypes.string.isRequired,
    poster_path: PropTypes.string,
    release_date: PropTypes.string.isRequired,
    vote_average: PropTypes.number,
    genres: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  }),
};

export default MovieDetails;

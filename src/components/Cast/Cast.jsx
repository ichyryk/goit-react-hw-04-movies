import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import defaultAvatar from '../../images/default-avatar.png';
import s from './Cast.module.css';
import fetchApi from '../../services/moviesAPI';

const Cast = ({ match }) => {
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(false);
  const { movieId } = useParams();
  //   const movieId = Number(match.params.movieId);

  useEffect(() => {
    fetchApi.fetchCast(movieId).then(setCast).catch(setError);
  }, [movieId]);

  //   const fetchData = async () => {
  //     try {
  //       const movieCast = await fetchApi.fetchCast(movieId);
  //       setCast(movieCast);
  //       setError(false);
  //     } catch (err) {
  //       setError(`${err}`);
  //     }
  //   };

  //   useEffect(() => {
  //     fetchData();
  //   }, []);

  return (
    <div>
      <h4>Cast: </h4>
      {error && <p>Oops, something went wrong... {error}</p>}
      <ul className={s.flex}>
        {cast.map(({ id, name, character, profile_path }) => {
          const imgUrl = profile_path
            ? `https://image.tmdb.org/t/p/w500${profile_path}`
            : defaultAvatar;
          return (
            <li key={id} className={s.card}>
              <img src={imgUrl} alt={name} />
              <div>
                <p>{name}</p>
                <p>{character}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Cast;

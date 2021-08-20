import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fetchApi from '../../services/moviesAPI';

const Reviews = ({ match }) => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    fetchApi.fetchReviews(movieId).then(setReviews).catch(setError);
  }, [movieId]);

  //   const fetchData = async () => {
  //     try {
  //       const movieReviews = await fetchApi.fetchReviews(movieId);
  //       setReviews(movieReviews);
  //       setError(false);
  //     } catch (err) {
  //       setError(`${err}`);
  //     }
  //   };

  //   useEffect(() => {
  //     fetchData();
  //   }, []);

  return (
    <>
      <h4>Reviews: </h4>
      {error && <p>Oops, something went wrong... {error}</p>}
      {reviews.length > 0 && !error ? (
        <ul>
          {reviews.map(({ id, content, author }) => (
            <li key={id}>
              <b>@{author}</b>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>We don't have any reviews for this movie</p>
      )}
    </>
  );
};

export default Reviews;

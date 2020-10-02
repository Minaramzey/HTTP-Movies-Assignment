import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch, Link } from 'react-router-dom';
import MovieCard from './MovieCard';
function Movie({ addToSavedList, props }) {
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const handleDelete = e => {
    e.preventDefault();
    axios
    .delete (`http://localhost:5000/api/movies/${movie.id}`)
    .then(res => {
      console.log(res)
      this.history.push('/')
    })
    .catch(err => console.log('delete err', err))
  }

  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />

      <div className='save-button' onClick={saveMovie}>
        Save
      </div>
      <Link to={`/update-movie/${movie.id}`}>
        <button>Edit</button>
      </Link>

      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default Movie;

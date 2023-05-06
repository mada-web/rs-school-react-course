import React, { FC, useEffect, useState } from 'react';

import { LoadingContainer } from '../LoadingContainer';
import { IDetailedMovie, IMovieDetails } from '../../types';
import { api_key, baseURL } from '../../constants';

import noImage from '../../assets/no-image.png';

import css from './MovieDetails.module.css';

export const MovieDetails: FC<IMovieDetails> = ({ id, onClose }): JSX.Element => {
  const [img, setImg] = useState<string>('');
  const [movie, setMovie] = useState<IDetailedMovie>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const response = await fetch(`${baseURL}movie/${id}?api_key=${api_key}&language=en-US`);
        const data = await response?.json();

        setMovie(data);
        setImg(`https://image.tmdb.org/t/p/original/${data?.poster_path}`);
      } catch (error) {
        console.log(error);
      }
    };

    getMovieDetails().then(() => setIsLoading(false));
  }, [id]);

  const releaseDate = movie?.release_date
    ? new Date(movie.release_date).toDateString().replace(/^\S+\s/, '')
    : 'no data available';

  const handleImageError = () => {
    setImg(noImage);
  };
  const budget = movie?.budget ? `${movie.budget}$` : 'no data available';
  const runtime = movie?.runtime ? `${movie?.runtime} min` : 'no data available';

  return (
    <LoadingContainer isLoading={isLoading}>
      <div className={css.MovieContainer}>
        <div className={css.Poster}>
          <img src={img} onError={handleImageError} alt="movie-image" />
        </div>
        <div className={css.MovieDetails}>
          <h1 className={css.MovieTitle}>{movie?.title || 'no data available'}</h1>
          <p className={css.MovieOverview}>
            Film overview: {movie?.overview || 'no data available'}{' '}
          </p>

          <ul className={css.MovieMeta}>
            <li className={css.Item}>
              Vote average: {movie?.vote_average.toFixed(1) ?? 'no data available'}
            </li>
            <li className={css.Item}>
              Homepage:
              <a
                href={movie?.homepage || 'https://www.themoviedb.org/'}
                target="_blank"
                rel="noreferrer"
              >
                {movie?.homepage || 'https://www.themoviedb.org/'}
              </a>
            </li>
            <li className={css.Item}>Budget: {budget}</li>
            <li className={css.Item}>Runtime: {runtime}</li>
            <li className={css.Item}>Released: {releaseDate || 'no data available'}</li>
          </ul>
          <button className={css.Button} onClick={onClose} />
        </div>
      </div>
    </LoadingContainer>
  );
};

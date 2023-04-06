import React, { FC, useEffect, useState } from 'react';

import noImage from '../../assets/No-Image.png';

import css from './MovieDetails.module.css';
import { IDetailedMovie, IMovieDetails } from '../../types';
import { api_key, baseURL } from '../../constants';
import { LoadingContainer } from '../LoadingContainer';

export const MovieDetails: FC<IMovieDetails> = ({ id, onClose }): JSX.Element => {
  const [movie, setMovie] = useState<IDetailedMovie>();
  //     {
  //   poster_path: noImage,
  //   title: '-',
  //   vote_average: 0,
  //   release_date: new Date().toDateString(),
  // } as IDetailedMovie
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [img, setImg] = useState<string>('');
  console.log(movie);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const response = await fetch(`${baseURL}movie/${id}?api_key=${api_key}&language=en-US`);
        const data = await response.json();
        setMovie(data);
        setImg(`https://image.tmdb.org/t/p/original/${data.poster_path}`);
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

  return (
    <LoadingContainer isLoading={isLoading}>
      <div className={css.MovieContainer}>
        <div className={css.Poster}>
          <img src={img} onError={handleImageError} alt="movie-image" className={css.Photo} />
        </div>
        <div className={css.MovieDetails}>
          <h1 className={css.Title}>{movie?.title || 'no data available'}</h1>
          <p className={css.Overview}>Film overview: {movie?.overview || 'no data available'} </p>

          <ul className={css.movieMeta}>
            <li className={css.Item}>Vote average: {movie?.vote_average} %</li>
            <li className={css.Item}>Homepage: {movie?.homepage || 'no data available'} </li>
            <li className={css.Item}>Budget: {movie?.budget || 'no data available'} </li>
            <li className={css.Item}>Runtime: {movie?.runtime || 'no data available'} </li>
            <li className={css.Item}>Released: {releaseDate || 'no data available'}</li>
          </ul>
          <button className={css.Button} onClick={onClose} />
        </div>
      </div>
    </LoadingContainer>
  );
};

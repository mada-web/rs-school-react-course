import React, { FC, useState } from 'react';

import { IMovieCard } from 'types';
import noImage from '../../assets/No-Image.png';

import css from './MovieCard.module.css';

export const MovieCard: FC<IMovieCard> = ({ movie, setIsShowModal, setMovieID }): JSX.Element => {
  const [img, setImg] = useState(`https://image.tmdb.org/t/p/original/${movie.poster_path}`);

  const releaseDate = new Date(movie.release_date).toDateString().replace(/^\S+\s/, '');

  const handleImageError = () => {
    setImg(noImage);
  };

  const handleModalOpen = () => {
    setIsShowModal(true);
    setMovieID(movie.id);
  };

  return (
    <div className={css.CardWrapper} onClick={handleModalOpen}>
      <img src={img} onError={handleImageError} alt="movie-image" className={css.Photo} />
      <div className={css.MovieMainInfo}>
        <span className={css.Title}>{movie.title}</span>
        <span className={css.Rating}>{movie.vote_average} %</span>
        <span className={css.Release}>{releaseDate}</span>
      </div>
    </div>
  );
};

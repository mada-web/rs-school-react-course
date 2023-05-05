import React, { FC, useState } from 'react';

import { Spinner } from '../Spinner';
import { IMovieCard } from 'types';
import noImage from '../../assets/no-image.png';

import css from './MovieCard.module.css';

export const MovieCard: FC<IMovieCard> = ({ movie, setIsShowModal, setMovieID }): JSX.Element => {
  const [img, setImg] = useState(`https://image.tmdb.org/t/p/original/${movie.poster_path}`);
  const [isLoading, setIsLoading] = useState(true);

  const ImgStyle = !isLoading ? css.Image : css.NoImage;
  const releaseDate = new Date(movie.release_date).toDateString().replace(/^\S+\s/, '');

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setImg(noImage);
  };

  const handleModalOpen = () => {
    setIsShowModal(true);
    setMovieID(movie.id);
  };

  return (
    <div className={css.CardWrapper} onClick={handleModalOpen}>
      {isLoading && <Spinner />}
      <img
        src={img}
        onError={handleImageError}
        alt="movie-image"
        className={ImgStyle}
        onLoad={handleImageLoad}
      />
      <div className={css.MovieMainInfo}>
        <span className={css.Title}>{movie.title}</span>
        <span className={css.Release}>{releaseDate}</span>
      </div>
    </div>
  );
};

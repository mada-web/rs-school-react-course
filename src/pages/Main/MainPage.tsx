import React, { FC, useState } from 'react';

import UseGetMovies from './useGetMovies';
import { Modal } from '../../components/Modal';
import { Search } from '../../components/Search';
import { Error } from '../../components/Error/Error';
import { MovieCard } from '../../components/MovieCard';
import { Container } from '../../components/Container';
import { MovieDetails } from '../../components/MovieDetails';
import { LoadingContainer } from '../../components/LoadingContainer';

import { IMovie } from '../../types';

import css from './MainPage.module.css';

export const MainPage: FC = () => {
  const [movieID, setMovieID] = useState<number>(0);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const { isError, isLoading, handleSearch, movies, setInputValue, setIsError } = UseGetMovies();

  const handleModalClose = () => {
    setIsShowModal(false);
  };

  const handleModalCloseOnError = () => {
    setIsShowModal(false);
    setIsError(false);
  };

  return (
    <Container>
      <div className={css.Wrapper}>
        <Search handleSearch={handleSearch} setInputValue={setInputValue} />
        <LoadingContainer isLoading={isLoading}>
          <div className={css.CardsContainer}>
            {movies?.length ? (
              movies.map((movie: IMovie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  setIsShowModal={setIsShowModal}
                  setMovieID={setMovieID}
                />
              ))
            ) : (
              <p>No data to display</p>
            )}
          </div>
        </LoadingContainer>
        {isShowModal ? (
          <Modal onClose={handleModalClose}>
            <MovieDetails id={movieID} onClose={handleModalClose} />
          </Modal>
        ) : (
          <></>
        )}
        {isError ? (
          <Modal onClose={handleModalCloseOnError}>
            <Error onClose={handleModalCloseOnError}>
              <>
                <h2>Sorry!</h2>
                <p>Server responded with error</p>
              </>
            </Error>
          </Modal>
        ) : (
          <></>
        )}
      </div>
    </Container>
  );
};

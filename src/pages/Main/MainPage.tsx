import React, { FC, useState } from 'react';

import { Modal } from '../../components/Modal';
import { Search } from '../../components/Search';
import { Error } from '../../components/Error/Error';
import { MovieCard } from '../../components/MovieCard';
import { Container } from '../../components/Container';
import { MovieDetails } from '../../components/MovieDetails';
import { LoadingContainer } from '../../components/LoadingContainer';

import useGetMovies from '../../hooks/useGetMovies';
import { useAppSelector } from '../../hooks/redux';

import { IMovie } from '../../types';
import css from './MainPage.module.css';

export const MainPage: FC = () => {
  const [movieID, setMovieID] = useState<number>(0);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  const { isError, isLoading, movies, handleSearch, setIsError } = useGetMovies({
    query: useAppSelector((state) => state.search.query),
  });

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
        <Search handleSearch={handleSearch} />
        <LoadingContainer isLoading={isLoading}>
          <div className={css.CardsContainer} data-testid={'cards-container'}>
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
              <h2>No data to display</h2>
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

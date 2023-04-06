import React, { FC, useEffect, useState } from 'react';

import { Container } from '../../components/Container';
import { Search } from '../../components/Search';
import { MovieCard } from '../../components/MovieCard';
import { IMovie } from '../../types';

import css from './MainPage.module.css';
import { LoadingContainer } from '../../components/LoadingContainer';
import { Modal } from '../../components/Modal';
import { api_key, baseURL } from '../../constants';
import { MovieDetails } from '../../components/MovieDetails';

export const MainPage: FC = () => {
  const [initialMovies, setInitialMovies] = useState<IMovie[]>([]);
  const [searchResults, setSearchResults] = useState<IMovie[]>([]);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [movieID, setMovieID] = useState<number>(0);

  useEffect(() => {
    const getInitialMovies = async () => {
      try {
        const response = await fetch(`${baseURL}movie/top_rated?api_key=${api_key}&language=en-US`);
        const data = await response.json();
        setInitialMovies(data.results);
      } catch (error) {
        console.log(error);
      }
    };

    getInitialMovies().then(() => setIsLoading(false));
  }, []);

  const handleModalClose = () => {
    setIsShowModal(false);
  };

  return (
    <Container>
      <LoadingContainer isLoading={isLoading}>
        <div className={css.Wrapper}>
          <Search setSearchResults={setSearchResults} />
          <div className={css.CardsContainer}>
            {searchResults.length
              ? searchResults.map((movie: IMovie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    setIsShowModal={setIsShowModal}
                    setMovieID={setMovieID}
                  />
                ))
              : initialMovies.map((movie: IMovie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    setIsShowModal={setIsShowModal}
                    setMovieID={setMovieID}
                  />
                ))}
          </div>
        </div>
        {isShowModal ? (
          <Modal onClose={handleModalClose}>
            <MovieDetails id={movieID} onClose={handleModalClose} />
          </Modal>
        ) : (
          <></>
        )}
      </LoadingContainer>
    </Container>
  );
};

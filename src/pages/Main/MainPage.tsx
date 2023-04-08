import React, { FC, useCallback, useEffect, useState } from 'react';

import { Container } from '../../components/Container';
import { Search } from '../../components/Search';
import { MovieCard } from '../../components/MovieCard';
import { IMovie } from '../../types';

import css from './MainPage.module.css';
import { LoadingContainer } from '../../components/LoadingContainer';
import { Modal } from '../../components/Modal';
import { api_key, baseURL } from '../../constants';
import { MovieDetails } from '../../components/MovieDetails';
import { Error } from '../../components/Error/Error';

export const MainPage: FC = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [movieID, setMovieID] = useState<number>(0);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(
    JSON.parse(localStorage.getItem('inputValue') ?? '')
  );

  console.log(isError);

  const handleSearch = useCallback(async (): Promise<void> => {
    try {
      const response = await fetch(
        `${baseURL}search/movie?api_key=${api_key}&language=en-US&query=${inputValue}&include_adult=false`
      );

      if (response.status > 400) {
        setIsError(true);
      }

      const searchResult = await response.json();

      setMovies(searchResult.results);
    } catch (error) {
      console.log('Error fetching movies:', error);
    }
  }, [inputValue]);

  const getInitialMovies = async () => {
    try {
      const response = await fetch(`${baseURL}movie/top_rated?api_key=${api_key}&language=en-US`);

      if (response.status > 400) {
        setIsError(true);
      }

      const data = await response.json();

      setMovies(data.results);
    } catch (error) {
      console.log('Error fetching initial movies:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (inputValue) {
          await handleSearch();
        } else {
          await getInitialMovies();
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData().then(() => setIsLoading(false));
  }, [handleSearch, inputValue]);

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

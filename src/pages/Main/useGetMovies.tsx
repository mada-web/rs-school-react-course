import { useCallback, useEffect, useState } from 'react';

import { IMovie } from '../../types';
import { api_key, baseURL } from '../../constants';

const UseGetMovies = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [inputValue, setInputValue] = useState<string>(
    JSON.parse(localStorage.getItem('inputValue') ?? '')
  );

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

  return { isError, isLoading, handleSearch, movies, setInputValue, setIsError };
};

export default UseGetMovies;

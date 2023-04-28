import { useCallback, useEffect, useState } from 'react';
import { movieAPI } from '../services/movieAPI';
import { IMovie } from '../types';

interface useGetMoviesProps {
  query?: string;
}

const useGetMovies = ({ query }: useGetMoviesProps) => {
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [movies, setMovies] = useState<IMovie[]>([]);

  const {
    data,
    error,
    isLoading: isFetchingMovies,
  } = query ? movieAPI.useFetchSearchMoviesQuery(query) : movieAPI.useFetchAllMoviesQuery(1);

  const handleSearch = useCallback((): void => {
    if (error) {
      setIsError(true);
    }

    if (data) {
      setMovies(data.results);
    }

    if (!isFetchingMovies) {
      setIsLoading(false);
    }
  }, [data, error, isFetchingMovies]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  return { isError, isLoading, movies, handleSearch, setIsError };
};

export default useGetMovies;

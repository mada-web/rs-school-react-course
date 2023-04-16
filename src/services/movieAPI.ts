import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { api_key, baseURL as baseUrl } from '../constants';
import { IMovie } from '../types';

export const movieAPI = createApi({
  reducerPath: 'movieAPI',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    fetchAllMovies: build.query<{ results: IMovie[] }, number>({
      query: (page) => ({
        url: `movie/top_rated?api_key=${api_key}&language=en-US&page=${page}`,
      }),
    }),
    fetchSearchMovies: build.query<{ results: IMovie[] }, string>({
      query: (query) => ({
        url: `search/movie?api_key=${api_key}&language=en-US&query=${query}&include_adult=false`,
      }),
    }),
  }),
});

import { Dispatch, SetStateAction } from 'react';

export type IMovie = {
  poster_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
};

export type IMovieCard = {
  movie: IMovie;
  setIsShowModal: Dispatch<SetStateAction<boolean>>;
  setMovieID: Dispatch<SetStateAction<number>>;
};

export type IMovieDetails = {
  id: number;
  onClose: () => void;
};

export interface IDetailedMovie extends IMovie {
  genres: [{ id: number; name: string }];
  homepage: string;
  overview: string;
  budget: number;
  runtime: number;
}

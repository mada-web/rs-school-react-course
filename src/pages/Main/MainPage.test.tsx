import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, vi } from 'vitest';

import { MainPage } from './MainPage';
import { api_key, baseURL } from '../../constants';

const mockMovie = [
  {
    poster_path: 'poster',
    adult: true,
    overview: 'overview',
    release_date: '01-01-2023',
    genre_ids: [132],
    id: 789,
    original_title: 'originalTitle',
    original_language: 'originalLanguage',
    title: 'mockMovie',
    backdrop_path: 'backdropPath',
    popularity: 900,
    vote_count: 32,
    video: false,
    vote_average: 4,
  },
];

act(() => {
  vi.mock('./useGetMovies', () => ({
    __esModule: true,
    default: vi.fn(() => ({
      isError: false,
      isLoading: false,
      handleSearch: vi.fn(),
      movies: mockMovie,
      setInputValue: vi.fn(),
      setIsError: vi.fn(),
    })),
  }));
});

global.fetch = vi.fn().mockImplementation((url) => {
  if (url === `${baseURL}movie/789?api_key=${api_key}&language=en-US`) {
    return Promise.resolve({
      json: () =>
        Promise.resolve({
          response: {
            id: 1,
            title: 'The Lord of the Rings',
            overview: 'A fantastic adventure',
            release_date: '2001-12-19',
            vote_average: 8.9,
            homepage: 'https://www.lordoftherings.com',
            budget: 93000000,
            runtime: 178,
            poster_path: '/poster.jpg',
          },
        }),
    });
  } else {
    return new Promise((resolve) => {
      resolve({
        json: () =>
          new Promise((resolve) => {
            resolve({ response: mockMovie });
          }),
      });
    });
  }
});

describe('MainPage', () => {
  beforeEach(() => {
    localStorage.setItem('inputValue', JSON.stringify('test'));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render the search input and movie cards', () => {
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText('Search...');
    const movieCard = screen.getByText('mockMovie');

    expect(searchInput).toBeInTheDocument();
    expect(movieCard).toBeInTheDocument();
  });

  it('should call handleSearch when Enter key is pressed on search input', () => {
    const handleSearchMock = vi.fn();

    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );

    const inputElement = screen.getByPlaceholderText('Search...') as HTMLInputElement;

    fireEvent.change(inputElement, { target: { value: 'new value' } });

    expect(inputElement.value).toBe('new value');

    fireEvent.keyDown(inputElement, { code: 'Enter' });

    waitFor(() => {
      expect(handleSearchMock).toHaveBeenCalledTimes(1);
    });
  });

  it('should display movie details modal when movie card is clicked', () => {
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );

    const movieCard = screen.getByText('mockMovie');

    fireEvent.click(movieCard);

    waitFor(() => {
      expect(screen.getByText('mockMovie')).toBeInTheDocument();
    });
  });

  it('should display error modal when isError is true', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.mock('./useGetMovies', () => ({
      __esModule: true,
      default: vi.fn(() => ({
        isError: true,
        isLoading: false,
        handleSearch: vi.fn(),
        movies: [],
        setInputValue: vi.fn(),
        setIsError: vi.fn(),
      })),
    }));

    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );

    waitFor(() => {
      expect(screen.getByText(/Server responded with error/i)).toBeInTheDocument();
    });
  });
});

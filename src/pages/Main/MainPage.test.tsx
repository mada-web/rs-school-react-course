import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, vi } from 'vitest';

import { MainPage } from './MainPage';
import { api_key, baseURL } from '../../constants';
import { MockStoreProvider } from '../../store/mockStoreProvider';

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
  vi.mock('../../hooks/useGetMovies', () => ({
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
    return Promise.resolve({
      json: () => Promise.resolve(mockMovie),
    });
  }
});

describe('MainPage', () => {
  beforeEach(() => {
    localStorage.setItem('inputValue', 'test');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render the search input and movie cards', () => {
    render(
      <MockStoreProvider>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </MockStoreProvider>
    );

    const searchInput = screen.getByPlaceholderText('Search...');
    const movieCard = screen.getByText('mockMovie');

    expect(searchInput).toBeInTheDocument();
    expect(movieCard).toBeInTheDocument();
  });

  it('should display movie details modal when movie card is clicked', () => {
    render(
      <MockStoreProvider>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </MockStoreProvider>
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
      <MockStoreProvider>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </MockStoreProvider>
    );

    waitFor(() => {
      expect(screen.getByText(/Server responded with error/i)).toBeInTheDocument();
    });
  });
});

// describe('MainPage component', () => {
//   it('should render search bar, movie cards, and movie modal correctly', async () => {
//     render(<MainPage />);
//
//     // Check if search bar is rendered correctly
//     expect(screen.getByPlaceholderText('Search for a movie...')).toBeInTheDocument();
//
//     // Check if movie cards are rendered correctly
//     expect(screen.getByText('Test Movie')).toBeInTheDocument();
//     expect(screen.getByText('This is a test movie')).toBeInTheDocument();
//     expect(screen.getByText('2022')).toBeInTheDocument();
//
//     // Check if movie modal is not visible initially
//     expect(screen.queryByText('This is a test movie')).not.toBeVisible();
//
//     // Click on a movie card and check if movie modal is visible
//     userEvent.click(screen.getByText('Test Movie'));
//
//     await waitFor(() => {
//       expect(screen.getByText('This is a test movie')).toBeVisible();
//     });
//
//     // Close movie modal and check if it is not visible
//     userEvent.click(screen.getByRole('button', { name: /close/i }));
//
//     await waitFor(() => {
//       expect(screen.queryByText('This is a test movie')).not.toBeVisible();
//     });
//   });
//
//   it('should render error modal correctly', async () => {
//     // Mock useGetMovies to return error
//     jest.mock('../../hooks/useGetMovies', () => ({
//       __esModule: true,
//       default: jest.fn(() => ({
//         isError: true,
//         isLoading: false,
//         movies: [],
//         handleSearch: jest.fn(),
//         setIsError: jest.fn(),
//       })),
//     }));
//
//     render(<MainPage />);
//
//     // Check if error modal is visible
//     await waitFor(() => {
//       expect(screen.getByText('Server responded with error')).toBeVisible();
//     });
//
//     // Close error modal and check if it is not visible
//     userEvent.click(screen.getByRole('button', { name: /close/i }));
//
//     await waitFor(() => {
//       expect(screen.queryByText('Server responded with error')).not.toBeInTheDocument();
//     });
//   });
// });

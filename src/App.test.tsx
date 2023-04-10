import React from 'react';
import { describe, it, vi } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';

import App, { routerConfig } from './App';

const getDataForMainPage = () => {
  localStorage.setItem('inputValue', 'test');
  vi.mock('./pages/Main/useGetMovies', () => ({
    __esModule: true,
    default: vi.fn(() => ({
      isError: false,
      isLoading: false,
      handleSearch: vi.fn(),
      movies: [
        {
          poster_path: 'string',
          adult: true,
          overview: 'string',
          release_date: '01-01-2023',
          genre_ids: [132],
          id: 789,
          original_title: 'string',
          original_language: 'string',
          title: 'mockMovie',
          backdrop_path: 'string',
          popularity: 900,
          vote_count: 32,
          video: false,
          vote_average: 4,
        },
      ],
      setInputValue: vi.fn(),
      setIsError: vi.fn(),
    })),
  }));
};

describe('Routes', () => {
  it('renders MainPage component for "/" path', () => {
    act(() => getDataForMainPage);

    const router = createMemoryRouter(routerConfig, {
      initialEntries: ['/'],
    });

    render(<RouterProvider router={router} />);

    const nameInput = screen.getByPlaceholderText(/Search.../);

    expect(nameInput).toBeInTheDocument();
  });

  it('renders About component for "/about" path', () => {
    const router = createMemoryRouter(routerConfig, {
      initialEntries: ['/about'],
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByText(/Everyone can study at RS School/i)).toBeInTheDocument();
  });

  it('renders FormsPage component for "/forms" path', () => {
    const router = createMemoryRouter(routerConfig, {
      initialEntries: ['/forms'],
    });

    render(<RouterProvider router={router} />);

    const nameInput = screen.getByLabelText(/Enter your name:/);

    expect(nameInput).toBeInTheDocument();
  });

  it('renders NotFoundPage component for non-existent path', () => {
    const router = createMemoryRouter(routerConfig, {
      initialEntries: ['/unknown'],
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
  });
});
describe('App', () => {
  it('renders App', () => {
    act(() => getDataForMainPage);

    render(<App />);

    const nameInput = screen.getByPlaceholderText(/Search.../);

    expect(nameInput).toBeInTheDocument();
  });
});

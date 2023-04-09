import React from 'react';
import { describe, it, vi } from 'vitest';
import { act, render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('renders MainPage component for "/" path', () => {
    localStorage.setItem('inputValue', 'test');

    act(() => {
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
    });

    window.history.pushState({}, '', '/');
    window.location.href = '/';

    const { getByPlaceholderText } = render(<App />);

    const nameInput = getByPlaceholderText(/Search.../);

    expect(nameInput).toBeInTheDocument();
  });

  it('renders About component for "/about" path', () => {
    window.history.pushState({}, '', '/about');
    window.location.href = '/about';

    const { getByText } = render(<App />);

    expect(getByText(/Everyone can study at RS School/i)).toBeInTheDocument();
  });

  it('renders FormsPage component for "/forms" path', () => {
    window.history.pushState({}, '', '/forms');
    window.location.href = '/forms';

    const { getByLabelText } = render(<App />);

    const nameInput = getByLabelText(/Enter your name:/);

    expect(nameInput).toBeInTheDocument();
  });

  it('renders NotFoundPage component for non-existent path', () => {
    window.history.pushState({}, '', '/some-page');
    window.location.href = '/some-page';

    const { getByText } = render(<App />);

    expect(getByText(/Something went wrong/i)).toBeInTheDocument();
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, vi } from 'vitest';

import { MovieCard } from './MovieCard';

const mockMovie = {
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
};

describe('Card component', () => {
  it('should render user information', () => {
    render(<MovieCard movie={mockMovie} setIsShowModal={vi.fn()} setMovieID={vi.fn()} />);

    expect(screen.getByText(/mockMovie/)).toBeInTheDocument();
    expect(screen.getByText(/Jan 01 2023/)).toBeInTheDocument();
    expect(screen.getByText(/4 %/)).toBeInTheDocument();
  });
});

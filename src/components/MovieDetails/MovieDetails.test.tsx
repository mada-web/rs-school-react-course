import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, vi } from 'vitest';

import { MovieDetails } from './MovieDetails';

describe('MovieDetails', () => {
  const mockOnClose = vi.fn();
  const mockMovie = {
    id: 1,
    title: 'The Lord of the Rings',
    overview: 'A fantastic adventure',
    release_date: '2001-12-19',
    vote_average: 8.9,
    homepage: 'https://www.lordoftherings.com',
    budget: 93000000,
    runtime: 178,
    poster_path: '/poster.jpg',
  };

  it('should render the movie details', async () => {
    global.fetch = vi.fn().mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockMovie),
      })
    );

    render(<MovieDetails id={mockMovie.id} onClose={mockOnClose} />);

    await waitFor(() => {
      screen.findByText(mockMovie.title);
    });

    expect(screen.getByAltText('movie-image')).toHaveAttribute(
      'src',
      `https://image.tmdb.org/t/p/original/${mockMovie.poster_path}`
    );
    expect(screen.getByText(`Film overview: ${mockMovie.overview}`)).toBeInTheDocument();
    expect(
      screen.getByText(`Vote average: ${mockMovie.vote_average.toFixed(1)}`)
    ).toBeInTheDocument();
    expect(screen.getByText(`Budget: ${mockMovie.budget}$`)).toBeInTheDocument();
    expect(screen.getByText(`Runtime: ${mockMovie.runtime} min`)).toBeInTheDocument();
    expect(
      screen.getByText(
        `Released: ${new Date(mockMovie.release_date).toDateString().replace(/^\S+\s/, '')}`
      )
    ).toBeInTheDocument();

    expect(screen.getByRole('button')).toBeInTheDocument();

    // await waitFor(() => {
    await userEvent.click(screen.getByRole('button'));
    // });

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi } from 'vitest';

import { Error } from './Error';

describe('Error', () => {
  it('renders an error message and calls onClose when the button is clicked', () => {
    const mockOnClose = vi.fn();
    render(
      <Error onClose={mockOnClose}>
        <p>There was an error.</p>
      </Error>
    );

    expect(screen.getByText('There was an error.')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button'));

    expect(mockOnClose).toHaveBeenCalled();
  });
});

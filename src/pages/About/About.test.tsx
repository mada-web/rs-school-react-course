import React from 'react';
import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import About from './About';

describe('About', () => {
  it('renders the main content', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    const rs = screen.getAllByText(/RS School/i);

    expect(rs.length).toBe(2);
    expect(screen.getByText(/free-of-charge/i)).toBeInTheDocument();
  });

  it('renders the principles', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    expect(screen.getByText(/Open Source Philosophy/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Our platform and education materials are publicly available/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Teach It Forward/i)).toBeInTheDocument();
    expect(screen.getByText(/students study at school for free/i)).toBeInTheDocument();
  });
});

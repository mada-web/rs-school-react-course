import React from 'react';
import { describe, it } from 'vitest';

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

describe('Header', () => {
  it('should render Main and About Us links', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const mainLink = screen.getByText('Main');
    const aboutUsLink = screen.getByText('About Us');

    expect(mainLink).toBeInTheDocument();
    expect(aboutUsLink).toBeInTheDocument();
  });

  it('should have the active class on the active link', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <Header />
      </MemoryRouter>
    );

    const mainLink = screen.getByText('Main');
    const aboutUsLink = screen.getByText('About Us');

    expect(mainLink).not.toHaveClass('activeNavLink');
    expect(aboutUsLink).toHaveClass('activeNavLink');
  });
});

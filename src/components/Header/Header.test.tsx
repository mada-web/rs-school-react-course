import React from 'react';
import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Header from './Header';

describe('Header', () => {
  it('should render all links', () => {
    const { getByText, getAllByRole } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const links = getAllByRole('link');

    expect(links).toHaveLength(3);
    expect(getByText('Main')).toBeInTheDocument();
    expect(getByText('Forms')).toBeInTheDocument();
    expect(getByText('About')).toBeInTheDocument();
  });

  it('should have the active class on the active link', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/about']}>
        <Header />
      </MemoryRouter>
    );

    const mainLink = getByText('Main');
    const aboutUsLink = getByText('About');

    expect(mainLink).not.toHaveClass('activeNavLink');
    expect(aboutUsLink).toHaveClass('activeNavLink');
  });
});

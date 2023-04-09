import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, vi } from 'vitest';

import { Container } from './Container';

vi.mock('react-router-dom', () => ({
  NavLink: ({ to, children }: { to: string; children: React.ReactNode }) => (
    <a href={to}>{children}</a>
  ),
}));

describe.only('Container', () => {
  it('should render the header and the main section', () => {
    render(
      <Container>
        <div>Some content</div>
      </Container>
    );

    const content = screen.getByText('Some content');

    expect(content).toBeInTheDocument();
  });
});

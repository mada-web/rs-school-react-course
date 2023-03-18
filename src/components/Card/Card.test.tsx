import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';

import Card from './Card';

const mockUser = {
  id: 1,
  name: 'Leanne Graham',
  username: 'Bret',
  email: 'Sincere@april.biz',
  address: {
    street: 'Kulas Light',
    suite: 'Apt. 556',
    city: 'Gwenborough',
    zipcode: '92998-3874',
  },
  phone: '1-770-736-8031',
  website: 'hildegard.org',
};

describe('Card component', () => {
  it('should render user information', () => {
    render(<Card user={mockUser} />);

    expect(screen.getByAltText('Bret photo')).toBeInTheDocument();
    expect(screen.getByText(/Leanne Graham/)).toBeInTheDocument(); // using regular expression matcher
    expect(screen.getByText(/Bret/)).toBeInTheDocument();
    expect(screen.getByText(/Kulas Light/)).toBeInTheDocument();
    expect(screen.getByText(/Apt. 556/)).toBeInTheDocument();
    expect(screen.getByText(/Gwenborough/)).toBeInTheDocument();
    expect(screen.getByText(/92998-3874/)).toBeInTheDocument();
    expect(screen.getByText(/1-770-736-8031/)).toBeInTheDocument();
    expect(screen.getByText(/hildegard.org/)).toBeInTheDocument();
  });
});

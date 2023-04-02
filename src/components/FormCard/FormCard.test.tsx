import React from 'react';
import { render } from '@testing-library/react';
import { describe, it } from 'vitest';

import { FormCard } from './FormCard';

describe('FormCard component', () => {
  const mockCard = {
    id: '123',
    userName: 'User',
    birthDate: '01-01-1990',
    preferences: 'Functions',
    technology: 'React',
    fileURL: 'https://example.com/image.jpg',
  };

  it('should render all the card information correctly', () => {
    const { getByText, getByAltText } = render(<FormCard card={mockCard} />);

    expect(getByText(/User/i)).toBeInTheDocument();
    expect(getByText(/01-01-1990/i)).toBeInTheDocument();
    expect(getByText(/Functions/i)).toBeInTheDocument();
    expect(getByText(/React/i)).toBeInTheDocument();
    expect(getByAltText('uploadedImage')).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  it('should render image alternative text ', () => {
    const { queryByAltText } = render(<FormCard card={{ ...mockCard, fileURL: '' }} />);

    expect(queryByAltText('uploadedImage')).toBeInTheDocument();
  });
});

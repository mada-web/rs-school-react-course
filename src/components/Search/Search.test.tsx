import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { describe, it, vi } from 'vitest';

import { Search } from './Search';
import { MockProvider } from '../../store/mockProvider';

describe('Search component', () => {
  const handleSearch = vi.fn();

  it('should render an input field', () => {
    const { getByPlaceholderText } = render(
      <MockProvider>
        <Search handleSearch={handleSearch} />
      </MockProvider>
    );

    const inputElement = getByPlaceholderText('Search...');

    expect(inputElement).toBeInTheDocument();
  });

  it('should call handleSearch on Enter key press', () => {
    const { getByPlaceholderText } = render(
      <MockProvider>
        <Search handleSearch={handleSearch} />
      </MockProvider>
    );

    const inputElement = getByPlaceholderText('Search...') as HTMLInputElement;

    fireEvent.keyDown(inputElement, { code: 'Enter' });

    expect(handleSearch).toHaveBeenCalled();
  });
});

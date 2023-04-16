import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { describe, it, vi } from 'vitest';

import { Search } from './Search';
import { MockStoreProvider } from '../../store/mockStoreProvider';

describe('Search component', () => {
  const handleSearch = vi.fn();

  it('should render an input field', () => {
    const { getByPlaceholderText } = render(
      <MockStoreProvider>
        <Search handleSearch={handleSearch} />
      </MockStoreProvider>
    );

    const inputElement = getByPlaceholderText('Search...');

    expect(inputElement).toBeInTheDocument();
  });

  it('should call handleSearch on Enter key press', () => {
    const { getByPlaceholderText } = render(
      <MockStoreProvider>
        <Search handleSearch={handleSearch} />
      </MockStoreProvider>
    );

    const inputElement = getByPlaceholderText('Search...') as HTMLInputElement;

    fireEvent.keyDown(inputElement, { code: 'Enter' });

    expect(handleSearch).toHaveBeenCalled();
  });
});

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, vi } from 'vitest';

import { Search } from './Search';

describe('Search component', () => {
  it('should render an input field', () => {
    localStorage.setItem('inputValue', JSON.stringify('test'));

    const { getByPlaceholderText } = render(
      <Search setInputValue={vi.fn()} handleSearch={vi.fn()} />
    );

    const inputElement = getByPlaceholderText('Search...');

    expect(inputElement).toBeInTheDocument();
  });

  it('should update the input field value on change', () => {
    localStorage.setItem('inputValue', JSON.stringify('test'));

    const setInputValue = vi.fn();
    const handleSearch = vi.fn(() => Promise.resolve());

    const { getByPlaceholderText } = render(
      <Search setInputValue={setInputValue} handleSearch={handleSearch} />
    );
    const inputElement = getByPlaceholderText('Search...') as HTMLInputElement;

    fireEvent.change(inputElement, { target: { value: 'new value' } });

    expect(inputElement.value).toBe('new value');

    fireEvent.keyDown(inputElement, { code: 'Enter' });

    waitFor(() => {
      expect(setInputValue).toHaveBeenCalled();
    });
  });

  it('should call handleSearch on Enter key press', () => {
    const handleSearch = vi.fn(() => Promise.resolve());

    const { getByPlaceholderText } = render(
      <Search setInputValue={vi.fn()} handleSearch={handleSearch} />
    );

    const inputElement = getByPlaceholderText('Search...') as HTMLInputElement;

    fireEvent.keyDown(inputElement, { code: 'Enter' });

    expect(handleSearch).toHaveBeenCalled();
  });
});

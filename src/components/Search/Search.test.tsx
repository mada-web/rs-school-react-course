import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { describe, it, vi } from 'vitest';

import { Search } from './Search';

describe('Search component', () => {
  it('should render input element with placeholder text', () => {
    const { getByPlaceholderText } = render(<Search setSearchResults={vi.fn()} />);
    const inputElement = getByPlaceholderText('Search...');

    expect(inputElement).toBeInTheDocument();
  });

  it('should update input value when user types', () => {
    const { getByPlaceholderText } = render(<Search setSearchResults={vi.fn()} />);
    const inputElement = getByPlaceholderText('Search...');

    fireEvent.change(inputElement, { target: { value: 'test' } });

    expect(inputElement).toHaveValue('test');
  });

  it('should store input value in localStorage on unmount', () => {
    const { getByPlaceholderText, unmount } = render(<Search setSearchResults={vi.fn()} />);
    const inputElement = getByPlaceholderText('Search...');

    fireEvent.change(inputElement, { target: { value: 'test' } });

    unmount();

    expect(localStorage.getItem('inputValue')).toEqual(JSON.stringify('test'));
  });

  it('should retrieve input value from localStorage on mount', () => {
    localStorage.setItem('inputValue', JSON.stringify('test'));

    const { getByPlaceholderText } = render(<Search setSearchResults={vi.fn()} />);
    const inputElement = getByPlaceholderText('Search...');

    expect(inputElement).toHaveValue('test');
  });
});

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, vi } from 'vitest';

import { MainPage } from './MainPage';

describe('MainPage', () => {
  it('should render the search input and user cards', () => {
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText(/Search.../i)).toBeInTheDocument();
    expect(screen.getByText('Leanne Graham')).toBeInTheDocument();
    expect(screen.getByText('Ervin Howell')).toBeInTheDocument();
  });

  it('should update the input value when typing in the search input', () => {
    const inputValue = 'test';

    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );

    const inputElement = screen.getByPlaceholderText(/Search.../i) as HTMLInputElement;

    fireEvent.change(inputElement, { target: { value: inputValue } });

    expect(inputElement.value).toBe(inputValue);
  });

  it('should save the input value to localStorage when component will unmount', () => {
    const inputValue = {
      inputValue: 'test',
    };

    const localStorageMock = {
      getItem: vi.fn().mockReturnValue(JSON.stringify(inputValue)),
      setItem: vi.fn(),
    };

    Object.defineProperty(window, 'localStorage', { value: localStorageMock });

    const { unmount } = render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );

    unmount();

    expect(localStorageMock.setItem).toHaveBeenCalledWith('inputValue', JSON.stringify(inputValue));
  });
});

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi } from 'vitest';

import MainPage from './MainPage';
import { MemoryRouter } from 'react-router-dom';

const mockUsers = [
  {
    id: 1,
    name: 'Leanne',
    username: 'Mick',
    email: 'Sincere@april.biz',
    address: {
      street: 'Light',
      suite: 'Apt. 556',
      city: 'Gwen',
      zipcode: '92998-3874',
    },
    phone: '1-770-736-8031',
    website: 'hildegard.org',
  },
  {
    id: 2,
    name: ' Graham',
    username: 'Bret',
    email: 'Chop@april.biz',
    address: {
      street: 'Dark',
      suite: 'Apt. 489',
      city: 'Cron',
      zipcode: '6546',
    },
    phone: '3698256516',
    website: 'js.org',
  },
];

describe('MainPage', () => {
  it('should render the search input and user cards', () => {
    render(
      <MemoryRouter>
        <MainPage users={mockUsers} />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText(/Search.../i)).toBeInTheDocument();
    expect(screen.getByText('Leanne')).toBeInTheDocument();
    expect(screen.getByText('Graham')).toBeInTheDocument();
  });

  it('should update the input value when typing in the search input', () => {
    const inputValue = 'test';

    render(
      <MemoryRouter>
        <MainPage users={mockUsers} />
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
        <MainPage users={mockUsers} />
      </MemoryRouter>
    );

    unmount();

    expect(localStorageMock.setItem).toHaveBeenCalledWith('inputValue', JSON.stringify(inputValue));
  });
});

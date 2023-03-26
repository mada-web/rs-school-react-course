import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { describe, it, vi } from 'vitest';

import Popup from './PopUp';

describe('PopUp', () => {
  const mockSetIsOpen = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('should renders Popup component when isOpen is true', () => {
    render(<Popup setIsOpen={mockSetIsOpen} isOpen={true} />);

    const title = screen.getByRole('heading', { name: /CARD HAS BEEN CREATED/i });
    const message = screen.getByText(/Your data successfully saved/i);

    expect(title).toBeInTheDocument();
    expect(message).toBeInTheDocument();
  });

  it('should  not render Popup component when isOpen is false', () => {
    render(<Popup setIsOpen={mockSetIsOpen} isOpen={false} />);

    const popup = screen.queryByRole('dialog');

    expect(popup).not.toBeInTheDocument();
  });

  it('should calls setIsOpen with false after 5 seconds', () => {
    render(<Popup setIsOpen={mockSetIsOpen} isOpen={true} />);

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(mockSetIsOpen).toHaveBeenCalledWith(false);
  });
});

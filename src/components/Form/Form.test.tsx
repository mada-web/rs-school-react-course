import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { describe, it, vi } from 'vitest';

import { Form } from './Form';

describe('Form component', () => {
  const getCardMock = vi.fn();
  const setIsOpenMock = vi.fn();

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should render form elements', () => {
    render(<Form getCard={getCardMock} setIsOpen={setIsOpenMock} />);

    expect(screen.getByLabelText(/Enter your name:/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date of birth:/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Upload your image:/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Functions/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Classes/)).toBeInTheDocument();
    expect(screen.getByLabelText(/I consent to processing/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Choose your favorite technology:/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('should validate all fields and not to call getCard function', async () => {
    URL.createObjectURL = vi.fn(() => '');
    crypto.randomUUID = vi.fn(() => '');

    render(<Form getCard={getCardMock} setIsOpen={setIsOpenMock} />);

    const nameInput = screen.getByLabelText(/Enter your name:/);
    const birthDateInput = screen.getByLabelText(/Date of birth:/);
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    fireEvent.change(nameInput, { target: { value: '' } });
    fireEvent.change(birthDateInput, { target: { value: '' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(getCardMock).not.toHaveBeenCalled();
    });
  });
});

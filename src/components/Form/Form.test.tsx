import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import Form from './Form';

// vi.mock('URL', () => ({ createObjectURL: vi.fn().mockReturnValue('mockedURL') }));
// vi.mock('crypto', () => ({ randomUUID: vi.fn().mockReturnValue('mockedID') }));

describe('Form component', () => {
  const getCardMock = vi.fn();
  const setIsOpenMock = vi.fn();

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should render form elements', () => {
    render(<Form getCard={getCardMock} setIsOpen={setIsOpenMock} />);

    expect(screen.getByText(/Tell me about yourself, please/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Enter your name:/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Enter you date of birth:/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Choose your favorite:/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Functions/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Classes/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Rate this form, please:/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Upload your image:/)).toBeInTheDocument();
    expect(screen.getByLabelText(/I consent to my personal data/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('should call getCard and setIsOpen functions', async () => {
    URL.createObjectURL = vi.fn(() => 'mockedURL');
    crypto.randomUUID = vi.fn(() => 'mockedID');

    render(<Form getCard={getCardMock} setIsOpen={setIsOpenMock} />);

    const nameInput = screen.getByLabelText(/Enter your name:/);
    fireEvent.change(nameInput, { target: { value: 'john' } });

    const birthDateInput = screen.getByLabelText(/Enter you date of birth:/);
    fireEvent.change(birthDateInput, { target: { value: '2022-01-01' } });

    const technologySelect = screen.getByLabelText(/Choose your favorite:/);
    fireEvent.change(technologySelect, { target: { value: 'React' } });

    const functionsRadio = screen.getByLabelText(/Functions/);
    fireEvent.click(functionsRadio);

    const ratingInput = screen.getByLabelText(/Rate this form, please:/);
    fireEvent.change(ratingInput, { target: { value: '5' } });

    const uploadInput = screen.getByLabelText(/Upload your image:/);
    const file = new File(['hello'], 'hello.png', { type: 'image/png' });
    fireEvent.change(uploadInput, { target: { files: [file] } });

    const agreementCheckbox = screen.getByLabelText(/I consent to my personal data/);
    fireEvent.click(agreementCheckbox);

    const submitButton = screen.getByRole('button', { name: 'Submit' });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(getCardMock).toHaveBeenCalledTimes(1);
    });
  });

  it('should validate all fields and not to call getCard function', async () => {
    URL.createObjectURL = vi.fn(() => '');
    crypto.randomUUID = vi.fn(() => '');

    render(<Form getCard={getCardMock} setIsOpen={setIsOpenMock} />);

    const nameInput = screen.getByLabelText(/Enter your name:/);
    fireEvent.change(nameInput, { target: { value: '' } });

    const birthDateInput = screen.getByLabelText(/Enter you date of birth:/);
    fireEvent.change(birthDateInput, { target: { value: '' } });

    const ratingInput = screen.getByLabelText(/Rate this form, please:/);
    fireEvent.change(ratingInput, { target: { value: 0 } });

    const submitButton = screen.getByRole('button', { name: 'Submit' });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(getCardMock).not.toHaveBeenCalled();
    });
  });
});

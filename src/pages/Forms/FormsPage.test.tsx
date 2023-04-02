import React from 'react';
import { describe, it, vi } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/react';

import FormsPage from './FormsPage';
import { MemoryRouter } from 'react-router-dom';

describe('FormsPage', () => {
  it('should render the Form component', () => {
    const { getByLabelText } = render(
      <MemoryRouter>
        <FormsPage />
      </MemoryRouter>
    );

    const nameInput = getByLabelText(/Enter your name:/);

    expect(nameInput).toBeInTheDocument();
  });

  it('should add a card when the form is submitted', async () => {
    URL.createObjectURL = vi.fn(() => 'mockedURL');
    crypto.randomUUID = vi.fn(() => 'mockedID');

    const { getByLabelText, getByRole, getByText } = render(
      <MemoryRouter>
        <FormsPage />
      </MemoryRouter>
    );

    const nameInput = getByLabelText(/Enter your name:/);
    const birthDateInput = getByLabelText(/Enter you date of birth:/);
    const technologySelect = getByLabelText(/Choose your favorite:/);
    const functionsRadio = getByLabelText(/Functions/);
    const ratingInput = getByLabelText(/Rate this form, please:/);
    const uploadInput = getByLabelText(/Upload your image:/);
    const file = new File(['hello'], 'hello.png', { type: 'image/png' });
    const agreementCheckbox = getByLabelText(/I consent to my personal data/);
    const submitButton = getByRole('button', { name: 'Submit' });

    fireEvent.change(nameInput, { target: { value: 'john' } });
    fireEvent.change(technologySelect, { target: { value: 'React' } });
    fireEvent.change(birthDateInput, { target: { value: '2022-01-01' } });
    fireEvent.click(functionsRadio);
    fireEvent.change(ratingInput, { target: { value: '5' } });
    fireEvent.change(uploadInput, { target: { files: [file] } });
    fireEvent.click(agreementCheckbox);

    await waitFor(() => {
      fireEvent.click(submitButton);
    });

    const card = getByText('john');

    expect(card).toBeInTheDocument();
    expect(getByText('CARD HAS BEEN CREATED')).toBeInTheDocument();
  });
});

import React from 'react';
import { describe, it } from 'vitest';
import { render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('renders MainPage component for "/" path', () => {
    window.history.pushState({}, '', '/');
    window.location.href = '/';

    const { getByPlaceholderText } = render(<App />);

    const nameInput = getByPlaceholderText(/Search.../);

    expect(nameInput).toBeInTheDocument();
  });

  it('renders About component for "/about" path', () => {
    window.history.pushState({}, '', '/about');
    window.location.href = '/about';

    const { getByText } = render(<App />);

    expect(getByText(/Everyone can study at RS School/i)).toBeInTheDocument();
  });

  it('renders FormsPage component for "/forms" path', () => {
    window.history.pushState({}, '', '/forms');
    window.location.href = '/forms';

    const { getByLabelText } = render(<App />);

    const nameInput = getByLabelText(/Enter your name:/);

    expect(nameInput).toBeInTheDocument();
  });

  it('renders NotFoundPage component for non-existent path', () => {
    window.history.pushState({}, '', '/some-page');
    window.location.href = '/some-page';

    const { getByText } = render(<App />);

    expect(getByText(/Something went wrong/i)).toBeInTheDocument();
  });
});

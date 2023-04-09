import React from 'react';
import { describe, it } from 'vitest';
import { render } from '@testing-library/react';

import { FormsPage } from './FormsPage';
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
});

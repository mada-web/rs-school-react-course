import React from 'react';
import { describe, it } from 'vitest';
import { render } from '@testing-library/react';

import { FormsPage } from './FormsPage';
import { MemoryRouter } from 'react-router-dom';
import { MockProvider } from '../../store/mockProvider';

describe('FormsPage', () => {
  it('should render the Form component', () => {
    const { getByLabelText } = render(
      <MockProvider>
        <MemoryRouter>
          <FormsPage />
        </MemoryRouter>
      </MockProvider>
    );

    const nameInput = getByLabelText(/Enter your name:/);

    expect(nameInput).toBeInTheDocument();
  });
});

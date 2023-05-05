import React from 'react';
import { describe, it } from 'vitest';
import { render } from '@testing-library/react';

import { FormPage } from './FormPage';
import { MemoryRouter } from 'react-router-dom';
import { MockStoreProvider } from '../../store/mockStoreProvider';

describe('FormsPage', () => {
  it('should render the Form component', () => {
    const { getByLabelText } = render(
      <MockStoreProvider>
        <MemoryRouter>
          <FormPage />
        </MemoryRouter>
      </MockStoreProvider>
    );

    const nameInput = getByLabelText(/Enter your name:/);

    expect(nameInput).toBeInTheDocument();
  });
});

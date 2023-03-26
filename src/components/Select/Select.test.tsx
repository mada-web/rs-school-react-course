import React, { createRef } from 'react';
import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Select from './Select';

describe('Select component', () => {
  it('renders correctly', () => {
    const { container } = render(<Select errors={{}} />);

    const selectElement = container.querySelector('select');
    const optionElements = container.querySelectorAll('option');

    expect(selectElement).toBeInTheDocument();
    expect(optionElements).toHaveLength(7);
  });

  it('should call refProp function when select element is clicked', () => {
    const refProp = createRef<HTMLSelectElement>();

    render(<Select refProp={refProp} errors={{}} />);

    const selectElement = screen.getByRole('combobox');

    userEvent.click(selectElement);

    expect(refProp.current).toBeInstanceOf(HTMLSelectElement);
  });

  it('should displays error message when errors prop is passed', () => {
    const errors = { technology: 'Choose your favorite technology' };

    render(<Select errors={errors} />);

    const errorMessage = screen.getByText(errors.technology);

    expect(errorMessage).toBeInTheDocument();
  });
});

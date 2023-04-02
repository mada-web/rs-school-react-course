import React from 'react';
import { describe, it, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const mockProps = {
    id: 'mockID',
    name: 'mockName',
    onChange: vi.fn(),
    value: 'mockText',
    placeholder: 'Search...',
    type: 'text',
    label: 'mockLabel',
    errors: {
      mockName: 'mockError',
    },
  };

  it('should render with correct value and placeholder', () => {
    const { getByPlaceholderText } = render(<Input {...mockProps} />);

    const inputElement = getByPlaceholderText(mockProps.placeholder);
    expect(inputElement).toBeInTheDocument();
    expect((inputElement as HTMLInputElement).value).toBe(mockProps.value);
  });

  it('should render with correct label', () => {
    const { getByLabelText } = render(<Input {...mockProps} />);

    expect(getByLabelText('mockLabel')).toBeInTheDocument();
  });

  it('should call onChange handler when input value changes', () => {
    const { getByPlaceholderText } = render(<Input {...mockProps} />);

    const inputElement = getByPlaceholderText(mockProps.placeholder);
    fireEvent.change(inputElement, { target: { value: 'newMockValue' } });

    expect(mockProps.onChange).toHaveBeenCalledTimes(1);
  });

  it('should renders error message when there is an error', () => {
    const { getByText } = render(<Input {...mockProps} />);

    expect(getByText(mockProps.errors.mockName)).toBeInTheDocument();
  });
});

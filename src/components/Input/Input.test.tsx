import React from 'react';
import { describe, it, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const onChange = vi.fn();
  const value = 'mockText';
  const placeholder = 'Search...';

  it('should render with correct value and placeholder', () => {
    const { getByPlaceholderText } = render(<Input value={value} onChange={onChange} />);

    const inputElement = getByPlaceholderText(placeholder);
    expect(inputElement).toBeInTheDocument();
    expect((inputElement as HTMLInputElement).value).toBe(value);
  });

  it('should call onChange handler when input value changes', () => {
    const { getByPlaceholderText } = render(<Input value="" onChange={onChange} />);

    const inputElement = getByPlaceholderText(placeholder);
    fireEvent.change(inputElement, { target: { value } });

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});

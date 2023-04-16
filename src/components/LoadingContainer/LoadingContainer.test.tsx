import React from 'react';
import { render } from '@testing-library/react';
import { describe, it } from 'vitest';

import { LoadingContainer } from './LoadingContainer';

describe('LoadingContainer', () => {
  it('should render the spinner when loading is true', () => {
    const { container } = render(<LoadingContainer isLoading={true} />);

    expect(container.firstChild).toHaveClass('SpinnerContainer');
  });

  it('should render the children when loading is false', () => {
    const { container } = render(
      <LoadingContainer isLoading={false}>
        <div>Child element</div>
      </LoadingContainer>
    );
    expect(container.querySelector('div')).toHaveTextContent('Child element');
  });

  it('should not render anything when there are no children and loading is false', () => {
    const { container } = render(<LoadingContainer isLoading={false} />);
    expect(container.firstChild).toBeNull();
  });
});

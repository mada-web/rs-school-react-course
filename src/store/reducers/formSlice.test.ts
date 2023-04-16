import reducer, { addFormCard, IFormState } from './formSlice';
import { IFormCard } from '../../types';
import { it } from 'vitest';

it('should return the initial state', () => {
  expect(reducer(undefined, { type: undefined })).toEqual({ cards: [] });
});

it('should handle a todo being added to an empty list', () => {
  const previousState: IFormState = { cards: [] };

  expect(reducer(previousState, addFormCard({ userName: 'cat' } as IFormCard))).toEqual({
    cards: [{ userName: 'cat' }],
  });
});

it('should handle a todo being added to an existing list', () => {
  const previousState: IFormState = {
    cards: [{ userName: 'cat' } as IFormCard],
  };

  expect(reducer(previousState, addFormCard({ userName: 'dog' } as IFormCard))).toEqual({
    cards: [{ userName: 'cat' }, { userName: 'dog' }],
  });
});

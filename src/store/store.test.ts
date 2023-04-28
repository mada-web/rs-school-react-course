import { setupStore } from './store';
import { describe, it } from 'vitest';

describe('store', () => {
  it('should return a valid store object', () => {
    const store = setupStore();
    expect(store).toBeDefined();
    expect(store.dispatch).toBeDefined();
    expect(store.getState).toBeDefined();
  });
});

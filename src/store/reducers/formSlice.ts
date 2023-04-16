import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IFormCard } from '../../types';

interface IFormState {
  cards: IFormCard[];
}

const initialState: IFormState = {
  cards: [],
};

const formSlice = createSlice({
  name: 'formSlice',
  initialState,
  reducers: {
    addFormCard(state, action: PayloadAction<IFormCard>) {
      state.cards.push(action.payload);
    },
  },
});

export default formSlice.reducer;
export const { addFormCard } = formSlice.actions;

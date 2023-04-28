import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'searchSlice',
  initialState: {
    query: '',
  },
  reducers: {
    setSearchQuery(state, action) {
      state.query = action.payload;
    },
  },
});

export default searchSlice.reducer;
export const { setSearchQuery } = searchSlice.actions;

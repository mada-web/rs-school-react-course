import { combineReducers, configureStore } from '@reduxjs/toolkit';

import formSliceReducer from './reducers/formSlice';
import searchSliceReducer from './reducers/searchSlice';
import { movieAPI } from '../services/movieAPI';

export type RootState = ReturnType<typeof reducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export const reducer = combineReducers({
  form: formSliceReducer,
  search: searchSliceReducer,
  [movieAPI.reducerPath]: movieAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(movieAPI.middleware),
  });
};

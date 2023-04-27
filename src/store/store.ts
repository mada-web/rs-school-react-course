import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit';

import { movieAPI } from '../services/movieAPI';
import formSliceReducer from './reducers/formSlice';
import searchSliceReducer from './reducers/searchSlice';

export type RootState = ReturnType<typeof reducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export const reducer = combineReducers({
  form: formSliceReducer,
  search: searchSliceReducer,
  [movieAPI.reducerPath]: movieAPI.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(movieAPI.middleware),
    preloadedState,
  });
};

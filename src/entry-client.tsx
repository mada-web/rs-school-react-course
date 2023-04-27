import React from 'react';
import { Provider } from 'react-redux';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import Router from './router';
import { RootState, setupStore } from './store/store';

declare global {
  interface Window {
    __PRELOADED_STATE__?: RootState;
  }
}

const store = setupStore((window as Window).__PRELOADED_STATE__);

delete (window as Window).__PRELOADED_STATE__;

hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

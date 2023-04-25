import React from 'react';
import ReactDOM from 'react-dom/client';

import Router from './router';
import { setupStore } from './store/store';
import { Provider } from 'react-redux';
import 'normalize.css';

const store = setupStore();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router />
    </Provider>
  </React.StrictMode>
);

import React from 'react';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom/server';
import { renderToPipeableStream, RenderToPipeableStreamOptions } from 'react-dom/server';

import Router from './router';
import { setupStore } from './store/store';

const store = setupStore();

export async function render(url: string, opts: RenderToPipeableStreamOptions) {
  const preloadedState = store.getState();
  const injection = `<script>window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
    /</g,
    '\\u003c'
  )}
        </script>`;

  const { pipe } = renderToPipeableStream(
    <Provider store={store}>
      <StaticRouter location={url}>
        <Router />
      </StaticRouter>
    </Provider>,
    opts
  );
  return { pipe, injection };
}

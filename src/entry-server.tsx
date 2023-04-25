import React from 'react';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom/server';
import { renderToPipeableStream, RenderToPipeableStreamOptions } from 'react-dom/server';

import Router from './router';
import { setupStore } from './store/store';

const store = setupStore();

export async function render(url: string, opts: RenderToPipeableStreamOptions) {
  return renderToPipeableStream(
    <Provider store={store}>
      <StaticRouter location={url}>
        <Router />
      </StaticRouter>
    </Provider>,
    opts
  );
}

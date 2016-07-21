import React from 'react';
import { Provider } from 'react-redux';
import { RouterContext, IndexRoute } from 'react-router';
import { renderToString } from 'react-dom/server';
import createStore from '../../common/store';

const createPage = (content = '', state = {}, options) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8"/>
        <title>Ruby China Mobile</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
      </head>
      <body>
        <div id="app">${content}</div>
        <script>window.__INITIAL_STATE__ = ${JSON.stringify(state)};</script>
        <script src="/bundle.js"></script>
      </body>
    </html>
  `;
};

export default(renderProps, initialData) => {
  const store = createStore(initialData);
  const content = renderToString(
    <Provider store={store}>
      <RouterContext {...renderProps} />
    </Provider>
  );
  const state = store.getState();
  return (options) => createPage(content, state, options);
}
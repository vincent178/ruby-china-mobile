import React from 'react';
import { Provider } from 'react-redux';
import { RouterContext } from 'react-router';
import { renderToString } from 'react-dom/server';
import { resolve } from 'path';

let assets;

try {
  assets = require(resolve('public/manifest.json'));
} catch (e) {
  assets = {
    "vendor": {
      "js": "vendor.js"
    },
    "client": {
      "js": "app.js",
      "css": "app.css"
    }
  }
}

const createPage = (content = '', state = {}) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Ruby China Mobile</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="stylesheet" href="http://libs.useso.com/js/font-awesome/4.2.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="/${assets.client.css}">
        <!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css"> -->
      </head>
      <body>
        <div id="app">${content}</div>
        <script>window.__INITIAL_STATE__ = ${JSON.stringify(state)};</script>
        <script src="/${assets.vendor.js}"></script>
        <script src="/${assets.client.js}"></script>
      </body>
    </html>
  `;
};

export default(store, renderProps) => {
  const content = renderToString(
    <Provider store={store}>
      <RouterContext {...renderProps} />
    </Provider>
  );
  const state = store.getState();
  return createPage(content, state);
}
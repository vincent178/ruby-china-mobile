import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router'

import createStore from '../common/store';
import routes from '../common/routes';

const store = createStore(window.__INITIAL_STATE__);
const rootElement = document.getElementById('app');

let render = () => {
  ReactDOM.unmountComponentAtNode(rootElement);
  ReactDOM.render(
    <Provider store={store}>
      { routes(browserHistory) }
    </Provider>,
    rootElement
  );
};

if (module.hot) {
  module.hot.accept('../common/routes', () => {
    render();
  })
}

render();



import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { browserHistory } from 'react-router'

import createStore from '../common/store';
import routes from '../common/routes';

const store = createStore(window.__INITIAL_STATE__);

render(
  <Provider store={store}>
    { routes(browserHistory) }
  </Provider>,
   document.getElementById('app')
);



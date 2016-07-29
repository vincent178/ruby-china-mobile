import thunk from 'redux-thunk';
import { createStore as _createStore, applyMiddleware } from 'redux';
import reducers from '../reducers';

const hasReduxDevTool = () => {
  return process.browser
    && window.DEV !== 'production'
    && window.devToolsExtension;
};

export default (initialState) => {
  const create = hasReduxDevTool()
    ? window.devToolsExtension()(_createStore)
    : _createStore;

  const createStore = applyMiddleware(...middlewares)(create);
  const store = createStore(rootReducer, initialState);

  module.hot && module.hot.accept('../reducers', () => {
    store.replaceReducer(require('../reducers'));
  });

  return store;
};

export default (initialState) => {

  const create = hasReduxDevTool()
    ? window.devToolsExtension()(_createStore)
    : _createStore;


  const middlewares = [ thunk ];
  const createStore = applyMiddleware(...middlewares)(create);
  const store = createStore(reducers, initialState);

  module.hot && module.hot.accept('../reducers', () => {
    store.replaceReducer(require('../reducers'));
  });

  return store;
};


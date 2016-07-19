import "babel-polyfill";
import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { render } from 'react-dom';
import { Router, IndexRoute, Route, browserHistory, useRouterHistory } from 'react-router'
import { createHistory } from 'history';


import reducers from './reducers';
import App from './containers/app';
import TopicsContainer from './containers/topics-container';
import NotificationContainer from './containers/notification-container';
import MeContainer from './containers/me-container';
import TopicContainer from './containers/topic-container';
import LoginContainer from './containers/login-container';


const middleware = [ thunk ];
const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
const store = createStoreWithMiddleware(reducers);

// store
// history
// route

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} >
        <IndexRoute component={TopicsContainer} />
        <Route path="me" component={MeContainer} />
        <Route path="notifications" component={NotificationContainer} />
        <Route path="login" component={LoginContainer} />
        <Route path="topics/:topicId" component={TopicContainer} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);




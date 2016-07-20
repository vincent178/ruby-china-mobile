import "babel-polyfill";
import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { render } from 'react-dom';
import { Router, IndexRoute, Route, browserHistory, useRouterHistory } from 'react-router'
import { createHistory } from 'history';


import reducers from '../common/reducers';
import App from '../common/containers/app';
import TopicsContainer from '../common/containers/topics-container';
import NotificationContainer from '../common/containers/notification-container';
import MeContainer from '../common/containers/me-container';
import TopicContainer from '../common/containers/topic-container';
import LoginContainer from '../common/containers/login-container';


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




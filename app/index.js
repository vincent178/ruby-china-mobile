import "babel-polyfill";
import React, {Component} from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {render} from 'react-dom';
import {Router, IndexRoute, Route, browserHistory} from 'react-router'


import reducers from './reducers';
import App from './containers/app';
import TopicsContainer from './containers/topics-container';
import NotificationContainer from './containers/notification-container';
import MeContainer from './containers/me-container';
import TopicContainer from './containers/topic-container';


const middleware = [ thunk ];
const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
const store = createStoreWithMiddleware(reducers);

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path={ process.env.NODE_ENV === 'production' ? "/gt" : "/"} component={App}>
        <IndexRoute component={TopicsContainer} />
        <Route path="me" component={MeContainer}/>
        <Route path="notifications" component={NotificationContainer}/>
        <Route path="/topics/:topicId" component={TopicContainer}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);




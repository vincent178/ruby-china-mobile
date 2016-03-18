'use strict';

import React, {
  Component,
  PropTypes
} from 'react';
import { connect } from 'react-redux';
import { Router, Route, Link, browserHistory } from 'react-router'
import { Motion, spring } from 'react-motion';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { initEnvironment } from '../actions/environment';

import TopicContainer from './topics-container';
import NotificationContainer from './notification-container';
import MeContainer from './me-container';
import NavigationBar from '../components/navigation-bar';

import '../assets/stylesheets/base.css';
import '../assets/stylesheets/app.css';

injectTapEventPlugin();
class App extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(initEnvironment());
  }

  render() {
    return (
      <div className="container">
        <NavigationBar {...this.props} />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { environment, application } = state;
  return {
    width: environment.width,
    height: environment.height,
    selectedTab: application.selectedTab
  }
}

export default connect(mapStateToProps)(App);

'use strict';

import React, {
  Component,
  PropTypes
} from 'react';
import { connect } from 'react-redux';
import { Router, Route, Link, browserHistory } from 'react-router'

import { initEnvironment } from '../actions/environment';
import { initTab } from '../actions/application';
import Tabs from '../constants/tabs';

import TopicContainer from './topics-container';
import NotificationContainer from './notification-container';
import MeContainer from './me-container';

import '../assets/stylesheets/base.css';
import '../assets/stylesheets/app.css';

class App extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(initEnvironment());
    dispatch(initTab());
  }

  renderNavigationBar() {

    const { selectedTab } = this.props;

    function tabItemClass(tab) {
      if (tab === selectedTab) {
        return "tab-item-container selected";
      }
      return "tab-item-container";
    }

    return (
      <div className="tab-bar">
        <div className={tabItemClass(Tabs.TOPIC_TAB)}>
          <span className="tab-item"><Link to={"/"}>Topics</Link></span>
        </div>
        <div className={tabItemClass(Tabs.NOTIFICATION_TAB)}>
          <span className="tab-item"><Link to={"/notifications"}>Notification</Link></span>
        </div>
        <div className={tabItemClass(Tabs.ME_TAB)}>
          <span className="tab-item"><Link to={"/me"}>Me</Link></span>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="container">
        {this.renderNavigationBar()}
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  selectedTab: PropTypes.string.isRequired
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

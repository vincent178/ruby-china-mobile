'use strict';

import React, {
  Component,
  PropTypes
} from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { initEnvironment } from '../actions/environment';
import { initTab } from '../actions/application';
import Tabs from '../constants/tabs';

import TopicContainer from './topic-container';
import NotificationContainer from './notification-container';
import MeContainer from './me-container';


import '../assets/stylesheets/index.css';
import '../assets/stylesheets/app.css';

class App extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(initEnvironment());
    dispatch(initTab());
  }

  renderTabBar() {

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
          <span className="tab-item">Topics</span>
        </div>
        <div className={tabItemClass(Tabs.NOTIFICATION_TAB)}>
          <span className="tab-item">Notification</span>
        </div>
        <div className={tabItemClass(Tabs.ME_TAB)}>
          <span className="tab-item">Me</span>
        </div>
      </div>
    );
  }

  renderScene() {

    const { selectedTab } = this.props;

    switch (selectedTab) {
      case Tabs.TOPIC_TAB:
        return <TopicContainer />;
      case Tabs.NOTIFICATION_TAB:
        return <NotificationContainer />;
      case Tabs.ME_TAB:
        return <MeContainer />;
    }
  }

  render() {
    return (
      <div>
        {this.renderScene()}
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

import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { browserHistory } from 'react-router';

import { initTab, changeTab } from '../actions/application';
import Tabs from '../constants/tabs';

import './navigation-bar.css';

injectTapEventPlugin();
export default class NavigationBar extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(initTab());
  }

  handleTouchTap(path, tab, e) {
    e.preventDefault();
    browserHistory.push(path);
    const { dispatch } = this.props;
    dispatch(changeTab(tab))
  }

  render() {

    const { selectedTab } = this.props;

    function tabItemClass(tab) {
      if (tab === selectedTab) {
        return "tab-item-container selected";
      }

      return "tab-item-container";
    }

    return (
      <div className="tab-bar">
        <div className={tabItemClass(Tabs.TOPIC_TAB)}
             onTouchTap={this.handleTouchTap.bind(this, "/", Tabs.TOPIC_TAB)}>
          <span className="tab-item">
            <i className="fa fa-comments"/>Topics
          </span>
        </div>
        <div className={tabItemClass(Tabs.NOTIFICATION_TAB)}
             onTouchTap={this.handleTouchTap.bind(this, "/notifications", Tabs.NOTIFICATION_TAB)}>
          <span className="tab-item">
            <i className="fa fa-bell"/>Notification
          </span>
        </div>
        <div className={tabItemClass(Tabs.ME_TAB)}
             onTouchTap={this.handleTouchTap.bind(this, "/me", Tabs.ME_TAB)}>
          <span className="tab-item">
            <i className="fa fa-user"/>Me
          </span>
        </div>
      </div>
    );
  }
}
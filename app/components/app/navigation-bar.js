import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import { initTab, changeTab } from '../../actions/application';
import Items from '../../constants/items';

import './navigation-bar.css';
import "../../../node_modules/font-awesome/css/font-awesome.css";

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
      <div className="tab-bar" style={{width: this.props.width}}>
        <div className={tabItemClass(Items.TOPIC_TAB)}
             onTouchTap={this.handleTouchTap.bind(this, "/", Items.TOPIC_TAB)}>
          <span className="tab-item">
            <i className="fa fa-comments"/>Topics
          </span>
        </div>
        <div className={tabItemClass(Items.NOTIFICATION_TAB)}
             onTouchTap={this.handleTouchTap.bind(this, "/notifications", Items.NOTIFICATION_TAB)}>
          <span className="tab-item">
            <i className="fa fa-bell"/>Notification
          </span>
        </div>
        <div className={tabItemClass(Items.ME_TAB)}
             onTouchTap={this.handleTouchTap.bind(this, "/me", Items.ME_TAB)}>
          <span className="tab-item">
            <i className="fa fa-user"/>Me
          </span>
        </div>
      </div>
    );
  }
}
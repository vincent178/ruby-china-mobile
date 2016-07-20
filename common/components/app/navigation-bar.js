import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import { initTab, changeTab, dismissError } from '../../actions/application';
import Items from '../../constants/items';

import './navigation-bar.css';
import "../../../node_modules/font-awesome/css/font-awesome.css";

export default class NavigationBar extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(initTab());
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;
    let path = nextProps.location.basename;
    if (nextProps.location.pathname && nextProps.location.pathname !== "/") {
      path += nextProps.location.pathname;
    }
    dispatch(changeTab(this.pathToTab(path)));
  }

  handleTouchTap(path, e) {
    e.preventDefault();
    browserHistory.push(path);
    const { dispatch } = this.props;
    dispatch(dismissError());
    dispatch(changeTab(this.pathToTab(path)));
  }

  pathToTab(path) {
    switch (path) {
      case "/notifications":
        return Items.NOTIFICATION_TAB;
      case "/me":
        return Items.ME_TAB;
      default:
        return Items.TOPIC_TAB;
    }
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
             onTouchTap={this.handleTouchTap.bind(this, "/")}>
          <span className="tab-item">
            <i className="fa fa-comments"/>Topics
          </span>
        </div>
        <div className={tabItemClass(Items.NOTIFICATION_TAB)}
             onTouchTap={this.handleTouchTap.bind(this, "/notifications")}>
          <span className="tab-item">
            <i className="fa fa-bell"/>Notification
          </span>
        </div>
        <div className={tabItemClass(Items.ME_TAB)}
             onTouchTap={this.handleTouchTap.bind(this, "/me")}>
          <span className="tab-item">
            <i className="fa fa-user"/>Me
          </span>
        </div>
      </div>
    );
  }
}
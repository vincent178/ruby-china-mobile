'use strict';

import React, {
  Component,
  PropTypes
} from 'react';
import { connect } from 'react-redux';
import { Router, Route, Link, browserHistory } from 'react-router'
import { Motion, spring } from 'react-motion';

import { initEnvironment } from '../actions/environment';
import { initTab } from '../actions/application';
import Tabs from '../constants/tabs';

import TopicContainer from './topics-container';
import NotificationContainer from './notification-container';
import MeContainer from './me-container';

import '../assets/stylesheets/base.css';
import '../assets/stylesheets/app.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      navHide: false
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(initEnvironment());
    dispatch(initTab());
    window.addEventListener('scroll', this.handleScroll.bind(this));
    this._initScrollY = 0;
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll, false);
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
      <Motion style={{y: spring(this.state.navHide ? 0 : 46)}}>
        {({y}) =>
          <div className="tab-bar" style={{
                WebkitTransform: `translate3d(0, ${y}px, 0)`,
                transform: `translate3d(0, ${y}px, 0)`
            }}>
            <div className={tabItemClass(Tabs.TOPIC_TAB)}>
              <Link to={"/"}>
                <span className="tab-item">
                  <i className="fa fa-comments" />Topics
                </span>
              </Link>
            </div>
            <div className={tabItemClass(Tabs.NOTIFICATION_TAB)}>
              <span className="tab-item">
                <i className="fa fa-bell" />
                <Link to={"/notifications"}>Notification</Link>
              </span>
            </div>
            <div className={tabItemClass(Tabs.ME_TAB)}>
              <span className="tab-item">
                <i className="fa fa-user" />
                <Link to={"/me"}>Me</Link>
              </span>
            </div>
          </div>
        }
      </Motion>
    );
  }

  handleTouchStart(e) {
    this._initScrollY = window.scrollY;
  }

  handleTouchMove(e) {
    if (window.scrollY < this._initScrollY) {
      this._initScrollY = window.scrollY;
      this.setState(() => {
        return {navHide: false}
      });
    }

    if (window.scrollY >= 46 && window.scrollY > this._initScrollY) {
      this._initScrollY = window.scrollY;
      this.setState(() => {
        return {navHide: true}
      });
    }
  }

  handleScroll(e) {
    this.handleTouchMove(e);
  }

  render() {
    return (
      <div className="container"
           onTouchStart={this.handleTouchStart.bind(this)}
           onTouchMove={this.handleTouchMove.bind(this)}
      >
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

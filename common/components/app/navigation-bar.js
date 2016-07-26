import React from 'react';
import Items from '../../constants/items';
import { changeTab } from '../../actions/application';
import { initEnvironment } from '../../actions/environment';
import { browserHistory } from 'react-router';
import items from '../../constants/items';
import styles from './navigation-bar.css';

export default class NavigationBar extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(changeTab(items.TOPIC_TAB));
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
        return `${styles.tabItemContainer} ${styles.selected}`;
      }

      return styles.tabItemContainer;
    }

    return (
      <div className={styles.tabBar} style={{width: this.props.width}}>
        <div className={tabItemClass(Items.TOPIC_TAB)}
             onTouchTap={this.handleTouchTap.bind(this, "/")}>
          <span>
            <i className="fa fa-comments" />Topics
          </span>
        </div>
        <div className={tabItemClass(Items.NOTIFICATION_TAB)}
             onTouchTap={this.handleTouchTap.bind(this, "/notifications")}>
          <span>
            <i className="fa fa-bell"/>Notification
          </span>
        </div>
        <div className={tabItemClass(Items.ME_TAB)}
             onTouchTap={this.handleTouchTap.bind(this, "/me")}>
          <span>
            <i className="fa fa-user"/>Me
          </span>
        </div>
      </div>
    );
  }
}
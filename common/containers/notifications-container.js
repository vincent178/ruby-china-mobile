import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { isValidLoginOrRedirect } from '../lib/util';
import { refreshAccessToken } from '../actions/application';
import { fetchNotifications } from '../actions/notification';
import NotificationList from '../components/notification-container/notification-list';
import Spinner from '../components/shared/spinner';

class NotificationsContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;

    window.scrollTo(0, 0);
    this.setState({ isLoading: true });
    if (!isValidLoginOrRedirect()) {
      dispatch(refreshAccessToken())
        .then( result => {
          if (result.error) {
            console.log(`[NotificationList] error ${result.error}`);
            browserHistory.push('/login');
          }
          dispatch(fetchNotifications()).then(() => {
            this.setState({ isLoading: false });
          });
        });
    } else {
      dispatch(fetchNotifications()).then(() => {
        this.setState({ isLoading: false });
      });
    }
  }

  render() {
    if (this.state.isLoading) {
      return <Spinner />;
    }

    if (this.props.notification.length === 0) {
      return (
        <div>
          没有未读的通知
        </div>
      )
    }
    return <NotificationList {...this.props} />;
  }
}

function mapStateToProps(state) {

  const { entities, notification, user, topic, reply } = state;
  return {
    notification,
    user,
    topic,
    reply,
    entities
  }
}

export default connect(mapStateToProps)(NotificationsContainer);

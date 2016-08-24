import React, { Component } from 'react';
import { connect } from 'react-redux';

import { authenticatedAction } from '../lib/util';
import { fetchNotifications } from '../actions/notification';
import NotificationList from '../components/notification-container/notification-list';
import Spinner from '../components/shared/spinner';

class NotificationsContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isLoadingMore: false
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;

    window.scrollTo(0, 0);
    this.setState({ isLoading: true });
    authenticatedAction(dispatch, () => {
      dispatch(fetchNotifications()).then(() => {
        this.setState({ isLoading: false });
      });
    });
  }

  render() {
    if (this.state.isLoading) {
      return <Spinner />;
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

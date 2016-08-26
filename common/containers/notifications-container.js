import React, { Component } from 'react';
import { connect } from 'react-redux';

import { authenticatedAction } from '../lib/util';
import { detectScrollEnd } from '../lib/scroll';
import { fetchNotifications } from '../actions/notification';
import NotificationList from '../components/notification-container/notification-list';
import Spinner from '../components/shared/spinner';

class NotificationsContainer extends Component {

  constructor(props) {

    super(props);
    this.loadMoreNotifications = this.loadMoreNotifications.bind(this);

    this.state = {
      isLoading: false,
      isLoadingMore: false
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;

    document.addEventListener('scroll', this.loadMoreNotifications, false);
    document.addEventListener('touchmove', this.loadMoreNotifications, false);

    window.scrollTo(0, 0);
    this.setState({ isLoading: true });
    authenticatedAction(dispatch, () => {
      dispatch(fetchNotifications()).then(() => {
        this.setState({ isLoading: false });
      });
    });
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.loadMoreNotifications);
    document.removeEventListener('touchMove', this.loadMoreNotifications);
  }

  loadMoreNotifications() {

    if (detectScrollEnd() && this.state.isLoadingMore === false) {

      const { notification, dispatch } = this.props;

      console.log(notification);

      this.setState({ isLoadingMore: true });
      authenticatedAction(dispatch, () => {
        dispatch(fetchNotifications(notification.items.length)).then(() => {
          this.setState({ isLoadingMore: false });
        });
      });
    }
  }

  render() {
    if (this.state.isLoading) {
      return <Spinner />;
    }

    return (
      <div>
        <NotificationList {...this.props} />
        { this.state.isLoadingMore ? <SpinnerCircle width={30} color={"rgb(102, 117, 127)"} /> : null }
      </div>
    );
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

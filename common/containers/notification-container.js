import React, { Component } from 'react';
import { connect } from 'react-redux';

import { isValidLoginOrRedirect } from '../lib/util';
import { refreshUserToken } from '../actions/application';
import { fetchNotifications } from '../actions/notification';
import FakeList from '../components/shared/fake-list';

class NotificationContainer extends Component {

  componentDidMount() {
    const { dispatch } = this.props;

    window.scrollTo(0, 0);
    this.setState({ isLoading: true });
    if (!isValidLoginOrRedirect()) {
      dispatch(refreshUserToken)
        .then( result => {
          if (result.error) {
            console.log(`[NotificationList] error ${result.error}`);
          }
          this.setState({ isLoading: false });
        });
    } else {
      dispatch(fetchNotifications())
    }
  }

  render() {
    if (this.state.isLoading) {
      return <FakeList />;
    }
    return (
      <div>
        Notification Container
      </div>
    );
  }
}

function mapStateToProps(state) {

  const { entities, notification } = state;
  return {
    notification,
    entities
  }
}

export default connect(mapStateToProps)(NotificationContainer);

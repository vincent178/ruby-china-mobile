import React, { Component } from 'react';

import { isValidLoginOrRedirect } from '../../lib/util';
import { refreshUserToken } from '../../actions/application';


export default class NotificationList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }

  componentDidMount() {
    if (!isValidLoginOrRedirect()) {
      this.setState({ isLoading: true });
      this.props.dispatch(refreshUserToken)
        .then( result => {
          if (result.error) {
            console.log(`[NotificationList] error ${result.error}`);
          }
          this.setState({ isLoading: false });
        });
    }
  }

  render() {
  }
}
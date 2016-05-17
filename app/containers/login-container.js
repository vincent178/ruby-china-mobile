import React, { Component } from 'react';
import { connect } from 'react-redux';

import Login from '../components/login-container/login';

export default class LoginContainer extends Component {
  render() {
    return <Login {...this.props} />;
  }
}

function mapStateToProps(state) {

  const { entities, application } = state;
  return {
    entities,
    application
  }
}

export default connect(mapStateToProps)(LoginContainer);


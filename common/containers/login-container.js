import React, { Component } from 'react';
import { connect } from 'react-redux';

import Login from '../components/login-container/login';
import { getTopics } from '../actions/topic';

export default class LoginContainer extends Component {

  componentDidMount() {
    const { dispatch } = this.props;

    LoginContainer.fetchData(dispatch);
  }

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

LoginContainer.fetchData = (dispatch) => {
  return dispatch(getTopics());
};

export default connect(mapStateToProps)(LoginContainer);


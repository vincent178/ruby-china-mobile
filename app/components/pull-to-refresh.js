import React, { Component } from 'react';

import '../assets/stylesheets/refresh.css';

export default class PullToRefresh extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="refresh">
        <div className="spinner">
          <div className="double-bounce1"></div>
          <div className="double-bounce2"></div>
        </div>
      </div>
    )
  }
}
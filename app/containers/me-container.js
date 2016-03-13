'use strict';

import React, { Component } from 'react';

export default class Me extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div>
        Me Container
      </div>
    );
  }
}
import React, { Component } from 'react';

export default class Notification extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div>
        Notification Container
      </div>
    );
  }
}



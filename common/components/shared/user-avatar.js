import React, { Component } from 'react';

export default class UserAvatar extends Component {

  render() {
    var style = {
      width: this.props.size,
      height: this.props.size,
      borderRadius: this.props.radius || 0
    };

    return <img style={style} src={this.props.src} />;
  }
}
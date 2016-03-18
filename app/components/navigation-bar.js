import React, { Component } from 'react';

export default class NavigationBar extends Component {

  render() {
    return (
      <div className="tab-bar">
        <div className="tab-item-container selected">
          <span className="tab-item">
            <i className="fa fa-comments" />Topics
          </span>
        </div>
        <div className="tab-item-container">
          <span className="tab-item">
            <i className="fa fa-bell" />Notification
          </span>
        </div>
        <div className="tab-item-container">
          <span className="tab-item">
            <i className="fa fa-user" />Me
          </span>
        </div>
      </div>
    );
  }
}
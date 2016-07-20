import React, { Component } from 'react';

import './fake-topic-item.css';

export default class FakeTopicItem extends Component {

  render() {
    return (
      <div className="fake-topic-list-container">
        <div className="fake-avatar"></div>
        <div className="fake-topic-content">
          <div className="fake-topic-1"></div>
          <div className="fake-topic-2"></div>
          <div className="fake-topic-3"></div>
        </div>
      </div>
    );
  }
}


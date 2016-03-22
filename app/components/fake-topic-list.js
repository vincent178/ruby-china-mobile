import React, { Component } from 'react';

import "./fake-topic-list.css";

export default class FakeTopicList extends Component {

  renderFakeTopicListItem() {
    return (
      <div className="fake-topic-list-container">
        <div className="fake-avatar"></div>
        <div className="fake-topic-content">
          <div className="fake-topic-1"></div>
          <div className="fake-topic-2"></div>
          <div className="fake-topic-3"></div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="topic-container">
        {this.renderFakeTopicListItem()}
        {this.renderFakeTopicListItem()}
        {this.renderFakeTopicListItem()}
      </div>
    );
  }
}
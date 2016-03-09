'use strict';

import React, {Component} from 'react';

import '../assets/stylesheets/topic.css';

export default class TopicListItem extends Component {

  render() {
    return (
      <div className="topic-container">
        {this.props.topic.title}
      </div>
    )
  }
}
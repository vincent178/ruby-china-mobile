import React, {Component} from 'react';

import "font-awesome/css/font-awesome.css";
import "./topic-action-bar.css";

export default class TopicActionBar extends Component {

  render() {
    return (
      <div className="topic-action-container">
        <div className="topic-action-item">
          <i className="fa fa-reply" />
          <span>{this.props.replyCount}</span>
        </div>

        <div className="topic-action-item">
          <i className="fa fa-thumbs-up" />
          <span>18</span>
        </div>

        <div className="topic-action-item">
          <i className="fa fa-eye" />
        </div>
      </div>
    );
  }
}
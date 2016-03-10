'use strict';

import React, {Component} from 'react';

import UserAvatar from './user-avatar';
import TopicActionBar from './topic-action-bar';

import './topic-list-item.css';

export default class TopicListItem extends Component {

  render() {
    console.log(this.props.topic);
    console.log(this.props.user);
    return (
      <div className="topic-container">

        <div className="topic-context"></div>

        <div className="topic-content">

          <div style={{width: 60}}>
            <UserAvatar size={48} radius={5} src={this.props.user.avatar_url} />
          </div>

          <div className="topic-main">
            <div className="topic-info">
              <span className="topic-node">{this.props.topic.node_name}</span>
              <span className="topic-login">{`@${this.props.user.login}`}</span>
            </div>
            <p>{this.props.topic.title}</p>
            <div className="topic-action">
              <TopicActionBar replyCount={this.props.topic.replies_count} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
'use strict';

import React, {Component} from 'react';
import UserAvatar from './user-avatar';

import '../assets/stylesheets/topic.css';

export default class TopicListItem extends Component {

  render() {
    return (
      <div className="topic-container">

        <div className="topic-context"></div>

        <div className="topic-content">

          <div style={{width: 60}}>
            <UserAvatar size={48} radius={5} src={this.props.user.avatar_url} />
          </div>

          <div className="topic-main">
            <p>
              {this.props.topic.title}
            </p>
          </div>
        </div>
      </div>
    )
  }
}
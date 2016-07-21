'use strict';

import React, {Component} from 'react';
import { browserHistory } from 'react-router';
import { trackScrollPosition } from '../../actions/application';

import UserAvatar from './../shared/user-avatar';
import TopicActionBar from './../shared/topic-action-bar';

import styles from './topic-list-item.css';

export default class TopicListItem extends Component {

  handleClick() {
    const { dispatch } = this.props;
    dispatch(trackScrollPosition(window.scrollY));
    browserHistory.push(`/topics/${this.props.topic.id}`);
  }

  render() {
    return (
      <div className="topic-list-item" onClick={this.handleClick.bind(this)}>

        <div className="topic-context"></div>

        <div className="topic-content">

          <UserAvatar size={48} radius={5} src={this.props.user.avatar_url} />

          <div className="topic-main">
            <div className="topic-info">
              <span className="topic-node">{this.props.topic.node_name}</span>
              <span className="topic-login">{`@${this.props.user.login}`}</span>
            </div>
            <p>{this.props.topic.title}</p>
            <div className="topic-action">
              <TopicActionBar replyCount={this.props.topic.replies_count} likeCount={this.props.topic.likes_count} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
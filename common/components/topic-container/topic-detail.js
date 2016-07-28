import React, { Component } from 'react';
import UserAvatar from '../shared/user-avatar';
import TopicActionBar from '../shared/topic-action-bar';
import '../../assets/stylesheets/highlight.css';
import './topic-detail.css';

export default class TopicDetail extends Component {

  render() {
    const { params, entities } = this.props;
    const topic = entities.topics[params.topicId];
    const user = entities.users[topic.user];
    const topicBodyHtml = {__html: topic.body_html};
    return (
      <div className="topic-detail">
        <div className="topic-header-container">

          <UserAvatar size={48} radius={5}
                      src={user.avatar_url}
                      userId={user.id} />

          <div className="topic-main">
            <div className="topic-info">
              <span className="topic-node">{topic.node_name}</span>
              <span className="topic-login">{`@${user.login}`}</span>
            </div>
            <h1 className="topic-title">{topic.title}</h1>
          </div>
        </div>

        <div className="topic-detail-container">
          <div dangerouslySetInnerHTML={topicBodyHtml} />
        </div>

        <div className="topic-detail-action-bar">
          <TopicActionBar replyCount={topic.replies_count} likeCount={topic.likes_count} />
        </div>
      </div>
    );
  }
}
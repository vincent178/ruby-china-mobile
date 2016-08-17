import React, { Component } from 'react';
import UserAvatar from '../shared/user-avatar';
import TopicActionBar from '../shared/topic-action-bar';
import '../../assets/stylesheets/highlight.css';
import styles from './topic-detail-header.css';

export default class TopicDetailHeader extends Component {

  render() {

    let user = this.props.user;
    let topic = this.props.topic;

    return (
      <div className={styles.topicHeaderContainer}>

        <UserAvatar size={48} radius={5}
                    src={user.avatar_url}
                    username={user.login} />

        <div className={styles.topicMain}>
          <div className={styles.topicInfo}>
            <span className={styles.topicNode}>{topic.node_name}</span>
            <span className={styles.topicLogin}>{`@${user.login}`}</span>
          </div>
          <h1 className={styles.topicTitle}>{topic.title}</h1>
        </div>
      </div>
    );
  }
}

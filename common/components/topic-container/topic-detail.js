import React, { Component } from 'react';
import UserAvatar from '../shared/user-avatar';
import TopicActionBar from '../shared/topic-action-bar';
import '../../assets/stylesheets/highlight.css';
import styles from './topic-detail.css';

export default class TopicDetail extends Component {

  render() {
    const { params, entities } = this.props;
    const topic = entities.topics[params.topicId];
    const user = entities.users[topic.user];
    const topicBodyHtml = {__html: topic.body_html};
    return (
      <div className={styles.topicDetail}>
        <div className={styles.topicHeaderContainer}>

          <UserAvatar size={48} radius={5}
                      src={user.avatar_url}
                      userId={user.id} />

          <div className={styles.topicMain}>
            <div className={styles.topicInfo}>
              <span className={styles.topicNode}>{topic.node_name}</span>
              <span className={styles.topicLogin}>{`@${user.login}`}</span>
            </div>
            <h1 className={styles.topicTitle}>{topic.title}</h1>
          </div>
        </div>

        <div className={styles.topicDetailBody}>
          <div dangerouslySetInnerHTML={topicBodyHtml} />
        </div>

        <div className={styles.topicDetailActionBar}>
          <TopicActionBar replyCount={topic.replies_count} likeCount={topic.likes_count} />
        </div>
      </div>
    );
  }
}
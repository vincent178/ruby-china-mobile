import React, { Component } from 'react';
import UserAvatar from '../shared/user-avatar';
import TopicActionBar from '../shared/topic-action-bar';
import TopicDetailHeader from './topic-detail-header';
import '../../assets/stylesheets/highlight.css';
import styles from './topic-detail.css';


export default class TopicDetail extends Component {

  render() {
    const { params, entities } = this.props;

    const topic = entities.topics[params.topicId];
    if (typeof topic === 'undefined') {
      return null;
    }

    const user = entities.users[topic.user];
    if (typeof user === 'undefined') {
      return null;
    }

    const topicBodyHtml = {__html: topic.body_html};
    return (
      <div className={styles.topicDetail}>

        <TopicDetailHeader topic={topic} user={user} />

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
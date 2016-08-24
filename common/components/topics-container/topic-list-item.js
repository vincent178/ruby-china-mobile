'use strict';

import React, {Component} from 'react';
import { browserHistory } from 'react-router';
import { trackScrollPosition } from '../../actions/application';

import UserAvatar from './../shared/user-avatar';
import TopicActionBar from './../shared/topic-action-bar';
import styles from './topic-list-item.css';

export default class TopicListItem extends Component {

  constructor(props) {

    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { dispatch } = this.props;
    dispatch(trackScrollPosition(window.scrollY));
    browserHistory.push(`/topics/${this.props.topic.id}`);
  }

  render() {
    const { user, topic, dispatch } = this.props;

    return (
      <div className={styles.topicListItemContainer}>
        <div className={styles.topicContent}>

          <UserAvatar size={48} radius={5}
                      src={user.avatar_url}
                      username={user.login} />

          <div className={styles.topicMain} onClick={this.handleClick}>
            <div className={styles.topicInfo}>
              <span className={styles.topicNode}>{topic.node_name}</span>
              <span className={styles.topicLogin}>{`@${user.login}`}</span>
            </div>
            <p>{topic.title}</p>
            <div className={styles.topicAction}>
              <TopicActionBar
                interactive={false}
                dispatch={dispatch}
                topic={topic} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
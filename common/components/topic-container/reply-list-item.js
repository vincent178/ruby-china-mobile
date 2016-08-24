import React, { Component } from 'react';
import UserAvatar from '../shared/user-avatar';
import styles from './reply-list-item.css';

export default class ReplyListItem extends Component {

  render() {
    const { user, reply } = this.props;

    const replyBodyHtml = {__html: reply.body_html};

    return (
      <div className={styles.replyListItemContainer}>
        <UserAvatar size={48} radius={5}
                    src={user.avatar_url}
                    username={user.login} />
        <div className={styles.replyMain}>
          <div className={styles.topicInfo}>
            <span className={styles.topicLogin}>{`@${user.login}`}</span>
          </div>
          <div dangerouslySetInnerHTML={replyBodyHtml} />
        </div>
      </div>
    );
  }
}
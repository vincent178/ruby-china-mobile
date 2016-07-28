import React, { Component } from 'react';
import UserAvatar from '../shared/user-avatar';
import styles from './reply-list-item.css';

export default class ReplyListItem extends Component {

  render() {
    const replyBodyHtml = {__html: this.props.reply.body_html};

    return (
      <div className={styles.replyListItemContainer}>
        <UserAvatar size={48} radius={5}
                    src={this.props.user.avatar_url}
                    userId={this.props.user.id} />
        <div className={styles.replyMain}>
          <div className={styles.topicInfo}>
            <span className={styles.topicLogin}>{`@${this.props.user.login}`}</span>
          </div>
          <div dangerouslySetInnerHTML={replyBodyHtml} />
        </div>
      </div>
    );
  }
}
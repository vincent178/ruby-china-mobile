import React, { Component } from 'react';
import UserAvatar from '../shared/user-avatar';
import './reply-list-item.css';

export default class ReplyListItem extends Component {

  render() {
    const replyBodyHtml = {__html: this.props.reply.body_html};

    return (
      <div className="reply-list-item-container">
        <UserAvatar size={48} radius={5} src={this.props.user.avatar_url} />
        <div className="reply-main">
          <div className="topic-info">
            <span className="topic-login">{`@${this.props.user.login}`}</span>
          </div>
          <div dangerouslySetInnerHTML={replyBodyHtml} />
        </div>
      </div>
    );
  }
}
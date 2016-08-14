import React, {Component} from 'react';
import ReplyListItem from './reply-list-item';

export default class ReplyList extends Component {

  renderReplyItems() {
    const { reply, entities } = this.props;

    if (reply.items.count === 0) {
      return;
    }

    return reply.items.map((replyId, i) => {

      const reply = entities.replies[replyId];
      const user = entities.users[reply.user];

      return <ReplyListItem {...this.props}
            key={`ReplyList-${reply.id}-${i}`}
            reply={reply}
            user={user} />;
    });
  }

  render() {
    return (
      <div>
        {this.renderReplyItems()}
      </div>
    )
  }
}
import React, {Component} from 'react';

export default class ReplyList extends Component {

  renderReplyItems() {
    const { reply, entities } = this.props;

    if (reply.items.count === 0) {
      return;
    }

    return reply.items.map((replyId, i) => {

      const reply = entities.replies[replyId];
      const user = entities.users[reply.user];
      const replyBodyHtml = {__html: reply.body_html};

      return <div dangerouslySetInnerHTML={replyBodyHtml} />;
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
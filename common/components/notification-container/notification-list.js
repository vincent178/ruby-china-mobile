import React, { Component } from 'react';

import NotificationMentionItem from './notification-mention-item';
import NotificationTopicReplyItem from './notification-topic-reply-item';
import items from '../../constants/items';

// notification type: Mention, TopicReply, NodeChanged
export default class NotificationList extends Component {

  renderNotificationItem() {
    const { notification, entities } = this.props;

    if ( notification.items.length === 0 ) {
      return (
        <div className="center-container">没有最新通知</div>
      );
    }

    return notification.items.map((notificationId) => {
      let topic, reply;
      const notification = entities.notifications[notificationId];
      const notificationType = notification.type;
      const actor = entities.users[notification.actor];

      if (notification.topic) {
        topic = entities.topics[notification.topic];
      }

      if (notification.reply) {
        reply = entities.replies[notification.reply];
      }

      switch (notificationType) {
        case items.NOTIFICATION_MENTION:
          return <NotificationMentionItem
            notification={notification}
            actor={actor}
            topic={topic}
            key={`notification-${notificationId}`}
          />;
          break;
        case items.NOTIFICATION_TOPIC_REPLY:
          return <NotificationTopicReplyItem
            notification={notification}
            actor={actor}
            topic={topic}
            reply={reply}
            key={`notification-${notificationId}`}
          />;
          break;
        case items.NOTIFICATION_NODE_CHANGE:
          return (<div>暂时不支持的通知类型 {notificationType}</div>);
          break;
        default:
          return (<div>暂时不支持的通知类型 {notificationType}</div>);
      }
    })

  }

  render() {
    return (
      <div>
        { this.renderNotificationItem.bind(this)() }
      </div>
    )
  }
}
import React, { Component } from 'react';

import TopicListItem from './topic-list-item';
import SpinnerCircle from '../shared/spinner-circle';

export default class TopicList extends Component {

  constructor(props) {

    super(props);
    this.renderTopicItems = this.renderTopicItems.bind(this);
  }

  renderTopicItems() {
    const { topic, entities } = this.props;

    if (topic.items.length === 0) {
      return;
    }

    return topic.items.map((topicId, i) => {
      const topic = entities.topics[topicId];
      const user = entities.users[topic.user];

      return <TopicListItem {...this.props}
        key={topicId + '-' + i}
        topic={topic}
        user={user}
      />;
    });
  }

  render() {
    return (
      <div>
        { this.renderTopicItems() }
      </div>
    );
  }
}

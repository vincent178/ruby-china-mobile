import React, { Component } from 'react';

import TopicListItem from './topic-list-item';
import SpinnerCircle from '../shared/spinner-circle';
import style from './topic-list.css';

export default class TopicList extends Component {

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
        { this.renderTopicItems.bind(this)() }

        <div className={style.spinerContainer} >
          <div className={style.spinnerDiv}>
            <SpinnerCircle width={30} color={"rgb(102, 117, 127)"} />
          </div>
        </div>
      </div>
    );
  }
}

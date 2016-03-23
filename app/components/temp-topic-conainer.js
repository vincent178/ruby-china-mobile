import React, { Component } from 'react';

export default class TempTopicContainer extends Component {

  render() {

    const { params, entities } = this.props;
    const topicData = entities.topics[params.topicId];

    return (
      <div className="topic-container">
        <div className="inner-topic-container">
          TempTopicContainer
        </div>
      </div>
    );
  }
}
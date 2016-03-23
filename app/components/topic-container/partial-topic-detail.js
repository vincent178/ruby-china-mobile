import React, { Component } from 'react';
import './partial-topic-detail.css';

export default class TempTopicContainer extends Component {

  render() {

    const { params, entities } = this.props;
    const topicData = entities.topics[params.topicId];

    console.log(topicData);

    return (
      <div className="topic-container">
        <div className="inner-topic-container">
          <div className="panel-heading">
            <h1>{topicData.title}</h1>
            TempTopicContainer
          </div>
        </div>
      </div>
    );
  }
}
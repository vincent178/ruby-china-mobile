import React, {Component} from 'react';

import {getTopic} from '../actions/topic';

export default class TopicDetail extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch, params, entities } =  this.props;
    const topicId = params.topicId;
    if (!entities.topics[topicId]) {
      dispatch(getTopic(topicId));
    }
  }

  renderTopic() {
    debugger;
    const { topic, params, entities } = this.props;
    if (topic.isFetching) {
      return <div>Spinner</div>;
    }

    const data = entities.topics[params.topicId];
    return (
      <div>{data.title}</div>
    )
  }

  render() {
    return (
      <div>
        {this.renderTopic.bind(this)}
      </div>
    );
  }
}
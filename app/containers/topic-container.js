import React, { Component } from 'react';
import { connect } from 'react-redux';

import TopicDetail from '../components/topic-detail';
import ReplyList from '../components/reply-list';
import TempTopicContainer from '../components/temp-topic-conainer';
import { getTopic, getTopicReplies } from '../actions/topic';

class TopicContainer extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    const { dispatch, params } = this.props;
    const topicId = params.topicId;
    dispatch(getTopic(topicId));
    dispatch(getTopicReplies(topicId));
  }

  render() {
    const { topic, reply, params, entites } = this.props;

    return <TempTopicContainer {...this.props} />;

    if (topic.isFetching || reply.isFetching) {
      return <div className="topic-container">
        <TempTopicContainer {...this.props} />
      </div>
    }

    return (
      <div className="topic-container">
        <TopicDetail {...this.props} />
        <ReplyList {...this.props} />
      </div>
    );
  }
}

function mapStateToProps(state) {

  // topic is an array of topic id
  const { environment, entities, topic } = state;
  return {
    width: environment.width,
    height: environment.height,
    topic,
    entities
  }
}

export default connect(mapStateToProps)(TopicContainer);

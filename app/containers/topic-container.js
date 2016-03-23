import React, { Component } from 'react';
import { connect } from 'react-redux';

import TopicDetail from '../components/topic-detail';
import ReplyList from '../components/reply-list';
import PartialTopicDetail from '../components/partial-topic-detail';
import FakeTopicDetail from '../components/fake-topic-detail';
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
    const { topic, reply, params, entities } = this.props;

    const topicDetail = entities.topics[params.topicId];

    if (typeof topicDetail === 'undefined') {
      return <FakeTopicDetail {...this.props} />;
    }

    if (topic.isFetching || reply.isFetching) {
      return <PartialTopicDetail {...this.props} />;
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
  const { entities, topic, reply } = state;
  return {
    topic,
    reply,
    entities
  }
}

export default connect(mapStateToProps)(TopicContainer);

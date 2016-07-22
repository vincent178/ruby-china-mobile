import React, { Component } from 'react';
import { connect } from 'react-redux';

import TopicDetail from '../components/topic-container/topic-detail';
import ReplyList from '../components/topic-container/reply-list';
import PartialTopicDetail from '../components/topic-container/partial-topic-detail';
import FakeTopicDetail from '../components/topic-container/fake-topic-detail';
import { getTopic, getTopicReplies } from '../actions/topic';
import styles from '../assets/stylesheets/app.css';

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
    const { params, entities } = this.props;
    const topicDetail = entities.topics[params.topicId];

    if (typeof topicDetail === 'undefined') {
      return <FakeTopicDetail {...this.props} />;
    }

    return (
      <div className={styles.topicContainer}>
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

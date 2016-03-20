import React, { Component } from 'react';
import { connect } from 'react-redux';

import TopicDetail from '../components/topic-detail';
import ReplyList from '../components/reply-list';
import { getTopicDetail } from '../actions/topic';

class TopicContainer extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    const { dispatch, params } = this.props;
    const topicId = params.topicId;
    dispatch(getTopicDetail(topicId));
  }

  render() {
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

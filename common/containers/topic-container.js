import React, { Component } from 'react';
import { connect } from 'react-redux';

import TopicDetail from '../components/topic-container/topic-detail';
import ReplyList from '../components/topic-container/reply-list';
import FakeDetail from '../components/shared/fake-detail';
import FakeList from '../components/shared/fake-list';
import { fetchTopicDetailWithReplies } from '../actions/topic';

class TopicContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    const { dispatch, params } = this.props;
    const topicId = params.topicId;
    this.setState({ isLoading: true });
    dispatch(fetchTopicDetailWithReplies(topicId))
      .then(() => {
        this.setState({ isLoading: false });
      });
  }

  render() {


    if (this.state.isLoading) {
      return (
        <div>
          <FakeDetail />
          <FakeList count={2} />
        </div>
      );
    }

    return (
      <div>
        <TopicDetail {...this.props} />
        <ReplyList {...this.props} />
      </div>
    );
  }
}

function mapStateToProps(state) {

  const { entities, topic, reply } = state;
  return {
    topic,
    reply,
    entities
  }
}

export default connect(mapStateToProps)(TopicContainer);

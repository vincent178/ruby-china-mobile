import React, { Component } from 'react';
import { connect } from 'react-redux';

import TopicDetail from '../components/topic-container/topic-detail';
import ReplyList from '../components/topic-container/reply-list';
import TopicDetailHeader from '../components/topic-container/topic-detail-header';
import NativeScroll from '../components/shared/native-scroll';
import ReplyActionBar from '../components/topic-container/reply-action-bar';
import FakeDetail from '../components/shared/fake-detail';
import FakeList from '../components/shared/fake-list';
import SpinnerCircle from '../components/shared/spinner-circle';
import { getTopicDetailWithReplies, getMoreTopicReplies } from '../actions/topic';
import '../assets/stylesheets/highlight.css';

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
    this.setState({ isLoading: true });
    TopicContainer.fetchData(dispatch, params)
      .then(() => {
        this.setState({ isLoading: false });
      });
  }

  render() {

    if (this.state.isLoading) {
      return this.renderFakeOrPartial.bind(this)();
    }

    const { params, entities, dispatch, reply } = this.props;
    const topicId = params.topicId;
    let topic = entities.topics[topicId];

    return (
      <div>

        <TopicDetail {...this.props} />

        <ReplyList {...this.props} />

        { topic['replies_count'] > reply.items.length
          ? <SpinnerCircle width={30} color={"rgb(102, 117, 127)"} />
          : null }

        <div style={{height: 46}}></div>
        <ReplyActionBar {...this.props} />
      </div>
    );
  }

  renderFakeOrPartial() {
    let loadedPartial = false;
    let user, topic;
    const { entities, params } = this.props;
    const topicId = params.topicId;
    topic = entities.topics[topicId];
    if (topic && topic.user) {
      user = entities.users[topic.user];
      if (user) {
        loadedPartial = true;
      }
    }
    return (
      <div>
        {
          loadedPartial ?
            <TopicDetailHeader user={user} topic={topic} /> :
            <FakeList count={1} />
        }
        <FakeDetail />
        <FakeList count={2} />
      </div>
    );
  }
}

TopicContainer.fetchData = (dispatch, params) => {
  const topicId = params.topicId;
  return dispatch(getTopicDetailWithReplies(topicId))
};

function mapStateToProps(state) {

  const { entities, topic, reply } = state;
  return {
    topic,
    reply,
    entities
  }
}

export default connect(mapStateToProps)(TopicContainer);

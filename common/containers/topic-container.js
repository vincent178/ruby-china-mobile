import React, { Component } from 'react';
import { connect } from 'react-redux';

import TopicDetail from '../components/topic-container/topic-detail';
import ReplyList from '../components/topic-container/reply-list';
import TopicDetailHeader from '../components/topic-container/topic-detail-header';
import ReplyActionBar from '../components/topic-container/reply-action-bar';
import FakeDetail from '../components/shared/fake-detail';
import FakeList from '../components/shared/fake-list';
import { fetchTopicDetailWithReplies } from '../actions/topic';
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

    return (
      <div>
        <TopicDetail {...this.props} />
        <ReplyList {...this.props} />
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
  return dispatch(fetchTopicDetailWithReplies(topicId))
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

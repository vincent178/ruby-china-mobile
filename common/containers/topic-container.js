import React, { Component } from 'react';
import { connect } from 'react-redux';

import TopicDetailWithReplies from '../components/topic-container/topic-detail-with-replies';
import Spinner from '../components/shared/spinner';
import { getTopicDetailWithReplies, getMoreTopicReplies } from '../actions/topic';
import { detectScrollEnd } from '../lib/scroll';
import '../assets/stylesheets/highlight.css';

class TopicContainer extends Component {

  constructor(props) {

    super(props);
    this.loadMoreReplies = this.loadMoreReplies.bind(this);

    this.state = {
      isLoading: false,
      isLoadingMore: false
    };
  }

  componentDidMount() {
    const { dispatch, params } = this.props;

    document.addEventListener('scroll', this.loadMoreReplies, false);
    document.addEventListener('touchMove', this.loadMoreReplies, false);

    window.scrollTo(0, 0);

    this.setState({ isLoading: true });
    TopicContainer.fetchData(dispatch, params)
      .then(() => {
        this.setState({ isLoading: false });
      });
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.loadMoreReplies);
    document.removeEventListener('touchMove', this.loadMoreReplies);
  }

  loadMoreReplies() {
    const { dispatch, params, entities, reply } = this.props;

    const topicId = params.topicId;
    let topic = entities.topics[topicId];

    if (detectScrollEnd() && topic['replies_count'] > reply.items.length && (this.state.isLoadingMore === false)) {
      this.setState({ isLoadingMore: true });
      return dispatch(getMoreTopicReplies(topicId, reply.items.length))
        .then(() => this.setState({ isLoadingMore: false }))
        .catch(() => this.setState({ isLoadingMore: false }));
    }
  }

  render() {

    const { params, entities } = this.props;
    let topic = entities.topics[params.topicId];
    let isLoading = this.state.isLoading;
    let isLoadingPartial = false;

    if (topic && topic.user && entities.users[topic.user]) {
      // 已经有部分数据了, 就看全局在不在加载
      // 全局加载 => true
      // 部分加载 => false
      isLoadingPartial = isLoading && true;
    }

    if (isLoading && !isLoadingPartial) {
      return <Spinner />;
    }

    return <TopicDetailWithReplies {...this.props} isLoadingPartial={ isLoadingPartial } />;
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

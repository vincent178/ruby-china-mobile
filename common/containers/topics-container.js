import React, { Component } from 'react';
import { connect } from 'react-redux';

import TopicList from '../components/topics-container/topic-list';
import NativeScroll from '../components/shared/native-scroll';
import FakeList from '../components/shared/fake-list';
import { getTopics } from '../actions/topic';
import { detectScrollEnd } from '../lib/scroll';

class TopicsContainer extends Component {

  constructor(props) {

    super(props);
    this.loadMoreTopics = this.loadMoreTopics.bind(this);

    this.state = {
      isLoading: false,
      isLoadingMore: false
    }
  }

  componentDidMount() {

    const { dispatch, topic, application } = this.props;

    document.addEventListener('scroll', this.loadMoreTopics, false);
    document.addEventListener('touchMove', this.loadMoreTopics, false);

    window.scrollTo(0, application.position);

    if (topic.items.length <= 10) {
      TopicsContainer.fetchData(dispatch)
        .then((res) => {
          if (res && res.error) {
            console.log(`[TopicsContainer] error: ${res.error}`);
            this.setState({ error: res.error });
          }
        });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.loadMoreTopics);
    document.removeEventListener('touchMove', this.loadMoreTopics);
  }

  loadMoreTopics() {
    if (detectScrollEnd() && (this.state.isLoadingMore === false)) {
      const { dispatch, topic } = this.props;
      this.setState({ isLoadingMore: true });
      return dispatch(getTopics(topic.items.length))
        .then(() => this.setState({ isLoadingMore: false }));
    }
  }

  render() {
    const { topic } = this.props;

    if (topic.items.length <= 10) {
      return <FakeList />;
    }

    return <TopicList {...this.props} />;
  }
}

TopicsContainer.fetchData = (dispatch) => {
  return dispatch(getTopics())
};

function mapStateToProps(state) {

  const { entities, topic, application } = state;
  return {
    topic,
    entities,
    application
  }
}

export default connect(mapStateToProps)(TopicsContainer);

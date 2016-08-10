import React, { Component } from 'react';
import { connect } from 'react-redux';

import TopicList from '../components/topics-container/topic-list';
import NativeScroll from '../components/shared/native-scroll';
import Spinner from '../components/shared/spinner';
import FakeList from '../components/shared/fake-list';
import { fetchTopics } from '../actions/topic';

class TopicsContainer extends Component {

  componentDidMount() {
    const { dispatch, topic, application } = this.props;

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

  render() {
    const { topic, dispatch } = this.props;

    if (topic.items.length <= 10) {
      return <FakeList />;
    }

    return (
      <NativeScroll
        scrollFunc={() => dispatch(fetchTopics(topic.items.length))}>

        <TopicList {...this.props} />
        <Spinner />
      </NativeScroll>
    );
  }
}

TopicsContainer.fetchData = (dispatch) => {
  return dispatch(fetchTopics())
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

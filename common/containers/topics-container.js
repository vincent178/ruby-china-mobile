import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import TopicList from '../components/topics-container/topic-list';
import NativeScroll from '../components/shared/native-scroll';
import FakeTopicList from '../components/shared/fake-topic-list';
import Spinner from '../components/shared/spinner';
import { fetchTopics } from '../actions/topic';

class TopicsContainer extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch, topic, application } = this.props;

    window.scrollTo(0, application.position);

    if (topic.items.length <= 10) {
      dispatch(fetchTopics())
        .then((res) => {
          if (res && res.error) {
            this.setState({ error: res.error });
          }
        });
    }
  }

  render() {
    const { topic, dispatch } = this.props;

    if (topic.items.length <= 10) {
      return <FakeTopicList />;
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

function mapStateToProps(state) {

  const { entities, topic, application } = state;
  return {
    topic,
    entities,
    application
  }
}

export default connect(mapStateToProps)(TopicsContainer);

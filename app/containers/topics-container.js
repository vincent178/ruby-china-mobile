import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {Route, Link} from 'react-router'

import TopicList from '../components/topics-container/topic-list';
import TopicDetail from '../components/topic-container/topic-detail';
import NativeScroll from '../components/shared/native-scroll';
import FakeTopicList from '../components/shared/fake-topic-list';
import Spinner from '../components/shared/spinner';
import { getTopics } from '../actions/topic';

class TopicsContainer extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    const { dispatch, topic } = this.props;

    if (topic.items.length <= 10) {
      dispatch(getTopics());
    }
  }

  render() {
    const { topic, dispatch } = this.props;

    if (topic.items.length <= 10) {
      return <FakeTopicList />;
    }

    return (
      <NativeScroll
        dispatch={dispatch}
        scrollFunc={() => getTopics(topic.items.length)}
      >
        <div className="topic-container">
          <TopicList {...this.props} />
          <Spinner />
        </div>
      </NativeScroll>
    );
  }
}

TopicsContainer.propTypes = {
};

function mapStateToProps(state) {

  const {entities, topic } = state;
  return {
    topic,
    entities
  }
}

export default connect(mapStateToProps)(TopicsContainer);



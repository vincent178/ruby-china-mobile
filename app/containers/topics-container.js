import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {Route, Link} from 'react-router'

import TopicList from '../components/topic-list';
import TopicDetail from '../components/topic-detail';
import NativeScroll from '../components/native-scroll';
import FakeTopicList from '../components/fake-topic-list';
import Spinner from '../components/spinner';
import {getTopics} from '../actions/topic';

class TopicsContainer extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    const { dispatch, topic } = this.props;

    if (topic.items.length === 0) {
      dispatch(getTopics());
    }
  }

  render() {
    const { topic, dispatch } = this.props;

    if (topic.items.length === 0) {
      return <FakeTopicList />;
    }

    return (
      <NativeScroll
        dispatch={dispatch}
        scrollFunc={() => getTopics(topic.items.length)}
      >
        <div className="topics-container">
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

  const { environment, entities, topic } = state;
  return {
    width: environment.width,
    height: environment.height,
    topic,
    entities
  }
}

export default connect(mapStateToProps)(TopicsContainer);



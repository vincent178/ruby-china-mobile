import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';

import TopicList from '../components/topic-list';

import { getTopic } from '../actions/topic';

class TopicContainer extends Component {
  render() {
    return <TopicList {...this.props} />;
  }
}

TopicContainer.propTypes = {
};

function mapStateToProps(state) {

  debugger;
  const { environment, entities, topic } = state;
  return {
    width: environment.width,
    height: environment.height,
    topic,
    entities
  }
}

export default connect(mapStateToProps)(TopicContainer);

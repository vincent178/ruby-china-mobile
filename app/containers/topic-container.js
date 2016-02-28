import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import TopicList from '../components/topic-list';

class TopicContainer extends Component {
  render() {
    return <TopicList {...this.props} />;
  }
}

TopicContainer.propTypes = {
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

export default connect(mapStateToProps)(TopicContainer);

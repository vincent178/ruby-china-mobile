import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {Route, Link} from 'react-router'

import TopicList from '../components/topic-list';
import TopicDetail from '../components/topic-detail';
import Tabs from '../constants/tabs';

class TopicsContainer extends Component {

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return <TopicList {...this.props} />;
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

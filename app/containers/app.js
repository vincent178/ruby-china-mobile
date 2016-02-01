'use strict';

import React, {
  Component,
  PropTypes
} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TopicContainer from './topic-container';
import { getTopics } from '../actions/topic';

import '../assets/stylesheets/index.css';

const Width = window.innerWidth;
const Height = window.innerHeight;

/*
 * STATE SHAPE
 *
 * {
 *   "application": {
 *     "selectedTab": "topic"
 *   },
 *
 *   "topic": {
 *     "topics": {
 *       1: {},
 *       2: {}
 *     },
 *
 *     "topicsById": [1, 2]
 *   },
 *
 *   "notification": {
 *     "notifications": {
 *       1: {},
 *       2: {}
 *     },
 *
 *     "notificationsById": [1, 2]
 *   }
 * }
 *
 */

class App extends Component {

  constructor(props) {
    super(props);

    console.log(Width);
    console.log(Height);
  }

  render() {
    const { topicAction } = this.props;
    return (
      <div>
        <TopicContainer actions={topicAction} />

        <div className="toolbar">
          <div>
            <span className="tab-item selected">Topics</span>
          </div>
          <div>
            <span className="tab-item">Notification</span>
          </div>
          <div>
            <span className="tab-item">Me</span>
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  topicAction: PropTypes.object
};

export default connect( state => {
  return {
    application: state.application,
    topic: {
      topics: state.topics,
      topicsById: state.topicsById
    }
  }}, dispatch => {
  return {
    topicAction: bindActionCreators(Object.assign({}, getTopics), dispatch)
  }
}
)(App);

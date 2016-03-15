import React, {Component} from 'react';
import {connect} from 'react-redux';

import TopicDetail from '../components/topic-detail';
import ReplyList from '../components/reply-list';
import {getTopic} from '../actions/topic';

class TopicContainer extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch, params } = this.props;
    dispatch(getTopic(params.topicId));
  }

  render() {
    return (
      <div className="topic-container">
        <TopicDetail {...this.props} />
        <ReplyList {...this.props} />
      </div>
    );
  }
}

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

import React, {
  Component,
  PropTypes
} from 'react';

import TopicDetail from './topic-detail';
import ReplyList from './reply-list';
import ReplyActionBar from './reply-action-bar';
import SpinnerCircle from '../shared/spinner-circle';

export default class TopicDetailWithReplies extends Component {

  constructor(props) {

    super(props);
    this.renderLoadingSpinner = this.renderLoadingSpinner.bind(this);
  }

  render() {

    if (this.props.isLoadingPartial) {
      return <TopicDetail {...this.props} />;
    }

    return (
      <div>
        <TopicDetail {...this.props} />
        <ReplyList {...this.props} />
        { this.renderLoadingSpinner() }
        <div style={{height: 46}}></div>
        <ReplyActionBar {...this.props} />
      </div>
    );
  }

  renderLoadingSpinner() {
    const { entities, reply, params } = this.props;
    const topic = entities.topics[params.topicId];

    if (typeof topic === 'undefined') {
      return;
    }

    if (topic['replies_count'] > reply.items.length) {
      return <SpinnerCircle width={30} color={"rgb(102, 117, 127)"} />
    }
  }
}

TopicDetailWithReplies.propTypes = {
  isLoadingPartial: PropTypes.bool
};
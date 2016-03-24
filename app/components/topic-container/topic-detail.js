import React, {Component} from 'react';
import { getTopic } from '../../actions/topic';

export default class TopicDetail extends Component {

  constructor(props) {
    super(props);
    this.renderTopic = this.renderTopic.bind(this);
    this.renderLoadingBar = this.renderLoadingBar.bind(this);
  }

  componentDidMount() {
    const { dispatch, params, entities } =  this.props;
    const topicId = params.topicId;
    if (!entities.topics[topicId]) {
      dispatch(getTopic(topicId));
    }
  }

  renderLoadingBar() {
    const { topic, reply } = this.props;
    // 以后加一个 下滑? 的动画
    if (topic.isFetching || reply.isFetching) {
      return (
        <div>
          loading
        </div>
      );
    }
  }

  renderTopic() {
    const { params, entities } = this.props;
    const topicDetail = entities.topics[params.topicId];
    return (
      <div>{topicDetail.title}</div>
    )
  }

  render() {
    return (
      <div>
        {this.renderLoadingBar()}
        {this.renderTopic()}
      </div>
    );
  }
}
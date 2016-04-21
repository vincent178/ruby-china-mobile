import React, {Component} from 'react';
import { getTopic } from '../../actions/topic';
import '../../assets/stylesheets/highlight.css';

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
    const topicBodyHtml = {__html: topicDetail.body_html};
    console.log("--- topicBodyHtml ---");
    console.log(topicBodyHtml);
    return (
      <div>
        <div>{topicDetail.title}</div>
        <div dangerouslySetInnerHTML={topicBodyHtml} />
      </div>
    );
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
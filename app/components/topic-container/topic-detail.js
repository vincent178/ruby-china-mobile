import React, {Component} from 'react';
import { getTopic } from '../../actions/topic';
import UserAvatar from '../shared/user-avatar';
import '../../assets/stylesheets/highlight.css';
import './topic-detail.css';

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
    const topic = entities.topics[params.topicId];
    const user = entities.users[topic.user];
    const topicBodyHtml = {__html: topic.body_html};
    console.log("--- topicBodyHtml ---");
    console.log(topicBodyHtml);
    return (
      <div className="topic-detail">
        <div className="topic-header-container">

          <div style={{marginRight: 12}}>
            <UserAvatar size={48} radius={5} src={user.avatar_url} />
          </div>

          <div className="topic-main">
            <div className="topic-info">
              <span className="topic-node">{topic.node_name}</span>
              <span className="topic-login">{`@${user.login}`}</span>
            </div>
            <h1 className="topic-title">{topic.title}</h1>
          </div>
        </div>

        <div className="topic-detail-container">
          <div dangerouslySetInnerHTML={topicBodyHtml} />
        </div>

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
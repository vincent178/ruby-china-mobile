import React, {
  Component,
  PropTypes
} from 'react';

import TopicListItem from './topic-list-item';
import NativeScroll from './native-scroll';
import {getTopics} from '../actions/topic';

import './topic-list.css';

export default class TopicList extends Component {
  constructor(props) {
    super(props);
    this.renderTopicItems = this.renderTopicItems.bind(this);
    this.renderSpinner = this.renderSpinner.bind(this);
    this.renderMoreTopics = this.renderMoreTopics.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getTopics());
  }

  renderTopicItems() {
    const { topic, entities } = this.props;

    if (topic.items.length === 0) {
      return;
    }

    return topic.items.map((topicId, i) => {
      const topic = entities.topics[topicId];
      const user = entities.users[topic.user];

      return <TopicListItem {...this.props}
        key={topicId + '-' + i}
        topic={topic}
        user={user}
      />;
    });
  }

  renderSpinner() {
    const { topic } = this.props;
    if (topic.isFetching) {
      return <div>Spinner</div>;
    }
  }

  renderMoreTopics() {
    const {topic} = this.props;
    return getTopics(topic.items.length);
  }

  render() {
    const { dispatch } = this.props;
    return (
      <NativeScroll
        dispatch={dispatch}
        scrollFunc={this.renderMoreTopics}
      >
        <div className="topics-container">
          {this.renderTopicItems()}
          {this.renderSpinner()}
        </div>
      </NativeScroll>
    )
  }
}

//TopicList.propTypes = {
//  topics: PropTypes.arrayOf(PropTypes.shape({
//    id: PropTypes.number.isRequired,
//    title: PropTypes.string,
//    price: PropTypes.number,
//    quantity: PropTypes.number
//  })).isRequired
//};
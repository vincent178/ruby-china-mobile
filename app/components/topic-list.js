import React, {
  Component,
  PropTypes
} from 'react';

import TopicItem from './topic-item';
import InfiniteScroll from './infinite-scroll';
import {getTopics} from '../actions/topic';

export default class TopicList extends Component {
  constructor(props) {
    super(props);
    this.renderTopicItems = this.renderTopicItems.bind(this);
    this.renderSpinner = this.renderSpinner.bind(this);
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

      return (
        <div key={topicId + '-' + i}>
          {topic.title}
        </div>
      )
    });
  }

  renderSpinner() {
    const { topic } = this.props;
    if (topic.isFetching) {
      return <div>Spinner</div>;
    }
    return;
  }

  render() {
    const { dispatch } = this.props;
    return (
      <InfiniteScroll
        dispatch={dispatch}
        scrollFunc={console.log("hello")}
      >
        {this.renderTopicItems()}
        {this.renderSpinner()}
      </InfiniteScroll>
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
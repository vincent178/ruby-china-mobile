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
    dispatch(getTopics);
  }

  renderTopicItems() {
    return (
      <div>H</div>
    );
  }

  renderSpinner() {
    return (
      <div>Spinner</div>
    );
  }

  render() {
    const { dispatch } = this.props;
    debugger;
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

TopicList.propTypes = {
  topics: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number
  })).isRequired
};
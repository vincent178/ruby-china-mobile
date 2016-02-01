import React, { Component } from 'react';

import TopicList from '../components/topic/topic-list';
import { getTopic } from '../actions/topic';

export default class TopicContainer extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <TopicList actions={getTopic} />
    );
  }
}

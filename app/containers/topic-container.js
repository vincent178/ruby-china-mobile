import React, { Component } from 'react';

import TopicList from '../components/topic/topic-list';

export default class TopicContainer extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TopicList />
    );
  }
}
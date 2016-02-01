import React, { Component } from 'react';

import TopicList from '../components/topic/topic-list';
import { ShadowHeader } from '../components/shared/shadow';
import { getTopic } from '../actions/topic';

export default class TopicContainer extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <ShadowHeader />
        TopicContainer
        <TopicList actions={getTopic} />
      </div>
    );
  }
}

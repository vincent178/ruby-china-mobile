import React, { Component } from 'react';

import FakeTopicDetailBody from './fake-topic-detail-body';
import FakeTopicDetailReply from './fake-topic-detail-reply';
import FakeTopicItem from '../shared/fake-topic-item';
import './fake-topic-detail.css';

export default class FakeTopicDetail extends Component {
  render() {
    return (
      <div className="topic-container">
        <div style={{backgroundColor: 'white'}}>

          <div className="fake-topic-detail-heading">
            <div className="fake-heading-left">
              <div className="fake-heading-1"></div>
              <div className="fake-heading-2"></div>
            </div>

            <div className="fake-topic-detail-avatar">
            </div>
          </div>

          <div className="topic-detail-body">
            <FakeTopicDetailBody />
          </div>
        </div>

        <div className="topic-detail-reply">
          <FakeTopicItem />
          <FakeTopicItem />
          <FakeTopicItem />
        </div>
      </div>
    );
  }
}
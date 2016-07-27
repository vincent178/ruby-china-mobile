import React, { Component } from 'react';

import styles from "./fake-topic-list.css";

export default class FakeTopicList extends Component {

  renderFakeTopicListItem() {
    return (
      <div className={styles.fakeTopicListContainer}>
        <div className={styles.fakeAvatar}></div>
        <div className={styles.fakeTopicContent}>
          <div className={styles.fakeTopic1}></div>
          <div className={styles.fakeTopic2}></div>
          <div className={styles.fakeTopic2}></div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderFakeTopicListItem()}
        {this.renderFakeTopicListItem()}
        {this.renderFakeTopicListItem()}
      </div>
    );
  }
}
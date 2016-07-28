import React, { Component } from 'react';

import styles from './fake-detail.css';

export default class FakeDetail extends Component {

  render() {
    return (
      <div className={styles.fakeTopicDetailBody}>
        <div className={styles.fakeTopicDetailBodyInner}>
          <div className={styles.fakeLine}></div>
          <div className={styles.fakeLine}></div>
          <div className={styles.fakeLine}></div>
          <div className={styles.fakeLine}></div>
          <div className={styles.fakeLine}></div>
          <div className={styles.fakeLine}></div>
        </div>
      </div>
    );
  }
}
import React, { Component } from 'react';

import FakeList from './fake-list'
import styles from './fake-detail.css';

export default class FakeDetail extends Component {

  render() {

    return (
      <div>
        <FakeList count={1} />

        <div className={styles.fakeTopicDetailBody}>
          <div className={styles.fakeTopicDetailBodyInner}>
            <div className={styles.fakeLine}></div>
            <div className={styles.fakeLine}></div>
            <div className={styles.fakeLine}></div>
            <div className={styles.fakeLine}></div>
            <div className={styles.fakeLine}></div>
            <div className={styles.fakeLine}></div>
            <div className={styles.fakeLine}></div>
            <div className={styles.fakeLine}></div>
          </div>
        </div>
      </div>
    );
  }
}
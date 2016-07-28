import React, { Component } from 'react';

import styles from './reply-action-bar.css';


export default class ReplyActionBar extends Component {

  render() {
    return (
      <div className={styles.replyActionBarContainer}>
        <div className={styles.replyHint}></div>
        <div className={styles.replyButton}>回复</div>
      </div>
    );
  }
}
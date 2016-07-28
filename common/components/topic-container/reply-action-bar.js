import React, { Component } from 'react';

import styles from './reply-action-bar.css';


export default class ReplyActionBar extends Component {

  render() {
    return (
      <div className={styles.replyActionBarContainer}>
        <input type="text" size="30" className={styles.replyHint} />
        <div className={styles.replyButton}>回复</div>
      </div>
    );
  }
}
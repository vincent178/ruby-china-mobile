import React, { Component } from 'react';

import { checkLoginAndTokenValid } from '../../lib/util';
import styles from './reply-action-bar.css';

export default class ReplyActionBar extends Component {

  handleClick(e) {
    if (checkLoginAndTokenValid()) {
      console.log("let's go");
    }
  }

  render() {
    return (
      <div className={styles.replyActionBarContainer} onClick={this.handleClick.bind(this)}>
        <div type="text" size="30" className={styles.replyHint} contentEditable="true"></div>
        <div className={styles.replyButton}>回复</div>
      </div>
    );
  }
}
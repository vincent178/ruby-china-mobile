import React, { Component } from 'react';

import { isLoginOrRedirect } from '../../lib/util';
import SpinnerCircle from '../shared/spinner-circle';
import styles from './reply-action-bar.css';

export default class ReplyActionBar extends Component {

  constructor(props) {
    super(props);
    this.state = { isLoading: false };
  }

  handleReply(e) {
    this.setState({ isLoading: true });
  }

  render() {
    return (
      <div className={styles.replyActionBarContainer} onClick={isLoginOrRedirect}>
        <div type="text" size="30" className={styles.replyHint} contentEditable="true"></div>
        <div className={styles.replyButton} onClick={this.handleReply.bind(this)}>
          {
            this.state.isLoading ?
              <SpinnerCircle width={20} color={'#9E9E9E'} /> :
              "回复"
          }
        </div>
      </div>
    );
  }
}
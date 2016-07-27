import React, { Component } from 'react';

import styles from './spinner.css';

export default class Spinner extends Component {
  render() {
    return (
      <div className={styles.spinnerContainer}>
        <div className={styles.spinner}>
          <div className={styles.rect1}></div>
          <div className={styles.rect2}></div>
          <div className={styles.rect3}></div>
          <div className={styles.rect4}></div>
          <div className={styles.rect5}></div>
        </div>
      </div>
    );
  }
}

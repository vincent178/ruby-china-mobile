import React, { Component } from 'react';
import './partial-topic-detail.css';
import styles from '../../assets/stylesheets/app.css';

export default class TempTopicContainer extends Component {

  render() {

    const { params, entities } = this.props;
    const topicData = entities.topics[params.topicId];

    console.log(topicData);

    return (
      <div className={styles.topicContainer}>
        <div className={styles.innerTopicContainer}>
          <div className={styles.panelHeading}>
            <h1>{topicData.title}</h1>
            TempTopicContainer
          </div>
        </div>
      </div>
    );
  }
}
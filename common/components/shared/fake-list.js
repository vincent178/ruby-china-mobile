import React, {
  Component,
  PropTypes
} from 'react';

import styles from "./fake-list.css";

export default class FakeList extends Component {

  render() {
    let count = this.props.count || 3;
    let result = [];
    for (let i = 0; i < count; i++) {
      let fakeItem = (
        <div className={styles.fakeTopicListContainer}>
          <div className={styles.fakeAvatar}></div>
          <div className={styles.fakeTopicContent}>
            <div className={styles.fakeTopic1}></div>
            <div className={styles.fakeTopic2}></div>
            <div className={styles.fakeTopic2}></div>
          </div>
        </div>
      );
      result.push(fakeItem);
    }
    return (
      <div>
        { result }
      </div>
    );
  }
}

FakeList.propTypes = {
  count: PropTypes.number
};


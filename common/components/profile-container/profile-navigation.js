import React, {
  Component,
  PropTypes
} from 'react';

import styles from './profile-navigation.css';

export default class ProfileNavigation extends Component {

  render() {

    const { selectedTab, changeTab } = this.props;
    const selectedClass = `${styles.profileItem} ${styles.selected}`;

    return (
      <div className={styles.profileNavigationContainer}>
        <div className={ selectedTab == 0 ? selectedClass : styles.profileItem } onClick={changeTab.bind(this, 0)}>
          <div className={styles.profileText}>帖子</div>
        </div>

        <div className={ selectedTab == 1 ? selectedClass : styles.profileItem } onClick={changeTab.bind(this, 1)}>
          <div className={styles.profileText}>回帖</div>
        </div>

        <div className={ selectedTab == 2 ? selectedClass : styles.profileItem } onClick={changeTab.bind(this, 2)}>
          <div className={styles.profileText}>正在关注</div>
        </div>

        <div className={ selectedTab == 3 ? selectedClass : styles.profileItem } onClick={changeTab.bind(this, 3)}>
          <div className={styles.profileText}>关注者</div>
        </div>
      </div>
    )
  }
}

ProfileNavigation.propTypes = {
  changeTab: PropTypes.func.isRequired,
  selectedTab: PropTypes.number.isRequired
};
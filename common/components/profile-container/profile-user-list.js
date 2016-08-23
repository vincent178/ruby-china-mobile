import React, {
  Component,
  PropTypes
} from 'react';

import { Link } from 'react-router';
import UserAvatar from '../shared/user-avatar';
import SpinnerCircle from '../shared/spinner-circle';
import styles from './profile-list.css';


export default class ProfileUserList extends Component {

  constructor(props) {

    super(props);
    this.renderUserList = this.renderUserList.bind(this);
    this.renderSpinner = this.renderSpinner.bind(this);
  }

  renderUserList() {

    const { user, type, entities } = this.props;

    if (typeof user === 'undefined' || typeof user[type] === 'undefined') {
       if (type === "followers") {
        return <div>没有关注你的人</div>;
      } else {
        return <div>没有关注者</div>;
      }
    }

    if (user[type].length === 0) {
      if (type === "followers") {
        return <div>没有关注你的人</div>;
      } else {
        return <div>没有关注者</div>;
      }
    }

    return user[type].map( userId => {

      const userItem = entities.users[userId];

      return (
        <div key={`ProfileUserList-${type}-${userId}`}
             className={`${styles.profileListItemContainer} ${styles.profileListUserItemContainer}`}>

          <UserAvatar size={30} src={userItem.avatar_url} radius={5} username={userItem.login} />

          <Link to={`/${userItem.login}`}>
            <div className={styles.profileUserInfo}>
              <div className={styles.profileFullname}>{ userItem.name }</div>
              <div className={styles.profileUsername}>{ userItem.login }</div>
            </div>
          </Link>
        </div>
      );

    });
  }

  renderSpinner() {

    if (this.props.isLoadingMore) {
      return <SpinnerCircle width={30} color={"rgb(102, 117, 127)"} />
    }

  }


  render() {
    return (
      <div className={styles.profileListContainer}>
        { this.renderUserList() }
        { this.renderSpinner() }
      </div>
    )
  }
}
import React, {
  Component,
  PropTypes
} from 'react';

import UserAvatar from '../shared/user-avatar';
import { followUser, unfollowUser } from '../../actions/user';
import styles from './profile-user-details.css';

export default class ProfileUserDetails extends Component {

  handleClick(user) {

    const { dispatch } = this.props;

    if (user.meta.followed) {
      dispatch(unfollowUser(user));
    } else {
      dispatch(followUser(user));
    }
  }


  render() {

    const { user } = this.props;

    let userInfoArray = [];
    let userCompanyLocation = "";
    let joinTime = "";
    let followingText = "关注";

    if (user.company && user.company.length > 0) {
      userInfoArray.push(user.company);
    }

    if (user.location && user.location.length > 0) {
      userInfoArray.push(user.location);
    }

    if (userInfoArray.length === 2) {
      userCompanyLocation = userInfoArray.join("@");
    }

    if (userInfoArray.length === 1) {
      userCompanyLocation = userInfoArray[0];
    }

    if (user.created_at && user.created_at.length > 0) {
      joinTime = `${user.created_at.slice(0, 10)} 加入`;
    }

    if (user.meta && user.meta.followed) {
      followingText = "取消关注";
    }

    return (
      <div className={styles.profileUserDetailsContainer}>
          <UserAvatar
            size={56}
            radius={6}
            src={user.avatar_url}
            username={user.login}
          />
          <div className={styles.profileInfo}>

            <div className={styles.profileUserDetailsItem}>
              <div className={styles.profileFullname}>{`${user.name || user.login}`}</div>
              <button className={styles.profileFollowButton}
                      onClick={this.handleClick.bind(this, user)}>
                {followingText}
              </button>
            </div>

            <div className={styles.profileUsername}>{`${user.login}`}</div>
            <div>{userCompanyLocation}</div>
            <div>{joinTime}</div>
          </div>
      </div>
    );
  }
}

ProfileUserDetails.propTypes = {
  user: PropTypes.object.isRequired
};

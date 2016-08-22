import React, {
  Component,
  PropTypes
} from 'react';

import UserAvatar from '../shared/user-avatar';
import styles from './profile-user-details.css';


export default class ProfileUserDetails extends Component {

  render() {

    const { user } = this.props;

    let userInfoArray = [];
    let userCompanyLocation = "";
    let joinTime = ""

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

    return (
      <div className={styles.profileUserDetailsContainer}>
        <UserAvatar
          size={56}
          radius={6}
          src={user.avatar_url}
          username={user.login}
        />
        <div className={styles.profileInfo}>
          <div className={styles.profileFullname}>{`${user.name}`}</div>
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

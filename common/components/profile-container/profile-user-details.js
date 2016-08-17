import React, {
  Component,
  PropTypes
} from 'react';

import UserAvatar from '../shared/user-avatar';
import styles from './profile-user-details.css';


export default class ProfileUserDetails extends Component {

  render() {

    const { user } = this.props;

    let userCompanyLocation = "";

    if (user.company && user.company.length === 0) {
      userCompanyLocation = user.location;
    } else if (user.location && user.location.length === 0) {
      userCompanyLocation = user.company;
    } else {
      userCompanyLocation = `${user.company}@${user.location}`;
    }

    console.log(user);

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
          <div>{user.created_at.slice(0, 10)}加入</div>
          <div>twitter/website/github/email</div>
        </div>
      </div>
    );
  }
}

ProfileUserDetails.propTypes = {
  user: PropTypes.object.isRequired
};

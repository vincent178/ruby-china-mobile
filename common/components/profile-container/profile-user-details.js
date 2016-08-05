import React, {
  Component,
  PropTypes
} from 'react';

import UserAvatar from '../shared/user-avatar';


export default class ProfileUserDetails extends Component {

  render() {

    const { user } = this.props;

    let userCompanyLocation = "";

    if (user.company.length === 0) {
      userCompanyLocation = user.location;
    } else if (user.location.length === 0) {
      userCompanyLocation = user.company;
    } else {
      userCompanyLocation = `${user.company}@${user.location}`;
    }

    console.log(user);

    return (
      <div>
        <UserAvatar
          size={56}
          radius={6}
          src={user.avatar_url}
          userId={user.id}
        />
        <div>
          <div>{`${user.login}(${user.name})`}</div>
          <div>{userCompanyLocation}</div>
          <div>{user.created_at.slice(0, 10)}</div>
          <div>twitter/website/github/email</div>
        </div>
      </div>
    );
  }
}

ProfileUserDetails.propTypes = {
  user: PropTypes.object.isRequired
};

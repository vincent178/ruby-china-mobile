import React, { Component } from 'react';
import UserAvatar from '../shared/user-avatar';


export default class ProfileUserDetails extends Component {

  render() {

    return (
      <div>
        <UserAvatar />
        <div>
          <div>login(name)</div>
          <div>company@location</div>
          <div>join date</div>
          <div>twitter/website/github/email</div>
        </div>
      </div>
    );
  }
}
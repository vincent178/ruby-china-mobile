import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import ProfileUserDetails from '../components/profile-container/profile-user-details';
import ProfileNavigation from '../components/profile-container/profile-navigation';
import ProfileTopicList from '../components/profile-container/profile-topic-list';
import ProfileReplyList from '../components/profile-container/profile-reply-list';
import ProfileUserList from '../components/profile-container/profile-user-list';
import { getToken, isValidLoginOrRedirect } from '../lib/util';
import { refreshAccessToken } from '../actions/application';
import { fetchUserProfile } from '../actions/user';

class ProfileContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'topic',
      isLoading: false,
      user: null
    }
  }

  componentDidMount() {

    const { dispatch, entities, routes } = this.props;
    const { username } = getToken();

    debugger;

    window.scrollTo(0, 0);
    this.setState({ isLoading: true });
    if (!isValidLoginOrRedirect()) {
      dispatch(refreshAccessToken())
        .then( result => {
          if (result.error) {
            browserHistory.push('/login');
          }
          dispatch(fetchUserProfile(username)).then(() => {
            this.setState({
              isLoading: false,
              user: entities.users[username]
            });
          });
        });
    } else {
      dispatch(fetchUserProfile(username)).then(() => {
        this.setState({
          isLoading: false,
          user: entities.users[username]
        });
      });
    }
  }

  renderProfileList() {
    switch (this.state.selectedTab) {
      case 'topic':
        return <ProfileTopicList />;
        break;
      case 'reply':
        return <ProfileReplyList />;
        break;
      case 'following':
        return <ProfileUserList />;
        break;
      case 'followers':
        return <ProfileUserList />;
        break;
    }
  }

  render() {

    if (this.state.user) {
      return (
        <div>
          <ProfileUserDetails user={this.state.user} />
          <ProfileNavigation />
          { this.renderProfileList.bind(this)() }
        </div>
      );
    } else {
      return (<div>wait</div>);
    }
  }
}

function mapStateToProps(state) {

  const { entities, topic, reply, user } = state;
  return {
    topic,
    reply,
    user,
    entities
  }
}

export default connect(mapStateToProps)(ProfileContainer);



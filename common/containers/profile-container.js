import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import ProfileUserDetails from '../components/profile-container/profile-user-details';
import ProfileNavigation from '../components/profile-container/profile-navigation';
import ProfileTopicList from '../components/profile-container/profile-topic-list';
import ProfileReplyList from '../components/profile-container/profile-reply-list';
import ProfileUserList from '../components/profile-container/profile-user-list';
import { retrieveToken, isValidLoginOrRedirect } from '../lib/util';
import { refreshAccessToken } from '../actions/application';
import { fetchUserProfile } from '../actions/user';

class ProfileContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'topic',
      isLoading: false
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { username } = retrieveToken();

    window.scrollTo(0, 0);
    this.setState({ isLoading: true });
    if (!isValidLoginOrRedirect()) {
      dispatch(refreshAccessToken())
        .then( result => {
          if (result.error) {
            browserHistory.push('/login');
          }
          dispatch(fetchUserProfile(username)).then(() => {
            this.setState({ isLoading: false });
          });
        });
    } else {
      dispatch(fetchUserProfile(username)).then(() => {
        this.setState({ isLoading: false });
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
    return (
      <div>
        <ProfileUserDetails />
        <ProfileNavigation />
        { this.renderProfileList.bind(this)() }
      </div>
    );
  }
}

function mapStateToProps(state) {

  const { entities, topic, reply } = state;
  return {
    topic,
    reply,
    entities
  }
}

export default connect(mapStateToProps)(ProfileContainer);



import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import ProfileUserDetails from '../components/profile-container/profile-user-details';
import ProfileNavigation from '../components/profile-container/profile-navigation';
import ProfileTopicList from '../components/profile-container/profile-topic-list';
import ProfileReplyList from '../components/profile-container/profile-reply-list';
import ProfileUserList from '../components/profile-container/profile-user-list';
import Spinner from '../components/shared/spinner';
import { getToken } from '../lib/util';
import { refreshAccessToken } from '../actions/application';
import { getUserProfileAndTopics } from '../actions/user';

class ProfileContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'topic',
      isLoading: true,
      isLoadingMore: false,
      user: null
    }
  }

  componentDidMount() {

    const { dispatch, entities, location, params } = this.props;
    let username;

    if ( location.pathname === '/me' ) {
      username = getToken().username;
    } else {
      username = params.username;
    }

    window.scrollTo(0, 0);
    this.setState({ isLoading: true });
    dispatch(getUserProfileAndTopics(username))
      .then( () => {
        this.setState({
          isLoading: false,
          user: this.props.entities.users[username]
        });
      })
      .catch( e => {
        this.setState({ isLoading: false });
      });
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

    if (this.state.isLoading) {
      return <Spinner />
    }

    return (
      <div>
        <ProfileUserDetails user={this.state.user} />
        <ProfileNavigation />
        { this.renderProfileList.bind(this)() }
      </div>
    );
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



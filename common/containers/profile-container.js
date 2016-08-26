import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProfileUserDetails from '../components/profile-container/profile-user-details';
import ProfileNavigation from '../components/profile-container/profile-navigation';
import ProfileTopicList from '../components/profile-container/profile-topic-list';
import ProfileReplyList from '../components/profile-container/profile-reply-list';
import ProfileUserList from '../components/profile-container/profile-user-list';
import Spinner from '../components/shared/spinner';
import { getToken } from '../lib/util';
import { detectScrollEnd } from '../lib/scroll';
import {
  getUserProfileAndTopics,
  getUserTopics,
  getUserReplies,
  getUserFollowers,
  getUserFollowing
} from '../actions/user';

class ProfileContainer extends Component {

  constructor(props) {

    super(props);
    this.renderProfileList = this.renderProfileList.bind(this);
    this.changeNavigationTab = this.changeNavigationTab.bind(this);
    this.loadMoreContent = this.loadMoreContent.bind(this);
    this.getUsername = this.getUsername.bind(this);

    this.state = {
      selectedTab: 0,
      isLoading: true,
      isLoadingMore: false,
      isLoadingTab: false,
      user: null
    }
  }

  componentDidMount() {

    const { dispatch } = this.props;
    const username = this.getUsername();

    document.addEventListener('scroll', this.loadMoreContent, false);
    document.addEventListener('touchMove', this.loadMoreContent, false);

    window.scrollTo(0, 0);
    this.setState({ isLoading: true });
    dispatch(getUserProfileAndTopics(username))
      .then( () => {
        this.setState({ isLoading: false });
      })
      .catch( e => {
        this.setState({ isLoading: false });
      });
  }

  componentDidUpdate(prevProps) {
    const oldUsername = this.getUsername(prevProps);
    const username = this.getUsername();

    let { dispatch, entities: { users } } = this.props;

    if (oldUsername !== username) {
      window.scrollTo(0, 0);
      this.changeNavigationTab(0);
    }

    if (oldUsername !== username &&
       ( typeof users[username] === 'undefined' ||
       typeof users[username].topics === 'undefined' )) {

      this.setState({ isLoading: true });
      dispatch(getUserProfileAndTopics(username))
        .then( () => {
          this.setState({ isLoading: false });
        })
        .catch( () => {
          this.setState({ isLoading: false });
        });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.loadMoreContent);
    document.removeEventListener('touchMove', this.loadMoreContent);
  }

  getUsername(prevProps) {

    const props = prevProps ? prevProps : this.props;

    const { params, location } = props;

    if (location && location.pathname === '/me' && getToken().username.length > 0) {
      return getToken().username;
    } else if (params) {
      return params.username;
    } else {
      return;
    }
  }

  changeNavigationTab(tab) {

    const { dispatch, params, entities } = this.props;
    const username = this.getUsername();
    const user = entities.users[username];

    switch (tab) {
      case 0:
        if (user['topics_count'] > 0 && (typeof user.topics === 'undefined' ||  user.topics.length === 0)) {
          this.setState({ isLoadingTab: true });
          dispatch(getUserTopics(params.username))
            .then( () => this.setState({ isLoadingTab: false }))
            .catch( e => this.setState({ isLoadingTab: false }));
        }
        break;
      case 1:
        if (user['replies_count'] > 0 && (typeof user.replies === 'undefined' || user.replies.length === 0)) {
          this.setState({ isLoadingTab: true });
          dispatch(getUserReplies(params.username))
            .then( () => this.setState({ isLoadingTab: false }))
            .catch( e => this.setState({ isLoadingTab: false }));
        }
        break;
      case 2:
        if (user['following_count'] > 0 && (typeof user.following === 'undefined' || user.following.length === 0)) {
          this.setState({ isLoadingTab: true });
          dispatch(getUserFollowing(params.username))
            .then( () => this.setState({ isLoadingTab: false }))
            .catch( e => this.setState({ isLoadingTab: false }));
        }
        break;
      case 3:
        if (user['followers_count'] > 0 && (typeof user.followers === 'undefined' || user.followers.length === 0)) {
          this.setState({ isLoadingTab: true });
          dispatch(getUserFollowers(params.username))
            .then( () => this.setState({ isLoadingTab: false }))
            .catch( e => this.setState({ isLoadingTab: false }));
        }
        break;
    }

    this.setState({ selectedTab: tab });
  }

  loadMoreContent() {
    if (detectScrollEnd() && this.state.isLoadingMore === false) {
      let { dispatch, params: { username }, entities: { users } } = this.props;
      let user = users[username];
      switch (this.state.selectedTab) {
        case 0:
          if (user.topics && Math.ceil(user['topics_count']/20-1)*20 >= user.topics.length) {
            this.setState({ isLoadingMore: true });
            dispatch(getUserTopics(username, user.topics.length))
              .then( () => this.setState({ isLoadingMore: false }))
              .catch( e => this.setState({ isLoadingMore: false }));
          }
          break;
        case 1:
          if (user.replies && Math.ceil(user['replies_count']/20-1)*20 >= user.replies.length) {
            this.setState({ isLoadingMore: true });
            dispatch(getUserReplies(username, user.replies.length))
              .then( () => this.setState({ isLoadingMore: false }))
              .then( e => this.setState({ isLoadingMore: false }));
          }
          break;
        case 2:
          if (user.following && Math.ceil(user['following_count']/20-1)*20 >= user.following.length) {
            this.setState({ isLoadingMore: true });
            dispatch(getUserFollowing(username, user.following.length))
              .then( () => this.setState({ isLoadingMore: false }))
              .catch( e => this.setState({ isLoadingMore: false }));
          }
          break;
        case 3:
          if (user.followers && Math.ceil(user['followers_count']/20-1)*20 >= user.followers.length) {
            this.setState({ isLoadingMore: true });
            dispatch(getUserFollowers(username, user.followers.length))
              .then( () => this.setState({ isLoadingMore: false }))
              .catch( e => this.setState({ isLoadingMore: false }));
          }
          break;

      }
    }
  }

  renderProfileList(user) {

    if (this.state.isLoadingTab) {
      return <Spinner />;
    }

    switch (this.state.selectedTab) {
      case 0:
        return <ProfileTopicList {...this.props} user={user} isLoadingMore={this.state.isLoadingMore} />;
        break;
      case 1:
        return <ProfileReplyList {...this.props} user={user} isLoadingMore={this.state.isLoadingMore} />;
        break;
      case 2:
        return <ProfileUserList {...this.props} user={user} type={"following"} isLoadingMore={this.state.isLoadingMore} />;
        break;
      case 3:
        return <ProfileUserList {...this.props} user={user} type={"followers"} isLoadingMore={this.state.isLoadingMore} />;
        break;
      default:
        return <ProfileTopicList />;
    }
  }

  render() {

    if (this.state.isLoading) {
      return <Spinner />
    }

    const username = this.getUsername();

    if (typeof  username === 'undefined') {
      return null;
    }

    const { entities } = this.props;
    const user = entities.users[username];

    if (typeof user === 'undefined') {
      return null;
    }

    return (
      <div>
        <ProfileUserDetails {...this.props} user={user} />
        <ProfileNavigation changeTab={this.changeNavigationTab} selectedTab={this.state.selectedTab} />
        { this.renderProfileList(user) }
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



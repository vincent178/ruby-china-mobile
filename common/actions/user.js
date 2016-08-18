import 'isomorphic-fetch';
import * as types from '../constants/action-types';
import address from '../lib/address';
import { userSchema, topicSchema, replySchema } from '../constants/schema';
import { normalize, arrayOf } from 'normalizr';

function receiveUsers(entities, users) {
  return {
    type: types.RECEIVE_USERS,
    entities,
    users
  }
}


export function getUserProfile(username) {

  return (dispatch) => {
    return fetch(address.user(username))
      .then(res => res.json())
      .then(data => {

        if (data && data.error) {
          return { error: data.error };
        }

        if (data.user) {
          const normalized = normalize([data.user], arrayOf(userSchema));
          dispatch(receiveUsers(normalized.entities, normalized.result));
        }

        return { error: "fetch user error" };
      })
      .catch(e => { return { error: e.message }});
  }
}

export function getUserTopics(username) {

  return dispatch => {
    return fetch(address.userTopics(username))
      .then(res => res.json())
      .then(data => {

        if (data && data.error) {
          return { error: data.error }
        }

        if (data && data.topics && Array.isArray(data.topics)) {
          data.login = username;
          const normalized = normalize([data], arrayOf(userSchema));
          return dispatch(receiveUsers(normalized.entities, normalized.result));
        }

        return { error: "fetch user topics error" };
      })
      .catch( e => { return { error: e.message }});
  }
}


export function getUserReplies(username) {

  return (dispatch) => {

    return fetch(address.userReplies(username))
      .then(res => res.json())
      .then(data => {

        if (data && data.error) {
          return { error: data.error };
        }

        if (data && data.replies) {
          data.login = username;
          const normalized = normalize([data.replies], arrayOf(userSchema));
          return dispatch(receiveUsers(normalized.entities, normalized.result));
        }

        return { error: "fetch user replies error" };
      })
      .catch( e => { return { error: e.message }});
  }
}

export function getUserFollowers(username) {

  return (dispatch) => {

    return fetch(address.userFollowers(username))
      .then(res => res.json())
      .then(data => {

        if (data && data.error) {
          return { error: data.error };
        }

        if (data && data.followers) {
          data.login = username;
          const normalized = normalize([data.followers], arrayOf(userSchema));
          return dispatch(receiveUsers(normalized.entities, normalized.result));
        }

        return { error: "fetch user followers error" };
      })
      .catch( e => { return { error: e.message }});
  }
}

export function getUserFollow(username) {

  return (dispatch) => {

    return fetch(address.userFollowers(username))
      .then(res => res.json())
      .then(data => {

        if (data && data.error) {
          return { error: data.error };
        }

        if (data && data.follow) {
          data.login = username;
          const normalized = normalize([data.follow], arrayOf(userSchema));
          return dispatch(receiveUsers(normalized.entities, normalized.result));
        }

        return { error: "fetch user followers error" };
      })
      .catch( e => { return { error: e.message }});
  }
}

export function getUserProfileAndTopics(username) {

  return dispatch => {
    return Promise.all([
      dispatch(getUserProfile(username)),
      dispatch(getUserTopics(username))
    ])
      .catch( e => { return { error: e.message } });
  };

}


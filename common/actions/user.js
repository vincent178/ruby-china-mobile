import 'isomorphic-fetch';
import * as types from '../constants/action-types';
import address from '../lib/address';
import { userSchema, topicSchema, replySchema } from '../constants/schema';
import { normalize, arrayOf } from 'normalizr';

export function receiveUsers(entities, users) {
  return {
    type: types.RECEIVE_USERS,
    entities,
    users
  }
}


export function fetchUserProfile(userId) {

  return (dispatch) => {
    return fetch(address.user(userId))
      .then(res => res.json())
      .then(data => {
        if (data) {
          if (data.error) {

            return { error: data["error_description"]}

          } else if (data.user) {

            const normalized = normalize([data.user], arrayOf(userSchema));
            dispatch(receiveUsers(normalized.entities, normalized.result));
          }
          return { error: "fetch user error" };
        }

        return { error: "no data payload error"};
      })
      .catch(e => { return { error: e.message }});
  }
}

export function fetchUserTopics(userId) {

  return (dispatch) => {
    return fetch(address.userTopics(userId))
      .then(res => res.json())
      .then(data => {

        if (data) {
          if (data.error) {

            return { error: data["error_description"] }

          } else if (data.topics && Array.isArray(data.topics) && data.topics.length > 0) {

            const normalized = normalize([data.topics], arrayOf(userSchema));
            dispatch(receiveUsers(normalized.entities, normalized.result));
          }

          return { error: "fetch user topics error" };
        }

        return { error: "no data payload error" };
      })
      .catch( e => { return { error: e.message }});
  }
}


export function fetchUserReplies(userId) {

  return (dispatch) => {

    return fetch(address.userReplies(userId))
      .then(res => res.json())
      .then(data => {

        if (data) {
          if (data.error) {

            return { error: data["error_description"] }
          } else if (data.replies && Array.isArray(data.replies) && data.replies.length > 0) {

            const normalized = normalize([data.replies], arrayOf(userSchema));
            dispatch(receiveUsers(normalized.entities, normalized.result));
          }

          return { error: "fetch user topics error" };
        }

        return { error: "no data payload error" };
      })
      .catch( e => { return { error: e.message }});
  }
}

export function fetchUserFollowers(userId) {

  return (dispatch) => {

    return fetch(address.userFollowers(userId))
      .then(res => res.json())
      .then(data => {

        if (data) {
          if (data.error) {

            return { error: data["error_description"] }

          } else if (data.followers && Array.isArray(data.followers) && data.followers.length > 0) {

            const normalized = normalize([data.followers], arrayOf(userSchema));
            dispatch(receiveUsers(normalized.entities, normalized.result));
          }

          return { error: "fetch user followers error" };
        }

        return { error: "no data payload error" };
      })
      .catch( e => { return { error: e.message }});
  }
}

export function fetchUserFollow(userId) {

  return (dispatch) => {

    return fetch(address.userFollowers(userId))
      .then(res => res.json())
      .then(data => {

        if (data) {
          if (data.error) {

            return { error: data["error_description"] || data.error }

          } else if (data.follow && Array.isArray(data.follow) && data.follow.length > 0) {

            const normalized = normalize([data.follow], arrayOf(userSchema));
            dispatch(receiveUsers(normalized.entities, normalized.result));
          }

          return { error: "fetch user followers error" };
        }

        return { error: "no data payload error" };
      })
      .catch( e => { return { error: e.message }});
  }
}


import 'isomorphic-fetch';
import { browserHistory } from 'react-router';
import * as types from '../constants/action-types';
import address from '../lib/address';
import { saveToken, getQueryParams } from '../lib/util';

export function trackScrollPosition(scrollPosition) {
  return {
    type: types.TRACK_SCROLL_POSITION,
    position: scrollPosition
  }
}

export function initApplication() {
  const OAuth = retrieveToken();
  if (OAuth.accessToken.length === 0) {
    return;
  }
  return receiveUserToken(OAuth);
}

export function changeWidthAndHeight(width, height) {
  return {
    type: types.CHANGE_WIDTH_AND_HEIGHT,
    width,
    height
  }
}

export function initEnvironment() {

  return dispatch => {
    dispatch(changeWidthAndHeight(window.innerWidth, window.innerHeight));
    window.onresize = () => {
      dispatch(changeWidthAndHeight(window.innerWidth, window.innerHeight));
    }
  }
}

export function fetchAccessToken(username, password) {
  return () => {
    return fetch(address.token(), {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        grantType: "password",
        username: username,
        password: password
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data && data.error) {
          return { error: data["error_description"] };
        } else {
          saveToken(data, username);
          let params = getQueryParams(window.location.search);
          browserHistory.push(params.next);
        }
      })
      .catch(e => {
        return { error: e.message }
      });
  }
}


export function refreshAccessToken() {
  return () => {
    return fetch(address.token(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        grantType: "refresh_token",
        refreshToken: localStorage.getItem('refreshToken')
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data) {
        if (data.error) {
          return { error: data["error_description"] };
        } else {
          saveToken(data);
          return {};
        }
      }
      return { error: " 111 fuck going here" };
    })
    .catch(e => {
      return { error: e.message };
    })
  }
}



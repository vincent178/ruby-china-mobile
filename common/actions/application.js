'use strict';

import 'isomorphic-fetch';
import * as types from '../constants/action-types';
import Items from '../constants/items';
import address from '../constants/address';
import { saveToken, getQueryParams } from '../lib/util';

export function changeTab(selectedTab) {
  return {
    type: types.CHANGE_TAB,
    selectedTab
  }
}

export function trackScrollPosition(scrollPosition) {
  return {
    type: types.TRACK_SCROLL_POSITION,
    position: scrollPosition
  }
}

function receiveUserToken(oAuth) {
  return {
    type: types.RECEIVE_USER_TOKEN,
    accessToken: oAuth.accessToken,
    refreshToken: oAuth.refreshToken,
    expiresAt: oAuth.expiresAt
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

export function fetchUserToken(username, password) {
  return dispatch => {
    return fetch("/oauth/access_token", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({grantType: "password", username: username, password: password})
    })
      .then(res => res.json())
      .then(data => {
        if (data && data.error) {
          return { error: data["error_description"] };
        } else {
          saveToken(data);
        }
      })
      .catch(e => {
        return { error: e.message }
      });
  }
}


export function refreshUserToken(refreshToken) {
  return dispatch => {
    return fetch(address.refreshToken(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({grant_type: "refresh_token", refresh_token: refreshToken})
    })
    .then(res => res.json())
    .then(data => {
      if (data) {
        if (data.error) {

          return { error: data["error_description"] };
        } else if (data.OAuth) {

          saveToken(data.OAuth);
          dispatch(receiveUserToken(data.OAuth));
          return {};
        }

        return { error: " 111 fuck going here" };
      }
    })
    .catch(e => {

      return { error: e.message };
    })
  }
}

'use strict';

import 'isomorphic-fetch';
import * as types from '../constants/action-types';
import Items from '../constants/items';
import address from '../constants/address';
import { retrieveToken, saveToken, getQueryParams } from '../lib/util';
import { browserHistory } from 'react-router';

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

function requestUserToken() {
  return {
    type: types.REQUEST_USER_TOKEN
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

function receiveTokenError(message) {
  return {
    type: types.RECEIVE_TOKEN_ERROR,
    message: message
  }
}

export function getUserToken(username, password) {

  return dispatch => {
    dispatch(requestUserToken());
    return fetch(address.login(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({grant_type: "password", username: username, password: password})
    })
      .then(res => res.json())
      .then(data => {

        if (data.error) {
          if (data.error === Items.ERROR_LOGIN) {
            dispatch(receiveTokenError("用户名密码不匹配"));
          } else {
            dispatch(receiveTokenError(data.error_description));
          }
          return;
        }

        saveToken(data.OAuth);
        dispatch(receiveUserToken(data.OAuth));
        let query = getQueryParams(window.location.search);
        browserHistory.push(query.next);
      });
  }
}

export function dismissError() {
  return {
    type: types.DISMISS_ERROR
  }
}

export function initApplication() {
  const OAuth = retrieveToken();
  if (OAuth.accessToken.length === 0) {
    return;
  }
  return receiveUserToken(OAuth);
}

export function refreshUserToken(refresh_token) {
  return dispatch => {
    dispatch(requestUserToken());
    return fetch(address.refreshToken(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({grant_type: "refresh_token", refresh_token: refresh_token})
    })
    .then(res => res.json())
    .then(data => {
      saveToken(data.OAuth);
      dispatch(receiveUserToken(data.OAuth));
    })
    .catch(e => {
      dispatch(receiveTokenError(e));
    })
  }
}


'use strict';

import * as types from '../constants/action-types';
import Items from '../constants/items';

export function changeTab(selectedTab) {
  return {
    type: types.CHANGE_TAB,
    selectedTab
  }
}

export function initTab(selectedTab = Items.TOPIC_TAB) {
  return dispatch => {
    return dispatch(changeTab(selectedTab))
  }
}

export function trackScrollPosition(scrollPosition) {
  return {
    type: types.TRACK_SCROLL_POSITION,
    position: scrollPosition
  }
}

function requestUserSesion(username, password) {
  return {
    type: types.REQUEST_USER_SESSION
  }
}

function receiveUserSesion() {
}

export function loginUser(username, password) {

  return (dispatch) => {
    dispatch(requestUserSesion());

    return fetch()
  }
}


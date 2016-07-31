'use strict';

import Items from '../constants/items';
import * as actionTypes from '../constants/action-types';

const initialState = {
  selectedTab: "",
  position: 0,
  accessToken: "",
  refreshToken: "",
  expiresAt: ""
};

export default function applicationReducer(state = initialState, action) {
  switch(action.type) {
    case actionTypes.CHANGE_TAB:
      return Object.assign({}, state, {
        selectedTab: action.selectedTab
      });
    case actionTypes.TRACK_SCROLL_POSITION:
      return Object.assign({}, state, {
        position: action.position
      });
    case actionTypes.RECEIVE_USER_TOKEN:
      return Object.assign({}, state, {
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
        expiresAt: action.expiresAt
      });
    default:
      return state;
  }
}
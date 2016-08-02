'use strict';

import * as types from '../constants/action-types';

const initialState = {
  items: []
};

export default function notificationReducer(state = initialState, action) {
  switch(action.type) {
    case types.RECEIVE_NOTIFICATIONS:
      return Object.assign({}, state, {
        items: action.notifications
      });
    default:
      return state;
  }
}
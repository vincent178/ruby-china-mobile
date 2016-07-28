'use strict';

import * as types from '../constants/action-types';

const initialState = {
  items: []
};

export default function replyReducer(state = initialState, action) {
  switch(action.type) {
    case types.RECEIVE_MORE_TOPIC_REPLIES:
      return Object.assign({}, state, {
        items: Array.from(new Set([...state.items, ...action.replies]))
      });
    case types.RECEIVE_TOPIC_REPLIES:
      return Object.assign({}, state, {
        items: action.replies
      });
    default:
      return state;
  }
}
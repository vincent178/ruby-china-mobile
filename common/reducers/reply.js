'use strict';

import * as types from '../constants/action-types';

const initialState = {
  isFetching: false,
  items: []
};

export default function replyReducer(state = initialState, action) {
  switch(action.type) {
    case types.REQUEST_TOPIC_REPLIES:
      return Object.assign({}, state, {
        isFetching: true
      });
    case types.RECEIVE_MORE_TOPIC_REPLIES:
      return Object.assign({}, state, {
        isFetching: false,
        items: Array.from(new Set([...state.items, ...action.replies]))
      });
    case types.RECEIVE_TOPIC_REPLIES:
      return Object.assign({}, state, {
        isFetching: false,
        // 每个topic对应不同reply集合, 用新的reply集合覆盖原来的reply集合
        items: action.replies
      });
    default:
      return state;
  }
}
'use strict';

import * as types from '../constants/action-types';

const initialState = {
  isFetching: false,
  items: []
};

export default function replyReducer(state = initialState, action) {
  switch(action.type) {
    case types.REQUEST_REPLIES:
      return Object.assign({}, state, {
        isFetching: true
      });
    case types.RECEIVE_MORE_REPLIES:
      return Object.assign({}, state, {
        isFetching: false,
        // new Set to reject the duplicate topicIds
        // return array to conveniently use array interface
        items: Array.from(new Set([...state.items, ...action.replies]))
      });
    case types.RECEIVE_REPLIES:
      return Object.assign({}, state, {
        isFetching: false,
        // new Set to reject the duplicate topicIds
        // return array to conveniently use array interface
        items: action.replies
      });
    default:
      return state;
  }
}
'use strict';

import * as types from '../constants/action-types';

const initialState = {
  items: []
};

export default function topicReducer(state = initialState, action) {
  switch(action.type) {
    case types.RECEIVE_TOPICS:
      return Object.assign({}, state, {
        items: Array.from(new Set([...state.items, ...action.topics]))
      });
    default:
      return state;
  }
}
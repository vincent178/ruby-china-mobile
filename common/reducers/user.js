'use strict';

import * as types from '../constants/action-types';

const initialState = {
  items: []
};

export default function userReducer(state = initialState, action) {
  switch(action.type) {
    case types.RECEIVE_USERS:
      debugger;
    default:
      return state;
  }
}
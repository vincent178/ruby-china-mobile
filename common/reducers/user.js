'use strict';

import * as types from '../constants/action-types';

const initialState = {
  items: []
};

export default function userReducer(state = initialState, action) {
  switch(action.type) {
    default:
      return state;
  }
}
'use strict';

import * as actionTypes from '../constants/action-types';

const initialState = {
  position: 0
};

export default function applicationReducer(state = initialState, action) {
  switch(action.type) {
    case actionTypes.TRACK_SCROLL_POSITION:
      return Object.assign({}, state, {
        position: action.position
      });
    default:
      return state;
  }
}
'use strict';

import Items from '../constants/items';
import * as actionTypes from '../constants/action-types';

const initialState = {
  selectedTab: ""
};

export default function applicationReducer(state = initialState, action) {
  switch(action.type) {
    case actionTypes.CHANGE_TAB:
      return Object.assign({}, state, {
        selectedTab: action.selectedTab
      });
    default:
      return state;
  }
}
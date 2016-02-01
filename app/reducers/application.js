'use strict';

import Tabs from '../constants/tabs';
import * as actionTypes from '../constants/action-types';

/*
 * {
 *   application: {
 *     selectedTab: Tabs.TOPIC_TAB
 *   }
 * }
 */

const initialState = {
  type: actionTypes.SELECT_TAB,
  selectedTab: Tabs.TOPIC_TAB
};

export default function applicationReducer(state = initialState, action) {
  switch(action.type) {
    case actionTypes.SELECT_TAB:
      return state;
    default:
      return state;
  }
}
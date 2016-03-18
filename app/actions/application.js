'use strict';

import * as types from '../constants/action-types';
import Items from '../constants/items';

export function changeTab(selectedTab) {
  return {
    type: types.CHANGE_TAB,
    selectedTab
  }
}

export function initTab(selectedTab = Items.TOPIC_TAB) {
  return dispatch => {
    return dispatch(changeTab(selectedTab))
  }
}


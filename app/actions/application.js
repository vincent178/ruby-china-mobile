'use strict';

import * as types from '../constants/action-types';
import Tabs from '../constants/tabs';

export function changeTab(selectedTab) {
  return {
    type: types.CHANGE_TAB,
    selectedTab
  }
}

export function initTab(selectedTab = Tabs.TOPIC_TAB) {
  return dispatch => {
    return dispatch(changeTab(selectedTab))
  }
}


'use strict';

import { merge } from 'lodash/object';

const initialState = {
  topics: {},
  users: {}
};

export default function entities(state = initialState, action) {
  if (action.entities) {
    return merge({}, state, action.entities);
  }

  return state;
}
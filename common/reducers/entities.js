'use strict';

import { mergeWith } from 'lodash/object';

const initialState = {
  topics: {},
  users: {},
  notifications: {}
};

function customizer(objValue, srcValue) {
  if (Array.isArray(objValue)) {
    return Array.from(new Set([...objValue.concat(srcValue)]));
  }
}

export default function entities(state = initialState, action) {
  if (action.entities) {
    return mergeWith({}, state, action.entities, customizer);
  }

  return state;
}
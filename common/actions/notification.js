import 'isomorphic-fetch';
import * as types from '../constants/action-types';
import { normalize, arrayOf } from 'normalizr';

import address from '../lib/address';
import { notificationSchema } from '../constants/schema';

function receiveNotifications(entities, notifications) {
  return {
    type: types.RECEIVE_NOTIFICATIONS,
    entities,
    notifications
  }
}

export function fetchNotifications(offset, limit, type) {
  return (dispatch) => {
    return fetch(address.notifications(offset, limit, type))
      .then(res => res.json())
      .then(data => {
        const notifications = data.notifications;
        const normalized = normalize(notifications, arrayOf(notificationSchema));
        dispatch(receiveNotifications(normalized.entities, normalized.result));
      })
      .catch((error) => { return {error: error.message} })
  };
}

'use strict';

import { getToken } from './util';
const BASE_URL = 'https://ruby-china.org/api/v3';

function addressFactory(url, params) {
  let { accessToken } = getToken();
  let paramsStr = "";

  if (params) {
    for (let key in params) {
      if (params.hasOwnProperty(key)) {
        let value = params[key];
        paramsStr += `&${key}=${value}`;
      }
    }
  }

  if (accessToken.length > 0) {
    return `${BASE_URL}/${url}?access_token=${accessToken}${paramsStr}`;
  } else {
    return `${BASE_URL}/${url}?${paramsStr}`;
  }
}
const address = {

  topics: (offset = 0, limit = 20, type = "last_actived") => {
    return addressFactory('topics.json', {type: type, offset: offset, limit: limit});
  },

  topic: (id) => {
    return addressFactory(`topics/${id}.json`);
  },

  topicReplies: (id, offset = 0, limit = 20) => {
    return addressFactory(`topics/${id}/replies.json`, {offset: offset, limit: limit});
  },

  token: () => {
    return "/oauth/access_token";
  },

  notifications: (offset = 0, limit = 20) => {
    return addressFactory('notifications.json', {offset: offset, limit: limit});
  },

  user: (username) => {
    return addressFactory(`users/${username}.json`);
  },

  userTopics: (username) => {
    return addressFactory(`users/${username}/topics.json`);
  },

  userReplies: (username) => {
    return addressFactory(`users/${username}/replies.json`);
  },

  userFollowers: (username) => {
    return addressFactory(`users/${username}/followers.json`);
  },

  userFollowing: (username) => {
    return addressFactory(`users/${username}/follow.json`);
  }
};

export default address;
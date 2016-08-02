'use strict';

import { retrieveToken } from './util';
const BASE_URL = 'https://ruby-china.org/api/v3';

function addressFactory(url, params) {
  let { accessToken } = retrieveToken();
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
    return `${url}?access_token=${accessToken}${paramsStr}`;
  } else {
    return `${url}?${paramsStr}`;
  }
}
const address = {

  topics: (offset = 0, limit = 20, type = "last_actived") => {
    return addressFactory(`${BASE_URL}/topics.json`, {type: type, offset: offset, limit: limit});
  },

  topic: (id) => {
    return addressFactory(`${BASE_URL}/topics/${id}.json`);
  },

  topicReplies: (id, offset = 0, limit = 20) => {
    return addressFactory(`${BASE_URL}/topics/${id}/replies.json`, {offset: offset, limit: limit});
  },

  token: () => {
    return "/oauth/access_token";
  },

  notifications: (offset = 0, limit = 20) => {
    return addressFactory(`${BASE_URL}/notifications.json`, {offset: offset, limit: limit});
  }

};

export default address;
'use strict';

import Items from '../constants/items';

const BASE_URL = 'https://ruby-china.org/api/v3';

function addressFactory(url, params: {}, accessToken) {
  let paramsStr = "";

  for (let key in params) {
    if (params.hasOwnProperty(key)) {
      let value = params[key];
      paramsStr += `&${key}=${value}`;
    }
  }

  if (accessToken && typeof accessToken=== 'string') {
    return `${url}?access_token=${accessToken}${paramsStr}`;
  } else {
    return `${url}?${paramsStr}`;
  }
}
const address = {

  topics: (offset = 0, limit = 20, type = "last_actived", accessToken) => {
    return addressFactory(`${BASE_URL}/topics.json`, {type: type, offset: offset, limit: limit}, accessToken);
  },

  topic: (id, accessToken) => {
    return addressFactory(`${BASE_URL}/topics/${id}.json`, {}, accessToken);
  },

  topicReplies: (id, offset = 0, limit = 20, accessToken) => {
    return addressFactory(`${BASE_URL}/topics/${id}/replies.json`, {offset: offset, limit: limit}, accessToken);
  },

  replyTopic: (id, accessToken) => {
    return addressFactory(`${BASE_URL}/topics/${id}/replies.json`, {}, accessToken)
  },

  replyReply: (id, accessToken) => {
    // 暂时没有回复reply的api
  },

  login: () => {
    return addressFactory("/oauth/access_token", {}, null);
  }
};

export default address;
'use strict';

import Items from '../constants/items';

const BASE_URL = 'https://ruby-china.org/api/v3';

//const TOPIC_PARAMS = {
//  type: ["last_actived", "recent", "no_reply", "popular", "excellent"],
//  node_id: 1,
//  offset: 0,
//  limit: 20
//};

function addressFactory(url, params: {}, accessToken) {
  let paramsStr = "";

  for (let key in params) {
    if (params.hasOwnProperty(key)) {
      let value = params[key];
      paramsStr += `&${key}=${value}`;
    }
  }

  if (typeof accessToken === 'undefined') {
    return `${url}?${paramsStr}`;
  } else {
    return `${url}?access_token=${accessToken}${paramsStr}`;
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

  login: () => {
    let url = "";
    if (DEVELOPMENT) {
      url = `http://localhost:9292/oauth/access_token`;
    } else {
      url = `http://ruby.gtispace.cc/oauth/access_token`;
    }
    return addressFactory(url, {}, undefined);
  }
};

export default address;
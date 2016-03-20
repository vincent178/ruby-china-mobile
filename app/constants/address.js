'use strict';

const BASE_URL = 'https://ruby-china.org/api/v3';

const TOPIC_PARAMS = {
  type: ["last_actived", "recent", "no_reply", "popular", "excellent"],
  node_id: 1,
  offset: 0,
  limit: 20
};

const address = {

  topics: (offset = 0, limit = 20, type = "last_actived") => {
    return `${BASE_URL}/topics.json?type=${type}&offset=${offset}&limit=${limit}`;
  },

  topic: (id) => {
    return `${BASE_URL}/topics/${id}.json`;
  },

  topicReplies: (id, offset = 0, limit = 20) => {
    return `${BASE_URL}/topics/${id}/replies.json?offset=${offset}&limit=${limit}`
  }
};

export default address;
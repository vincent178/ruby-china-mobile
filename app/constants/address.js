'use strict';

const BASE_URL = 'https://ruby-china.org/api/v3';

const TOPIC_PARAMS = {
  type: ["last_actived", "recent", "no_reply", "popular", "excellent"],
  node_id: 1,
  offset: 0,
  limit: 20
};

const address = {

  topics: (type = "last_actived", offset = 0, limit = 20) => {
    return `${BASE_URL}/topics.json?type=${type}&offset=${offset}&limit=${limit}`;
  }
};

export default address;
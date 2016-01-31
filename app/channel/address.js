'use strict';

const BASE_URL = 'https://ruby-china.org/api/v3';

const address = {

  topics: () => {
    return `${BASE_URL}/topics.json`
  }
};

export default address;
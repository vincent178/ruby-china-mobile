'use strict';

import Util from '../lib/util';

const producer = {
  getTopics: (topics) => {

    debugger;

    return topics.map((topic) => {

      for (let key in topic) {
        if (topic.hasOwnProperty(key)) {

          let value = topic[key];
          delete topic[key];

          if (key === "created_at" || key === "updated_at" || key === "replied_at") {
            value = new Date(value);
          }

          topic[Util.toCamel(key)] = value;
        }
      }

      return topic;
    })
  }
};

export default producer;

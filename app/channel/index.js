'use strict';

import address from './address';
import producer from './producer';
import 'whatwg-fetch';


export default class Channel {
  constructor(options) {
    this.options = options;
  }

  getTopics() {
    const url = address.topics();

    return fetch(url)
      .then(res => res.json())
      .then(data => {
        debugger;
        return producer.getTopics(data.topics)
      })
      .catch(e => console.log(e));
  }
}
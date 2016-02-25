'use strict';

import address from './address';
import producer from './producer';


export default class Channel {
  constructor(options) {
    this.options = options;
  }

  getTopics() {
    const url = address.topics();

    //return window.fetch(url)
    //  .then(res => res.json())
    //  .then(data => producer.getTopics(data.topics))
    //  .catch(e => console.log(e))

    return {};
  }
}
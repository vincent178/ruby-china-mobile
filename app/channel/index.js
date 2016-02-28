'use strict';

import address from './address';
import producer from './producer';
import 'whatwg-fetch';
import {arrayOf, normalize} from 'normalizr';
import {topicSchema} from '../constants/schema';


export default class Channel {
  constructor(options) {
    this.options = options;
  }

  getTopics() {
    const url = address.topics();

    return fetch(url)
      .then(res => res.json())
      .then(data => {
        const topics = producer.getTopics(data.topics);
        const normalized = normalize(topics, arrayOf(topicSchema));
        debugger;
      })
      .catch(e => console.log(e));
  }
}
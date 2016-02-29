import * as types from '../constants/action-types';
import 'whatwg-fetch';
import {normalize, arrayOf} from 'normalizr';

import address from '../constants/address';
import {topicSchema} from '../constants/schema';

// 这里的所有都是 action creator,
// 通过receiveTopics 可以创建一个type是receiveTopics包含topics内容的action

function receiveTopics(entities, topics) {
  return {
    type: types.RECEIVE_TOPICS,
    entities,
    topics
  }
}

function requestTopics() {
  return {
    type: types.REQUEST_TOPICS
  }
}

// 这里的 getTopics 虽然是一种action, 但不会直接产生 state 的变化
// 通过 dispatch 已经产生的变化的action, 例如 receiveTopics

export function getTopics(offset, limit, type) {

  return (dispatch) => {
    dispatch(requestTopics());
    return fetch(address.topics(offset, limit, type))
      .then(res => {
        return res.json()
      })
      .then(data => {
        const topics = data.topics;
        const normalized = normalize(topics, arrayOf(topicSchema));
        dispatch(receiveTopics(normalized.entities, normalized.result));
      })
      .catch(e => console.log(e));
  };
}

//有两种情况, 第一种是没有
export function fetchTopicsIfNeeded(node) {
}


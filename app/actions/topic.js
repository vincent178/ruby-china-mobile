import * as types from '../constants/action-types';
import Channel from '../channel';

function receiveTopics(topics) {
  debugger;
  return {
    type: types.RECEIVE_TOPICS,
    topics: topics
  }
}

export function getTopics() {
  const channel = new Channel();
  return (dispatch, getStore) => {
    channel.getTopics()
      .then((topics) => dispatch(receiveTopics(topics)));
  }
}

//有两种情况, 第一种是没有
export function fetchTopicsIfNeeded(node) {
}


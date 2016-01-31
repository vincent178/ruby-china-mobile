import * as types from '../constants/action-types';

function receiveTopics(topics) {
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
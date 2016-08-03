import 'isomorphic-fetch';
import * as types from '../constants/action-types';
import { normalize, arrayOf } from 'normalizr';

import address from '../lib/address';
import { topicSchema, replySchema } from '../constants/schema';

function receiveTopics(entities, topics) {
  return {
    type: types.RECEIVE_TOPICS,
    entities,
    topics
  }
}

function receiveReplies(entities, replies) {
  return {
    type: types.RECEIVE_TOPIC_REPLIES,
    entities,
    replies
  }
}

export function fetchTopics(offset, limit, type) {
  return (dispatch) => {
    return fetch(address.topics(offset, limit, type))
      .then(res => res.json())
      .then(data => {
        const topics = data.topics;
        const normalized = normalize(topics, arrayOf(topicSchema));
        dispatch(receiveTopics(normalized.entities, normalized.result));
      })
      .catch((error) => { return {error: error.message} })
  };
}

export function fetchTopicDetail(id) {
  return (dispatch) => {
    return fetch(address.topic(id))
      .then(res => res.json())
      .then( topicPayload => {
        if (topicPayload && topicPayload.topic) {
          const normalized = normalize([topicPayload.topic], arrayOf(topicSchema));
          dispatch(receiveTopics(normalized.entities, normalized.result));
        }
      });
  };
}

export function fetchTopicReplies(id, offset, limit) {
  return (dispatch) => {
    return fetch(address.topicReplies(id, offset, limit))
      .then(res => res.json())
      .then( replyPayload => {
        if (replyPayload && replyPayload.replies && replyPayload.replies.length > 0) {
          const normalized = normalize(replyPayload.replies, arrayOf(replySchema));
          dispatch(receiveReplies(normalized.entities, normalized.result));
        }
      });
  };
}

export function fetchTopicDetailWithReplies(id) {
  return (dispatch) => {
    return Promise.all([
        dispatch(fetchTopicDetail(id)),
        dispatch(fetchTopicReplies(id))
      ])
      .catch( e => console.log(e.message));
  }
}

export function postTopicReply(id, body) {
  return dispatch => {
    dispatch(createTopicReply());
    return fetch(address.replyTopic(id), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        body: body
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        dispatch(createTopicReplyDone());
      })
      .catch(e => console.log(e));

  }
}


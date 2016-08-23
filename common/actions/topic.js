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

function receiveMoreReplies(entities, replies) {
  return {
    type: types.RECEIVE_MORE_TOPIC_REPLIES,
    entities,
    replies
  }
}

export function getTopics(offset, limit, type) {
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

export function getTopicDetail(id) {
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

export function getTopicReplies(id, offset, limit) {
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

export function getTopicDetailWithReplies(id) {
  return (dispatch) => {
    return Promise.all([
        dispatch(getTopicDetail(id)),
        dispatch(getTopicReplies(id))
      ])
      .catch( e => console.log(e.message));
  }
}

export function getMoreTopicReplies(id, offset, limit) {
  return dispatch => {
    return fetch(address.topicReplies(id, offset, limit))
      .then(res => res.json())
      .then( replyPayload => {
        if (replyPayload && replyPayload.replies && replyPayload.replies.length > 0) {
          const normalized = normalize(replyPayload.replies, arrayOf(replySchema));
          dispatch(receiveMoreReplies(normalized.entities, normalized.result));
        }
      });
  };
}

export function likeTopic(id) {
  return dispatch => {
    return fetch(address.likes(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        obj_type: 'topic',
        obj_id: id
      })
    })
      .then( res => res.json() )
      .then( data => {
        debugger;
      })
      .catch( e => { return { error: e.message }});
  }
}

export function unlikeTopic(id) {
  return dispatch => {
    return fetch(address.likes(), {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        obj_type: 'topic',
        obj_id: id
      })
    })
      .then( res => res.json() )
      .then( data => {
        debugger;
      })
      .catch( e => { return { error: e.message }});
  }
}

export function followTopic(id) {
  return dispatch => {
    return fetch(address.topicFollow(id), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then( res => res.json() )
      .then( data => {
        debugger;
      })
      .catch( e => { return { error: e.messsage }});
  }
}

export function unfollowTopic(id) {
  return dispatch => {
    return fetch(address.topicUnfollow(id), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then( res => res.json() )
      .then( data => {
        debugger;
      })
      .catch( e => { return { error: e.messsage }});
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


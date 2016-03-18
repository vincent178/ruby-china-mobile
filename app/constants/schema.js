import {Schema, normalize, arrayOf} from 'normalizr';

const topic = new Schema('topics');
const user = new Schema('users');
const reply = new Schema('replies');

topic.define({
  user: user
});

reply.define({
  user: user
});

export const topicSchema = topic;
export const replySchema = reply;

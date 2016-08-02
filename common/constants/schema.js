import {Schema} from 'normalizr';

const topic = new Schema('topics');
const user = new Schema('users');
const reply = new Schema('replies');
const notification = new Schema('notifications');

topic.define({
  user: user
});

reply.define({
  user: user
});

notification.define({
  user: user
});

export const topicSchema = topic;
export const replySchema = reply;
export const notificationSchema = notification;

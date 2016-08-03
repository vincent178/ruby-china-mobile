import { Schema, arrayOf } from 'normalizr';

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
  actor: user,
  topic: topic,
  reply: reply
});

user.define({
  topics: arrayOf(topic),
  replies: arrayOf(reply),
  followers: arrayOf(user)
});

export const topicSchema = topic;
export const userSchema = user;
export const replySchema = reply;
export const notificationSchema = notification;

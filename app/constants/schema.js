import {Schema, normalize, arrayOf} from 'normalizr';

const topic = new Schema('topics');
const user = new Schema('users');

topic.define({
  user: user
});

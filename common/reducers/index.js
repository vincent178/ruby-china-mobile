'use strict';

import { combineReducers } from 'redux';
import application from './application';
import topic from './topic';
import reply from './reply';
import notification from './notification';
import entities from './entities';
import user from './user';


export default combineReducers({
  application,
  topic,
  reply,
  user,
  notification,
  entities
});



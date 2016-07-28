'use strict';

import { combineReducers } from 'redux';
import application from './application';
import topic from './topic';
import reply from './reply';
import entities from './entities';

export default combineReducers({
  application,
  topic,
  reply,
  entities
});



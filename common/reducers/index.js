'use strict';

import { combineReducers } from 'redux';
import environment from './environment';
import application from './application';
import topic from './topic';
import reply from './reply';
import entities from './entities';

export default combineReducers({
  environment,
  application,
  topic,
  reply,
  entities
});



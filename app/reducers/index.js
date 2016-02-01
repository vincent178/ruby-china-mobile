'use strict';

import { combineReducers } from 'redux';
import environment from './environment';
import application from './application';

export default combineReducers({
  environment,
  application
});



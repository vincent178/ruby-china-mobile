import * as types from '../constants/action-types';

const initState = {
  width: null,
  height: null
};

export default function environment(state = initState, action) {
  switch (action.type) {
    case types.CHANGE_WIDTH_AND_HEIGHT:
      return Object.assign({}, state, {
        width: action.width,
        height: action.height
      });

    default:
      return state;
  }
}
import * as types from '../constants/action-types';

export function changeWidthAndHeight(width, height) {
  return {
    type: types.CHANGE_WIDTH_AND_HEIGHT,
    width,
    height
  }
}

export function initEnvironment() {

  return dispatch => {

    dispatch(changeWidthAndHeight(window.innerWidth, window.innerHeight));
    window.onresize = () => {
      dispatch(changeWidthAndHeight(window.innerWidth, window.innerHeight));
    }
  }
}

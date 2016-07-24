import { browserHistory } from 'react-router';

const ACCESS_TOKEN = 'ACCESS_TOKEN';
const REFRESH_TOKEN = 'REFRESH_TOKEN';

export function permissionChecker() {
  let accessToken = fetchToken(ACCESS_TOKEN);

  if (isExist(accessToken) && isExpire(accessToken)) {
    return true;
  }

  let refreshToken = fetchToken(REFRESH_TOKEN);

  if (isExist(refreshToken)) {
    dispatch(fetchRefreshToken());
  }

  // go to login page

}



function fetchToken(store, type = ACCESS_TOKEN) {

  if (store.contains(type)) {
    return store.get(type);
  } else if (localStorage.contains(type)) {
    return localStorage.get(type);
  }

  return null;
}

function isExpire() {
  return true;
}

function isExist() {
  return true;
}
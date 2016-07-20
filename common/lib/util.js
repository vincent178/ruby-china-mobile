'use strict';

export function timeSince(date) {
  const seconds = Math.floor((new Date()) - date) / 1000;

  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) {
    return `${interval} years`;
  }

  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return `${interval} months`;
  }

  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return `${interval} days`;
  }

  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return `${interval} hours`;
  }

  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return `${interval} minutes`;
  }

  return `${Math.floor(seconds)} seconds`;
}

export function toCamel(str) {
  return str.replace(/(_[a-z])/g, ($1) => $1.toUpperCase().replace('_', ''));
}

export function getQueryParams(qs) {
  qs = qs.split('+').join(' ');

  var params = {},
    tokens,
    re = /[?&]?([^=]+)=([^&]*)/g;

  while (tokens = re.exec(qs)) {
    params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
  }

  return params;
}

export function retrieveToken() {
  return {
    accessToken: localStorage.getItem('accessToken') || '',
    refreshToken: localStorage.getItem('refreshToken') || '',
    expiresAt: localStorage.getItem('expiresAt') || ''

  }
}

export function saveToken(oAuth) {
  localStorage.setItem('accessToken', oAuth.accessToken);
  localStorage.setItem('refreshToken', oAuth.refreshToken);
  localStorage.setItem('expiresAt', oAuth.expiresAt);
}



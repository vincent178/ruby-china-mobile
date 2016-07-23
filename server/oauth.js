import { Router } from 'express';
import "isomorphic-fetch";

const router = Router();

const APP_ID = '8e8d5c42';
const APP_SECRET = 'eccbe71f8735a4dd2153337f5ec4242538f13bde423ca530062ca5ce6837b85a';
const API_URL = 'https://ruby-china.org/oauth/token';
const PASSWORD_TYPE = 'password';
const REFRESH_TYPE = 'refresh_token';

router.post('/oauth/access_token', (req, res) => {
  let postBody = {
    "client_id": APP_ID,
    "client_secret": APP_SECRET
  };

  if (req.body.grant_type === PASSWORD_TYPE) {

    postBody.username = req.body.username;
    postBody.password = req.body.password;

  } else if (req.body.grant_type === REFRESH_TYPE) {

    postBody["refresh_token"] = req.body.refreshToken;
  } else {
    res.status(400).end();
  }

  fetch(API_URL, {
    method: 'POST',
    headers: {
      'ACCEPT': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postBody)
  })
    .then( res => res.json())
    .then( data => {
      return res.send(data);
    })
    .catch(e => console.log(e));

  res.status(200).end();
});

export default router;
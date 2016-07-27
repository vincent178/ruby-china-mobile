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
    "client_secret": APP_SECRET,
    "grant_type": req.body.grantType
  };

  switch (req.body.grantType) {
    case PASSWORD_TYPE:
      postBody.username = req.body.username;
      postBody.password = req.body.password;
      break;
    case REFRESH_TYPE:
      postBody["refresh_token"] = req.body.refreshToken;
      break;
    default:
      res.status(400).end();
  }

  for (let key in postBody) {
    console.log(`[OAUTH ROUTER][PARAMS] postBody ${postBody[key]}`);
  }

  fetch(API_URL, {
    method: 'POST',
    headers: {
      'ACCEPT': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postBody)
  })
    .then( res1 => res1.json())
    .then( data => res.json(data))
    .catch( e => res.status(500).json({ error: e.message }));
});

export default router;
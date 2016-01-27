import express from 'express';

import middleware from './middleware';
import router from './routers';

const app = express();


app.use(middleware);
app.use(router);


app.listen(8080, () => {
  console.log("[GNT] is running");
});
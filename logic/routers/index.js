import express from 'express';

import home from './home';

const app = express();

app.set('view engine', 'ejs');
app.set('views', process.cwd() + '/templates');

app.use('/', home);


export default app;

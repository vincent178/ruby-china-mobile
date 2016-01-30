import express from 'express';
import logger from './logger';

const app = express();

app.use(logger);

export default app;
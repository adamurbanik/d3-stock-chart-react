import express from 'express';
import compression from 'compression';
import config from './config';
import { createRoutes } from './routes';

const { contextRoute: CONTEXT_ROUTE } = config;

const createServer = () => {
  const server = express();

  server.get('/', (req, res) => {
    return res.redirect(`${CONTEXT_ROUTE}`);
  });

  server.use(compression());

  server.use(CONTEXT_ROUTE, createRoutes());

  return server;
};

export { createServer };

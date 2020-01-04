import express from 'express';

import compression from 'compression';

const createServer = () => {
  const server = express();

  server.use(compression());

  // server.use(CONTEXT_ROUTE, createRouteIndex());

  return server;
};

export { createServer };

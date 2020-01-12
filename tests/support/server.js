import { createServer } from '../../src/server/server';

const initServer = () => {
  const server = createServer();
  return server;
};

export default initServer;

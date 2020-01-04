//@flow
import { type $Request, type $Response } from 'express';

import next from 'next';
import { getLogger } from 'log4js';
import { createServer } from './server';
import config from './config';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: './src' });
const handle = app.getRequestHandler();
const { port: PORT, contextRoute: CONTEXT_ROUTE } = config;
const log = getLogger();

process.env.__app_name = 'd3-stock-react-chart';

app
  .prepare()
  .then(() => {
    const server = createServer();

    log.level = config.logLevel;
    log.info('Starting Server on {port}', { port: PORT });

    server.listen(PORT, (err?: ?Error) => {
      if (err) throw err;
      log.info('Server Listening on Port {port}', { port: PORT });
    });
  })
  .catch(ex => {
    log.error(ex.stack);
    process.exit(1);
  });

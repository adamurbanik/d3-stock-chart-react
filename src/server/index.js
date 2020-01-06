process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import next from 'next';
import { getLogger } from 'log4js';
import { createServer } from './server';
import config from './config';
import { $Request, $Response } from 'express';

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

    server.get(`${CONTEXT_ROUTE}*`, (req: $Request, res: $Response) => {
      req.url = req.url.replace(CONTEXT_ROUTE, '');

      if (req.url[0] !== '/') {
        req.url = `/${req.url}`;
      }

      return handle(req, res);
    });

    log.level = config.logLevel;

    server.listen(PORT, (err?: ?Error) => {
      if (err) throw err;
      log.info(`Server Listening on Port: ${PORT}`);
    });
  })
  .catch(ex => {
    log.error(ex.stack);
    process.exit(1);
  });

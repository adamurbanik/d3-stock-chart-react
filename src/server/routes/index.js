import { Router } from 'express';
import { getLogger } from 'log4js';
const log = getLogger();

const createRoutes = () => {
  const routes = Router();

  routes.use((err, req, res, next) => {
    if (typeof err === 'object' || !err instanceof Error) {
      err = JSON.stringify(err);
    }
    log.info(`Error handling middleware:: ${err}`);

    return res.redirect(`/err/${res.statusCode}`);
  });

  return routes;
};

export { createRoutes };

import { Router } from 'express';
import { getLogger } from 'log4js';
import { createApiRoutes } from './api';
const log = getLogger();

const createRoutes = () => {
  const router = Router();

  router.use('/api', createApiRoutes());

  router.use((err, req, res, next) => {
    if (typeof err === 'object' || !err instanceof Error) {
      err = JSON.stringify(err);
    }
    log.info(`Error handling middleware:: ${err}`);

    return res.redirect(`/err/${res.statusCode}`);
  });

  return router;
};

export { createRoutes };

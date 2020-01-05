import { Router } from 'express';
import bodyParser from 'body-parser';
import stockApi from './stockApi';

const createApiRoutes = () => {
  const router = Router();

  router.use(
    bodyParser.urlencoded({
      extended: true
    })
  );

  router.use(bodyParser.json());

  router.use(stockApi());

  return router;
};

export { createApiRoutes };

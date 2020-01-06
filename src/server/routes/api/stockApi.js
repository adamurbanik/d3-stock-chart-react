import { Router } from 'express';
import { requestStock } from '../../middleware/requestStock';

export default () => {
  const router = new Router();

  router.get(['/stock/request'], requestStock);

  return router;
};

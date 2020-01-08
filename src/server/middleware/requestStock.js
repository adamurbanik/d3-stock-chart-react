import { getLogger } from 'log4js';
import * as stockService from '../services/stocksService';
const log = getLogger();

export const requestStock = async (req, res) => {
  const { query: { dataset = '' } } = req;

  try {
    const response = await stockService.requestStockData({ dataset });
    const { dataset_data: { data } = {} } = await response.json();

    log.debug(`Stock retrieved successfully ${response.status}`);

    return res.status(response.status).json({ data });
  } catch (err) {
    const { status = 500, description = '', message = '' } = err;

    log.error(
      `Get stock data failure ${status} ${description} message: ${message}`
    );

    return res.sendStatus(status);
  }
};

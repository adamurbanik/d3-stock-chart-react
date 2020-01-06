import { getLogger } from 'log4js';
import * as stockService from '../services/stocksService';
const log = getLogger();

export const requestStock = async (req, res) => {
  try {
    const response = await stockService.requestStockData();
    const stock = await response.json();

    log.debug(`Stock retrieved successfully ${response.status}`);

    return res.status(response.status).json({ stock });
  } catch (err) {
    const { status = 500, description = '', message = '' } = err;

    log.error(
      `Get stock data failure ${status} ${description} message: ${message}`
    );

    return res.sendStatus(status);
  }
};

import nock from 'nock';
import request from 'supertest';
import { apiRoutes } from '../../../src/utils/config';
import initServer from '../../support/server';
import { quandlConfig } from '../../../src/server/config';

describe('/stock/request route', () => {
  const dataset = 'AAPL';
  const nodeServerRequestStockRoute = `${apiRoutes.requestStock}?dataset=${dataset}`;
  const { stocksEndpoint, database, returnFormat, apiKey } = quandlConfig;
  const stockParams = `/${database}/${dataset}/${returnFormat}?api_key=${apiKey}`;

  const app = initServer();

  test('should return 200 in a happy path', async () => {
    const fakeData = [{ prop: 'data1' }, { prop: 'data2' }];
    const response = {
      dataset_data: {
        data: fakeData
      }
    };

    nock(stocksEndpoint)
      .get(stockParams)
      .reply(200, response);

    const res = await request(app).get(nodeServerRequestStockRoute);

    expect(res.statusCode).toBe(200);
    expect(res.type).toBe('application/json');
  });

  test('should return error status while external api responds with 400 ', async () => {
    const response = {
      httpStatusCode: 400,
      description: 'error occured'
    };

    nock(stocksEndpoint)
      .get(stockParams)
      .reply(400, response);

    const res = await request(app).get(nodeServerRequestStockRoute);

    expect(res.statusCode).toBe(400);
    expect(res.type).toBe('text/plain');

  })


  });

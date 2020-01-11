import { requestStock } from './requestStock';
import { requestStockData } from '../services/stocksService';

jest.mock('../services/stocksService');

describe('requestStock middleware', () => {
  const dataset = 'AAPL';
  const dataJsonMock = jest.fn();
  const sendStatusMock = jest.fn();
  const fakeReq = { query: { dataset } };
  const fakeRes = {
    status: () => ({ json: dataJsonMock }),
    sendStatus: sendStatusMock
  };
  const fakeData = [{ prop: 'data1' }, { prop: 'data2' }];

  test('should request stock data', async () => {
    const serviceResponse = {
      ok: true,
      status: 200,
      json: () => ({
        dataset_data: { data: fakeData }
      })
    };

    requestStockData.mockImplementation(() => Promise.resolve(serviceResponse));

    await requestStock(fakeReq, fakeRes);

    expect(requestStockData).toHaveBeenCalledWith({ dataset });
    expect(dataJsonMock).toHaveBeenCalledWith({ data: fakeData });
  });

  test('should return status response when request fails', async () => {
    const serviceResponse = {
      ok: false,
      status: 400
    };

    requestStockData.mockImplementation(() => Promise.reject(serviceResponse));

    await requestStock(fakeReq, fakeRes);

    expect(sendStatusMock).toHaveBeenCalledWith(serviceResponse.status);
  });
});

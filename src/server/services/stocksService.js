import restClient, { setDefaultHeaders } from '../lib/rest-client';
import { quandlConfig } from '../config';

export const requestStockData = ({ dataset }) => {
  const { stocksEndpoint, database, returnFormat, apiKey } = quandlConfig;

  return restClient.get({
    url: `${stocksEndpoint}/${database}/${dataset}/${returnFormat}?api_key=${apiKey}`,
    headers: setDefaultHeaders
  });
};

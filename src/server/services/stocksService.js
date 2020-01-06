import restClient, { setDefaultHeaders } from '../lib/rest-client';
import { quandlConfig } from '../config';

export const requestStockData = () => {
  const { stocksEndpoint, dataset, asset, dataType, apiKey } = quandlConfig;

  return restClient.get({
    url: `${stocksEndpoint}/${dataset}/${asset}/${dataType}?api_key=${apiKey}`,
    headers: setDefaultHeaders
  });
};

//@flow

type ServerConfig = {
  port: string,
  contextRoute: string,
  logLevel: string
};

const config: ServerConfig = {
  port: process.env.PORT || '3000',
  contextRoute: process.env.APP_CONTEXT_ROUTE || '',
  logLevel: process.env.LOG_LEVEL || ''
};

type QuandlConfig = {
  stocksEndpoint: string,
  dataset: string,
  asset: string,
  dataType: string,
  apiKey: string
};

const quandlConfig: QuandlConfig = {
  stocksEndpoint: process.env.QUANDL_STOCKS_ENDPOINT || '',
  dataset: process.env.QUANDL_DATASET || '',
  asset: process.env.ASSET || '',
  dataType: process.env.DATA_TYPE || '',
  apiKey: process.env.QUANDL_API_KEY || ''
};

export { config as default, quandlConfig };

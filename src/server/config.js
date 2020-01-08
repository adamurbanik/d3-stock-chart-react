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
  database: string,
  returnFormat: string,
  apiKey: string
};

const quandlConfig: QuandlConfig = {
  stocksEndpoint: process.env.QUANDL_STOCKS_ENDPOINT || '',
  database: process.env.QUANDL_DATABASE_CODE || '',
  returnFormat: process.env.RETURN_FORMAT || '',
  apiKey: process.env.QUANDL_API_KEY || ''
};

export { config as default, quandlConfig };

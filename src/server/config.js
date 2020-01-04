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

export {
  config as default
}

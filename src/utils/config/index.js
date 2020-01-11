import getConfig from 'next/config';

const { contextRoute } = getConfig().publicRuntimeConfig;

const config = {
  apiRoute: '/api'
};

const apiRoutes = {
  requestStock: `${contextRoute}${config.apiRoute}/stock/request`
};

export { config as default, apiRoutes };

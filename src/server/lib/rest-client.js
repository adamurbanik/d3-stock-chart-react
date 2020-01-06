import fetch from 'node-fetch';
import { getLogger } from 'log4js';
import isomorphicRest from '../../lib/restClient/isomorphic-fetch';

const log = getLogger();

export const setDefaultHeaders = {
  'Content-Type': 'application/json',
  Pragma: 'no-cache',
  'Cache-Control': 'no-cache'
};

export const handleSuccessfulRequest = res => {
  if (res.ok) {
    return Promise.resolve(res);
  }

  return res
    .json()
    .then(err => Promise.reject({ ...err, status: res.status }))
    .catch(err => Promise.reject({ ...err, status: res.status }));
};

export const handleFailingRequest = err => {
  throw err;
};

const request = method => (args = {}) => {
  log.debug(`Request: ${args.url}`);
  return method(args, fetch, handleSuccessfulRequest, handleFailingRequest);
};

const requests = {
  post: request(isomorphicRest.post),
  get: request(isomorphicRest.get)
};

export default requests;

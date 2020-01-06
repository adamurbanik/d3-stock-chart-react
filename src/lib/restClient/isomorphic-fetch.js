const get = (
  { url = '', headers = {} },
  fetch
) => {
  return fetch(url, {
    headers: {
      ...headers
    }
  });
};

const post = (
  { url = '', body = '', headers = {} },
  fetch
) => {
  return fetch(url, {
    headers: {
      ...headers
    },
    method: 'POST',
    body: body
  });
};

const connectHandlers = method => (
  args,
  fetch,
  handleSuccessfulRequest,
  handleFailingRequest
) => {
  return method(args, fetch)
    .then(handleSuccessfulRequest)
    .catch(handleFailingRequest);
};

export default {
  get: connectHandlers(get),
  post: connectHandlers(post)
};

import container from '../container';
import handleResponse from '../utils/handleResponse';
import onFulfillment from '../utils/onFulfillment';
import onRejection from '../utils/onRejection';

const fetchRequest = (store, next, action) => {
  const req = container.getDefinition('requestBuilder').getArgument('build')(action.request.url, {
    method: action.method,
    body: action.request.body,
  });
  const meta = action.request.meta || {};

  return fetch(req).then((response) => {
    meta.response = response;
    return response;
  }).then(handleResponse).then(
    onFulfillment(store, next, action, meta),
    onRejection(store, next, action, meta)
  );
};

export default fetchRequest;

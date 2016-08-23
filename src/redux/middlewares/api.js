import fetch from 'isomorphic-fetch';
import qs from 'qs';
import { isFunction } from 'lodash';

export const CALL_API = Symbol('CALL_API');

export default store => next => action => {
  if (!action[CALL_API]) return next(action);

  const request = action[CALL_API];
  const { getState } = store;
  const { method, type, params } = request;
  const options = { method };
  let { url } = request;

  if (params) {
    if (method.toLowerCase() === 'get') url += `?${qs.stringify(params)}`;
    if (method.toLowerCase() === 'post') options.body = JSON.stringify(params);
  }

  function handleResponse(response, error) {
    next({ type, response, error });

    if (isFunction(request.afterSuccess)) {
      request.afterSuccess({ getState });
    }
  }

  function handleError(error) {
    return handleResponse(null, { error, message: 'Sorry, something wrong happened' });
  }

  return fetch(url, options)
    .then(response => response.json())
    .then(handleResponse)
    .catch(handleError);
};

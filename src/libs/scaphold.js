import get from 'lodash/get';
import config from '../config/config.js';

export function login(profile) {
  const identity = get(profile, 'identities[0]');
  const token = localStorage.getItem('token');
  const data = {
    query: 'mutation Login($data:_LoginUserWithAuth0LockInput!) { loginUserWithAuth0Lock(input: $data) { id_token user { id username credentials } } } ',
    variables: JSON.stringify({ data: { identity, token }})
  };

  return new Promise((resolve, reject) => {
    if (!identity) reject('Cannot retrieve user identity');
    if (!token) reject('Cannot retrieve user token');

    const options = {
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      method: 'post'
    };

    fetch(config.scaphold.url, options)
      .then(response => { return response.json(); })
      .then(result => {
        console.log('success', result);
      })
      .catch(console.error);
  });
}

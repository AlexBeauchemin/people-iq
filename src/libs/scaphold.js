import get from 'lodash/get';
import config from '../config/config.js';

let userProfile = null;

function getAuth(identity, token) {
  const data = {
    query: 'mutation Login($data:_LoginUserWithAuth0LockInput!) { loginUserWithAuth0Lock(input: $data) { id_token user { id username credentials } } }',
    variables: JSON.stringify({
      data: { identity, token }
    })
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
      .then(resolve)
      .catch(reject);
  });
}

function getUser(identity) {
  const id = get(identity, 'data.loginUserWithAuth0Lock.user.id');
  const data = {
    query: `{
      getUser(id: "${id}") {
        id,
        username,
        roles {
          role,
          isAdmin
        }
      }
    }`
  };

  return new Promise((resolve, reject) => {
    if (!identity || !id) reject('Cannot retrieve user identity');

    const options = {
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      method: 'post'
    };

    fetch(config.scaphold.url, options)
      .then(response => { return response.json(); })
      .then(resolve)
      .catch(reject);
  });
}

function createProfile(user) {
  const userId = get(user, 'data.getUser.id');
  const { email, picture, nickname } = userProfile;
  let name = userProfile.name;

  if (name === email) name = nickname;

  const data = {
    query: 'mutation CreateProfile($profile:_CreateProfileInput!) { createProfile(input: $profile) { changedProfile { name, location, picture, title, userId, user { id, username } } } }',
    variables: JSON.stringify({
      profile: {
        name,
        location: 'Montreal',
        picture,
        userId
      }
    })
  };

  return new Promise((resolve, reject) => {
    if (!userId) reject('Cannot retrieve user');

    const options = {
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      method: 'post'
    };

    fetch(config.scaphold.url, options)
      .then(response => { return response.json(); })
      .then(resolve)
      .catch(reject);
  });
}

export function login(profile) {
  const identity = get(profile, 'identities[0]');
  const token = localStorage.getItem('token');

  userProfile = profile;
  
  getAuth(identity, token)
    .then(getUser)
    .then(createProfile)
    .catch(console.error);
}

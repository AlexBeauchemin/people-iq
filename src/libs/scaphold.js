import get from 'lodash/get';
import map from 'lodash/map';
import config from '../config/config.js';

let authProfile = null;

function cleanUpProfilesObject(profiles) {
  const results = get(profiles, 'data.viewer.allProfiles.edges') || [];
  return map(results, result => result.node);
}

function cleanUpUserObject(user) {
  const data = get(user, 'data.loginUserWithAuth0Lock') || {};
  return {
    raw: user,
    token: data.id_token,
    id: get(data, 'user.id'),
    username: get(data, 'user.username')
  };
}

function storeToken(identity) {
  const token = get(identity, 'data.loginUserWithAuth0Lock.id_token');
  localStorage.setItem('token', token);
  return identity;
}

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
      .then(storeToken)
      .then(cleanUpUserObject)
      .then(resolve)
      .catch(reject);
  });
}

export function createProfile(userId) {
  const { email, picture, name, nickname } = authProfile;
  const profile = {
    email,
    location: 'Montreal',
    name,
    picture,
    userId
  };

  if (name === email) profile.name = nickname;

  const data = {
    query: 'mutation CreateProfile($profile:_CreateProfileInput!) { createProfile(input: $profile) { changedProfile { email, location, name, picture, title, userId, user { id, username } } } }',
    variables: JSON.stringify({ profile })
  };

  return new Promise((resolve, reject) => {
    if (!userId) reject('Cannot retrieve user');

    const options = {
      body: JSON.stringify(data),
      headers: new Headers({
        Authorization: `Bearer ${localStorage.getItem('token')}`,
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

export function getProfiles() {
  const data = {
    query: `
      {
        viewer {
          allProfiles {
            edges {
              node {
                id
                name,
                title,
                phone,
                mobile,
                email,
                picture,
                description,
                location,
                user {
                  id,
                  username,
                  roles {
                    role,
                    isAdmin
                  }
                }
              }
            }
          }
        }
      }
    `
  };

  return new Promise((resolve, reject) => {
    const options = {
      body: JSON.stringify(data),
      headers: new Headers({
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }),
      method: 'post'
    };

    fetch(config.scaphold.url, options)
      .then(response => { return response.json(); })
      .then(cleanUpProfilesObject)
      .then(resolve)
      .catch(reject);
  });
}

export function login(profile) {
  const identity = get(profile, 'identities[0]');
  const token = localStorage.getItem('token');

  authProfile = profile;

  return getAuth(identity, token);
}

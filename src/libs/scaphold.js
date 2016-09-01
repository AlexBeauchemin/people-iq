import get from 'lodash/get';
import config from '../config/config.js';

let userProfile = null;
let userId = '';

function storeToken(identity) {
  const token = get(identity, 'data.loginUserWithAuth0Lock.id_token');
  localStorage.setItem('token', token);
  return identity;
}

function storeProfile(profile) {
  sessionStorage.setItem('profile', profile);
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
      .then(resolve)
      .catch(reject);
  });
}

function getProfile(identity) {
  const id = get(identity, 'data.loginUserWithAuth0Lock.user.id');
  const data = {
    query: `{
      getUser(id: "${id}") {
        id,
        profile {        
          id,
          name,
          email,
          picture,
          userId
        }
      }
    }`
  };

  userId = id;

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

function createProfile(profileObject) {
  const profile = get(profileObject.data.getProfile);
  const { email, picture, nickname } = userProfile;
  const newProfile = {
    email,
    location: 'Montreal',
    name: userProfile.name,
    picture,
    userId
  };

  if (profile) return storeProfile(profile);
  if (newProfile.name === email) newProfile.name = nickname;

  storeProfile(newProfile);

  const data = {
    query: 'mutation CreateProfile($profile:_CreateProfileInput!) { createProfile(input: $profile) { changedProfile { email, location, name, picture, title, userId, user { id, username } } } }',
    variables: JSON.stringify({
      profile: newProfile
    })
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

export function login(profile) {
  const identity = get(profile, 'identities[0]');
  const token = localStorage.getItem('token');

  userProfile = profile;
  
  getAuth(identity, token)
    .then(getProfile)
    .then(createProfile)
    .catch(console.error);
}

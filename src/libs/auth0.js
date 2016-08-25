import Auth0Lock from 'auth0-lock';
import Auth0 from 'auth0-js';
import config from '../config/config.js';

const { clientID, domain } = config.auth0;
const options = {
  auth: {
    redirect: false
  }
};
let lock = null;
let auth0 = null;

function getProfile(authResult) {
  console.log('get profile', authResult);
  lock.getProfile(authResult.idToken, (error, profile) => {
    if (error) return;

    localStorage.setItem('idToken', authResult.idToken);
    localStorage.setItem('profile', JSON.stringify(profile));
  });
}

export function initLock() {
  lock = new Auth0Lock(clientID, domain, options);
  lock.on('authenticated', getProfile);
}

export function showLock() {
  if (lock) lock.show();
  else {
    initLock();
    lock.show();
  }
}

export function init() {
  auth0 = new Auth0({
    domain,
    clientID,
    callbackURL: 'http://localhost:3000',
    responseType: 'token'
  });
}

export function requestMagicLink() {
  auth0.requestMagicLink({
    email: 'alexbeauchemin01@gmail.com'
  }, (err) => {
    if (err) console.log('err', err);
    else console.log('success');
    // the request was successful and you should receive
    // an email with the link at the specified address
  });
}

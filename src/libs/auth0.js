// import Auth0LockPasswordless from 'auth0-lock-passwordless';
import Auth0 from 'auth0-js';
import config from '../config/config.js';

const { clientID, domain } = config.auth0;
let lock = null;
let auth0 = null;

export function initLock() {
  lock = new Auth0LockPasswordless(clientID, domain);
}

export function showLock() {
  if (lock) lock.magiclink();
  else {
    initLock();
    lock.magiclink();
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

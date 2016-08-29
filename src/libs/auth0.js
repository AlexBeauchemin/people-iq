// import Auth0LockPasswordless from 'auth0-lock-passwordless';
import config from '../config/config.js';

const { clientID, domain } = config.auth0;
let lock = null;

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

export function getUserProfile() {
  if (!lock) return;

  const hash = lock.parseHash(window.location.hash);
  const idToken = localStorage.getItem('token');

  return new Promise((resolve, reject) => {
    function getProfile(token) {
      lock.getProfile(token, (err, profile) => {
        if (err) return reject(err);
        resolve(profile);
      });
    }

    if (hash && hash.error) return reject(hash.error_description, hash.error);
    if (hash && hash.id_token) {
      localStorage.setItem('token', hash.id_token);
      getProfile(hash.id_token);
    }
    if (idToken) return getProfile(idToken);
    reject('cannot retrieve user token');
  });
}

// export function init() {
//   auth0 = new Auth0({
//     domain,
//     clientID,
//     callbackURL: 'http://localhost:3000',
//     responseType: 'token'
//   });
// }

// export function requestMagicLink() {
//   auth0.requestMagicLink({
//     email: 'alexbeauchemin01@gmail.com'
//   }, (err) => {
//     if (err) console.log('err', err);
//     else console.log('success');
//     // the request was successful and you should receive
//     // an email with the link at the specified address
//   });
// }

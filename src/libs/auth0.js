import Auth0Lock from 'auth0-lock';
import config from '../config/config.js';

const { clientID, domain } = config.auth0;
const options = {
  auth: {
    redirect: false
  }
};
let lock = null;

function getProfile(authResult) {
  lock.getProfile(authResult.idToken, (error, profile) => {
    if (error) return;

    localStorage.setItem('idToken', authResult.idToken);
    localStorage.setItem('profile', JSON.stringify(profile));
  });
}

export default function init() {
  lock = new Auth0Lock(clientID, domain, options);
  lock.on('authenticated', getProfile);
  lock.show();
}

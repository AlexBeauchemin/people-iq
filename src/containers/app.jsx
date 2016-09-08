import React, { Component } from 'react';
import find from 'lodash/find';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { blueA400, blueA700, lightGreenA400, lightGreenA700 } from 'material-ui/styles/colors';
import { getUserProfile, initLock, showLock } from '../libs/auth0.js';
import { createProfile, getProfiles, login } from '../libs/scaphold.js';
import Header from '../components/layout/header.jsx';
import ProgressBar from '../components/shared/progress-bar.jsx';
import CardsList from '../components/cards-list.jsx';

let userId = null;
const userAgent = typeof navigator === 'undefined' ? 'all' : navigator.userAgent;
const muiTheme = getMuiTheme(
  {
    palette: {
      primary1Color: blueA400,
      primary2Color: blueA700,
      // primary3Color: grey400,
      accent1Color: lightGreenA700,
      accent2Color: lightGreenA400,
      // accent3Color: grey500,
      pickerHeaderColor: blueA400
    }
  },
  { userAgent }
);

class App extends Component {
  state = {
    user: null,
    profiles: null,
    userProfile: null
  };

  componentWillMount() {
    initLock();
    getUserProfile()
      .then(login)
      .then(this.setUser)
      .then(getProfiles)
      .then(this.createProfile)
      .then(this.setProfiles)
      .catch((msg, error) => {
        if (msg || error) console.error(msg, error);
        showLock();
      });
  }

  setProfiles = (profiles) => {
    this.setState({ profiles });
  };

  setUser = (user) => {
    userId = user.id;
    this.setState({ user });
  };

  setUserProfile = (userProfile, profiles) => {
    this.setState({ userProfile });
    return profiles;
  };

  createProfile = (profiles) => {
    const userProfile = find(profiles, p => p.user.id === userId);

    if (userProfile) return this.setUserProfile(userProfile, profiles);

    return createProfile(userId)
      .then(profile => this.setUserProfile(profile, profiles));
  };

  render() {
    const { user, profiles, userProfile } = this.state;

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <ProgressBar isLoading={!profiles} />
          <Header user={user} profile={userProfile} />
          <main className="container">
            <CardsList profiles={profiles} userProfile={userProfile} />
          </main>
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {};

export default App;

import React, { Component } from 'react';
import find from 'lodash/find';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { getUserProfile, initLock, showLock } from '../libs/auth0.js';
import { createProfile, getProfiles, login } from '../libs/scaphold.js';
import Header from '../components/layout/header.jsx';
import ProgressBar from '../components/shared/progress-bar.jsx';
import CardsList from '../components/cards-list.jsx';
import EditProfile from '../components/edit-profile.jsx';

let userId = null;
const userAgent = typeof navigator === 'undefined' ? 'all' : navigator.userAgent;
const muiTheme = getMuiTheme(
  {
    palette: {
      primary1Color: '#07b4c8',
      primary2Color: '#78c7d1',
      accent1Color: '#361e5c',
    }
  },
  { userAgent }
);

class App extends Component {
  state = {
    user: null,
    profiles: null,
    view: 'list', // list or edit
    userProfile: null
  };

  componentWillMount() {
    initLock();
    getUserProfile()
      .then(login)
      .then(this.setUser)
      .then(getProfiles)
      .then(this.createUserProfile)
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

  changeView = (view) => {
    this.setState({ view });
  };

  createUserProfile = (profiles) => {
    const userProfile = find(profiles, p => p.user.id === userId);

    if (userProfile) return this.setUserProfile(userProfile, profiles);

    return createProfile(userId)
      .then(profile => this.setUserProfile(profile, profiles));
  };

  saveProfile = (profile) => {
    console.log('save', profile);
  };

  toggleView = () => {
    if (this.state.view === 'list') this.setState({ view: 'edit' });
    else this.setState({ view: 'list' });
  };

  render() {
    const { user, profiles, userProfile, view } = this.state;
    let content = <CardsList profiles={profiles} />;

    if (view === 'edit') {
      content = <EditProfile profile={userProfile} save={this.saveProfile} cancel={this.toggleView} />;
    }

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <ProgressBar isLoading={!profiles} />
          <Header changeView={this.changeView} user={user} profile={userProfile} />
          <main className="container">
            {content}
          </main>
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {};

export default App;

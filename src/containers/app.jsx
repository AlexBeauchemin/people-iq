import React, { Component } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { blueA400, blueA700, lightGreenA400, lightGreenA700 } from 'material-ui/styles/colors';
import { getUserProfile, initLock, showLock } from '../libs/auth0.js';
import { login } from '../libs/scaphold.js';
import Header from '../components/layout/header.jsx';

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
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      profile: null
    };
  }

  componentWillMount() {
    initLock();
    getUserProfile()
      .then(login)
      .then(user => this.setState({ user }))
      .catch((msg, error) => {
        console.error(msg, error);
        showLock();
      });
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Header user={this.state.user} profile={this.state.profile} />
        <main>
          <p>Hello</p>
        </main>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {};

export default App;

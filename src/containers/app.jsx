import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { blueA400, blueA700, lightGreenA400, lightGreenA700 } from 'material-ui/styles/colors';
import { getUserProfile, initLock, showLock } from '../libs/auth0.js';
import { login } from '../libs/scaphold.js';

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

initLock();
getUserProfile()
  .then(login)
  .catch(console.error);

const App = ({ children }) => {
  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <div className="wrapper sticky-footer">
        {children}
        <p><a href="#" onClick={showLock}>Login with lock</a></p>
      </div>
    </MuiThemeProvider>
  );
};

App.propTypes = {
  children: React.PropTypes.element
};

export default App;

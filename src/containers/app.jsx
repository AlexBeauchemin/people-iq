import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { blueA400, blueA700, lightGreenA400, lightGreenA700 } from 'material-ui/styles/colors';
import { init, initLock, requestMagicLink } from '../libs/auth0.js';

const userAgent = typeof navigator === 'undefined' ? 'all' : navigator.userAgent;

// This replaces the textColor value on the palette
// and then update the keys for each component that depends on it.
// More on Colors: http://www.material-ui.com/#/customization/colors
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

init();

const App = ({ children }) => {
  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <div className="wrapper sticky-footer">
        {children}
        <p><a href="#" onClick={requestMagicLink}>Login</a></p>
        <p><a href="#" onClick={initLock}>Login with lock</a></p>
      </div>
    </MuiThemeProvider>
  );
};

App.propTypes = {
  children: React.PropTypes.element
};

export default App;

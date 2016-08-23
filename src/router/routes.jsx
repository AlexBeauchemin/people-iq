import React from 'react';
import { IndexRoute, Router, Route, browserHistory } from 'react-router';

import App from '../containers/app.jsx';
import PageHome from '../containers/page-home.jsx';
import Page404 from '../containers/page-404.jsx';

export default () => {
  return (
    <Router history={browserHistory}>
      <Route name="home" path="/" component={App}>
        <IndexRoute name="home" component={PageHome} />
        <Route name="404" path="*" component={Page404} />
      </Route>
    </Router>
  );
};

import React, { useEffect } from 'react';

import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  useHistory,
  Switch,
} from 'react-router-dom';
import { Security, LoginCallback, SecureRoute } from '@okta/okta-react';

import PrivateRoute from './utils/auth/PrivateRoute';
import 'dotenv';
import 'antd/dist/antd.less';

import { NotFoundPage } from './components/pages/NotFound';

import { LoginPage } from './components/pages/Login';
import { HomePage } from './components/pages/Home';
import { LandingPage } from './components/pages/Landing';
import { config } from './utils/oktaConfig';
import { LoadingComponent } from './components/common';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import FamilyProfile from './components/pages/FamilyProfile';
import IntakePacket from './components/pages/IntakePacket';
import Analytics from './components/pages/Analytics';
import Guests from './components/pages/Guests/Guests';
import FamilyMembers from './components/pages/FamilyMembers/Family';
import Logout from './utils/logout';
import './styles/app.scss';
import { rootReducer } from './state/reducers/index';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import GuestDashboard from './components/pages/guest-pages/GuestDashboard';
import FamilyPage from './components/pages/guest-pages/FamilyPage';
import Notes from './components/pages/Notes/Notes';
import Members from './components/pages/guest-pages/Members';
import UserProfile from './components/UserProfile';

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Router>
  </Provider>,
  document.getElementById('root')
);

function App() {
  // The reason to declare App this way is so that we can use any helper functions we'd need for business logic, in our case auth.
  // React Router has a nifty useHistory hook we can use at this level to ensure we have security around our routes.
  const history = useHistory();

  const authHandler = () => {
    // We pass this to our <Security /> component that wraps our routes.
    // It'll automatically check if userToken is available and push back to login if not :)
    history.push('/login');
  };

  return (
    <Security {...config} onAuthRequired={authHandler}>
      <Route path="/" component={SideBar} />
      <Route path="/" component={NavBar} />
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/implicit/callback" component={LoginCallback} />
        <Route path="/landing" component={LandingPage} />

        {/* any of the routes you need secured should be registered as SecureRoutes */}

        <PrivateRoute
          exact
          path="/family/:id"
          roles={['executive_director', 'supervisor', 'case_manager']}
          component={FamilyMembers}
        />
        <PrivateRoute
          exact
          path="/members"
          roles={['guest']}
          component={Members}
        />
        <Route
          path="/families/:family_id/notes/"
          // roles={['executive_director', 'supervisor', 'case_manager', 'guest']}
          component={Notes}
        />
        <PrivateRoute
          path="/analytics"
          roles={['executive_director', 'supervisor', 'case_manager', 'guest']}
          component={Analytics}
        />
        <PrivateRoute
          path="/intake"
          roles={['executive_director', 'supervisor', 'case_manager']}
          component={IntakePacket}
        />
        <PrivateRoute
          path="/guests"
          roles={['executive_director', 'supervisor', 'case_manager']}
          component={Guests}
        />
        <PrivateRoute
          path="/guest-dashboard"
          roles={['guest']}
          component={GuestDashboard}
        />
        <PrivateRoute
          path="/familyprofile/:familyId"
          roles={['executive_director', 'supervisor', 'case_manager', 'guest']}
          component={FamilyProfile}
        />

        <PrivateRoute path="/family" roles={['guest']} component={FamilyPage} />

        <SecureRoute
          path="/"
          exact
          component={() => <HomePage LoadingComponent={LoadingComponent} />}
        />
        <Route component={NotFoundPage} />
      </Switch>
    </Security>
  );
}

// if the react environment is in production, it will remove all warnings, errors, and messages from the console.
if (process.env.NODE_ENV !== 'development') {
  const noop = () => {};
  [
    'assert',
    'clear',
    'count',
    'debug',
    'dir',
    'dirxml',
    'error',
    'exception',
    'group',
    'groupCollapsed',
    'groupEnd',
    'info',
    'log',
    'markTimeline',
    'profile',
    'profileEnd',
    'table',
    'time',
    'timeEnd',
    'timeline',
    'timelineEnd',
    'timeStamp',
    'trace',
    'warn',
  ].forEach(method => {
    window.console[method] = noop;
  });
}

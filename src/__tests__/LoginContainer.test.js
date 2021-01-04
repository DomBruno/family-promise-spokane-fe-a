import React from 'react';
import { useHistory } from 'react-router-dom';
import { render } from '@testing-library/react';
import { SecureRoute, Security } from '@okta/okta-react';
import { config } from '../utils/oktaConfig';
import { BrowserRouter as Router } from 'react-router-dom';
import { rootReducer } from '../state/reducers/index';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import LoginContainer from '../components/pages/Login/LoginContainer';

const store = createStore(rootReducer, applyMiddleware(thunk));

describe('<LoginContainer /> test suite', () => {
  test('signin widget mounts successfully', async () => {
    const { container } = render(
      <Security {...config} onAuthRequired={() => useHistory().push('/login')}>
        <Provider store={store}>
          <Router>
            <LoginContainer />
          </Router>
        </Provider>
      </Security>
    );
    expect(container.querySelector('#sign-in-widget')).toBeTruthy();
  });
});

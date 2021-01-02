import React from 'react';
import { useHistory } from 'react-router-dom';
import { render } from '@testing-library/react';
import { SecureRoute, Security } from '@okta/okta-react';
import { config } from '../utils/oktaConfig';

import LoginContainer from '../components/pages/Login/LoginContainer';

describe('<LoginContainer /> test suite', () => {
  let history = useHistory();

  const authHandler = () => {
    // We pass this to our <Security /> component that wraps our routes.
    // It'll automatically check if userToken is available and push back to login if not :)
    history.push('/login');
  };
  test('signin widget mounts successfully', () => {
    const { container } = render(
      <Security {...config} onAuthRequired={authHandler}>
        <LoginContainer />
      </Security>
    );
    expect(container.querySelector('#sign-in-widget')).toBeTruthy();
  });
});

import React from 'react';
import { useHistory } from 'react-router-dom';
import { render } from '@testing-library/react';
import { SecureRoute, Security } from '@okta/okta-react';
import { config } from '../utils/oktaConfig';

import LoginContainer from '../components/pages/Login/LoginContainer';

describe('<LoginContainer /> test suite', () => {
  test('signin widget mounts successfully', () => {
    const { container } = render(
      <Security {...config} onAuthRequired={() => useHistory().push('/login')}>
        <LoginContainer />
      </Security>
    );
    expect(container.querySelector('#sign-in-widget')).toBeTruthy();
  });
});

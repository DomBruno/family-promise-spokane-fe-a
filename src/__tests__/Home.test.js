import React from 'react';
import { render, cleanup, wait, waitFor } from '@testing-library/react';
import { HomePage } from '../components/pages/Home';
import { LoadingComponent } from '../components/common';
import { BrowserRouter as Router } from 'react-router-dom';
import { rootReducer } from '../state/reducers/index';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

const store = createStore(rootReducer, applyMiddleware(thunk));

// afterEach(cleanup);

// jest.mock('@okta/okta-react', () => ({
//   useOktaAuth: () => {
//     return {
//       authState: {
//         isAuthenticated: true,
//       },
//       authService: {
//         getUser: () => Promise.resolve({ name: 'sara' }),
//       },
//     };
//   },
// }));

describe('<HomeContainer /> testing suite', () => {
  test('mounts a page', async () => {
    const { findByText, getByTestId, queryByText } = render(
      <Provider store={store}>
        <Router>
          <HomePage
            LoadingComponent={() => (
              <LoadingComponent message="...fetching profile" />
            )}
          />
        </Router>
      </Provider>
    );
    let loader = getByTestId('loading');
    expect(loader).toBeInTheDocument();

    // await waitFor(async () => {
    //   await findByText(/hi sara/i);
    // });
    // loader = queryByText(/...fetching profile/i);
    // expect(loader).toBeNull();
  });
});

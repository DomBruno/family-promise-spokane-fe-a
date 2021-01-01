import RenderHomePage from '../components/pages/Home/RenderHomePage';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rootReducer } from '../state/reducers/index';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

const store = createStore(rootReducer, applyMiddleware(thunk));

describe('<RenderHomePage /> test suite', () => {
  test('it handles a loading state', () => {
    const authService = {
      logout: jest.fn(),
    };
    const { getByTestId } = render(
      <Provider store={store}>
        <Router>
          <RenderHomePage
            userInfo={{ name: 'Sara' }}
            authService={authService}
          />
        </Router>{' '}
      </Provider>
    );
    const loading = getByTestId('waiting');
    expect(loading).toBeInTheDocument();
    // userEvent.click(button);
    // expect(authService.logout).toHaveBeenCalledTimes(1);
    // expect(getByText(/hi sara welcome to labs basic spa/i).innerHTML).toBe(
    //   'Hi Sara Welcome to Labs Basic SPA'
    // );
  });
});

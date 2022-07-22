import React from 'react';
import { render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { LoginScreen } from '../../../src/pages';
import { Store } from '../../../src/redux';

describe('LoginScreen', () => {
  it('should render LoginScreen', () => {
    const tree = render(
      <Provider store={Store}>
        <LoginScreen />
      </Provider>,
    );
    expect(tree).toMatchSnapshot();
  });
});

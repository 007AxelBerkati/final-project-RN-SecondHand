import React from 'react';
import { render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { RegisterScreen } from '../../../src/pages';
import { Store } from '../../../src/redux';

describe('Register Screen', () => {
  it('should render Register Screen', () => {
    const tree = render(
      <Provider store={Store}>
        <RegisterScreen />
      </Provider>,
    );
    expect(tree).toMatchSnapshot();
  });
});

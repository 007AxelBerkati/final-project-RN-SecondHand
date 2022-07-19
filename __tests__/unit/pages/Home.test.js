import { render } from '@testing-library/react-native';
import React from 'react';
import { Provider } from 'react-redux';
import { HomeScreen } from '../../../src/pages';
import { Store } from '../../../src/redux';

describe('HomeScreen', () => {
  it('should render HomeScreen', () => {
    const tree = render(
      <Provider store={Store}>
        <HomeScreen />
      </Provider>,
    );
    expect(tree).toMatchSnapshot();
  });
});

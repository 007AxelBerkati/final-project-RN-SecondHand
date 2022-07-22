import { render } from '@testing-library/react-native';
import React from 'react';
import { Provider } from 'react-redux';
import { JualScreen } from '../../../src/pages';
import { Store } from '../../../src/redux';

describe('JualScreen', () => {
  it('should render JualScreen', () => {
    const tree = render(
      <Provider store={Store}>
        <JualScreen />
      </Provider>,
    );
    expect(tree).toMatchSnapshot();
  });
});

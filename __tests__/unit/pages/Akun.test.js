import { render } from '@testing-library/react-native';
import React from 'react';
import { Provider } from 'react-redux';
import { AkunScreen } from '../../../src/pages';
import { Store } from '../../../src/redux';

describe('AkunScreen', () => {
  it('should render AkunScreen', () => {
    const tree = render(
      <Provider store={Store}>
        <AkunScreen />
      </Provider>,
    );
    expect(tree).toMatchSnapshot();
  });
});

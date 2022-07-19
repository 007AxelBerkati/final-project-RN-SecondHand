import { render } from '@testing-library/react-native';
import React from 'react';
import { Provider } from 'react-redux';
import { DaftarJualScreen } from '../../../src/pages';
import { Store } from '../../../src/redux';

describe('DaftarJual', () => {
  it('should render DaftarJual', () => {
    const tree = render(
      <Provider store={Store}>
        <DaftarJualScreen />
      </Provider>,
    );
    expect(tree).toMatchSnapshot();
  });
});

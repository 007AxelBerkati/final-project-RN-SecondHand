import { render } from '@testing-library/react-native';
import React from 'react';
import { Provider } from 'react-redux';
import { DaftarSimpanScreen } from '../../../src/pages';
import { Store } from '../../../src/redux';

describe('DaftarSimpanScreen', () => {
  it('should render DaftarSimpanScreen', () => {
    const tree = render(
      <Provider store={Store}>
        <DaftarSimpanScreen />
      </Provider>,
    );
    expect(tree).toMatchSnapshot();
  });
});

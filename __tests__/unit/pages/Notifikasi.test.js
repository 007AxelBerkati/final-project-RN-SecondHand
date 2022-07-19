import { render } from '@testing-library/react-native';
import React from 'react';
import { Provider } from 'react-redux';
import { NotifikasiScreen } from '../../../src/pages';
import { Store } from '../../../src/redux';

describe('NotificationScreen', () => {
  it('should render NotificationScreen', () => {
    const tree = render(
      <Provider store={Store}>
        <NotifikasiScreen />
      </Provider>,
    );
    expect(tree).toMatchSnapshot();
  });
});

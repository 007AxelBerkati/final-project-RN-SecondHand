import { render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { Provider } from 'react-redux';
import { HomeScreen } from '../../src/pages';
import { getBannerSeller, getProduct, Store } from '../../src/redux';

describe('Home', () => {
  const mockOnPress = jest.fn();

  it('data Product should be rendered', async () => {
    await Store.dispatch(getProduct({
      search: '',
      category_id: '',
      status: '',
      page: 1,
      per_page: 2,
    }));

    render(
      <Provider store={Store}>
        <HomeScreen navigation={mockOnPress} />
      </Provider>,
    );

    const homeState = Store.getState();
    const { data } = homeState.dataHome;

    waitFor(() => expect(data).toHaveLength(2));
  });

  it('data Banner should be rendered', async () => {
    await Store.dispatch(getBannerSeller());

    render(
      <Provider store={Store}>
        <HomeScreen navigation={mockOnPress} />
      </Provider>,
    );

    const homeState = Store.getState();
    const { banner } = homeState.dataHome;

    waitFor(() => expect(banner).toHaveLength(2));
  });
});

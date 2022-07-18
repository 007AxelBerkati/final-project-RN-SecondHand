// import {
//   cleanup, render, screen, waitFor,
// } from '@testing-library/react-native';
// import React from 'react';
// import { Provider } from 'react-redux';
// import { HomeScreen } from '../../src/pages';
// import { configureStore } from '../../src/utils';

// describe('Home', () => {
//   const mockOnPress = jest.fn();

//   afterEach(cleanup);

//   it('data Product should be rendered', async () => {
//     const initialState = {
//       dataHome: [
//         {
//           Categories: [],
//           base_price: 5000000,
//           createdAt: '2022-06-21T05:01:47.064Z',
//           description: '',
//           id: 185,
//           image_name: 'PR-1655787955543-album.jpg',
//           image_url: 'https://firebasestorage.googleapis.com/v0/b/market-final-project.appspot.com/o/products%2FPR-1655787955543-album.jpg?alt=media',
//           location: '',
//           name: '',
//           status: 'available',
//           updatedAt: '2022-06-21T05:05:55.547Z',
//           user_id: 60,
//         },
//       ],
//     };
//     const store = configureStore(initialState);
//     render(
//       <Provider store={store}>
//         <HomeScreen navigation={mockOnPress} />
//       </Provider>,
//     );

//     const productElems = screen.getAllByText('available');
//     waitFor(() => expect(productElems.length).toEqual(1));
//   });
// });

/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import LoginScreen from '../src/pages/LoginScreen';

it('cek validasi input', () => {
  const { getByTestId } = render(<LoginScreen />);

  fireEvent.press(getByTestId('Login-Button'));
});

// show invalid input email

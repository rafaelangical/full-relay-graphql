import React from 'react';
import {render} from 'react-native-testing-library';
import SignIn from '../UserCreate';

test('should verify have signup button', () => {
  const {queryAllByText} = render(<SignIn />);
  const button = queryAllByText('Signup');

  expect(button).toHaveLength(1);
});
test('should verify have login button', () => {
  const {queryAllByText} = render(<SignIn />);
  const button = queryAllByText('Login');

  expect(button).toHaveLength(1);
});

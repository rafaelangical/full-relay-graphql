// import React from 'react';
// import Login from '../Login';
// import { waitForElement } from 'react-native-testing-library';
// import { debug } from 'react-native-testing-library';

// import { queryMock } from '../../../../test/testUtils';
// import { GRAPHQL_URL } from '../../../relay/fetchQuery';
// queryMock.setup(GRAPHQL_URL);

// it('render Feed', () => {
// 	console.log('feed');
// });

// debug(<Login />);
// debug.shallow(<Login />); // an alias for `debug`
import React from 'react';
import {render} from 'react-native-testing-library';
import Login from '../Login';

test('should verify have signup button', () => {
  const {queryAllByText} = render(<Login />);
  const button = queryAllByText('Signup');

  expect(button).toHaveLength(1);
});
test('should verify have login button', () => {
  const {queryAllByText} = render(<Login />);
  const button = queryAllByText('Login');

  expect(button).toHaveLength(1);
});

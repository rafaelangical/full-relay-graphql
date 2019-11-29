import React from 'react';
import Dashboard from '../Dashboard';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
	const tree = renderer.create(<Dashboard />).toJSON();
	expect(tree).toMatchSnapshot();
});

import relayTestingUtils from 'relay-testing-utils';
import { mount } from 'enzyme';
import TaskList from '../pages/TaskList/TaskList';

const query = {
	tasks: {
		edges: [
			{
				id: 'slslsçsç',
				_id: 'slslsçsç',
				name: 'sllslslsls',
				description: 'sssddd'
			},
			{
				id: 'slslsçsç',
				_id: 'slslsçsç',
				name: 'sllslslsls',
				description: 'sssddd'
			},
			{
				id: 'slslsçsç',
				_id: 'slslsçsç',
				name: 'sllslslsls',
				description: 'sssddd'
			},
			{
				id: 'slslsçsç',
				_id: 'slslsçsç',
				name: 'sllslslsls',
				description: 'sssddd'
			}
		]
	}
};
// relay graph
const fixtures = {
	benutzer: {
		id: '007',
		prename: 'James',
		surname: 'Bond'
	}
};

test('Relay testing wrap', () => {
	const wrapper = mount(relayTestingUtils.relayWrap(<Example query={query} />));
});

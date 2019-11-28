// import React from 'react';
// import { render, cleanup } from '@testing-library/react';
// import { MockPayloadGenerator } from 'relay-test-utils';
// import TaskListDefault from '../pages/TaskList/TaskList';
// import Environment from '../relay/Environment';

// afterEach(cleanup);

// describe('<TaskList />', () => {
// 	it('should reject query', () => {
// 		const { getByText } = render(<TaskListDefault />);
// 		// @ts-ignore
// 		Environment.mock.rejectMostRecentOperation(new Error('A very bad error'));
// 		expect(getByText('Error: A very bad error')).toBeTruthy();
// 	});

// 	it('should reject query with function and render error with name of the operation', () => {
// 		const { getByText } = render(<TaskListDefault />);
// 		// @ts-ignore
// 		Environment.mock.rejectMostRecentOperation(
// 			(operation) => new Error(`A error occurred on operation: ${operation.fragment.node.name}`)
// 		);

// 		expect(getByText('Error: A error occurred on operation: UserListQuery')).toBeTruthy();
// 	});

// 	it('should resolve query but no data', async () => {
// 		const { getByText } = render(<TaskListDefault />);
// 		expect(getByText('loading')).toBeTruthy();

// 		// @ts-ignore
// 		Environment.mock.resolveMostRecentOperation((operation) => MockPayloadGenerator.generate(operation));

// 		expect(getByText(/Hello, /)).toBeTruthy();
// 		// expect(getByText(/User: /)).toBeTruthy();
// 		// expect(getByText(/Email: /)).toBeTruthy();
// 	});

// 	it('should render success UserList', async () => {
// 		const { getByText, debug } = render(<TaskListDefault />);

// 		// debug()
// 		// @ts-ignore
// 		Environment.mock.resolveMostRecentOperation((operation) =>
// 			MockPayloadGenerator.generate(operation, {
// 				PageInfo() {
// 					return {
// 						hasNextPage: false,
// 						hasPreviousPage: false,
// 						startCursor: 'YXJyYXljb25uZWN0aW9uOjA=',
// 						endCursor: 'YXJyYXljb25uZWN0aW9uOjE='
// 					};
// 				},
// 				UserEdge() {
// 					return [
// 						{
// 							cursor: 'YXJyYXljb25uZWN0aW9uOjA=',
// 							node: {
// 								name: 'name example 1',
// 								description: 'description example 1'
// 							}
// 						},
// 						{
// 							cursor: 'YXJyYXljb25uZWN0aW9uOjE=',
// 							node: {
// 								name: 'name example 2',
// 								description: 'description example 1'
// 							}
// 						}
// 					];
// 				}
// 			})
// 		);

// 		// debug()

// 		expect(getByText('ID: Q2xpZW50OjE=')).toBeTruthy();
// 		expect(getByText('User: Adhis Yudha')).toBeTruthy();
// 		expect(getByText('Email: example.example@gmail.com')).toBeTruthy();

// 		expect(getByText('ID: Q2xpZW50OjI=')).toBeTruthy();
// 		expect(getByText('Email: test.test@gmail.com')).toBeTruthy();
// 		expect(getByText('User: Bangkit Ilham')).toBeTruthy();
// 	});
// });

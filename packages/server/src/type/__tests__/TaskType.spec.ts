import { graphql } from 'graphql';
import { toGlobalId } from 'graphql-relay';

import { schema } from '../../schema';
import {
	getContext,
	connectMongoose,
	clearDbAndRestartCounters,
	disconnectMongoose,
	createRows
} from '../../../test/helper';

beforeAll(connectMongoose);
beforeEach(clearDbAndRestartCounters);

afterAll(disconnectMongoose);

it('should return a task detail by global id', async () => {
	const task = await createRows.createTask();

	const query = `
    query Q($id: ID!) {
      task(id: $id) {
        id
        name
        description
      }
    }
  `;

	const rootValue = {};
	const context = getContext({ task });
	const variables = {
		id: toGlobalId('Task', task.id)
	};

	const result = await graphql(schema, query, rootValue, context, variables);
	const { data } = result;

	expect(data.task.name).toBe(task.name);
	expect(data.task.email).toBe(task.email);
});

it('should return a user with id and email null', async () => {
	const task = await createRows.createTask();

	const query = `
    query Q($id: ID!) {
      task(id: $id) {
        id
        name
				description        
      }
    }
  `;

	const rootValue = {};
	// can only see email and active status if user is in context
	const context = getContext();
	const variables = {
		id: toGlobalId('Task', task.id)
	};

	console.log('context');
	console.log(context);
	const result = await graphql(schema, query, rootValue, context, variables);
	const { data } = result;

	expect(data.task.name).toBe(task.name);
	expect(data.task.description).toBe(task.description);
});

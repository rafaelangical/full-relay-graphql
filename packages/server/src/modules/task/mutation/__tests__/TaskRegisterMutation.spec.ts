import { graphql } from 'graphql';

import TaskModel from '../../TaskModel.ts';
import { schema } from '../../../../schema.ts';
import { getContext, connectMongoose, clearDbAndRestartCounters, disconnectMongoose } from '../../../../../test/helper';

beforeAll(connectMongoose);

beforeEach(clearDbAndRestartCounters);

afterAll(disconnectMongoose);

it('should create a new task when parameters are valid', async () => {
  const description = 'test description';

  // language=GraphQL
  const query = `
    mutation M(
      $name: String!
      $description: String!
    ) {
      TaskRegister(input: {
        name: $name
        description: $description
      }) {
        task
        error
      }
    }
  `;

  const rootValue = {};
  const context = getContext();
  const variables = {
    name: 'Test',
    description,
  };

  const result = await graphql(schema, query, rootValue, context, variables);
  expect(result.data.TaskRegister.task).not.toBe(null);
  expect(result.data.TaskRegister.error).toBe(null);

  const task = await TaskModel.findOne({
    description,
  });

  expect(task).not.toBe(null);
});

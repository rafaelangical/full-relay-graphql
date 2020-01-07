import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';

import pubSub, { EVENTS } from '../../../pubSub.ts';

import TaskModel from '../TaskModel.ts';

import * as TaskLoader from '../TaskLoader.ts';
import { TaskConnection } from '../TaskType.ts';

export default mutationWithClientMutationId({
  name: 'TaskRegister',
  inputFields: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    description: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async ({ name, description }) => {
    let task = await TaskModel.findOne({ name: name.toLowerCase() });

    if (task) {
      return {
        error: 'Task já cadastrada',
      };
    }

    task = new TaskModel({
      name,
      description,
    });

    await task.save();

    await pubSub.publish(EVENTS.TASK.ADDED, { TaskAdded: { task } });

    return task;
  },
  outputFields: {
    task: {
      type: TaskConnection.edgeType,
      resolve: async ({ id }, _, context) => {
        const newTask = await TaskLoader.load(context, id);

        // Returns null if no node was loaded
        if (!newTask) {
          return null;
        }

        return {
          cursor: toGlobalId('Task', newTask._id),
          node: newTask,
        };
      },
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error,
    },
  },
});

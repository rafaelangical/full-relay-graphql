import { GraphQLObjectType } from 'graphql';
import { offsetToCursor } from 'graphql-relay';

import { TaskConnection } from '../TaskType.ts';
import pubSub, { EVENTS } from '../../../pubSub.ts';

const TaskAddedPayloadType = new GraphQLObjectType({
  name: 'TaskAddedPayload',
  fields: () => ({
    taskEdge: {
      type: TaskConnection.edgeType,
      resolve: ({ task }) => ({
        cursor: offsetToCursor(task.id),
        node: task,
      }),
    },
  }),
});

const taskAddedSubscription = {
  type: TaskAddedPayloadType,
  subscribe: () => pubSub.asyncIterator(EVENTS.TASK.ADDED),
};

export default taskAddedSubscription;

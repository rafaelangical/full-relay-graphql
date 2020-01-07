import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { globalIdField } from 'graphql-relay';

import { connectionDefinitions } from '../../core/connection/CustomConnectionType.ts';
import { registerType, nodeInterface } from '../../interface/NodeInterface.ts';

const TaskType = registerType(
  new GraphQLObjectType({
    name: 'Task',
    description: 'Task data',
    fields: () => ({
      id: globalIdField('Task'),
      _id: {
        type: GraphQLString,
        resolve: task => task._id,
      },
      name: {
        type: GraphQLString,
        resolve: task => task.name,
      },
      description: {
        type: GraphQLString,
        resolve: task => task.description,
      },
    }),
    interfaces: () => [nodeInterface],
  }),
);

export default TaskType;

export const TaskConnection = connectionDefinitions({
  name: 'Task',
  nodeType: GraphQLNonNull(TaskType),
});

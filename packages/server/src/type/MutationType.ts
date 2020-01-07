import { GraphQLObjectType } from 'graphql';

import UserMutations from '../modules/user/mutation/index.ts';
import TaskMutations from '../modules/task/mutation/index.ts';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...UserMutations,
    ...TaskMutations,
  }),
});

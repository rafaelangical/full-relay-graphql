import { GraphQLObjectType } from 'graphql';

import UserSubscriptions from '../modules/user/subscription/index.ts';
import TaskSubscriptions from '../modules/task/subscription/index.ts';

export default new GraphQLObjectType({
  name: 'Subscription',
  fields: {
    ...UserSubscriptions,
    ...TaskSubscriptions,
  },
});

import { GraphQLSchema } from 'graphql';

import QueryType from './type/QueryType.ts';
import MutationType from './type/MutationType.ts';
import SubscriptionType from './type/SubscriptionType.ts';

export const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
  subscription: SubscriptionType,
});

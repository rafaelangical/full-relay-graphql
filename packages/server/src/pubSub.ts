import { PubSub } from 'graphql-subscriptions';

export const EVENTS = {
  USER: {
    ADDED: 'USER_ADDED',
  },
  TASK: {
    ADDED: 'TASK_ADDED',
  },
};

export default new PubSub();

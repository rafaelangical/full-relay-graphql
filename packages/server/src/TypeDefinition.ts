import Dataloader from 'dataloader';
import { PubSub } from 'graphql-subscriptions';

import { IUser } from './modules/user/UserModel';
import { ITask } from './modules/task/TaskModel';

type Key = string;

export type Dataloaders = {
	UserLoader: Dataloader<Key, IUser>;
	TaskLoader: Dataloader<Key, ITask>;
};

export type GraphQLContext = {
	user?: IUser;
	dataloaders: Dataloaders;
	pubsub: PubSub;
};

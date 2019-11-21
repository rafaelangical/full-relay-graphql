import DataLoader from 'dataloader';
import { connectionFromMongoCursor, mongooseLoader } from '@entria/graphql-mongoose-loader';
import { Types } from 'mongoose';
import { ConnectionArguments } from 'graphql-relay';
import mongoose from 'mongoose';
declare type ObjectId = mongoose.Schema.Types.ObjectId;

import TaskModel, { ITask } from './TaskModel';

import { GraphQLContext } from '../../TypeDefinition';

export default class Task {
	id: string;

	_id: Types.ObjectId;

	name: string;

	description: string | null | undefined;

	constructor(data: ITask) {
		this.id = data._id;
		this._id = data._id;
		this.name = data.name;
		this.description = data.description;

		// contollers to send variables, example::::

		// you can only see your own email, and your active status
		// if (user && user._id.equals(data._id)) {
		// 	this.email = data.email;
		// 	this.active = data.active;
		// }
	}
}

export const getLoader = () => new DataLoader((ids: ReadonlyArray<string>) => mongooseLoader(TaskModel, ids));

const viewerCanSee = () => true;

export const load = async (context: GraphQLContext, id: string | Object | ObjectId): Promise<Task | null> => {
	if (!id && typeof id !== 'string') {
		return null;
	}

	let data;
	try {
		data = await context.dataloaders.TaskLoader.load(id as string);
	} catch (err) {
		return null;
	}
	return viewerCanSee() ? new Task(data, context) : null;
};

export const clearCache = ({ dataloaders }: GraphQLContext, id: Types.ObjectId) =>
	dataloaders.TaskLoader.clear(id.toString());
export const primeCache = ({ dataloaders }: GraphQLContext, id: Types.ObjectId, data: ITask) =>
	dataloaders.TaskLoader.prime(id.toString(), data);
export const clearAndPrimeCache = (context: GraphQLContext, id: Types.ObjectId, data: ITask) =>
	clearCache(context, id) && primeCache(context, id, data);

type TaskArgs = ConnectionArguments & {
	search?: string;
};
export const loadTasks = async (context: GraphQLContext, args: TaskArgs) => {
	const where = args.search ? { name: { $regex: new RegExp(`^${args.search}`, 'ig') } } : {};
	const tasks = TaskModel.find(where, { _id: 1 }).sort({ createdAt: -1 });

	return connectionFromMongoCursor({
		cursor: tasks,
		context,
		args,
		loader: load
	});
};

import { GraphQLString, GraphQLNonNull, GraphQLFloat, GraphQLInt, GraphQLObjectType } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import pubSub, { EVENTS } from '../../../pubSub';

import TaskModel from '../TaskModel';

export default mutationWithClientMutationId({
	name: 'TaskRegister',
	inputFields: {
		name: {
			type: new GraphQLNonNull(GraphQLString)
		},
		description: {
			type: new GraphQLNonNull(GraphQLString)
		}
	},
	mutateAndGetPayload: async ({ name, description }) => {
		let task = await TaskModel.findOne({ name: name.toLowerCase() });

		if (task) {
			return {
				error: 'Task já cadastrada'
			};
		}

		task = new TaskModel({
			name,
			description
		});

		await task.save();

		await pubSub.publish(EVENTS.TASK.ADDED, { TaskAdded: { task } });

		return task;
	},
	outputFields: {
		task: {
			type: GraphQLString,
			resolve: ({ _id }) => _id
		},
		error: {
			type: GraphQLString,
			resolve: ({ error }) => error
		}
	}
});

import { GraphQLObjectType } from 'graphql';

import UserMutations from '../modules/user/mutation';
import TaskMutations from '../modules/task/mutation';

export default new GraphQLObjectType({
	name: 'Mutation',
	fields: () => ({
		...UserMutations,
		...TaskMutations
	})
});

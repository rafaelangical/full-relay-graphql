import { GraphQLObjectType } from 'graphql';

import UserMutations from '../modules/user/mutation';
import ProductMutations from '../modules/product/mutation';

export default new GraphQLObjectType({
	name: 'Mutation',
	fields: () => ({
		...UserMutations,
		...ProductMutations
	})
});

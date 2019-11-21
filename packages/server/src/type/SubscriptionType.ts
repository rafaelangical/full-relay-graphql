import { GraphQLObjectType } from 'graphql';

import UserSubscriptions from '../modules/user/subscription';
import TaskSubscriptions from '../modules/task/subscription';

export default new GraphQLObjectType({
	name: 'Subscription',
	fields: {
		...UserSubscriptions,
		...TaskSubscriptions
	}
});

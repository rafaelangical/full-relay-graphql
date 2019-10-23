import { GraphQLObjectType } from 'graphql';

import UserSubscriptions from '../modules/user/subscription';
import ProductSubscriptions from '../modules/product/subscription';

export default new GraphQLObjectType({
	name: 'Subscription',
	fields: {
		...UserSubscriptions,
		...ProductSubscriptions
	}
});

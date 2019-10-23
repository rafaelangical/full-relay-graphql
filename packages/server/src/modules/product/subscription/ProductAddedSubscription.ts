import { GraphQLObjectType } from 'graphql';
import { offsetToCursor } from 'graphql-relay';

import { ProductConnection } from '../ProductType';
import pubSub, { EVENTS } from '../../../pubSub';

const ProductAddedPayloadType = new GraphQLObjectType({
	name: 'ProductAddedPayload',
	fields: () => ({
		productEdge: {
			type: ProductConnection.edgeType,
			resolve: ({ product }) => ({
				cursor: offsetToCursor(product.id),
				node: product
			})
		}
	})
});

const productAddedSubscription = {
	type: ProductAddedPayloadType,
	subscribe: () => pubSub.asyncIterator(EVENTS.PRODUCT.ADDED)
};

export default productAddedSubscription;

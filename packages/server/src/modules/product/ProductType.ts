import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLFloat, GraphQLInt } from 'graphql';
import { globalIdField } from 'graphql-relay';

import { connectionDefinitions } from '../../core/connection/CustomConnectionType';
import { registerType, nodeInterface } from '../../interface/NodeInterface';

const ProductType = registerType(
	new GraphQLObjectType({
		name: 'Product',
		description: 'Product data',
		fields: () => ({
			id: globalIdField('Product'),
			_id: {
				type: GraphQLString,
				resolve: (product) => product._id
			},
			name: {
				type: GraphQLString,
				resolve: (product) => product.name
			},
			description: {
				type: GraphQLString,
				resolve: (product) => product.description
			},
			barcode: {
				type: GraphQLString,
				resolve: (product) => product.barcode
			},
			price: {
				type: GraphQLFloat,
				resolve: (product) => product.price
			},
			qtd: {
				type: GraphQLInt,
				resolve: (product) => product.price
			}
		}),
		interfaces: () => [ nodeInterface ]
	})
);

export default ProductType;

export const ProductConnection = connectionDefinitions({
	name: 'Product',
	nodeType: GraphQLNonNull(ProductType)
});

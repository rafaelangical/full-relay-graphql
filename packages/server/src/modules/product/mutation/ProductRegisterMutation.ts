import { GraphQLString, GraphQLNonNull, GraphQLFloat, GraphQLInt, GraphQLObjectType } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import pubSub, { EVENTS } from '../../../pubSub';

import ProductModel from '../ProductModel';

export default mutationWithClientMutationId({
	name: 'ProductRegister',
	inputFields: {
		name: {
			type: new GraphQLNonNull(GraphQLString)
		},
		description: {
			type: new GraphQLNonNull(GraphQLString)
		},
		barcode: {
			type: new GraphQLNonNull(GraphQLString)
		},
		price: {
			type: new GraphQLNonNull(GraphQLFloat)
		},
		qtd: {
			type: new GraphQLNonNull(GraphQLInt)
		}
	},
	mutateAndGetPayload: async ({ name, description, barcode, qtd, price }) => {
		let product = await ProductModel.findOne({ barcode: barcode.toLowerCase() });

		if (product) {
			return {
				error: 'Produto já cadastrado'
			};
		}

		product = new ProductModel({
			name,
			description,
			barcode,
			price,
			qtd
		});

		await product.save();

		await pubSub.publish(EVENTS.PRODUCT.ADDED, { ProductAdded: { product } });

		return product;
	},
	outputFields: {
		product: {
			type: GraphQLString,
			resolve: ({ _id }) => _id
		},
		error: {
			type: GraphQLString,
			resolve: ({ error }) => error
		}
	}
});

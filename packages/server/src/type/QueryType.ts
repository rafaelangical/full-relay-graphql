import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLID } from 'graphql';
import { connectionArgs, fromGlobalId } from 'graphql-relay';

import UserType, { UserConnection } from '../modules/user/UserType';
import ProductType, { ProductConnection } from '../modules/product/ProductType';
import { nodeField } from '../interface/NodeInterface';
import { UserLoader, ProductLoader } from '../loader';

export default new GraphQLObjectType({
	name: 'Query',
	description: 'The root of all... queries',
	fields: () => ({
		node: nodeField,
		me: {
			type: UserType,
			resolve: (root, args, context) => (context.user ? UserLoader.load(context, context.user._id) : null)
		},
		user: {
			type: UserType,
			args: {
				id: {
					type: new GraphQLNonNull(GraphQLID)
				}
			},
			resolve: (obj, args, context) => {
				const { id } = fromGlobalId(args.id);
				return UserLoader.load(context, id);
			}
		},
		product: {
			type: ProductType,
			args: {
				id: {
					type: new GraphQLNonNull(GraphQLID)
				}
			},
			resolve: (obj, args, context) => {
				const { id } = fromGlobalId(args.id);
				return ProductLoader.load(context, id);
			}
		},
		users: {
			type: UserConnection.connectionType,
			args: {
				...connectionArgs,
				search: {
					type: GraphQLString
				}
			},
			resolve: (obj, args, context) => UserLoader.loadUsers(context, args)
		},
		products: {
			type: ProductConnection.connectionType,
			args: {
				...connectionArgs,
				search: {
					type: GraphQLString
				}
			},
			resolve: (obj, args, context) => ProductLoader.loadProducts(context, args)
		}
	})
});

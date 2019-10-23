import DataLoader from 'dataloader';
import { connectionFromMongoCursor, mongooseLoader } from '@entria/graphql-mongoose-loader';
import { Types } from 'mongoose';
import { ConnectionArguments } from 'graphql-relay';
import mongoose from 'mongoose';
declare type ObjectId = mongoose.Schema.Types.ObjectId;

import ProductModel, { IProduct } from './ProductModel';

import { GraphQLContext } from '../../TypeDefinition';

export default class Product {
	id: string;

	_id: Types.ObjectId;

	name: string;

	description: string | null | undefined;

	barcode: string | null | undefined;

	price: number | null | undefined;

	qtd: number | null | undefined;

	constructor(data: IProduct, { product }: GraphQLContext) {
		this.id = data._id;
		this._id = data._id;
		this.name = data.name;
		this.description = data.description;
		this.barcode = data.barcode;
		this.price = data.price;
		this.qtd = data.qtd;

		// contollers to send variables, example::::

		// you can only see your own email, and your active status
		// if (user && user._id.equals(data._id)) {
		// 	this.email = data.email;
		// 	this.active = data.active;
		// }
	}
}

export const getLoader = () => new DataLoader((ids: ReadonlyArray<string>) => mongooseLoader(ProductModel, ids));

const viewerCanSee = () => true;

export const load = async (context: GraphQLContext, id: string | Object | ObjectId): Promise<Product | null> => {
	if (!id && typeof id !== 'string') {
		return null;
	}

	let data;
	try {
		data = await context.dataloaders.ProductLoader.load(id as string);
	} catch (err) {
		return null;
	}
	return viewerCanSee() ? new Product(data, context) : null;
};

export const clearCache = ({ dataloaders }: GraphQLContext, id: Types.ObjectId) =>
	dataloaders.ProductLoader.clear(id.toString());
export const primeCache = ({ dataloaders }: GraphQLContext, id: Types.ObjectId, data: IProduct) =>
	dataloaders.ProductLoader.prime(id.toString(), data);
export const clearAndPrimeCache = (context: GraphQLContext, id: Types.ObjectId, data: IProduct) =>
	clearCache(context, id) && primeCache(context, id, data);

type ProductArgs = ConnectionArguments & {
	search?: string;
};
export const loadProducts = async (context: GraphQLContext, args: ProductArgs) => {
	const where = args.search ? { name: { $regex: new RegExp(`^${args.search}`, 'ig') } } : {};
	const products = ProductModel.find(where, { _id: 1 }).sort({ createdAt: -1 });

	return connectionFromMongoCursor({
		cursor: products,
		context,
		args,
		loader: load
	});
};

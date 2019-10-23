import mongoose, { Document, Model } from 'mongoose';

const schema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		description: {
			type: String,
			hidden: true
		},
		barcode: {
			type: String,
			required: false,
			index: true
		},
		value: {
			type: Number,
			default: true
		},
		qtd: {
			type: Number,
			default: true
		}
	},
	{
		timestamps: {
			createdAt: 'createdAt',
			updatedAt: 'updatedAt'
		},
		collection: 'product'
	}
);

export interface IProduct extends Document {
	name: string;
	description?: string;
	barcode: string;
	price: number;
	qtd: number;
}

// this will make find, findOne typesafe
const ProductModel: Model<IProduct> = mongoose.model('Product', schema);

export default ProductModel;

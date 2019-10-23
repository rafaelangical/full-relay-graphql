import { PubSub } from 'graphql-subscriptions';

export const EVENTS = {
	USER: {
		ADDED: 'USER_ADDED'
	},
	PRODUCT: {
		ADDED: 'PRODUCT_ADDED'
	}
};

export default new PubSub();

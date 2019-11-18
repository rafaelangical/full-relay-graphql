import { commitMutation, graphql } from 'react-relay';
import { Environment } from '../../../relay';

import {
	ProductRegisterInput,
	ProductRegisterMutationResponse
} from '../__generated__/ProductRegisterMutation.graphql';

const mutation = graphql`
	mutation ProductRegisterMutation($input: ProductRegisterInput!) {
		ProductRegister(input: $input) {
			product
			error
		}
	}
`;

function commit(
	input: ProductRegisterInput,
	onCompleted: (response: ProductRegisterMutationResponse) => void,
	onError: (error: Error) => void
) {
	return commitMutation(Environment, {
		mutation,
		variables: {
			input
		},
		onCompleted,
		onError
	});
}

export default { commit };

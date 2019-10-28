import { commitMutation, graphql } from 'react-relay';
import { Environment } from '../../../relay';

import {
	ProductRegisterInput,
	ProdctRegisterMutationResponse
} from '../../../__generated__/ProductRegisterMutation.graphql';

const mutation = graphql`
	mutation UserRegisterWithEmailMutation($input: UserRegisterWithEmailInput!) {
		ProductRegister(input: $input) {
			name
			barcode
		}
	}
`;

function commit(
	input: ProductRegisterInput,
	onCompleted: (response: ProdctRegisterMutationResponse) => void,
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

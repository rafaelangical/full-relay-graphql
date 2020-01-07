import {commitMutation, graphql} from 'react-relay';
import {Environment} from '../../../relay';

import {
  TaskRegisterInput,
  TaskRegisterMutationResponse,
} from '../__generated__/TaskRegisterMutation.graphql';

const mutation = graphql`
  mutation TaskRegisterMutation($input: TaskRegisterInput!) {
    TaskRegister(input: $input) {
      task
      error
    }
  }
`;

function commit(
  input: TaskRegisterInput,
  onCompleted: (response: TaskRegisterMutationResponse) => void,
  onError: (error: Error) => void,
) {
  return commitMutation(Environment, {
    mutation,
    variables: {
      input,
    },
    onCompleted,
    onError,
  });
}

export default {commit};

import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import { generateToken } from '../../../auth.ts';
import pubSub, { EVENTS } from '../../../pubSub.ts';

import UserModel from '../UserModel.ts';

export default mutationWithClientMutationId({
  name: 'UserRegisterWithEmail',
  inputFields: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async ({ name, email, password }) => {
    let user = await UserModel.findOne({ email: email.toLowerCase() });

    if (user) {
      return {
        error: 'Email already in use',
      };
    }

    user = new UserModel({
      name,
      email,
      password,
    });

    await user.save();

    await pubSub.publish(EVENTS.USER.ADDED, { UserAdded: { user } });

    return {
      token: generateToken(user),
    };
  },
  outputFields: {
    token: {
      type: GraphQLString,
      resolve: ({ token }) => token,
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error,
    },
  },
});

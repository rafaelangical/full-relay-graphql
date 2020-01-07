import * as React from 'react';
import {Text} from 'react-native';
import hoistStatics from 'hoist-non-react-statics';
import {QueryRenderer} from 'react-relay';

import {GraphQLTaggedNode, Variables} from 'react-relay';

import Environment from './Environment';

type Config = {
  query?: GraphQLTaggedNode;
  queriesParams?: (props: Object) => Object;
  variables?: Variables;
  hideSplash?: boolean;
};

export default function createQueryRenderer(
  FragmentComponent: React.ComponentType<any>,
  Component: React.ComponentType<any>,
  config: Config,
): React.ComponentType<any> {
  const {query, queriesParams} = config;

  class QueryRendererWrapper extends React.Component<{}> {
    render() {
      const variables = queriesParams
        ? queriesParams(this.props)
        : config.variables;

      console.log('variables');
      console.log(variables);
      return (
        <QueryRenderer
          environment={Environment}
          query={query}
          variables={variables}
          render={({error, props}) => {
            if (error) {
              return <Text>{error.toString()}</Text>;
            }

            if (props) {
              return <FragmentComponent {...this.props} query={props} />;
            }

            return <Text>loading</Text>;
          }}
        />
      );
    }
  }

  return hoistStatics(QueryRendererWrapper, Component);
}

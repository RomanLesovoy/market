import { APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloLink, InMemoryCache, split } from '@apollo/client/core';
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities"
import { setContext } from '@apollo/client/link/context';
import { HttpLink } from 'apollo-angular/http';

const uri = 'https://vakotrade.cryptosrvc-dev.com/graphql';
 
export function createApollo(httpLink: HttpLink) {
  const basic = setContext((operation, context) => ({
    headers: {
      Accept: 'application/json',
    },
  }));

  const ws = new WebSocketLink({
    uri: `wss://vakotrade.cryptosrvc-dev.com/graphql`,
    options: {
      reconnect: true
    }
  });
 
  const auth = setContext((operation, context) => {
    const token = localStorage.getItem('token');
 
    if (token === null) {
      return {};
    } else {
      return {
        headers: {
          Authorization: token,
        },
      };
    }
  });

  const http = ApolloLink.from([basic, auth, httpLink.create({ uri })]);

  const link: ApolloLink = split(
    // split based on operation type
    ({ query }) => {
      let definition = getMainDefinition(query);
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';  // explain: switcher between connection types
    },
    ws,
    http,
  );

  const cache = new InMemoryCache();
 
  return {
    link,
    cache,
  };
}

export const ApolloProvider = {
  provide: APOLLO_OPTIONS,
  useFactory: createApollo,
  deps: [HttpLink],
};

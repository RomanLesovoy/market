import { APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloLink, InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { HttpLink } from 'apollo-angular/http';

const uri = 'https://vakotrade.cryptosrvc-dev.com/graphql';
 
export function createApollo(httpLink: HttpLink) {
  const basic = setContext((operation, context) => ({
    headers: {
      Accept: 'application/json',
    },
  }));
 
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
 
  const link = ApolloLink.from([basic, auth, httpLink.create({ uri })]);
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

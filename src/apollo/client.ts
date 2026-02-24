import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core'

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URI,
})

const cache = new InMemoryCache({
  addTypename: false, // Match Angular config
})

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
    },
    query: {
      fetchPolicy: 'no-cache',
    },
  },
})
